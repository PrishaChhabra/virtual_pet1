//Create variables here
var dog,happyDog,foodS=0,foodStock;
var dogImg,happyDogImg;
var database;
function preload()
{
  dogImg=loadImage("images/dogImg.png")
  happyDogImg=loadImage("images/dogImg1.png")
	//load images here
}

function setup() {
  database=firebase.database();
  createCanvas(500,500);
  dog=createSprite(300,400,10,40)
  dog.addImage(dogImg)
  dog.scale=0.2
 

  foodStock=database.ref('food/foodStock')
  foodStock.on("value",readStock,showError);

  
  
}


function draw() {  
background(46,139,87);

  drawSprites();
  //add styles here
  
  textSize(20)
  fill("pink")
  text("Press UP_ARROW Key to feed the puppy milk",30,100)
  
  text("Stock:"+foodS ,50,200)
}
function readStock(data){
  console.log(data.val())
  foodS=data.val();
  
}

function writeStock(milk){
  /*if(milk<=0){
    milk=0;}
    else{
      milk=milk+1
    }*/

    database.ref('food').update({
      foodStock:milk
      
    })
    
}



function showError(){
  console.log("Error")
}

function keyPressed(){
  if(keyCode===38){
    foodS++
    writeStock(foodS);
    dog.addImage(happyDogImg);

  }
}


