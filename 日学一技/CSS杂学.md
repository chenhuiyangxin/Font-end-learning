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