import { expect } from 'expect';
import { Person } from '../../models/person';

function isPerson(a) {
  return a instanceof Person;
}
/**
 * this function is used to customize the equality test for Person objects
 * 
 * @param {*} a   the first object to compare
 * @param {*} b   the second object to compare
 * @returns   true if the objects are equal, false if they are not equal, undefined if the comparison cannot be performed for the Person class
 */
function arePersonsEqual(a, b) {
  const isAPerson = isPerson(a)
  const isBPerson = isPerson(b)

  if (isAPerson && isBPerson)
    return Person.areEqual(a, b)

  else if (isAPerson === isBPerson)
    return undefined

  else
    return false
}



describe('Person', () => {
  let person;

  beforeAll(() => {
    // eslint-disable-next-line no-undef, no-unused-expressions
    globalThis[Symbol.for('$$jest-matchers-object')].customEqualityTesters= [];
    expect.addEqualityTesters([arePersonsEqual]);
  });

  beforeEach(() => {
    person = new Person(
      'John',
      'Doe',
      'Smith',
      'john.doe@example.com',
      'Mr.',
      'Some notes',
      '1990-01-01'
    );
  });

  test('should create a new Person object', () => {
    expect(person).toBeInstanceOf(Person);
    expect(person.name).toBe('John');
    expect(person.secondaryName).toBe('Doe');
    expect(person.surname).toBe('Smith');
    expect(person.email).toBe('john.doe@example.com');
    expect(person.title).toBe('Mr.');
    expect(person.notes).toBe('Some notes');
    expect(person.birthday).toBe('1990-01-01');
  });

  test('should return the initial state', () => {
    const initialState = Person.initialState;
    expect(initialState).toEqual({
      name: '',
      secondaryName: '',
      surname: '',
      email: '',
      title: '',
      notes: '',
      birthday: '',
    });
  });

  test('should serialize the data into a JSON object', () => {
    jest.spyOn(person, "serialize")
    const serializedData = person.serialize();
    expect(serializedData).toEqual({
      name: 'John',
      secondaryName: 'Doe',
      surname: 'Smith',
      email: 'john.doe@example.com',
      title: 'Mr.',
      notes: 'Some notes',
      birthday: '1990-01-01',
    });
    expect(person.serialize).toHaveBeenCalledTimes(1);
  });

  test('should deserialize the data from a JSON object', () => {
    const jsonData = {
      name: 'John',
      secondaryName: 'Doe',
      surname: 'Smith',
      email: 'john.doe@example.com',
      title: 'Mr.',
      notes: 'Some notes',
      birthday: '1990-01-01',
    };
    const deserializedPerson = Person.deserialize(jsonData);
    expect(deserializedPerson).toBeInstanceOf(Person);
    expect(deserializedPerson.name).toBe('John');
    expect(deserializedPerson.secondaryName).toBe('Doe');
    expect(deserializedPerson.surname).toBe('Smith');
    expect(deserializedPerson.email).toBe('john.doe@example.com');
    expect(deserializedPerson.title).toBe('Mr.');
    expect(deserializedPerson.notes).toBe('Some notes');
    expect(deserializedPerson.birthday).toBe('1990-01-01');
  });

  test('should compare two Person objects', () => {
    const person1 = new Person(
      'John',
      'Doe',
      'Smith',
      'john.doe@example.com',
      'Mr.',
      'Some notes',
      '1990-01-01'
    );
    const person2 = new Person(
      'John',
      'Doe',
      'Smith',
      'john.doe@example.com',
      'Mr.',
      'Some notes',
      '1990-01-01'
    );
    const person3 = new Person(
      'Jane',
      'Doe',
      'Smith',
      'jane.doe@example.com',
      'Ms.',
      'Some other notes',
      '1990-01-01'
    );

    expect(Person.areEqual(person1, person2)).toBe(true);
    expect(Person.areEqual(person1, person3)).toBe(false);
    expect(person1).toEqual(person2);
    expect(person1).not.toEqual(person3);
  });
});