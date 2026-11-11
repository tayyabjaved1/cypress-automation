import { BookStoreClient } from '../../support/api/bookstore.client';
import { UserFactory } from '../../support/data/factories/user.factory';
import { BookFactory } from '../../support/data/factories/book.factory';

describe('Book Store - API', () => {
  const client = new BookStoreClient(Cypress.expose('API_BASE_URL'));
  let account;

  beforeEach(() => {
    cy.log('**Data preparation**: create a disposable Book Store account');
    return client.createAccount(UserFactory.bookstoreUser()).then((created) => {
      account = created;
    });
  });

  afterEach(() => {
    if (!account) return;
    cy.log('**Cleanup**: delete the disposable account');
    client.deleteAccount(account);
  });

  it('creates a unique user, adds a catalog book and verifies the collection', { tags: ['@api', '@regression'] }, () => {
    const book = BookFactory.first();

    cy.log('**Add the catalog book to the account**');
    client.addBook(account, book.isbn);

    cy.log('**Verify the book appears in the account collection**');
    client.getBooks(account).then((collection) => {
      expect(collection.books.map((item) => item.isbn)).to.include(book.isbn);
    });
  });
});
