# 基本类型
1. js 的基本类型(number \ string \ boolean \ null \ undefined \ object \ symbol)
2. 枚举(enum)  
js 数据类型的补充,用于数值赋予友好的名字(防止写错)
```ts
enum Gender {
  Man = 'man',
  Woman = 'woman',
}
let gender: Gender = Gender.Man
console.log(gender);
gender = Gender.Woman;
console.log(gender);
```
3. 数组
```ts
let list: Array<number> = [1, 2, 3];
let double :Array<Array<number>>=[[1,2],[2,3]]
```
3. any  
任意类型
4. void
没有类型,函数返回 undefined
5. never
never类型表示的是那些永不存在的值的类型

## 类型断言
有时候你会遇到这样的情况，你会比TypeScript更了解某个值的详细信息。 通常这会发生在你清楚地知道一个实体具有比它现有类型更确切的类型
```ts
(<string>someValue).length;
(someValue as string).length;
```
# 接口(interface)
接口用于描述一个对象必须有什么属性(包括方法)
## 只读属性和可选
```ts
interface Human{
    readonly name: string,
    age?: number
}
```
## 想要传入 Interface 之外的属性
```ts
//使用类型断言
 let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);
//使用索引签名
 interface SquareConfig {
     color?: string;
     width?: number;
     [propName: string]: any;
 }
```

## 函数类型
接口能够描述JavaScript中对象拥有的各种各样的外形。 除了描述带有属性的普通对象外，接口也可以描述函数类型。
```ts
interface Human{
    name: string,
    age: number,
    add(a:number, b:number): number
}
```
### 这个对象是函数
```js
interface SearchFunc {
    (source: string, subString: string): boolean;
}
```

### 这个对象是数组
```js
interface StringArray {
[index: number]: string;
}
```
## 接口继承
```ts
interface Shape {
    color: string;
}

interface Square extends Shape {
    sideLength: number;
}
```