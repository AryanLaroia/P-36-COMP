  
  
  var dog, happyDog;
  var dogImg, happyDogImg;
  var database;
var dataRef;
var foodTan;
var fedTime, lastFed;
var foodObj;
var feed, addFood;
  function preload(){
    dogImg = loadImage("Dog.png");
    happyDogImg = loadImage("happydog.png");
  }

function setup(){
  var canvas = createCanvas(500,500);
 
  database = firebase.database();
 
  dog = createSprite(200,200,20,20);
  dog.addImage("doggy",dogImg);
  dog.addImage("delta", happyDogImg);
  dog.scale = 0.1;
  foodObj = new Foodb();
  foodObj.getFoodStock();

  var fedRefTime = database.ref('FeedTime');
  fedRefTime.on("value",(data)=>{
         lastFed = data.val();
  })

  
  feed = createButton("FEED THE DOG");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton( "ADD FOOD !");
  addFood.position(800,95);
  addFood.mousePressed(addFoodS);
}

function draw(){
background(46,139,187);

text("FOOD LEFT :"+ foodTan, 200, 200); 
fill(255,255,254);
textSize(15);
if(lastFed>=12){
  text("LAST FEED :" + lastFed%12 + "PM",350,30)
}else if (lastFed==0){
  text("LAST FEED : 12 AM",350,30);
}else{
  text("LAST FEED :" + lastFed + "AM",350,30);

}

foodObj.foodStock= foodTan;

foodObj.display();

  drawSprites();
}





function feedDog(){
  
 dog.changeImage("delta",happyDogImg);
 foodTan--;
 foodObj.updateFoodStock(foodTan);
 database.ref('/').update({
   
   FeedTime:hour()
 })
 
}

function addFoodS(){
  foodTan++;
  database.ref('/').update({
    food:foodTan
  })
}


































// //Create variables here
// var dog, happyDog;
// var dogImage, happyDogImage;
// var database;
// var foodS, foodStock;
// function preload()
// {
//   dogImage = loadImage("images/dogImg.png");
//   happyDogImage = loadImage("images/dogImg1.png");
// }

// function setup() {
//   createCanvas(500, 500);
//   database = firebase.database();
//   foodStock = database.ref('food');
//   foodStock.on("value", readStock);
//    dog = createSprite(200,200,20,20);
//   dog.addImage("ok", dogImage);
//   dog.addImage("okay", happyDogImage);
//   dog.scale = 0.1;
// }


// function draw() {  
// background("green");

// if(keyWentDown(UP_ARROW)){
// writeStock(foodS);
// dog.changeImage("okay", happyDogImage);
// }
//   drawSprites();
  
// text("FOOD LEFT : " +foodS, 200,100);
// textSize(90);
// }


// function readStock(data){
// foodS = data.val();
// }
// function writeStock(x){
//   if(x<=0){
//     x=0;
//   }else{
//     x = x-1;
//   }
// database.ref('/').update({
//   food : x
// })
// }