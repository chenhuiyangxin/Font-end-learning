## this全面解析

### 调用位置

要理解this的绑定过程，必须要理解调用位置，这并不容易，因为某些编程方式会隐藏真正的调用位置

最重要的是要分析调用栈，我们关心的调用位置就在当前正在执行的函数的前一个调用中，来看一个栗子

```javascript
function baz(){
	// 当前的调用栈是：baz
	// 因此，当前调用位置是全局作用域

	console.log("baz");
	bar(); // <-- bar的调用位置
}

function bar(){
	// 当前的调用栈是：baz -> bar
	// 因此，当前的调用位置是在baz中

	console.log("bar");
	foo(); // <-- foo的调用位置
}

function foo(){
	// 当前的调用栈是：baz -> bar -> foo
	// 因此，当前的调用位置是在bar中

	console.log("foo");
}
baz() // <-- baz的调用位置
```

### 绑定规则

调用位置决定this的绑定对象要遵循一定的规则

#### 默认绑定

这是最常用的函数调用类型：独立函数调用，通常作为无法应用其他规则的时候的默认规则

```javascript
function foo(){
	console.log(this.a);
}
var a = 2;
foo();//2
```
此处foo不带任何修饰的函数引用进行调用的，因此为默认绑定，指向全局对象

当在严格模式下，this会绑定到undefined

#### 隐式绑定

这条规则考虑调用位置是否有上下文对象，或者说被某个对象拥有或者包含

```javascript
function foo(){
	console.log(this.a);
}
var obj1 = {
	a: 2,
	foo: foo
};
obj1.foo();//2
```

严格来说foo函数并不属于obj1对象，调用位置会使用obj1上下文来引用函数，所以可以说函数被调用    
时obj1“拥有”或者“包含”它

##### 绑定丢失

被隐式绑定的函数会丢失绑定对象，从而把this绑定到全局对象或者undefined上，如下代码

```javascript
function foo(){
    console.log(this.a);
}
var obj = {
    a:2,
    foo:foo
};
var bar = obj.foo;
var a = "i am global's a";
bar(); // "i am global's a"
```
虽然`bar`是`obj.foo`的一个引用，但实际上它引用的是`foo`函数本身。还有一种更微妙、更出乎意料的情况

```javascript
function foo(){
    console.log(this.a);
}
function doFoo(fn){
    fn();
}
var obj = {
    a:1,
    foo:foo
};
var a = "i am global's a";
doFoo(obj.foo); //"i am global's a"
```
这里发生绑定丢失的原因是，参数传递本身就是一种隐式赋值，所以结果跟上面赋值给一个全局变量一样的后果

#### 显式绑定

简单来说就是`call()`和`apply()`两个方法，他们第一个参数传入一个对象，用来显式的绑定this

##### 硬绑定

我们直接看最后一种形态就行了

```javascript
function foo(something){
    console.log(this.a,something);
    return this.a + something;
}
function bind(fn,obj){
    return function(){
        return fn.apply(obj,arguments);
    };
}
var obj = {
    a:2
};
var baz = bind(foo,obj);
var b = baz(3); //2 3
console.log(b); //5
```
这其实就是bind函数，ES5已经将它作为了一个内置的方法

##### new绑定

在传统的面向类的语言中，构造函数是类中的一些特殊方法，使用new初始化类时会调用类中的构造函数   
但javascript中的new机制完全不同

在JavaScript中，构造函数只是一些使用new操作符时被调用的函数。他们并不会属于某个类，也不会实例化一个类   
它们就是被new操作符调用的普通函数而已

所以javascript中并不存在构造函数，只有对于函数的构造调用

使用new来调用函数，会自动执行下面的操作

1. 创建（或者说构造）一个全新的对象
2. 这个新对象会被执行[[Prototype]]连接
3. 这个新对象会被绑定到函数调用的this
4. 如果函数没有返回其它对象，那么new表达式中的函数调用会自动返回这个新对象

new是最后一种可以影响函数调用时this绑定行为的方法

#### 优先级

我们已经看完函数调用中this绑定的四条规则，如果在某个调用位置应用了多条规则怎么判断呢？   

先来看下隐式绑定跟显式绑定哪个优先级更高

