/*
* 装饰模式
* */
class Person {
    constructor(name){
        this.name = name;
    }
}

class Decorate extends Person {
    constructor(name){
        super(name);
        this.show = null;
    }
    decorating(instance){
        if(instance.show !== null){
            this.show = instance.show;
        }
    }
    Show(){
        if(this.show !== null){
            this.show();
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