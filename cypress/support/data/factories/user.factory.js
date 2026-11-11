import { CommonGenerator as gen } from '../generators/common.generator';

export class UserFactory {
  /** @param overrides fields to override on the generated record
   * @param role the role to assign; defaults to 'student' */
  static create(overrides = {}, role = 'student') {
    return {
      id: gen.id(), firstName: gen.firstName(), lastName: gen.lastName(),
      username: gen.username(), email: gen.email(), password: gen.password(), role,
      ...overrides,
    };
  }

  static admin(overrides = {}) {
    return this.create({ role: 'admin', ...overrides }, 'admin');
  }

  static bookstoreUser(overrides = {}) {
    return this.create(overrides, 'bookstore-user');
  }
}
