## Generator函数

### Thunk函数

JS中的Thunk函数是将多参数函数替换成单参数的版本，且只接受回调函数作为参数。（其实就是柯里化函数的一种）   
我们拿`fs.readfile(fileName,callback)`举个栗子

```javascript
//正常readFile
fs.readfile(fileName,callback);
//Thunk函数版本
var readFileThunk = thunk(fileName);
readFileThunk(callback);
function thunk(fileName) {
	return function (callback) {
		return fs.readfile(fileName,callback);
	}
}
```

根据以上的栗子，写个通用的Thunk函数

```javascript
var Thunk = function (fn) {
	return function () {
		var args = Array.prototype.slice.call(arguments);
		return function (callback) {
			args.push(callback);
			return fn.apply(this,args);
		} 
	}
}

var readFileThunk = Thunk(fs.readfile);
readFileThunk(fileName)(callback);
```

### 自动流程管理

讲了这么多Thunk函数是干嘛的呢？  
我们发现将callback函数传入Thunk函数后，它才会去执行fn，执行callback   
Generator函数每次都需要调用next方法后才会继续执行下面的yield语句   
所以只要每次next方法返回的value属性的值是一个Thunk函数，给它传入callback，并在callback中继续调用   
next方法，就实现了自动管理异步操作了

```javascript
function run (fn) {
	var gen = fn();

	function next(data) {
		var result = gen.next();
		if(result.done) return;
		result.value(next);
	}

	next();
}

run(gen);
```



























