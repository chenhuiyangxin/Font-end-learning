/*
* 简单工厂模式
* */
// 收取现金抽象类，传参是原价，返回值是应付价格
class CashIn {
    constructor(){
        this.money = null;
    }

    accept(money){
        this.money = money;
    }

    pay(){
        return this.money;
    }
}

// 正常收费子类
class CashNormal extends CashIn{
    constructor(){
        super();
    }

}

// 打折类
class CashDiscount extends CashIn{
    constructor(discount){
        super();
        this.discount = discount;
        this.doDiscount();
    }
    doDiscount(){
        this.money = (this.money * this.discount).toFixed(2);
    }
}

//工厂类
class CashFactory {
    constructor(type){
        this.type = type;
        this.cashMethod = null;
        this.switchType();
    }

    switchType(){
        switch(this.type){
            case '正常收费':
                this.cashMethod = new CashNormal();
                break;
            case '打5折':
                this.cashMethod = new CashDiscount(5);
                break;
        }

    }
}

// 根据用户交互使用
let cashier = new CashFactory(document.getElementById("select").value);
cashier.cashMethod.accept(document.getElementById("moneyInput").value);
cashier.cashMethod.pay();

/*
* 策略模式结合简单工厂模式
* */
class cashContext {
    constructor(type){
        this.cashfactory = new CashFactory(type);
    }
    getResult(money){
        this.cashfactory.cashMethod.accept(money);
        return this.cashfactory.cashMethod.pay();
    }

}

// 用户使用
let cashier2 = new cashContext(document.getElementById("select").value);
cashier2.getResult(document.getElementById("moneyInput").value);