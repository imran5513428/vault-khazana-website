
/* =========================================================
   VAULT KHAZANA — HOMEPAGE HERO
   Static image with integrated text overlay.
   Desktop: image left, copy blended over image on right.
   Mobile: full-width image, then copy on the same navy background.
   No carousel, separate text card, or decorative panel.
   ========================================================= */

/* ===== HERO SECTION ===== */

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
  max-width: 1440px !important;
  margin: 0 auto !important;
  padding: 0 24px !important;
  z-index: 1;
}

html body #root .home-page .hero-visual {
  position: relative !important;
  display: block !important;
  width: 100% !important;
  margin: 0 !important;
  animation: none !important;
}

/* ===== STATIC IMAGE FRAME ===== */

html body #root .home-page .hero-video-frame {
  position: relative !important;
  display: block !important;
  width: 100% !important;
  max-width: none !important;
  height: clamp(480px, 43vw, 620px) !important;
  min-height: 460px !important;
  margin: 0 !important;
  padding: 0 !important;
  overflow: hidden !important;
  aspect-ratio: auto !important;
  background: #1F3A5C !important;
  border: 0 !important;
  border-radius: 0 !important;
  box-shadow: none !important;
}

/* Image fills the hero frame without becoming a carousel. */

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
  z-index: 0;
}

/* Subtle contrast blended into the image.
   This is not a separate card or text panel. */

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
    rgba(31, 58, 92, 0.02) 34%,
    rgba(31, 58, 92, 0.36) 49%,
    rgba(31, 58, 92, 0.78) 66%,
    #1F3A5C 100%
  ) !important;
}

/* ===== HERO COPY — OVER IMAGE ON DESKTOP ===== */

html body #root .home-page .hero-content {
  position: absolute !important;
  top: 50% !important;
  right: clamp(24px, 5.5vw, 76px) !important;
  bottom: auto !important;
  left: auto !important;
  z-index: 2 !important;
  display: block !important;
  width: min(43%, 560px) !important;
  max-width: 560px !important;
  min-width: 0 !important;
  margin: 0 !important;
  padding: 24px 0 !important;
  transform: translateY(-50%) !important;
  text-align: left !important;
  animation: none !important;
  background: transparent !important;
  border: 0 !important;
  border-radius: 0 !important;
  box-shadow: none !important;
}

/* Approved brand descriptor */

html body #root .home-page .hero-title::before {
  content: "PACKAGING & FOOD-SERVICE SUPPLIES";
  display: block;
  margin: 0 0 16px;
  color: #E67E22;
  font-size: 12px;
  font-weight: 700;
  line-height: 1.5;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}

/* Approved headline */

html body #root .home-page .hero-title {
  margin: 0 0 18px !important;
  color: #FFFFFF !important;
  font-size: clamp(34px, 3.8vw, 54px) !important;
  font-weight: 750 !important;
  line-height: 1.1 !important;
  letter-spacing: -0.8px !important;
  overflow-wrap: break-word;
  text-wrap: balance;
}

/* Approved description */

html body #root .home-page .hero-description {
  max-width: 500px !important;
  margin: 0 0 26px !important;
  color: rgba(255, 255, 255, 0.96) !important;
  font-size: clamp(16px, 1.35vw, 19px) !important;
  line-height: 1.6 !important;
}

/* ===== HERO BUTTONS ===== */

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

/* ===== TABLET ===== */

@media (min-width: 768px) and (max-width: 1023px) {
  html body #root .home-page .hero-container {
    padding: 0 16px !important;
  }

  html body #root .home-page .hero-video-frame {
    height: 480px !important;
    min-height: 460px !important;
  }

  html body #root .home-page .hero-video {
    object-position: left center !important;
  }

  html body #root .home-page .hero-video-frame::after {
    background: linear-gradient(
      90deg,
      rgba(31, 58, 92, 0) 0%,
      rgba(31, 58, 92, 0.15) 30%,
      rgba(31, 58, 92, 0.7) 53%,
      #1F3A5C 100%
    ) !important;
  }

  html body #root .home-page .hero-content {
    right: 24px !important;
    width: 48% !important;
    padding: 20px 0 !important;
  }

  html body #root .home-page .hero-title {
    font-size: clamp(30px, 4vw, 40px) !important;
  }

  html body #root .home-page .hero-title::before {
    margin-bottom: 12px;
    font-size: 10px;
    letter-spacing: 1.2px;
  }

  html body #root .home-page .hero-description {
    margin-bottom: 20px !important;
    font-size: 16px !important;
  }

  html body #root .home-page .hero-actions {
    flex-direction: column !important;
    align-items: flex-start !important;
  }

  html body #root .home-page .hero-button,
  html body #root .home-page .hero-button-primary,
  html body #root .home-page .hero-button-secondary {
    max-width: 100% !important;
  }
}

