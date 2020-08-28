// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    HSB, background, color, colorMode, createCanvas, ellipse, fill, height,
 *    noStroke, random, strokeWeight, text, textSize, width, loadSound, image, loadImage
 *    keyCode, UP_ARROW, mouseX, mouseY, stroke, translate, angleMode, circle, noFill, rotate, createSlider
 *    windowWidth, windowHeight, collidePointCircle, createButton, textFont, tbutton
 */
let astronaut, x, yVal, size, currentPlanet, slider, astronautImg, canvasW, canvasH;
let gravity, planets, solarSystemView, planetDistances, orbitalVelocity, modelPlanets;
let sunImg, mercuryImg, venusImg, earthImg, marsImg, jupiterImg, saturnImg, uranusImg, neptuneImg, moonImg, planetImgs, imgSize, arrowImg, galaxyImg;
let sun, mercury, venus, earth, mars, jupiter, saturn, uranus, neptune;
let planetGShow, rotating, distanceScale, speedScale, TWO_PI;
const earthGravity = 2;
let button, mercuryButton, planetNames; 
let planetCoords = [];
let planetCoordsY = [];
let tbutton;


function setup() {
  // CREATE THE CANVAS 
  canvasW = windowWidth - 30;
  canvasH = windowHeight - 60;
  let canvas = createCanvas(canvasW, canvasH);
  canvas.parent('solarsys');
  background(15)

  //// SET UP SOLAR SYSTEM IMAGES
  sunImg = loadImage('https://cdn.glitch.com/51a8f7f9-8089-44c6-a277-4d2e7bd6053b%2Fsun.png?v=1596037154147');
  astronautImg = loadImage('https://cdn.glitch.com/ab0922bf-007b-45e1-b108-57b39e818c8e%2Fastronaut1.png?v=1595957045734');
  galaxyImg = loadImage('https://cdn.glitch.com/891929ba-ee2a-47e0-85e8-3840f8dedb1d%2Fstarsbground.jpg?v=1596049679916'); // find better img
  mercuryImg = loadImage('https://cdn.glitch.com/ab0922bf-007b-45e1-b108-57b39e818c8e%2Fmercury.png?v=1595971337125');
  venusImg = loadImage('https://cdn.glitch.com/ab0922bf-007b-45e1-b108-57b39e818c8e%2Fvenus.png?v=1595971334497');
  earthImg = loadImage('https://cdn.glitch.com/ab0922bf-007b-45e1-b108-57b39e818c8e%2Fearth.png?v=1595971329931');
  marsImg = loadImage('https://cdn.glitch.com/ab0922bf-007b-45e1-b108-57b39e818c8e%2Fmars.png?v=1595971327803');
  jupiterImg = loadImage('https://cdn.glitch.com/ab0922bf-007b-45e1-b108-57b39e818c8e%2Fjupiter.png?v=1595971323983');
  saturnImg = loadImage('https://cdn.glitch.com/891929ba-ee2a-47e0-85e8-3840f8dedb1d%2Fclipart610239.png?v=1596123131947');
  uranusImg = loadImage('https://cdn.glitch.com/ab0922bf-007b-45e1-b108-57b39e818c8e%2Furanus.png?v=1595971315420');
  neptuneImg = loadImage('https://cdn.glitch.com/ab0922bf-007b-45e1-b108-57b39e818c8e%2Fneptune.png?v=1595971303881');
  //moonImg = loadImage('https://cdn.glitch.com/891929ba-ee2a-47e0-85e8-3840f8dedb1d%2Fhiclipart.com.png?v=1596051448815'); // find new img
  arrowImg = loadImage('https://cdn.glitch.com/891929ba-ee2a-47e0-85e8-3840f8dedb1d%2Femojipng.com-518648.png?v=1596166422839');
  planetImgs = [mercuryImg, venusImg, earthImg, marsImg, jupiterImg, saturnImg, uranusImg, neptuneImg];
  planetNames = ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"];
  // NASA DATA 
  planetDistances = [57, 108, 149, 228, 780, 1437, 2871, 4530];   //distance of each planet to sun in millions of km
  orbitalVelocity = [47.4, 35, 29.8, 1, 24.1, 13.1, 9.7, 6.8, 5.4, 4.7]; //each planet's orbital velocity in km/s
  
  // SLIDER FOR ORBITAL VELOCITY AND MASS OF ASTRONAUT
  slider = createSlider(50, 400, 150);
  slider.position(width - 330, 65);
  slider.size(300, 50);
  
  // SET UP GRAVITY 
  x = 50;
  yVal = 0;
  astronaut = [];
  astronaut.push(new user(random(width - size)));
  
  // SET UP THE PLANETS ON THE GRAVITY MODE
  planets = {
    "Moon": {
      "name" : "Moon",
      "gravity" : earthGravity * (1.62/9.81),
      // "dayAvgTemp" : 260,
      // "nightAvgTemp" : -280,
      "avgTemp" : -4,
      "imgNum" : 10
      
    },    
    "Earth": {
      "name" : "Earth",
      "gravity" : earthGravity,
      "avgTemp" : 59,
      "imgNum" : 2
    },
    
    "Mercury": {
      "name" : "Mercury",
      "gravity" : earthGravity * (3.7/9.81),
      // "dayAvgTemp" : 800,
      // "nightAvgTemp" : -290,
      "avgTemp" : 333,
      "imgNum" : 0
    },
    
    "Venus": {
      "name" : "Venus",
      "gravity" : earthGravity * (8.87/9.81),
      "avgTemp" : 867,
      "imgNum" : 1
    },
    
    "Mars": {
      "name" : "Mars",
      "gravity" : earthGravity * (3.71/9.81),
      "avgTemp" : -85,
      "imgNum" : 3
    },
    
    "Jupiter": {
      "name" : "Jupiter",
      "gravity" : earthGravity * (24.79/9.8),
      "avgTemp" : -166,
      "imgNum" : 4
    },
    
    "Saturn": {
      "name" : "Saturn",
      "gravity" : earthGravity * (10.4/9.8),
      "avgTemp" : -220,
      "imgNum" : 5
    },
    
    "Uranus": {
      "name" : "Uranus",
      "gravity" : earthGravity * (8.87/9.8),
      "avgTemp" : -320,
      "imgNum" : 6
    },
    
    "Neptune": {
      "name" : "Neptune",
      "gravity" : earthGravity * (11.15/9.8),
      "avgTemp" : -330,
      "imgNum" : 7
    }
    
  }
  
    // SUN IMAGE
  sun = new Planet1(250, 0, 0, 0, sunImg);
  // CALL SUN 
  sun.spawnMoons(8, 1);
}


  // INITIALIZE VARIABLES USED LATER
  planetGShow = "Earth";
  solarSystemView = true;
  rotating = true;
  speedScale = 500;


