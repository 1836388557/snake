// 定义食物类
class Food {
  //定义一个属性表示食物对应的元素
  element: HTMLElement;
  constructor() {
    //获取页面中food元素，并将其赋值给element
    this.element = document.getElementById('food')!;  //!表示一定存在
  }

  //定义一个可以获取食物x轴坐标的方法
  get X() {
    return this.element.offsetLeft
  }

  //定义一个获取食物Y轴坐标的方法
  get Y() {
    return this.element.offsetTop
  }

  set X(value: number) {
    this.element.style.left = value +'px'
  }

  set Y(value: number) {
    this.element.style.top= value+'px'
  }

  //修改食物位置的方法
  change() {
    //生成一个随机的位置
    //食物的位置最小是0 最大是290 且是10的倍数

    //Math.round 四舍五入 Math.ceil 向上取整  Math.floor  向下取整
    const x = Math.round(Math.random() * 29) * 10
    const y = Math.round(Math.random() * 29) * 10

    return {
      x,
      y
    }
  }

  checkPosition(elements: HTMLCollectionOf<HTMLElement>,n:number): Function | void {
    console.log('递归',n)
    if(n>9000){
      console.log("吃完了")
      location.reload()
    }
    const pos=this.change()
    let flag = 1
    for (let i = 0; i < elements.length - 1; i++) {
      if (pos.x == elements[i].offsetLeft && pos.y == elements[i].offsetTop) {
        flag = 0   
        break;
      }
    }
    console.log(flag)
    if (flag === 0) {
      console.log("食物出现在蛇身上")
      this.checkPosition(elements,n+1)
    }else{
      this.X=pos.x
      this.Y=pos.y
    }
  }

}

export default Food;