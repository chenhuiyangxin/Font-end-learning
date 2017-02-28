## Generator函数

### Thunk函数

JS中的Thunk函数是将多参数函数替换成单参数的版本，且只接受回调函数作为参数。（其实就是柯里化函数的一种）   
我们拿`fs.readfile(fileName,callback)`举个例子

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