/////// DRAW FUNCTION

function draw() { 
  if(solarSystemView){
    background(galaxyImg);
    fill(255);
   //boxDraw()
    //speedScale = 500;
    speedScale = Math.abs(450 - slider.value())*2+300;
    textSize(60);
    textFont('Bebas Neue');
    text(`The Solar System`, 100,100);
    textFont('Crimson Text');
    textSize(20);
    fill(150);
    text('Relative Orbital Velocities, Distances, and', 100, 140);
    text('Planet/Gravity Data acquired from NASA', 100, 160);
    textFont('Playfair Display');
    textSize(36);
    fill(color(153, 204, 255));
    text(`Orbiting Speed`, width - 300, 50); //use the slider value to manipulate how fast the system is going  
    textSize(46);
    textFont('Bebas Neue') 
    //super zoomed in
    text(`Press Enter & Click`, 60, height/2 + 400)
    text(`on a Planet to Visit!`, 60, height/2 + 450)
    // if not super zoomed in 
    // text(`Press Enter & Click`, 50, 1200)
    // text(`on a Planet to Visit!`, 50, 1250)

  translate(width/2, height/2);
    
  image(sunImg, -80, -80, 150, 150)
  sun.show();
  sun.orbit();

  } else{
    gravitySimulator(planetGShow);
    
  } 
  
  //collision code
  function hitCollide () {
    let planetsInitialX = [1455, 1525, ];
    let planetsInitialY = [];
    
    let planetsFinalX = [1520, 1577];
    //let planetsFinalY = []
    
    
    for(let i = 0; i < modelPlanets.length; i++){
    let collide = collidePointCircle(mouseX, mouseY, modelPlanets[i].distance,modelPlanets[i].distance,modelPlanets[i].dimension);
    if(collide){
      console.log('hit');
      gravitySimulator("Mercury");
    }
      
  }
  let collide = collidePointCircle(mouseX, mouseY, jupiter.distance, jupiter.distance, jupiter.dimension);
  if(collide){
     console.log('hit');
     gravitySimulator("Jupiter");
  }
    
  }

}

