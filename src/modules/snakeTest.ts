class Snake {
  //表示蛇的元素
  head: HTMLElement;
  bodies: HTMLCollectionOf<HTMLElement>;  //HTMLCollection会实时刷新
  // 获取蛇的容器
  element: HTMLElement;

  constructor() {
    this.element = document.getElementById('snake')!;
    this.head = document.querySelector('#snake>div') as HTMLElement;
    this.bodies = this.element.getElementsByTagName('div');

  }

  // 获取蛇的坐标（蛇头）
  get X() {
    return this.head.offsetLeft
  }
  get Y() {
    return this.head.offsetTop
  }

  setPos(type:'x' | 'y',value:number){
    let currentP:number;

    if(type==='x'){
      currentP=this.X
    }else{
      currentP=this.X
    }

    if(currentP===value) return
    if(value > 290 || value < 0){
      throw new Error('蛇撞墙了')
    }
    if (this.bodies[1] && this.bodies[1].offsetLeft === value) {
      //调头，蛇反向继续移动
      if (value > currentP) {
        value = currentP - 10
      } else {
        value = currentP + 10
      }
    }

    // 先移动身体再移动头部
    this.moveBody()

    if(type==='x'){
      this.head.style.left = value + 'px'
    }else{
      this.head.style.top = value + 'px'
    }
    

    this.checkHeadBody()

  }

  // 蛇增加身体的方法
  addBody() {
    //向element添加一个div  元素内尾部添加一个元素 和 appendChild 一样
    this.element.insertAdjacentHTML("beforeend", "<div></div>")
  }

  // 蛇移动身体
  moveBody() {
    /*
       将后面身体的位置改为前面身体的位置
           例：第四节 = 第三节位置
       
       先把后面的改了，再改前面，不然后面的就找不到前面的位置
    */

    //遍历所有身体的位置
    for (let i = this.bodies.length - 1; i > 0; i--) {
      // 获取前面身体的位置
      let x = this.bodies[i - 1].offsetLeft;
      let y = this.bodies[i - 1].offsetTop;

      //tips 如果后面的代码以小括号，中括号开头，前面的代码要带分号

      // 将值设置到当前身体上
      this.bodies[i].style.left = x + 'px';
      this.bodies[i].style.top = y + 'px';
    }
  }

  // 蛇检查吃自己
  checkHeadBody() {
    //获取所有的身体，检查是否和身体重叠
    for (let i = 1; i < this.bodies.length - 1; i++) {
      const body = this.bodies[i]
      if (this.X == body.offsetLeft && this.Y == body.offsetTop) {        
        console.log('蛇吃到自己了！')
        throw new Error('蛇吃到自己了！')
      }

    }
  }
}

const snake=new Snake()

//函数柯里化
const setX=snake.setPos('x');
const setY=snake.setPos('y');



export default Snake;