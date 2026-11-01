/**
 * MY_JANNE Signature First-Visit Cinematic Welcome Experience
 * Manages first-visit detection, cinematic reveal, skip controls,
 * and reduced-motion compliance.
 */

(function () {
  const SESSION_KEY = 'my_janne_welcome_seen';

  function initWelcome() {
    const overlay = document.getElementById('welcomeOverlay');
    if (!overlay) return;

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      overlay.style.display = 'none';
      return;
    }

    // Check if already seen in current browsing session
    const hasSeen = sessionStorage.getItem(SESSION_KEY);
    if (hasSeen) {
      overlay.style.display = 'none';
      return;
    }

    // First visit: run intro
    runWelcomeAnimation(overlay);
  }

  function runWelcomeAnimation(overlay) {
    overlay.style.display = 'flex';
    overlay.classList.remove('fade-out');

    // Auto-advance timer (4.2 seconds)
    const timer = setTimeout(() => {
      dismissWelcome(overlay);
    }, 4200);

    // Skip button
    const skipBtn = document.getElementById('welcomeSkipBtn');
    if (skipBtn) {
      skipBtn.addEventListener('click', () => {
        clearTimeout(timer);
        dismissWelcome(overlay);
      });
    }

    // ESC key to dismiss
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        clearTimeout(timer);
        dismissWelcome(overlay);
        window.removeEventListener('keydown', handleKeyDown);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Image fallback handling
    const welcomeImg = document.getElementById('welcomeAvatarImg');
    const fallbackAvatar = document.getElementById('welcomeFallbackAvatar');
    if (welcomeImg && fallbackAvatar) {
      welcomeImg.onerror = () => {
        welcomeImg.style.display = 'none';
        fallbackAvatar.style.display = 'flex';
      };
    }
  }

  function dismissWelcome(overlay) {
    overlay.classList.add('fade-out');
    sessionStorage.setItem(SESSION_KEY, 'true');
    setTimeout(() => {
      overlay.style.display = 'none';
    }, 900);
  }

  // Public trigger to replay anytime from footer
  window.replayWelcomeIntro = function () {
    const overlay = document.getElementById('welcomeOverlay');
    if (!overlay) return;
    overlay.classList.remove('fade-out');
    runWelcomeAnimation(overlay);
  };

  document.addEventListener('DOMContentLoaded', initWelcome);
})();
