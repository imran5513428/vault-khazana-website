#!/usr/bin/env python3
"""
VAULT KHAZANA — Safe Product Image Audit
========================================

PURPOSE
-------
1. Audit supported product-image files.
2. Record image dimensions, formats, sizes and SHA-256 hashes.
3. Identify exact duplicate files.
4. Estimate foreground framing for review.
5. Create conservative square-canvas proposals without cropping
   or overwriting original images.
6. Generate Markdown, CSV and JSON reports.

SAFETY
------
- Original images are never modified.
- Website source files are never modified.
- No deployment or GitHub API operations are performed.
- Homepage category collages are excluded.
- All generated files are kept in separate output directories.
- Existing output directories cause a safe stop.
- Image processing requires Pillow; reports still work without it.

RUN
---
python safe_image_audit.py

Optional:
python safe_image_audit.py --root /path/to/repository

Install Pillow separately if image proposals are required:
python -m pip install Pillow
"""

from __future__ import annotations

import argparse
import csv
import hashlib
import json
import math
import sys
from collections import defaultdict
from datetime import datetime, timezone
from pathlib import Path

SUPPORTED_EXTENSIONS = {
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
}

EXCLUDED_DIRS = {
    ".git",
    ".github",
    ".venv",
    "venv",
    "node_modules",
    "__pycache__",
    "image_audit_output",
    "image_crop_proposals",
}

# These homepage/category collages must not be treated as product photos.
EXCLUDED_FILENAME_PREFIXES = (
    "category-",
    "category_",
    "shop-by-category",
)

# Known product-image folders in the VAULT KHAZANA workflow.
KNOWN_PRODUCT_FOLDERS = {
    "3000ml-square",
    "480ml-round",
    "g35",
    "h6",
    "h2",
}

REPORT_DIR_NAME = "image_audit_output"
PROPOSAL_DIR_NAME = "image_crop_proposals"


def sha256_file(path: Path) -> str:
    """Calculate a file's SHA-256 hash in small chunks."""
    digest = hashlib.sha256()

    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)

    return digest.hexdigest()


def is_excluded_path(path: Path, root: Path) -> bool:
    """Exclude generated output, dependency folders and category collages."""
    relative = path.relative_to(root)

    if any(part in EXCLUDED_DIRS for part in relative.parts[:-1]):
        return True

    filename = path.name.lower()

    if filename.startswith(EXCLUDED_FILENAME_PREFIXES):
        return True

    # Avoid accidentally auditing a previous generated proposal.
    if PROPOSAL_DIR_NAME in relative.parts:
        return True

    if REPORT_DIR_NAME in relative.parts:
        return True

    return False


def discover_images(root: Path) -> list[Path]:
    """Find supported images without entering excluded directories."""
    found = []

    for path in root.rglob("*"):
        if not path.is_file():
            continue

        if path.suffix.lower() not in SUPPORTED_EXTENSIONS:
            continue

        if is_excluded_path(path, root):
            continue

        found.append(path)

    return sorted(found, key=lambda item: str(item).lower())


