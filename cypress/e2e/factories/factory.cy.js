import { UserFactory } from '../../support/data/factories/user.factory';
import { StudentFactory } from '../../support/data/factories/student.factory';
import { StudentBuilder } from '../../support/data/builders/student.builder';

describe('Data Factory Engine', () => {
  it('creates unique runtime user data', { tags: ['@regression'] }, () => {
    const first = UserFactory.create();
    const second = UserFactory.create();
    expect(first.email).not.to.equal(second.email);
    expect(first.username).not.to.equal(second.username);
    expect(first.id).not.to.equal(second.id);
  });

  it('supports role presets and scenario overrides', { tags: ['@regression'] }, () => {
    const admin = UserFactory.admin();
    const student = StudentFactory.create({ gender: 'Female', city: 'Lahore' });
    expect(admin.role).to.equal('admin');
    expect(student.gender).to.equal('Female');
    expect(student.city).to.equal('Lahore');
  });

  it('builds scenario data fluently', { tags: ['@regression'] }, () => {
    const student = new StudentBuilder()
      .withGender('Other')
      .fromLocation('Punjab', 'Lahore')
      .withSubjects('Maths', 'Computer Science')
      .build();
    expect(student.gender).to.equal('Other');
    expect(student.city).to.equal('Lahore');
    expect(student.subjects).to.deep.equal(['Maths', 'Computer Science']);
  });
});
