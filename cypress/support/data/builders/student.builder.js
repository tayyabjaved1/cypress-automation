import { StudentFactory } from '../factories/student.factory';

/** Fluent builder for scenario-specific data without creating one factory per scenario. */
export class StudentBuilder {
  constructor() { this.data = {}; }
  withGender(gender) { this.data.gender = gender; return this; }
  fromLocation(state, city) { this.data.state = state; this.data.city = city; return this; }
  withSubjects(...subjects) { this.data.subjects = subjects; return this; }
  build() { return StudentFactory.create(this.data); }
}
