/**
 * Best-effort removal of DemoQA's ad banner/iframes, which can overlap page
 * content and intercept clicks — the same known quirk documented in
 * demoqa-playwright-framework's docs/ARCHITECTURE.md §5a. Incidental cleanup
 * only; never use it to verify behaviour under test.
 */
export function dismissAdOverlay() {
  cy.window({ log: false }).then((win) => {
    win.document.getElementById('fixedban')?.remove();
    win.document.querySelectorAll('iframe[id^="google_ads"]').forEach((el) => el.remove());
  });
}
