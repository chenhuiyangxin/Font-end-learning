## 关于this

### 为什么要用this

我们来看一个栗子

```javascript

function foo(){
	return this.name;
};

var me = {
	name: "lilei"
};
var you = {
	name: "hanmeimei"
}

foo.call(me);//lilei
foo.call(you);//hanmeimei

```

函数foo()在不同的上下文对象中会返回不同的值，如果不使用this，就要显式的传入一个上下文，就像这样

```javascript

function foo(context){
	return context.name;
};
foo(me);//lilei

```

所以this提供了一种更加优雅的方式“隐式”的传入一个对象引用，这么做的好处是当代码的模式、规模越来越复杂    
时，显式的传入上下文对象会让代码更加混乱

### this的误解--指向自身

















