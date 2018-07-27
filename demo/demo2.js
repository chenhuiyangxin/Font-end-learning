/*
* 装饰模式
* */
class Person {
    constructor(name){
        this.name = name;
    }
    show(){
        console.log(this.name+"今天穿：");
    }
}

class Decorate extends Person {
    constructor(name){
        super(name);
        this._show = null;
        this.instance =  null;
    }
    decorating(instance){
        if(instance.show){
            this._show = instance.show;
            this.instance =  instance;
        }
    }
    Show(){
        if(this._show !== null){
            this._show.call(this.instance);
        }
    }
}

class BigCha extends Decorate {
    constructor(name){
        super(name);
    }
    show(){
        this.Show();
        console.log("大裤衩");
    }
}

class Tie extends Decorate {
    constructor(name){
        super(name);
    }
    show(){
        this.Show();
        console.log("领带");
    }
}

let person = new Person("cx");
let bigcha = new BigCha();
let tie = new Tie();
bigcha.decorating(person);
tie.decorating(bigcha);
tie.show();