/////// START OF GRAVITY CODE ///////

function gravitySimulator(currentPlanetInput){
  currentPlanet = currentPlanetInput;
  background(galaxyImg);
  fill(color(153, 204, 255));
  size = slider.value();
  textSize(30);
  text(`Astronaut Mass: ${size}`, width - 325, 55);
  gravity = planets[currentPlanet].gravity;
  //text(`Current Planet/Body: ${currentPlanet}`, 10, 40)
  text(`${currentPlanet}'s gravity: ${Math.floor(planets[currentPlanet].gravity/earthGravity*9.81*100)/100} m/s^2`, 55, 80);
  // if(planets[currentPlanet].avgTemp === undefined){
  //   text(`Day Temperature: ${planets[currentPlanet].dayAvgTemp} \u00B0F`, 75, 115);
  //   text(`Night Temperature: ${planets[currentPlanet].nightAvgTemp} \u00B0F`, 75, 190);
  // } else{
    text(`Average Temperature: ${planets[currentPlanet].avgTemp} \u00B0F`, 55, 155);
  //}
  textSize(25);
  textFont('Crimson Text');  
  fill(150);
  text('Click anywhere to spawn an astronaut, press \'Enter\' to clear and \'ESC \' to return to the Solar System', width/2 - 460, 115);
  text('Press the up arrow key to jump and left & right arrow keys to move', width/2 - 275, 135);
  fill(255);
  for(let i = 0; i < astronaut.length; i++){
    astronaut[i].show();
    astronaut[i].update();
    if(astronaut[i].x < -astronaut[i].width + astronaut[i].width){
       astronaut[i].x = -astronaut[i].width + astronaut[i].width;
    }
    if(astronaut[i].x > width - astronaut[i].width/2){
       astronaut[i].x = width - astronaut[i].width/2;
    }
  }
  if(size <= 5){
    size = 5;
  }
  
  for (let i = 0; i < planetImgs.length; i++){
    
    let spacing = canvasH/10;
    let currentPlanetNum = planets[currentPlanet].imgNum;
    let imgW = canvasW/22;
    let imgH = canvasH/12;
    textSize(85);
    textFont('Bebas Neue');
    text(`${planetNames[currentPlanetNum]}`, width/2 - 100, 80);
        textSize(25);
    textFont('Playfair Display');
    if(i === 5){
      imgW *= 1.5;
      spacing += 3;
    } else if(i === 7){
      imgW *= 1.5;
      imgH *= .75;
      spacing += 3;
    } else if(i === 5){
      imgW *= 1.5;
      //spacing -= 8
    } else if(i === 6){
      spacing += 3;
    }
    // }
    // else if(i === 3){
    //   spacing -= 15;
    // }
    // else if(i === 3){
    //   imgW /= 2;
    //   imgH /= 2;
    // }
    if(currentPlanetNum === i){
      // if(i === 3){
      //   image(arrowImg, 20 + imgW, 155 + spacing*i, canvasW/25, canvasH/25);
      // }
        image(arrowImg, 20 + imgW, 255 + spacing*i, canvasW/25, canvasH/25);
      
    }
    image(planetImgs[i], 10, 225 + spacing*i, imgW, imgH);
  }
}

