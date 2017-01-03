## React的核心内容

看来看去核心有这些

* 虚拟dom对象(Virtual DOM)
* 虚拟dom差异化算法（diff algorithm）
* 单向数据流渲染（Data Flow）
* 组件生命周期
* 事件处理

一个一个来看

#### 虚拟dom对象(Virtual DOM)

react采用了工厂模式，对不同节点生成不同类的实例

```javascript
function instantiateReactComponent(node) {
    //文本节点情况
    if(typeof node === 'number' || typeof node === 'string') {
        return new ReactDomTextComponent(node);
    }
    //浏览器默认节点的情况
    if(typeof node === 'object' && typeof node.type === 'string') {
        return new ReactDomComponent(node);
    }
    //自定义元素节点
    if(typeof node === 'object' && typeof node.type === 'function') {
        return new ReactCompositeComponent(node);
    }
}
```

