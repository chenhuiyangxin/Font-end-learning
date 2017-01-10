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
