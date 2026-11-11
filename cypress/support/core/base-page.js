import { dismissAdOverlay } from './ad-overlay';

/**
 * Base class every page object extends. Cypress has no `page` instance to
 * hold (commands run against the global `cy`), so this is lighter than
 * Playwright's BasePage, but the contract is the same: `path` / `open()` /
 * `waitForLoaded()` — see demoqa-playwright-framework's docs/ARCHITECTURE.md
 * §4, which this mirrors.
 */
export class BasePage {
  /** The page's URL, relative to baseUrl. Subclasses set this. */
  get path() {
    throw new Error('Page object must define a `path` getter.');
  }

  /** Confirms the page has actually finished rendering, anchored on that
   * page's own elements. Subclasses must override this. */
  waitForLoaded() {
    throw new Error('Page object must implement waitForLoaded().');
  }

  /** Navigates to the page, clears DemoQA's ad overlay if present, and waits
   * until the page is ready to interact with. Specs call this, never
   * `cy.visit()` directly. */
  open() {
    cy.visit(this.path);
    dismissAdOverlay();
    this.waitForLoaded();
    return this;
  }
}
