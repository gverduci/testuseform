// create a class Person with the same fields as personSlice
export class Person {
  constructor(name, secondaryName, surname, email, title, notes, birthday) {
    this.name = name;
    this.secondaryName = secondaryName;
    this.surname = surname;
    this.email = email;
    this.title = title;
    this.notes = notes;
    this.birthday = birthday;
  }

  // create a method to get the inistial state
  static get initialState() {
    return {
        name: '',
        secondaryName: '',
        surname: '',
        email: '',
        title: '',
        notes: '',
        birthday: '',
    };
  }

  // create a method to seraialize the data into a json object
    serialize() {
        return {
        name: this.name,
        secondaryName: this.secondaryName,
        surname: this.surname,
        email: this.email,
        title: this.title,
        notes: this.notes,
        birthday: this.birthday,
        };
    }

    // create a method to deserialize the data from a json object
    static deserialize(json) {
        return new Person(
            json.name,
            json.secondaryName,
            json.surname,
            json.email,
            json.title,
            json.notes,
            json.birthday
        );
    }

    // create a method to compare two Person objects
    static areEqual(a, b) {
        if (a.name === b.name &&
            a.secondaryName === b.secondaryName &&
            a.surname === b.surname &&
            a.email === b.email &&
            a.title === b.title &&
            a.notes === b.notes &&
            a.birthday === b.birthday) {
            return true;
        }
        return false;
    }
}
