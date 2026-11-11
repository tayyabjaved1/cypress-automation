import { CommonGenerator as gen } from '../generators/common.generator';

export class FormFactory {
  /** @param overrides fields to override on the generated record */
  static textBox(overrides = {}) {
    return {
      fullName: gen.fullName(), email: gen.email(),
      currentAddress: gen.address(), permanentAddress: gen.address(),
      ...overrides,
    };
  }
}
