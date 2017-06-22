## 虚拟DOM

### 当与jquery的append方法混用时

看下事发现场

```html
<div id="app">
	<child v-for="item in txtArr" :text="item"></child>
</div>
<script>
	Vue.component('child',{
		props: ['text'],
		template: '<div>{{text}}</div>'
	})

	var vm = new Vue({
		el: '#app',
		data: function(){
			return {
				txtArr: []
			}
		},
	});
	var $app = $("#app");
	var data = [
		{
			num: 11,
			txt: 'aa'
		},
		{
			num: 22,
			txt: 'bb'
		},
		{
			num: 33,
			txt: 'cc'
		},{
			num: 44,
			txt: 'dd'
		}
	];
	for(let i = 0;i < data.length;i++){
		$app.append('<div>' + data[i].num + '</div>');
		vm.txtArr.push(data[i].txt);
	}
</script>
```
本来预期的渲染结果是这样子的
```html
11
aa
22
bb
33
cc
44
dd
```
然而实际是这样子的
```html
11
22
33
44
aa
bb
cc
dd
```
明明循环里面是间隔渲染的，只不过一个是jquery插入DOM的方法，一个交由vue去渲染，结果却是被分成了两块

原来每次`vm.txtArr.push(data[i].txt)`并没有被立即渲染出来，而是缓存的虚拟DOM里面，当本次事件   
循环结束后才会渲染到真实DOM上去，所以vue渲染的字母打包出现了

我们可以这样子解决

```javascript
for(let i = 0;i < data.length;i++){
	setTimeout(()=>{
		$app.append('<div>' + data[i].num + '</div>');
		vm.txtArr.push(data[i].txt);
	},i);
}
```

我们让循环里面的代码块每个之间相隔1毫秒执行，这样每次`vm.txtArr.push(data[i].txt)`后本次事件循环   
就结束了