```javascript
function foo(){
    console.log(this.a);
}
var obj1 = {
    a:1,
    foo:foo
};
var obj2 = {
    a:2,
    foo:foo
};

obj1.foo(); //1
obj2.foo(); //2

obj1.foo.call(obj2); //2
obj2.foo.call(obj1); //1
```
很明显看到显式绑定优先级要高于隐式绑定

再看下隐式绑定跟new绑定那个优先级更高

```javascript
function foo(something){
    this.a = something;
}
var obj1 = {
    foo:foo
};
var obj2 = {};

obj1.foo(2);
console.log(obj1.a); //2

obj1.foo.call(obj2,3);
console.log(obj2.a); //3

var bar = new obj1.foo(4);
console.log(obj1.a); //2
console.log(bar.a); //4
```
我们可以看到new绑定的优先级是比隐式绑定高的

那么，new绑定跟显式绑定哪个优先级高呢？

```javascript
function foo(something){
    this.a = something;
};

var obj1 = {};
var bar = foo.bind(obj1);
bar(2);
console.log(obj1.a); // 2

var baz = new bar(3);
console.log(obj1.a); // 2
console.log(baz.a); // 3
```

结果出乎意料，`new bar(3)`并没有像我们预计的那样将`obj1.a`修改为3

通过bind的实现我们知道，它先会判断硬绑定函数是否被new调用，如果是的话就会使用新创建的this替换硬绑定的this

我们之所以要在new中使用硬绑定函数，主要目的就是预先设置函数的一些参数，比如像这样

```javascript
function foo(p1,p2){
    this.val = p1 + p2;
};

var bar = foo.bind(null,"p1");
var baz = new bar("p2");
console.log(baz.val); // p1p2
```

#### 判断this

现在我们可以通过优先级来判断函数在某个调用位置应用的是哪一条规则了

1. 函数是否在new中调用（new绑定）？如果是this绑定的就是创建的新对象
2. 函数是否通过call,apply（显式绑定）或者硬绑定调用？如果是，this绑定的就是指定的对象
3. 函数是否在某个上下文对象中调用（隐式绑定）？如果是，this绑定是那个上下文对象
4. 如果都不是，使用默认绑定。如果在严格模式下，绑定到undefined，否则就绑定到全局对象

#### 绑定例外

某些场景下this的绑定实际上可能应用的是默认绑定

##### 被忽略的this

如果你把undefined或者null作为this的绑定对象传入call,apply或者bind，这些值在调用是会被忽略，实际应用的是默认绑定

```javascript
function foo(){
    console.log(this.a);
}
var a = 2;
foo.call(null); // 2
```
那我们什么时候需要传null呢？   
当我们需要用apply展开一个数组的时候，我们不希望指定this绑定的对象，这时传一个null就行了，还有就是用bind()对参数进行柯里化时

```javascript
function foo(a,b){
    console.log("a:" + a,"b:" + b);
}
//把数组“展开”成参数
foo.apply(null,[1,2]); //a:1,b:3
//bind柯里化
var bar = foo.bind(null,1);
bar(2); //a:1,b:2
```
这样做可能产生一些副作用，如果某个函数确实使用了this，那么这样做就会绑定到全局对象，导致一些不可预计的后果

##### 更安全的this

更安全的做法就是传入一个特殊的对象，把this绑定到这个对象不会产生任何副作用    
我们可以创建一个“DMZ”（demilitarized,非军事区）对象--它就是一个空的非委托对象

在JavaScript中创建一个空对象最简单的方法就是`Object.create(null)`，它与{}很像，但是它不会创建`Object.prototype`    
这个委托，所以它比{}更空

#### 间接引用

在这种情况下，调用这个函数将会应用默认绑定

```javascript
function foo(){
    console.log(this.a);
}
var a = 2;
var obj1 = {
    a: 3,
    foo: foo
};
var obj2 = {
    a: 4
};
obj1.foo();//3
(obj2.foo = obj1.foo)();//2
```
可以看到在赋值之后，this绑定到了全局对象上    

值得注意的是this绑定到全局对象还是undefined，不是取决于调用位置是否是严格模式，而是函数体是否是严格模式

#### 软绑定

硬绑定会大大降低函数的灵活性

如果可以给默认绑定指定一个全局对象和undefined以外的值，那就可以实现和硬绑定相同的效果，同时保留隐式绑定或者显示绑定修改this的能力


