def estimate_framing(image, pillow_image_module) -> dict:
    """
    Estimate the likely foreground bounds by comparing pixels with
    the average colour of the image's four corners.

    This is only a heuristic. It cannot reliably distinguish a product
    from a patterned background, shadow, transparent area or reflection.
    Results must be visually checked.
    """
    image = image.convert("RGB")
    width, height = image.size

    if width < 3 or height < 3:
        return {
            "foreground_fill_estimate": None,
            "foreground_bbox_estimate": None,
            "framing_note": "Image too small for framing estimate",
        }

    sample = image.copy()
    sample.thumbnail((300, 300))

    sw, sh = sample.size
    pixels = sample.load()

    corners = [
        pixels[0, 0],
        pixels[sw - 1, 0],
        pixels[0, sh - 1],
        pixels[sw - 1, sh - 1],
    ]

    background = tuple(
        sum(pixel[channel] for pixel in corners) / len(corners)
        for channel in range(3)
    )

    threshold = 30
    xs = []
    ys = []

    for y in range(sh):
        for x in range(sw):
            pixel = pixels[x, y]

            distance = math.sqrt(
                sum(
                    (pixel[channel] - background[channel]) ** 2
                    for channel in range(3)
                )
            )

            if distance > threshold:
                xs.append(x)
                ys.append(y)

    if not xs or not ys:
        return {
            "foreground_fill_estimate": 0.0,
            "foreground_bbox_estimate": None,
            "framing_note": (
                "No reliable foreground detected; manual review required"
            ),
        }

    left = min(xs)
    top = min(ys)
    right = max(xs) + 1
    bottom = max(ys) + 1

    fill = (
        ((right - left) / sw)
        * ((bottom - top) / sh)
        * 100
    )

    # Convert the estimated box back to original-image coordinates.
    scale_x = width / sw
    scale_y = height / sh

    bbox = [
        round(left * scale_x),
        round(top * scale_y),
        round(right * scale_x),
        round(bottom * scale_y),
    ]

    return {
        "foreground_fill_estimate": round(fill, 2),
        "foreground_bbox_estimate": bbox,
        "framing_note": (
            "Heuristic estimate only; inspect product and edges manually"
        ),
    }


def audit_one(path: Path, root: Path) -> dict:
    """Collect metadata and a hash without changing the image."""
    relative = path.relative_to(root).as_posix()
    stat = path.stat()

    record = {
        "file": relative,
        "filename": path.name,
        "extension": path.suffix.lower(),
        "bytes": stat.st_size,
        "size_kb": round(stat.st_size / 1024, 2),
        "sha256": "",
        "width": None,
        "height": None,
        "aspect_ratio": None,
        "format_detected": None,
        "mode": None,
        "has_transparency": None,
        "foreground_fill_estimate": None,
        "foreground_bbox_estimate": None,
        "duplicate_group": "",
        "status": "OK",
        "framing_note": "",
        "error": "",
    }

    try:
        record["sha256"] = sha256_file(path)
    except OSError as exc:
        record["status"] = "READ_ERROR"
        record["error"] = str(exc)
        return record

    try:
        from PIL import Image

        with Image.open(path) as image:
            image.verify()

        with Image.open(path) as image:
            width, height = image.size

            record["width"] = width
            record["height"] = height
            record["aspect_ratio"] = (
                round(width / height, 4) if height else None
            )
            record["format_detected"] = image.format
            record["mode"] = image.mode
            record["has_transparency"] = (
                "transparency" in image.info
                or "A" in image.getbands()
            )

            if width < 300 or height < 300:
                record["status"] = "LOW_RESOLUTION_REVIEW"

            if width != height:
                if record["status"] == "OK":
                    record["status"] = "NON_SQUARE_REVIEW"

            with Image.open(path) as framing_image:
                framing = estimate_framing(framing_image, Image)

            record.update(framing)

    except ImportError:
        record["status"] = "PILLOW_NOT_INSTALLED"
        record["framing_note"] = (
            "Metadata inspection unavailable; install Pillow for full audit"
        )

    except Exception as exc:
        record["status"] = "IMAGE_REVIEW_REQUIRED"
        record["error"] = str(exc)

    return record


def create_square_proposal(source: Path, destination: Path) -> str:
    """
    Create a square-canvas review copy while preserving the entire image.

    This intentionally does NOT crop the original or cut off its edges.
    The original proportions are preserved. The proposal is not a
    final approved website asset.
    """
    try:
        from PIL import Image, ImageOps

        with Image.open(source) as opened:
            image = ImageOps.exif_transpose(opened).convert("RGB")

        width, height = image.size
        side = max(width, height)

        # Neutral white canvas avoids guessing the correct background.
        canvas = Image.new("RGB", (side, side), (255, 255, 255))

        x = (side - width) // 2
        y = (side - height) // 2
        canvas.paste(image, (x, y))

        destination.parent.mkdir(parents=True, exist_ok=True)
        canvas.save(destination, format="JPEG", quality=92, optimize=True)

        return "PROPOSAL_CREATED"

    except ImportError:
        return "SKIPPED_PILLOW_NOT_INSTALLED"

    except Exception as exc:
        return f"PROPOSAL_ERROR: {exc}"


