export default class Person {
    Id?: string;
    FullName: string;
    Address: string;
    Age: number;

    constructor(id: string, fullname: string, address: string, age: number){
        this.Id = id;
        this.FullName = fullname;
        this.Address = address;
        this.Age = age;
    }
}