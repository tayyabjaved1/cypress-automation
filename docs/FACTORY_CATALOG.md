# Factory Catalog

| Factory | File | Produces | Uniqueness guarantee |
|---|---|---|---|
| `UserFactory` | `cypress/support/data/factories/user.factory.js` | A user record (username/password/role) | `CommonGenerator.username()`/`email()` |
| `StudentFactory` | `cypress/support/data/factories/student.factory.js` | A Practice Form student profile | Fresh Faker name + `UserFactory`'s unique email/username per call |
| `FormFactory` | `cypress/support/data/factories/form.factory.js` | A Text Box submission (name/email/addresses) | Fresh Faker values per call |
| `BookFactory` | `cypress/support/data/factories/book.factory.js` | A Book Store catalog entry | N/A — DemoQA's catalog is fixed; selects known valid ISBNs |

Add a row here in the same change that adds or removes a factory (see
`docs/DOCUMENTATION_POLICY.md`).
