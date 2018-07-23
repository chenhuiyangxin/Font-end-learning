/*
* 简单工厂模式
* */
// 收取现金抽象类，传参是原价，返回值是应付价格
class CashIn {
    constructor(money){
        this.money = money;
    }

    pay(){
        return this.money;
    }
}

// 正常收费子类
class CashNormal extends CashIn{
    constructor(money){
        super(money);
    }

}

// 打折类
class CashDiscount extends CashIn{
    constructor(money,discount){
        super(money);
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
    }

    switchType(){
        switch(this.type){
            case '正常收费':
                this.cashMethod = new CashNormal();
                break;
            case '打折':
                
        }
    }


}



let cash = new CashDiscount(12,0.75);
cash.pay();