class user{
  constructor(x){
    this.x = x;
    this.yVal = 0;
    this.width = size;
    this.vel = 0;
    this.accel = gravity;
  }
  show(){
    image(astronautImg, this.x, this.yVal, this.width, this.width);
  }
  update(){
    this.vel += this.accel;
    this.yVal += this.vel;
    if(this.yVal > height - this.width + 10){
      // this.vel *= -.95;
      this.yVal = height - this.width + this.width/20; //img is transparent so have to account for extra to make it seem like on ground
    } 

  }
}

function keyPressed(){
 //jump if the UP arrow is pressed
  if(keyCode === UP_ARROW){
    jump();
  // move left if the LEFT arrow is pressed
  } else if(keyCode === LEFT_ARROW){
    for(let i = 0; i < astronaut.length; i++){
      astronaut[i].x -= 10;
    }
  //move right if the RIGHT arrow is pressed
  } else if(keyCode === RIGHT_ARROW){
    for(let i = 0; i < astronaut.length; i++){
      astronaut[i].x += 10;
    }
  // remove all the astronauts if Enter is pressed OR reset the planets back to the initial position 
  } else if (keyCode === ENTER){
    if(!solarSystemView){  
      astronaut = [];
    } else{
      rotating = !rotating;
    }
    
  // if ESCAPE is pressed then switch between the 2 modes
  } else if (keyCode === ESCAPE){
    solarSystemView = !solarSystemView;
  // press number to visit different planets 
  } else if (key === '1'){
    astronaut = [];
    planetGShow = "Mercury";
    solarSystemView = false;
  } else if (key === '2'){
    astronaut = [];
    planetGShow = "Venus";
    solarSystemView = false;
  } else if (key === '3'){
    astronaut = [];
    planetGShow = "Earth";
    solarSystemView = false;
  } else if (key === '4'){
    astronaut = [];
    planetGShow = "Mars";
    solarSystemView = false;
  } else if (key === '5'){
    astronaut = [];
    planetGShow = "Jupiter";
    solarSystemView = false;
  } else if (key === '6'){
    astronaut = [];
    planetGShow = "Saturn";
    solarSystemView = false;
  } else if (key === '7'){
    astronaut = [];
    planetGShow = "Uranus";
    solarSystemView = false;
  } else if (key === '8'){
    astronaut = [];
    planetGShow = "Neptune";
    solarSystemView = false;
  }

}


// If mouse clicked, add a new astronaut 
function mouseClicked(){
  if(!solarSystemView){
    if(mouseX < width && mouseX > 0 && mouseY < height && mouseY > 150){
    astronaut.push(new user(mouseX));
    }
  }else{  
    for(let i  = 0; i < 8; i++){
      let collide = collidePointCircle(mouseX, mouseY, planetCoords, planetCoordsY, 250/3.5)
      if(mouseX - width/2 > planetCoords[i] + 14 && mouseX - width/2 < planetCoords[i] + 14 + sun.planetsArr[i].radius){
        if(mouseY - height/2 > planetCoordsY[i] - 23 && mouseY - height/2 < planetCoordsY[i] - 23 + sun.planetsArr[i].radius)
        collide = true;
      }
    //let collide = collidePointRect(mouseX, mouseY, 0, 300 + 75*i, 175, 100)
      if(collide){
        astronaut = [];
        planetGShow = planetNames[i];
        solarSystemView = false;
      }
    }
  }
}
// make the astronaut jump based on the gravity on each planet
function jump(){
  // vel = 0;
  // accel = -.5;
  // astronaut.yVal += vel;
  for(let i = 0; i < astronaut.length; i++){
    if(astronaut[i].vel >= 0){
      astronaut[i].vel *= -1;
    }
    astronaut[i].vel += astronaut[i].width/5;
    if(astronaut[i].vel <= 0){
      astronaut[i].vel = -astronaut[i].width/5;
    }
  }
}

// SOLAR SYSTEM 
class Planet1{

