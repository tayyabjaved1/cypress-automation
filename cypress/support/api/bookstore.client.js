/**
 * API client for DemoQA's Book Store. Cypress idiom: every method returns the
 * `cy.request(...)` chain (never `async`/`await` — Cypress commands are
 * queued, not promises), so callers `.then()` to use the result, same as any
 * other cy command.
 */
export class BookStoreClient {
  /** @param baseUrl the API base URL (DemoQA's API shares its web origin) */
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  /** @param user the account credentials to create; only username/password are sent */
  createAccount(user) {
    return cy.request({
      method: 'POST',
      url: `${this.baseUrl}/Account/v1/User`,
      body: { userName: user.username, password: user.password },
      failOnStatusCode: false,
    }).then((createRes) => {
      if (createRes.status < 200 || createRes.status >= 300) {
        throw new Error(`DemoQA account creation failed (${createRes.status}): ${JSON.stringify(createRes.body)}`);
      }
      return cy.request({
        method: 'POST',
        url: `${this.baseUrl}/Account/v1/GenerateToken`,
        body: { userName: user.username, password: user.password },
        failOnStatusCode: false,
      }).then((tokenRes) => {
        if (!tokenRes.body?.token) {
          throw new Error(`DemoQA did not return an auth token: ${JSON.stringify(tokenRes.body)}`);
        }
        return { userId: createRes.body.userID, token: tokenRes.body.token, user };
      });
    });
  }

  /** @param account the account returned by createAccount()
   * @param isbn the catalog ISBN to add */
  addBook(account, isbn) {
    return cy.request({
      method: 'POST',
      url: `${this.baseUrl}/BookStore/v1/Books`,
      headers: { Authorization: `Bearer ${account.token}` },
      body: { userId: account.userId, collectionOfIsbns: [{ isbn }] },
      failOnStatusCode: false,
    }).then((res) => {
      if (res.status < 200 || res.status >= 300) {
        throw new Error(`Adding book failed (${res.status}): ${JSON.stringify(res.body)}`);
      }
      return res.body;
    });
  }

  /** @param account the account returned by createAccount() */
  getBooks(account) {
    return cy.request({
      method: 'GET',
      url: `${this.baseUrl}/BookStore/v1/Books?UserId=${account.userId}`,
      headers: { Authorization: `Bearer ${account.token}` },
      failOnStatusCode: false,
    }).then((res) => {
      if (res.status < 200 || res.status >= 300) {
        throw new Error(`Fetching book collection failed (${res.status}): ${JSON.stringify(res.body)}`);
      }
      return res.body;
    });
  }

  /** @param account the account to delete */
  deleteAccount(account) {
    return cy.request({
      method: 'DELETE',
      url: `${this.baseUrl}/Account/v1/User/${account.userId}`,
      headers: { Authorization: `Bearer ${account.token}` },
      failOnStatusCode: false,
    }).then((res) => {
      // 404 can mean the account has already been removed; other errors should be visible.
      if (res.status !== 404 && (res.status < 200 || res.status >= 300)) {
        throw new Error(`Account cleanup failed (${res.status}): ${JSON.stringify(res.body)}`);
      }
    });
  }
}
