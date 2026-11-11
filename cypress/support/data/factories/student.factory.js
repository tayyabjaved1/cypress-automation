import { CommonGenerator as gen } from '../generators/common.generator';
import { UserFactory } from './user.factory';

export class StudentFactory {
  /** @param overrides fields to override on the generated record */
  static create(overrides = {}) {
    const user = UserFactory.create();
    const birth = gen.date();
    return {
      ...user,
      gender: gen.pick(['Male', 'Female', 'Other']),
      mobile: gen.phone(),
      dateOfBirth: `${birth.getDate()} ${birth.toLocaleString('en-US', { month: 'short' })} ${birth.getFullYear()}`,
      subjects: [gen.pick(['Maths', 'English', 'Physics', 'Chemistry', 'Computer Science'])],
      hobbies: [gen.pick(['Sports', 'Reading', 'Music'])],
      address: gen.address(), state: 'NCR', city: 'Delhi',
      ...overrides,
    };
  }
}
