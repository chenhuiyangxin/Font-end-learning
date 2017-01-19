## Flex布局

### 基本概念

弹性布局，所有元素都能设成Flex布局

```css
.box{
    display: flex;
}
/*行内元素的话*/
.small{
    display: inline-flex;
}
```

设完之后，子元素的`float,clear,vertial-align`属性将会失效

采用此布局的元素被称为容器，子元素简称为项目

容器内默认有水平主轴，垂直的交叉轴，主轴开始结束的地方分别叫做main start,main end，类似交叉轴叫做cross start,cross end   
项目默认沿主轴排列，单个项目占据主轴空间叫做main size,交叉轴空间叫做cross size

### 容器属性

#### flex-direction

决定主轴方向，即项目排列方向

```css
.box{
    flex-direction: row | row-reverse | column | column-reverse;
    /*分别是主轴为水平方向，起点左端；水平方向，右端；垂直方向，上部；垂直方向，下部*/
}
```

#### flex-wrap

决定项目如果一条轴线挤不下，如何换行

```css
.box{
    flex-wrap: nowrap | wrap | wrap-reverse;
    /*分别是不换行；换行，第一行在上方；换行，第一行在下方*/
}
```

#### flex-flow

flex-direction与flex-wrap的简写模式

```css
.box{
    flex-flow: row nowrap;
}
```

#### justify-content

定义了项目在主轴上的对齐方式

```css
.box {
  justify-content: flex-start | flex-end | center | space-between | space-around;
  /*分别是main start端对齐；main end端对齐；居中；两端对齐，项目之间距离相等；每个项目两侧的间隔相等*/
}
```

#### align-items

定义项目在交叉轴上如何对齐

```css
.box {
  align-items: flex-start | flex-end | center | baseline | stretch;
  /*分别是cross start端对齐；cross end端对齐；居中；项目第一行文字基线对齐；（默认值），如果项目未设置高度或者设为auto，则会占满容器高度*/
}
```

