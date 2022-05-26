var backgroundImage
var score = 1
var flyingcar
var coins
var coinGroup
var bird
var cloud
var birdGroup
var cloudGroup
var play = 1
var end = 2
var gameState = play
var gameState = end
var restart




function preload(){
     backgroundImg = loadImage("images/sky.png")
     car = loadImage("images/flying-car.png")
     coin = loadImage("images/coin.png")
     coinmusic = loadSound("images/videoplayback.mp3")
     eagle = loadImage("images/Eagle.gif")
     scloud = loadImage("images/cloud.gif")
     eaglesound = loadSound("images/Eagle Tone.mp3")
     smoke = loadImage("images/carsmoke.gif")
     reset = loadImage("images/resetbutton.png")


}

function setup() {
  createCanvas(windowWidth,windowHeight);
  flyingcar = createSprite(100,500,10,10)
  flyingcar.addImage(car)
  flyingcar.scale =0.5

  coinGroup = new Group()
  birdGroup = new Group()
  cloudGroup = new Group()

  restart = createSprite(windowWidth/2-70,windowHeight/2+100,50,50)
  restart.addImage(reset)
  restart.visible = false

  gameState = play
  
  
 
}

function draw() {
 
     background(backgroundImg); 
     
     
     
     

  if(gameState === play){
     flyingcar.y = World.mouseY
     restart.visible = false

     textSize(35);
     fill("white");
     text("YOUR SCORE : " +score,10,50);

      spawnCoins() 
      spawnBirds()
      spawnClouds()

      if(birdGroup.isTouching(flyingcar)) {
     
          eaglesound.play()
         gameState = end
          birdOut() 
         }

      if(cloudGroup.isTouching(flyingcar)) {
      gameState = end  
       cloudOut()
        

       }

       if(keyIsDown(RIGHT_ARROW)) {
            coinGroup.velocityX -=5
            birdGroup.velocityX -= 5
            cloudGroup.velocityX -=5
            frameCount-=100
       }
  

      if(coinGroup.isTouching(flyingcar)) {
      coinmusic.play()
      score+=1
      coinGroup.destroyEach()
      }
    

     
     
}
   else if(gameState === end) { 


     flyingcar.mouseY != World.mouseY
     flyingcar.changeImage(smoke)
     flyingcar.scale = 0.1
     flyingcar.velocityY =50
     
     textSize(88);
     fill("white");
     text("GAME OVER!!",windowWidth/5+200,windowHeight/2-100);
     
     textSize(50);
     fill("white");
     text("YOUR SCORE : " +score,windowWidth-1150,windowHeight/4+200);
     
     restart.visible = true
     restart.scale = 0.2
     if(mousePressedOver(restart)) { 
         
          score = 0
          gameState = play
          flyingcar.scale =0.5
         
          
     }
     
     


    }   
     drawSprites()
     




}




function spawnCoins() {
if (frameCount % 80 === 0) {
     coins = createSprite(1300, random(windowHeight), 100, 100);
     coins.addImage(coin)
      coins.velocityX = -12;
      coins.scale =0.1
      coins.depth = flyingcar.depth
      coins.depth-=1
      coins.lifetime=150
      coins.debug = false
      coinGroup.add(coins)
      coins.setCollider("circle",0,0,445)
}

}

function spawnBirds() {
     if (frameCount % 120 === 0) {
          bird = createSprite(1300, random(windowHeight), 100, 100);
          bird.addImage(eagle)
           bird.velocityX = -12;
           bird.scale =0.4
           bird.depth = flyingcar.depth
           bird.depth-=1
           bird.lifetime=150
           birdGroup.add(bird)
           bird.debug = false
           
       }
}

function spawnClouds() {
     if (frameCount % 150 === 0) {
          cloud = createSprite(1300, random(windowHeight), 100, 100);
          cloud.addImage(scloud)
           cloud.velocityX = -12;
           cloud.scale =0.2
           cloud.depth = flyingcar.depth
           cloud.depth-=1
           cloud.lifetime=150
           cloudGroup.add(cloud)
           
       }
}

function cloudOut() {
         swal({
          title: `Oops! Got Struck`,
          text: "THANKS FOR PLAYING!",
          imageUrl:
            "https://previews.123rf.com/images/briang77/briang771512/briang77151201445/49650920-storm-cloud-lightning-bolt.jpg" ,         
           imageSize: "100x100",
          confirmButtonText: "Ok"
        });
}

function birdOut() {
     swal({
          title: `Oops! Got Hit!`,
          text: "THANKS FOR PLAYING!",
          imageUrl:
            "https://st2.depositphotos.com/7857468/12366/v/950/depositphotos_123664224-stock-illustration-cartoon-eagle-flying.jpg",
          imageSize: "100x100",
          confirmButtonText: "Ok"
        });
}
