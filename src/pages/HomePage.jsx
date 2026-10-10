
/* =========================================================
   VAULT KHAZANA — AUTHORITATIVE HOMEPAGE HERO
   One static image frame; copy integrated over the image.
   No carousel, separate text panel, or second text row.
   ========================================================= */

html body #root .home-page .hero {
  position: relative !important;
  display: block !important;
  width: 100% !important;
  height: auto !important;
  min-height: 0 !important;
  margin: 0 !important;
  padding: 0 !important;
  overflow: hidden !important;
  isolation: isolate;
  background: #1F3A5C !important;
  color: #FFFFFF !important;
}

html body #root .home-page .hero::before,
html body #root .home-page .hero::after {
  content: none !important;
  display: none !important;
}

html body #root .home-page .hero-container {
  position: relative !important;
  display: block !important;
  width: 100% !important;
  max-width: none !important;
  margin: 0 !important;
  padding: 0 !important;
}

html body #root .home-page .hero-visual {
  position: relative !important;
  display: block !important;
  width: 100% !important;
  margin: 0 !important;
  animation: none !important;
}

html body #root .home-page .hero-video-frame {
  position: relative !important;
  display: block !important;
  width: 100% !important;
  height: clamp(500px, 46vw, 650px) !important;
  min-height: 500px !important;
  max-width: none !important;
  margin: 0 !important;
  padding: 0 !important;
  overflow: hidden !important;
  aspect-ratio: auto !important;
  background: #1F3A5C !important;
  border: 0 !important;
  border-radius: 0 !important;
  box-shadow: none !important;
}

html body #root .home-page .hero-video {
  position: absolute !important;
  inset: 0 !important;
  display: block !important;
  width: 100% !important;
  height: 100% !important;
  min-height: 0 !important;
  max-height: none !important;
  margin: 0 !important;
  padding: 0 !important;
  object-fit: contain !important;
  object-position: left center !important;
  background: transparent !important;
  border: 0 !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  transform: none !important;
  animation: none !important;
  z-index: 0 !important;
}

html body #root .home-page .hero-video-frame::after {
  content: "" !important;
  position: absolute !important;
  inset: 0 !important;
  display: block !important;
  z-index: 1 !important;
  pointer-events: none !important;
  background: linear-gradient(
    90deg,
    rgba(31, 58, 92, 0) 0%,
    rgba(31, 58, 92, 0.04) 35%,
    rgba(31, 58, 92, 0.52) 58%,
    rgba(31, 58, 92, 0.92) 100%
  ) !important;
}

/* Keep the copy absolutely positioned inside the image frame. */

html body #root .home-page .hero-video-frame .hero-content {
  position: absolute !important;
  top: 50% !important;
  right: clamp(28px, 6vw, 100px) !important;
  bottom: auto !important;
  left: auto !important;
  display: block !important;
  float: none !important;
  width: min(43%, 570px) !important;
  max-width: 570px !important;
  min-width: 0 !important;
  margin: 0 !important;
  padding: 24px 0 !important;
  transform: translateY(-50%) !important;
  z-index: 2 !important;
  text-align: left !important;
  background: transparent !important;
  border: 0 !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  animation: none !important;
  grid-column: auto !important;
  grid-row: auto !important;
}

html body #root .home-page .hero-title::before {
  content: "PACKAGING & FOOD-SERVICE SUPPLIES";
  display: block;
  margin: 0 0 18px;
  color: #E67E22;
  font-size: 12px;
  font-weight: 700;
  line-height: 1.5;
  letter-spacing: 1.8px;
  text-transform: uppercase;
}

html body #root .home-page .hero-title {
  margin: 0 0 18px !important;
  color: #FFFFFF !important;
  font-size: clamp(34px, 4vw, 56px) !important;
  font-weight: 750 !important;
  line-height: 1.08 !important;
  letter-spacing: -1px !important;
  overflow-wrap: break-word;
  text-wrap: balance;
}

html body #root .home-page .hero-description {
  max-width: 500px !important;
  margin: 0 0 26px !important;
  color: rgba(255, 255, 255, 0.96) !important;
  font-size: clamp(16px, 1.35vw, 19px) !important;
  line-height: 1.6 !important;
}

html body #root .home-page .hero-actions {
  display: flex !important;
  flex-direction: row !important;
  flex-wrap: wrap !important;
  align-items: center !important;
  gap: 12px !important;
  width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
}

html body #root .home-page .hero-button,
html body #root .home-page .hero-button-primary,
html body #root .home-page .hero-button-secondary {
  position: relative !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 8px !important;
  width: auto !important;
  min-width: 0 !important;
  max-width: 100% !important;
  min-height: 48px !important;
  margin: 0 !important;
  padding: 13px 18px !important;
  border-radius: 7px !important;
  font-size: 14px !important;
  font-weight: 700 !important;
  line-height: 1.35 !important;
  text-align: center !important;
  text-decoration: none !important;
  white-space: normal !important;
  cursor: pointer;
  transition:
    background-color 160ms ease,
    border-color 160ms ease,
    color 160ms ease;
}

html body #root .home-page .hero-button-primary {
  background: #E67E22 !important;
  border: 2px solid #E67E22 !important;
  color: #FFFFFF !important;
}

html body #root .home-page .hero-button-primary:hover {
  background: #D65D0A !important;
  border-color: #D65D0A !important;
  color: #FFFFFF !important;
}

html body #root .home-page .hero-button-secondary {
  background: transparent !important;
  border: 2px solid rgba(255, 255, 255, 0.95) !important;
  color: #FFFFFF !important;
}

html body #root .home-page .hero-button-secondary:hover {
  background: rgba(255, 255, 255, 0.1) !important;
  border-color: #FFFFFF !important;
  color: #FFFFFF !important;
}

