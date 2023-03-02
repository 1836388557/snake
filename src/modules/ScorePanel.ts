// 定义积分盘类
class ScorePanel{
  score=0;
  level=1;

  // 设置最大等级
  maxLevel:number;
  // 多少分升级
  maxScore:number;


  //分数和等级所在的元素，在构造函数中进行初始化
  scoreEle:HTMLElement;
  levelEle:HTMLElement

  constructor(maxLevel:number=10,maxScore:number=10){
    this.scoreEle=document.getElementById('score')!;
    this.levelEle=document.getElementById('level')!;

    this.maxLevel=maxLevel;
    this.maxScore=maxScore
  }

  // 设置一个加分的方法
  addScore(){
    //使分数自增
    this.scoreEle.innerHTML=++this.score+'';  //因为需要的是字符串，所以要加''

    if(this.score%this.maxScore===0){
      this.levelUp();
    }
  }

  //提升等级的方法
  levelUp(){
    if(this.level<this.maxLevel){
      this.levelEle.innerHTML=++this.level + ''
    }
    
  }
}


export default ScorePanel;