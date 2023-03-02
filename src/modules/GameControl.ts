// 引入其他类
import Food from './Food'
import ScorePanel from './ScorePanel'
import Snake from './Snake'


//游戏控制器，控制其他的所有所有类
class GameControl {
  // 定义三个属性
  snake: Snake;  //蛇
  food: Food;  //食物
  scorePanel: ScorePanel;  //记分排

  // 创建一个属性来存储蛇的移动方向（按键方向）
  direction: string = '';

  // 创建一个属性来记录蛇是否存活
  isLive=true


  constructor() {
    this.snake = new Snake()
    this.food = new Food()
    this.scorePanel = new ScorePanel()


    this.init()
  }

  //游戏初始化，调用后游戏就开始
  init() {
    //绑定键盘按下的事件
    document.addEventListener('keydown', this.keydownHandler.bind(this))  //apply立即执行函数 bind返回函数

    /*
      bind(this) 是为了把GameControl对象传入进去，即绑定当前对象的this
      否则根据js谁调用谁就是的规则，keydownHandler方法内的this指的是document
    */

    // 使得蛇可以移动
    this.run()
  }

  //创建键盘按下的响应函数
  keydownHandler(event: KeyboardEvent) {
    /*
      ArrowUp 上
      ArrowDown 下
      ArrowLeft 左
      ArrowRight  右
    */

    //赋值之前需要检查event.key是否合法，即是否按的为上下左右

    //获取用户按下的按键 修改direction属性
    this.direction = event.key
  }


  // 创建一个控制蛇移动的方法
  run() {
    /*
      根据 this.direction 来控制蛇的位置
        向上 top减少
        向下 top增加
        向左 left减少
        向右 left增加
               
    */

    // 获取当蛇前的坐标

    let x = this.snake.X
    let y = this.snake.Y
    
    // 根据方向改变x和y的值
    switch (this.direction) {
      case 'ArrowUp':
        //向上
        y-=10;
        break;
      case 'ArrowDown':
        //向下
        y+=10
        break;
      case 'ArrowLeft':
        // 向左
        x-=10
        break;
      case 'ArrowRight':
        // 向右
        x+=10
        break;
      case '':
        // console.log('暂停')
        break;
      default:
         break;  
    }


    // 检查蛇是否吃到食物
    this.checkEat(x,y)

    // 修改蛇的位置，以及判定是否撞墙
    try{
      this.snake.X=x
      this.snake.Y=y
      this.resetFood(x,y)
      
    }catch(e){
      // 蛇不再存活
      this.isLive=false   

      // 异常，游戏结束，弹出提示
      alert((e as Error).message)
         
    }

    // 开启一个定时调用
    this.isLive && setTimeout(this.run.bind(this),300-(this.scorePanel.level-1)*20)
  }


  // 定义一个方法检查蛇是否吃到食物
  checkEat(X:number,Y:number){
    if(X === this.food.X && Y === this.food.Y) {
      console.log('吃到食物了！')
    
      // 分数增加
      this.scorePanel.addScore()
      // 蛇要增加一节
      this.snake.addBody()

    }
  }

  resetFood(X:number,Y:number){
    if(X === this.food.X && Y === this.food.Y) {

      // 食物的位置重置
      this.food.checkPosition(this.snake.bodies,1)
    }
  }
}

export default GameControl;