def write_reports(
    records: list[dict],
    report_dir: Path,
    root: Path,
    pillow_available: bool,
) -> None:
    """Write reports only into the new, dedicated output directory."""
    report_dir.mkdir(parents=False, exist_ok=False)

    json_path = report_dir / "image_audit.json"
    csv_path = report_dir / "image_audit.csv"
    markdown_path = report_dir / "REPORT.md"

    with json_path.open("w", encoding="utf-8") as handle:
        json.dump(records, handle, indent=2, ensure_ascii=False)

    fieldnames = list(records[0].keys()) if records else [
        "file",
        "filename",
        "extension",
        "bytes",
        "size_kb",
        "sha256",
        "width",
        "height",
        "aspect_ratio",
        "format_detected",
        "mode",
        "has_transparency",
        "foreground_fill_estimate",
        "foreground_bbox_estimate",
        "duplicate_group",
        "status",
        "framing_note",
        "error",
    ]

    with csv_path.open("w", newline="", encoding="utf-8-sig") as handle:
        writer = csv.DictWriter(handle, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(records)

    duplicate_groups = defaultdict(list)

    for record in records:
        if record["sha256"]:
            duplicate_groups[record["sha256"]].append(record["file"])

    duplicates = [
        files
        for files in duplicate_groups.values()
        if len(files) > 1
    ]

    statuses = defaultdict(int)

    for record in records:
        statuses[record["status"]] += 1

    lines = [
        "# VAULT KHAZANA — Image Audit Report",
        "",
        f"- Generated (UTC): {datetime.now(timezone.utc).isoformat()}",
        f"- Repository root: `{root}`",
        f"- Supported images found: {len(records)}",
        f"- Exact duplicate groups: {len(duplicates)}",
        f"- Pillow available: {'Yes' if pillow_available else 'No'}",
        "",
        "## Safety statement",
        "",
        "This audit does not modify original images or website source files.",
        "Square-canvas proposals, when available, are separate review copies.",
        "Do not publish a proposal without visual approval.",
        "",
        "## Status totals",
        "",
    ]

    if statuses:
        for status, count in sorted(statuses.items()):
            lines.append(f"- **{status}:** {count}")
    else:
        lines.append("- No supported images found.")

    lines.extend(["", "## Exact duplicate files", ""])

    if duplicates:
        for index, group in enumerate(duplicates, start=1):
            lines.append(f"### Duplicate group {index}")
            for filename in group:
                lines.append(f"- `{filename}`")
            lines.append("")
    else:
        lines.append("No exact duplicates detected.")
        lines.append("")

    lines.extend([
        "## Image review list",
        "",
        "| File | Dimensions | Format | Size (KB) | Status |",
        "|---|---:|---|---:|---|",
    ])

    for record in records:
        dimensions = (
            f"{record['width']} × {record['height']}"
            if record["width"] and record["height"]
            else "Unknown"
        )

        safe_file = record["file"].replace("|", "\\|")
        safe_status = record["status"].replace("|", "\\|")

        lines.append(
            f"| `{safe_file}` | {dimensions} | "
            f"{record['format_detected'] or 'Unknown'} | "
            f"{record['size_kb']} | {safe_status} |"
        )

    lines.extend([
        "",
        "## Important review notes",
        "",
        "- Framing estimates are approximate, not object recognition.",
        "- Shadows, patterns, reflections and backgrounds can affect estimates.",
        "- Non-square images are flagged for human review.",
        "- Low-resolution images are flagged for human review.",
        "- Exact duplicate hashes identify byte-identical files only.",
        "- Different hashes do not prove that two images are different products.",
        "- Keep product-listing and product-detail image ratios separate.",
        "- Homepage category collages are excluded by filename prefix.",
        "- Confirm the intended image path before making website changes.",
        "",
        "## Output files",
        "",
        "- `REPORT.md` — readable audit report",
        "- `image_audit.csv` — spreadsheet-compatible audit",
        "- `image_audit.json` — detailed machine-readable audit",
        "",
    ])

    markdown_path.write_text("\n".join(lines), encoding="utf-8")


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Safely audit VAULT KHAZANA product images."
    )

    parser.add_argument(
        "--root",
        default=".",
        help="Repository root directory (default: current directory).",
    )

    args = parser.parse_args()

    root = Path(args.root).expanduser().resolve()

    if not root.is_dir():
        print(f"ERROR: Repository root does not exist: {root}")
        return 2

    report_dir = root / REPORT_DIR_NAME
    proposal_dir = root / PROPOSAL_DIR_NAME

    # Stop before writing anything if either output path already exists.
    if report_dir.exists() or proposal_dir.exists():
        print("SAFE STOP: An output directory already exists.")
        print("No files have been overwritten.")
        if report_dir.exists():
            print(f"Existing report directory: {report_dir}")
        if proposal_dir.exists():
            print(f"Existing proposal directory: {proposal_dir}")
        print(
            "Move or rename the existing output directories after reviewing "
            "their contents, then run the audit again."
        )
        return 2

    try:
        from PIL import Image  # noqa: F401
        pillow_available = True
    except ImportError:
        pillow_available = False

    images = discover_images(root)

    if not images:
        print("No supported images found in the repository.")
        print("No output directories were created.")
        print("Check --root and confirm the repository was downloaded.")
        return 0

    print(f"Repository: {root}")
    print(f"Images discovered: {len(images)}")
    print("Auditing images. Original files will not be modified.")

    records = []

    for index, path in enumerate(images, start=1):
        record = audit_one(path, root)
        records.append(record)

        if index % 25 == 0 or index == len(images):
            print(f"Audited {index}/{len(images)}")

    # Mark exact duplicates using hashes, without deleting anything.
    hash_groups = defaultdict(list)

    for record in records:
        if record["sha256"]:
            hash_groups[record["sha256"]].append(record)

    for digest, group in hash_groups.items():
        if len(group) > 1:
            for record in group:
                record["duplicate_group"] = digest[:12]
                if record["status"] == "OK":
                    record["status"] = "EXACT_DUPLICATE_REVIEW"

    # Create square-canvas proposals only when Pillow is installed.
    proposals_created = 0
    proposal_errors = []

    if pillow_available:
        try:
            proposal_dir.mkdir(parents=False, exist_ok=False)

            for record in records:
                width = record.get("width")
                height = record.get("height")

                # Skip square files and files that failed image inspection.
                if not width or not height or width == height:
                    continue

                source = root / record["file"]
                relative = Path(record["file"]).with_suffix(".jpg")
                destination = proposal_dir / relative

                result = create_square_proposal(source, destination)
                record["proposal_status"] = result

                if result == "PROPOSAL_CREATED":
                    proposals_created += 1
                elif result.startswith("PROPOSAL_ERROR"):
                    proposal_errors.append(
                        f"{record['file']}: {result}"
                    )

        except FileExistsError:
            print(
                "SAFE STOP: Proposal directory appeared during processing. "
                "No existing files were overwritten."
            )
            return 2

    try:
        write_reports(records, report_dir, root, pillow_available)
    except FileExistsError:
        print(
            "SAFE STOP: Report directory appeared during processing. "
            "No existing reports were overwritten."
        )
        return 2
    except OSError as exc:
        print(f"ERROR writing reports: {exc}")
        return 1

    print("")
    print("AUDIT FINISHED")
    print(f"Report: {report_dir / 'REPORT.md'}")
    print(f"CSV:    {report_dir / 'image_audit.csv'}")
    print(f"JSON:   {report_dir / 'image_audit.json'}")

    if pillow_available:
        print(f"Square-canvas proposals created: {proposals_created}")
        print(f"Proposal folder: {proposal_dir}")
    else:
        print("Pillow is not installed; image proposals were skipped.")
        print("Metadata and hash reports were still generated.")

    if proposal_errors:
        print(f"Proposal errors: {len(proposal_errors)}")
        for error in proposal_errors[:10]:
            print(f"- {error}")

    print("")
    print("SAFE RESULT: Original images and website source files were preserved.")
    print("Review the reports and every proposal before any future website change.")

    return 0


if __name__ == "__main__":
    sys.exit(main())