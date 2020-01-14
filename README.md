# 什么是 TS

TypeScript 是 JaveScrpit 的超集,由巨硬开发且开源,可在编译前提示错误,减少用户开发成本(少按 f5),可简单理解为强类型的 ts

## 基础类型

ts包含所有 js 的七种基础类型,还提供了一些其他类型方便我们使用

### boolean

```ts
let isOk:boolean = false
```

### numbert

```
let age:number = 10
```

### sting

```ts
let name:sting = 'fineley'
```

### null / undefined

null 和 undefined 是所有类型的子类型,你可以赋值给所有类型

```ts
let a:null = nul
let b:undefined = undefined
```

### object

```ts
declare function create(o: object )
```

### array

ts 有两种方式表示数组

```ts
let stringList:string[] = ['a','b','c']
let numberList:Array<number> = [1,2,3]
```

### Tuple(元组)

如果你知道数组的元素数量以及类型,你可以定义一个元组

```ts
let tuple :[string,number,boolean]
tuple = ['ok',1,true]  
errTuple = ['ok','1',[1,3]]
```

### enum(枚举)

枚举类型提供的一个便利是你可以由枚举的值得到它的名字。 例如，我们知道数值为18，但是不确定它映射到Human里的哪个key.

```ts
enum Human {haveEyes = true,age = 18,gender = 'male'}
let sex:string = Human['male']
console.log(sex) //'gender'
```

### Any

有时候并不清楚变量的类型,我们可以不让类型检查器进行检查,那么我们可以使用 any 类型来标记这些变量

```ts
let iDontKonw:any = 4
iDontKonw = 'string'
iDontKonw = true
```

```ts
let list: any[] = [1, true, "free"]
list[1] = 100
```

### Void

void 类型表示没有类型,一般用于表示函数没有返回值,你只能给他赋予 undefined 和 null

### Never

never 是表示永远不存在的值的类型

**never 类型总是会抛出异常 / 函数没有返回值  / 存在永远无法达到的终点**

### 类型断言

有时候你知道某个值的详细类型,好比使用了类型转换,编译器这不会进行检查,有两种语法,尖括号和 as

```ts
let someValue: any = "this is a string"
let strLength: number = (<string>someValue).length
let strLength: number = (someValue as string).length;
```

## 接口(interface)

接口用于对指定数据结构的内容进行约束(描述一个对象具有哪些属性或者方法)  
列如

```ts
// 对象
interface Human{
    name: string,
    age: number
}
const bibi:Human = {
    name:'bibi'.
    age:13
}

```

### 函数接口

如果函数上也挂了一个函数 `fn.a = ()=>{}`

那么使用一个立即执行函数返回 fn,fn 的 type 为 any,把 a 挂载在 fn 上

```ts
// 函数
interface add {
    (a:number,b:number):number 
}
let addNumber:add = (a:number,b:number):number{
    return a+b
}


// 函数的属性也是函数
interface add1{
    (a:number,b:number):number // 描述自己
    minus(a:number,b:number):number // 子方法
}
let addNumber:add1 = (
    ():add1 => {
        let x:any = function(a:number,b:number):number{ // 非any要报错
            return a + b
        }
        x.minus = function(a:number,b:number):number{
            return a - b
        }
        return x
    }
)() // 立即执行
```



### 可选属性

有些属性不是全部必须的,你可以在后面添加一个?表示

人话:可以不写的属性

```ts
interface Human{
    name: string,
    age: number,
    career?:string
}
```

### 只读属性

添加 readonly 即可

人话:不可更改的属性

```ts
interface Human{
    readonly name: string,
    readonly age: number
}

let array: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = array;
ro[0] = 12; // error!
```

### 索引类型

如果你想让你的接口可拓展并且可控,你可以使用索引类型

人话:用来描述所有的key/value必须满足的类型

```ts
interface Rect{
    width?: number,
    height?: number,
    [propName:string]:number // 你所传递的 key 必须是 string,value 必须是 number
}
```

### 继承

和类一样,接口也可以继承,一个接口可以集成 一个或者多个接口,

```ts
interface Animal{
    run():void
}

interface Monkey{
    eatBanana():void
}

interface Human extends Animal,monkey{
    name: string,
    age: number
}

```

##  类(Class)

ts 的类在 js es6的 类的基础上进行了一些补强

### 属性

```ts
class man {
  static gender = 'male' // human 的属性,不属于实例
  private _like: string // 私有属性,只能在 man 中使用 (类似局部变量)
  protected birth: string // 只能在 man 或者 man 的子类中使用
  public name: string // 默认为public,同下
  readonly height: string // 只读属性 无法更改
  age: number

  get like() {
    return this._like
  }

  set like(value: string) {
    console.log(1111,value)
    if (value === 'girl') {
      this._like = 'ok'
    } else {
      this._like = 'not ok'
    }
  }

  constructor(name: string,age: number) {
    this.name = name
    this.age = age
    this.birth = '胎生'
    this.height = '1838'
  }

  run() {
    console.log('咚咚咚')
  }
}

let bibi = new man('bibi',13)
bibi.like = '牛'
console.log(bibi)  //{name: 'bibi', age: 13, birth: '胎生', height: '1838', _like: 'not ok' }
```

### 抽象类

抽象类做为其它派生类的基类使用。 它们一般不会直接被实例化。

人话:爸爸类/没有写完的类,抽象类必须有抽象方法,类似 interface,必须要求它的子类实现它定义的抽象方法

```ts
abstract class animal {
  abstract makeVoice(): void
}

let anima1 = new animal() // error 无法创建抽象类的实例

class dog extends animal {
  constructor() {
    super()
  }

  makeVoice() {
    console.log(1)
  }
}

let dog1 = new dog()

```

