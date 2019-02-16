class Person {
    constructor(name){
        this.name = name;
    }
    getGretting() {
        //return 'Hi' + this.name;
        return `Hi ${ this.name }`;
    }
}

class Student extends Person {
    constructor(name, major){
        super(name);
        this.major = major;
    }
    hasMajor(){
        return !!this.major; //pq se for vazio, ele retorna undefined, e !!undefined = false
    }
    getGretting() {
        return `Motherfuckiiing ${this.name}`;
    }
}

const me = new Student('brunao', 'bcc');
console.log(me.getGretting());