html body #root .home-page .hero-button:focus-visible {
  outline: 3px solid #FFFFFF;
  outline-offset: 4px;
}

html body #root .home-page .button-arrow {
  display: inline-block;
  transition: transform 160ms ease;
}

html body #root .home-page .hero-button:hover .button-arrow {
  transform: translateX(3px);
}

/* Tablet */

@media (min-width: 768px) and (max-width: 1023px) {
  html body #root .home-page .hero-video-frame {
    height: 500px !important;
    min-height: 500px !important;
  }

  html body #root .home-page .hero-video-frame .hero-content {
    right: 28px !important;
    width: 48% !important;
    padding: 20px 0 !important;
  }

  html body #root .home-page .hero-title {
    font-size: clamp(30px, 4.2vw, 40px) !important;
  }

  html body #root .home-page .hero-description {
    font-size: 16px !important;
    margin-bottom: 20px !important;
  }

  html body #root .home-page .hero-actions {
    flex-direction: column !important;
    align-items: flex-start !important;
  }

  html body #root .home-page .hero-button,
  html body #root .home-page .hero-button-primary,
  html body #root .home-page .hero-button-secondary {
    width: 100% !important;
    max-width: 260px !important;
  }
}

/* Mobile: one frame, with the text over the lower image area.
   The copy is never assigned a separate grid row. */

@media (max-width: 767px) {
  html body #root .home-page .hero {
    height: auto !important;
    min-height: 0 !important;
    padding: 0 !important;
  }

  html body #root .home-page .hero-container {
    padding: 0 !important;
  }

  html body #root .home-page .hero-video-frame {
    display: block !important;
    position: relative !important;
    width: 100% !important;
    height: clamp(640px, 175vw, 760px) !important;
    min-height: 640px !important;
    max-height: none !important;
    overflow: hidden !important;
  }

  html body #root .home-page .hero-video {
    position: absolute !important;
    inset: 0 !important;
    width: 100% !important;
    height: 100% !important;
    padding: 0 !important;
    object-fit: contain !important;
    object-position: center top !important;
  }

  html body #root .home-page .hero-video-frame::after {
    background: linear-gradient(
      180deg,
      rgba(31, 58, 92, 0) 0%,
      rgba(31, 58, 92, 0.02) 28%,
      rgba(31, 58, 92, 0.30) 43%,
      rgba(31, 58, 92, 0.86) 58%,
      #1F3A5C 74%,
      #1F3A5C 100%
    ) !important;
  }

  html body #root .home-page .hero-video-frame .hero-content {
    position: absolute !important;
    top: auto !important;
    right: 22px !important;
    bottom: 24px !important;
    left: 22px !important;
    display: block !important;
    width: auto !important;
    max-width: none !important;
    margin: 0 !important;
    padding: 0 !important;
    transform: none !important;
    text-align: left !important;
    grid-column: auto !important;
    grid-row: auto !important;
  }

  html body #root .home-page .hero-title::before {
    margin-bottom: 10px;
    font-size: 10px;
    letter-spacing: 1.4px;
  }

  html body #root .home-page .hero-title {
    margin-bottom: 12px !important;
    font-size: clamp(28px, 7vw, 36px) !important;
    line-height: 1.12 !important;
  }

  html body #root .home-page .hero-description {
    max-width: 560px !important;
    margin-bottom: 18px !important;
    font-size: 15px !important;
    line-height: 1.5 !important;
  }

  html body #root .home-page .hero-actions {
    flex-direction: column !important;
    align-items: stretch !important;
    gap: 10px !important;
  }

  html body #root .home-page .hero-button,
  html body #root .home-page .hero-button-primary,
  html body #root .home-page .hero-button-secondary {
    width: 100% !important;
    min-width: 0 !important;
    min-height: 46px !important;
  }
}

@media (max-width: 360px) {
  html body #root .home-page .hero-video-frame {
    height: 680px !important;
    min-height: 680px !important;
  }

  html body #root .home-page .hero-video-frame .hero-content {
    right: 16px !important;
    bottom: 18px !important;
    left: 16px !important;
  }

  html body #root .home-page .hero-title {
    font-size: 27px !important;
  }

  html body #root .home-page .hero-description {
    font-size: 14px !important;
  }
}

/* Preserve category responsiveness previously provided here. */

@media (max-width: 640px) {
  .home-page .category-grid {
    grid-template-columns: minmax(0, 1fr);
    gap: 10px;
  }

  .home-page .category-card {
    gap: 10px;
    padding: 12px;
  }

  .home-page .category-icon {
    width: 44px;
    height: 44px;
    font-size: 30px;
  }

  .home-page .category-name {
    font-size: 14px;
    line-height: 1.3;
    margin: 0;
  }

  .home-page .category-desc {
    display: block;
    font-size: 12px;
    line-height: 1.35;
    margin-top: 3px;
  }

  .home-page .category-arrow {
    display: block;
    margin-left: auto;
    font-size: 22px;
  }
}

@media (min-width: 641px) and (max-width: 1023px) {
  .home-page .category-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
  }

  .home-page .category-card {
    gap: 12px;
    padding: 16px;
  }

  .home-page .category-icon {
    width: 48px;
    height: 48px;
    font-size: 34px;
  }

  .home-page .category-name {
    font-size: 15px;
  }

  .home-page .category-desc {
    font-size: 12px;
  }
}

@media (min-width: 1024px) {
  .home-page .category-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

@media (min-width: 1440px) {
  .home-page .category-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

@media (prefers-reduced-motion: reduce) {
  html body #root .home-page .hero-content,
  html body #root .home-page .hero-visual,
  html body #root .home-page .hero-button,
  .home-page .category-card,
  .home-page .category-icon {
    animation: none !important;
    transition: none !important;
  }
}
