## 居中

居中的方法千奇百怪，收起来备用

#### 水平居中

* 设宽，然后margin:0 auto
* 让绝对定位的居中
```
div{
    position: absolute;
    width: 300px;
    height: 300px;
    margin: auto;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: red;
}
```

#### 水平垂直居中

* 已知宽高，利用margin
```
div{
    position: relative; /*相对绝对定位都行*/
    width: 500px;
    height: 300px;
    top: 50%;
    left: 50%;
    margin: -150px 0 0 -250px;
    background-color: red;
}
```
* 未知容器宽高，利用transform
```
div{
    position: relative; /*相对绝对定位都行*/
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: red;
}
```
* 用flex布局（注意兼容性）
```
.container{
    display: flex;
    align-items: center; /*垂直*/
    justify-content: center; /*水平*/
}
.container div{
    width: 100px;
    height: 100px;
    background-color: red;
}
```

## 多列等高

给父容器设`overflow: hidden;`每列设一个很大的`padding-bottom`以及值为它负值的`margin-bottom`

## 字体设置的几个问题

看下面一段代码

```css
html{
    font-size: 62.5%;/*1*/
}

body{
    font: 12px/1.5;/*2*/
    font-size: 1.2rem;/*3*/
}

input,button,textarea,select,label {
    font-size:100%;/*4*/
}
```

1中，浏览器默认字体大小为16px，为了方便计算，将html中字体大小设为16 * 62.5%=10px   
2中，字体大小设为12px，行高为字体大小的1.5倍   
3中，1.2rem = 10px * 1.2 = 12px,rem是以根元素字体大小为基准的，比如`html{font-size: 20px}`，那么1rem = 20px     
4中，浏览器默认设置表单字体默认比文本小，这里把默认样式覆盖掉

其次要注意em，%这两个单位，都是不固定的，继承父级元素的字体大小，例如父元素字体大小为20px，那么1em = 20px,100% = 20px

## 渐变背景效果

```css
body{
    background: linear-gradient(to top right,rgb(249,147,12),rgb(252,97,21));
    background: -webkit-linear-gradient(left bottom,rgb(249,147,12),rgb(252,97,21));
    background: -o-linear-gradient(top right,rgb(249,147,12),rgb(252,97,21));
    background: -moz-linear-gradient(top right,rgb(249,147,12),rgb(252,97,21));
}
```
不同浏览器有细微的差别，`to top`就是指从底部开始到顶部，`bottom`也是指从底部开始到顶部

## 换行问题

```css
div{
    white-space:nowrap;
    word-break:break-all; 
    word-wrap:break-word;
}
```
`white-space`默认值是`normal`，块级元素定宽之后会自动换行，但是在移动端可能出现预料之外的自动换行，导致布局错乱，要加上这一句   
`word-break:break-all`这种情况，如果行尾是一个长单词，它会把单词拆成两半，强行换行，而`word-wrap:break-word`会把最后那个单词都换到下一行 

## 隐藏滚动条同时也能滚动

自定义滚动条的为对象选择器`::-webkit-scrollbar`
```css
.element::-webkit-scrollbar {display:none}
```