  constructor(r, d, o, a, img){
    this.radius = r;
    this.distance = d;
    this.angle = a;
    this.planetsArr = [];
    this.orbitSpeed = o;
    this.img = img;
  }  
 
  show(){
    push();
    rotate(this.angle);
    translate(this.distance, 0);
    noFill();
    if(this.img !== sunImg){
      if(this.img === neptuneImg){
        image(this.img, 0, 0, this.radius*1.75, this.radius);
      }else if (this.img === saturnImg){
        image(this.img, 0, 0, this.radius*2, this.radius);
      }else{
        image(this.img, 0, 0, this.radius, this.radius);
      }
    }
    //ellipse(0, 0, this.radius*2, this.radius*2);
    for (let i = 0; i < this.planetsArr.length; i++){
       this.planetsArr[i].show();
      if(i ===3){ //Mars going at slow speed for some reason
        this.planetsArr[i].orbitSpeed = orbitalVelocity[i]/speedScale*25;
      }else{
      this.planetsArr[i].orbitSpeed = orbitalVelocity[i]/speedScale;
      }
    }
    
    pop();
    
    //DISPLAY ORBIT RINGS !!!!
    let planetDistances2 = [57, 108, 149, 228, 780, 1437, 2800, 4400];
    strokeWeight(1);
    stroke('grey');
    noFill();
    for (let i = 0; i < planetDistances2.length; i++){
        circle(0,0, planetDistances2[i] + 200);
    }
  
}
  
  //// NASA PLANETS DATA
  spawnMoons(total, level){
    let planetDistances = [57, 108, 149, 228, 780, 1437, 2800, 4400];   //distance of each planet to sun in millions of km
    let orbitalVelocity = [47.4, 35, 29.8, 24.1, 13.1, 9.7, 6.8, 5.4]; //each planet's orbital velocity in km/s

    //MAKE PLANETS APPEAR
    for (let i = 0; i < planetDistances.length; i++){
      this.planetsArr.push(new Planet1((this.radius/3.5), planetDistances[i]/5 + 75, orbitalVelocity[i]/speedScale, random(TWO_PI), planetImgs[i]));
    }
  }
  // CAUSE PLANETS TO MOVE
  orbit(){

    if(rotating){
       this.angle += this.orbitSpeed;
      for (let i = 0; i < this.planetsArr.length; i++){
       this.planetsArr[i].orbit();      
          for (let i = 0; i < planetDistances.length; i++){
            this.planetsArr[i].distance = planetDistances[i]/5 + 75;
      }
      }
      
    }else {
      //ADJUST PLANET POSITION SO THEY DONT OVERLAP WHEN ENTER IS PRESSED
      for(let i = 0; i < 6; i++){
           //console.log(this.planetsArr[0].distance);
        this.planetsArr[i].distance = 75*i + 75;
      }
      
      for (let i = 0; i < this.planetsArr.length; i++){
        this.planetsArr[i].angle = 100;
        planetCoords.push(this.planetsArr[i].distance*Math.cos(100));
        planetCoordsY.push(this.planetsArr[i].distance*Math.sin(100));
      }
    }   
  }
}

// INSTRUCTIONS FOR THE SHIFTING B/T MODES
function boxDraw () { 
  let goToNames = ['Visit Mercury', 'Visit Venus', 'Visit Earth',
                   'Visit Mars','Visit Jupiter','Visit Saturn', 
                   'Visit Uranus', 'Visit Neptune'];

  
  for (let i = 0; i < 8; i++){
    fill(.3);
    rect(0, 300 + 75*i, 175, 100);
    fill(255);
    textSize(22);
    noStroke();
    text(`${goToNames[i]}`, 15, 345 + 75*i);
    stroke(255); 
  }

}

 // 	hit = collidePointCircle(mouseX,mouseY,200,200,100)
   
function getCollision(){
    // Placing the function in the same coordinate system as show()
    rotate(this.angle)
    translate(this.distance, 0);
    collidePointCircle(mouseX, mouseY, planetDistances[i], circleY, diameter)
    // 
  }
  
