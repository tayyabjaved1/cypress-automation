import { faker } from '@faker-js/faker';

/** Shared runtime-data primitives. Every call returns a fresh value — callers never reuse one across records. */
export class CommonGenerator {
  static firstName() { return faker.person.firstName(); }
  static lastName() { return faker.person.lastName(); }
  static fullName() { return `${this.firstName()} ${this.lastName()}`; }
  static id() { return faker.string.uuid(); }
  static username() { return `qe_${faker.string.alphanumeric(10).toLowerCase()}`; }
  static email() { return faker.internet.email({ provider: 'example.com' }).toLowerCase(); }
  static password() { return `${faker.internet.password({ length: 10 })}1!`; }
  static phone() { return faker.string.numeric(10); }
  static address() { return faker.location.streetAddress(); }

  /** @param options the values to pick one from */
  static pick(options) { return faker.helpers.arrayElement(options); }

  static date() { return faker.date.birthdate(); }
}
