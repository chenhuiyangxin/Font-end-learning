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

然后在render方法中创建实例

```javascript
React = {
    nextReactRootIndex: 0,
    render: function(element,container) {
    	//创建component实例
        var componentInstance = instantiateReactComponent(element);
        var markup = componentInstance.mountComponent(React.nextReactRootIndex++);
        $(container).html(markup);
        $(document).trigger('mountReady')
    }
}
```

可以看到mountComponent()这个方法，这是用来渲染DOM结构的

```javascript
//文本节点
ReactDomTextComponent.prototype.mountComponent = function(rootID) {
    this._rootNodeId = rootID;
    return '<span data-reactid="'+rootID+'">'+this._currentElement+'<span>';
}
//浏览器节点
ReactDomComponent.prototype.mountComponent = function(rootID) {
    this._rootNodeId = rootID;
    var props = this._currentElement.props;
    var tagOpen = '<' + this._currentElement.type;
    var tagClose = '</' + this._currentElement.type + '>';
    tagOpen += 'data-reactid' + this._rootNodeId;
    //拼凑出属性
    for(var propKey in props) {
        if(/^on[A-Za-z]/.test(propKey)) {
            var eventType = propKey.replace('on','');
            $(document).delegate('[data-reactid="' + this._rootNodeId + '"]',eventType + '.' + this._rootNodeId,props[propKey]);

        }
        if(props[propKey] && propKey != 'children' && !/^on[A-Za-z]/.test(propKey)) {
            tagOpen += '' + propKey + '=' + props[propKey];
        }

    }
    var content = '';
    var children = props.children || [];
    var childrenInstances = [];
    var that = this;
    $.each(children,function(key,child) {
        var childComponentIstance = instantiateReactComponent(child);
        childComponentIstance._mountIndex = key;
        childrenInstances.push(childComponentIstance);
        var curRootId = that._rootNodeId + '.' + key;
        var chidMarkup = childComponentIstance.mountComponent(curRootId);
        content += '' + childMarkup;
    })
    this._renderedChidren = childrenInstances;
    return tagOpen + '>' + content + tagClose;
}
//自定义节点
ReactCompositeComponent.prototype.mountComponent = function(rootID) {
    this._rootNodeID = rootID;
    var publicProps = this._currentElement.props;
    var ReactClass  = this._currentElement.type;
    var inst = new ReactClass(publicProps);
    this._instance = inst;
    inst._reactInternalInstance = this;
    if(inst.componentWillMount) {
        inst.componentWillMount();
    }
    var renderedElement = this._instance.render();
    var renderedComponentInstance = instantiateReactComponent(renderedElement);
    this._renderedComponent = renderedComponentInstance;
    var renderMarkup = renderedComponentInstance.mountComponent(this._rootNodeID);
    $(document).on("mountReady",function() {
        inst.componentDidMount && inst.componentDidMount();
    })
    return renderMarkup;
}
```

文本节点没啥说的，包了层span标签就直接渲染了   
浏览器节点，先把属性渲染，然后递归的对子节点进行渲染，最后都拼凑起来渲染出来    
自定义节点本质上也是递归渲染出来的   

#### 虚拟dom差异化算法（diff algorithm）


