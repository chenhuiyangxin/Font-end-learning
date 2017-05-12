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

从英语的语法来讲，this指向函数自身是说得通的，很多人也是误认为此，但实际情况并非如此，看一个栗子

```javascript

function foo(){
	return this.name;
};
foo.name = "haha";
foo();//undefined

```

我们可以看到this并没有指向函数本身，因此我们要从一个函数内部引用自身使用this是不行的

如果是一个具名函数，可以在函数内部通过函数的标识符来引用自身，比如在递归的时候    
如果是匿名函数的话就无法引用自身了（原本有一个方法，但是已被弃用）

### this的误解--指向函数的作用域

第二种常见的误解，this指向函数的作用域，这在某些情况下之正确的，但是正确并不是因为指向函数作用域成立

可以明确地指出，this在任何情况下都不指向函数的词法作用域，我们看一个栗子

```javascript

function foo(){
	var a = 1;
	this.baz();
};

function baz(){
	console.log(this.a);
};

foo();//ReferenceError: a is not defined

```

这是个经典的反例，第一步this.baz()调用成功了，这只是个巧合，下一章会介绍为什么会成功    
之后这段代码试图通过this来访问到foo()内部的变量，这是不可能实现的

只要把this跟词法作用域的查找混淆起来使用时，就是不可能实现的

### this到底是什么

this是在运行时绑定的，而不是在编写是绑定的，它的上下文取决于函数调用时的各种条件。

this的绑定和函数声明的位置没有任何关系，只取决于函数的调用方式

当一个函数被调用时，会创建一个活动记录（有时被称为执行上下文）。这个记录会包含函数的调用栈、调用   
方式、传入的参数等信息。this就是这个记录的一个属性，会在函数执行的过程中用到。



