/* ===== MOBILE =====
   Full-width image first, copy directly underneath.
   Both areas share the same flat navy background.
   No card, separate panel, or extra background. */

@media (max-width: 767px) {
  html body #root .home-page .hero {
    padding: 0 !important;
  }

  html body #root .home-page .hero-container {
    width: 100% !important;
    max-width: none !important;
    padding: 0 !important;
  }

  html body #root .home-page .hero-video-frame {
    display: flex !important;
    flex-direction: column !important;
    width: 100% !important;
    height: auto !important;
    min-height: 0 !important;
    overflow: hidden !important;
  }

  html body #root .home-page .hero-video-frame::after {
    display: none !important;
    content: none !important;
  }

  html body #root .home-page .hero-video {
    position: relative !important;
    inset: auto !important;
    display: block !important;
    flex: 0 0 auto !important;
    width: 100% !important;
    height: clamp(250px, 72vw, 390px) !important;
    min-height: 0 !important;
    max-height: none !important;
    padding: 10px 12px 0 !important;
    object-fit: contain !important;
    object-position: center center !important;
  }

  html body #root .home-page .hero-content {
    position: relative !important;
    top: auto !important;
    right: auto !important;
    bottom: auto !important;
    left: auto !important;
    display: block !important;
    width: 100% !important;
    max-width: none !important;
    min-width: 0 !important;
    margin: 0 !important;
    padding: 18px 20px 30px !important;
    transform: none !important;
    text-align: left !important;
    background: transparent !important;
    border: 0 !important;
    border-radius: 0 !important;
    box-shadow: none !important;
  }

  html body #root .home-page .hero-title::before {
    margin-bottom: 10px;
    font-size: 10px;
    letter-spacing: 1.2px;
  }

  html body #root .home-page .hero-title {
    margin-bottom: 12px !important;
    font-size: clamp(28px, 7vw, 37px) !important;
    line-height: 1.12 !important;
    letter-spacing: -0.5px !important;
  }

  html body #root .home-page .hero-description {
    max-width: 560px !important;
    margin-bottom: 20px !important;
    font-size: 15px !important;
    line-height: 1.55 !important;
  }

  html body #root .home-page .hero-actions {
    flex-direction: column !important;
    align-items: stretch !important;
    gap: 10px !important;
    width: 100% !important;
  }

  html body #root .home-page .hero-button,
  html body #root .home-page .hero-button-primary,
  html body #root .home-page .hero-button-secondary {
    width: 100% !important;
    min-width: 0 !important;
    max-width: none !important;
    min-height: 48px !important;
    padding: 12px 16px !important;
    font-size: 14px !important;
  }
}

/* ===== VERY SMALL PHONES ===== */

@media (max-width: 360px) {
  html body #root .home-page .hero-video {
    height: 245px !important;
    padding-right: 8px !important;
    padding-left: 8px !important;
  }

  html body #root .home-page .hero-content {
    padding: 16px 16px 26px !important;
  }

  html body #root .home-page .hero-title {
    font-size: 27px !important;
  }

  html body #root .home-page .hero-title::before {
    font-size: 9px;
    letter-spacing: 1px;
  }

  html body #root .home-page .hero-description {
    font-size: 14px !important;
  }
}

/* ===== ACCESSIBILITY ===== */

@media (prefers-reduced-motion: reduce) {
  html body #root .home-page .hero-content,
  html body #root .home-page .hero-visual,
  html body #root .home-page .hero-button,
  html body #root .home-page .button-arrow {
    animation: none !important;
    transition: none !important;
  }
}
