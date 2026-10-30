/*
 * @name Playback Rate
 * @arialabel Two grey circles on a light grey background that move as the user moves their mouse and plays different noises based on their distance from each other 
 * @description <p>Load a SoundFile and map its playback rate to
 * mouseY, volume to mouseX. Playback rate is the speed with
 * which the web audio context processings the sound file information.
 * Slower rates not only increase the duration of the sound, but also
 * decrease the pitch because it is being played back at a slower frequency.</p>
 * <p><em><span class="small"> To run this example locally, you will need the
 * <a href="http://p5js.org/reference/#/libraries/p5.sound">p5.sound library</a>
 * a sound file, and a running <a href="https://github.com/processing/p5.js/wiki/Local-server">local server</a>.</span></em></p>
 */
 let isPlaying = false;

 function mousePressed() {
   userStartAudio();

   if (isPlaying) {
     song.pause();
     
     
     isPlaying = false;
   
     document.body.classList.remove('no-cursor');
   } else {
     song.loop();
     loop();
     isPlaying = true;
     document.body.classList.add('no-cursor');
   }
   
   
 }
// A sound file object
let song;
let words = '';

function preload() {
  // Load a sound file
  song = loadSound('assets/part.mp3');
  font = loadFont('Righteous-Regular.ttf');
}

let font;
let points = [];
let bounds;



let posX = 0;
let posY = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 1);
  background(335, 100, 20);
  posX = width / 2 ;
  posY = height / 2;

  textFont(font);
  bounds = font.textBounds('Drawing Sound', 0, 0, 60);
  points = font.textToPoints('Drawing Sound', 0, 0, 60, {sampleFactor: 0.25});
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  

  let hue = map(mouseX, 0, width, 0, 360);
  let bright = map(mouseY, 0, height, 20, 60);
  background(hue, 250, bright, 0.02);
  
  if(!isPlaying) {
    posX = lerp(posX, width / 2, 0.15);
    posY = lerp(posY, height / 2, 0.15);

  let maxSize = map(sin(frameCount * 6.55), -1, 180, 150, 130);

noStroke();
    for (let i = maxSize; i > 0; i -= 4) {
      let alpha = map(i, 0, maxSize, 0.5, 0);
      fill((hue + 180) % 360, 80, 100, alpha);
      ellipse(posX, posY, i, i);
    } 
    
    
    
    let textAlpha = map(sin(frameCount * 0.05), -1, 1, 0.3, 1);

    stroke(hue, 0, 100, textAlpha);
    strokeWeight(2);
    
    push();

    let textX = 0;
    let textY = 150;

    translate(
    width / 2 - (bounds.x + bounds.w / 2) + textX,
    height / 2 - (bounds.y + bounds.h / 2) + textY
);

    for (let p of points) {
      point(p.x, p.y);
    }
    pop();
    
    


    return;  



  
  }

  // Set the volume to a range between 0 and 1.0
  let volume = map(mouseX, 0, width, 0, 1);
  volume = constrain(volume, 0, 1);
  song.amp(volume);

  // Set the rate to a range between 0.1 and 4
  // Changing the rate alters the pitch
  let speed = map(mouseY, 0.1, height, 0, 2);
  speed = constrain(speed, 0.02, 4);
  song.rate(speed);

  // circle following
  posX = lerp(posX, mouseX, 0.1);
  posY = lerp(posY, mouseY, 0.1);

  // blur
  noStroke();
   let maxSize = 105;
  for (let i = maxSize; i > 0; i -= 4) {
    let alpha = map(i, 0, maxSize, 0.5, 0);  
    fill((hue + 180) % 360, 80, 100, alpha);
    ellipse(posX, posY, i, i);
  }


  
}

let robot = new p5.Speech();


function pressAKey(event) {
  
robot.setVoice("Google UK English Female")
  let letter = event.key;
  if (letter == 'Enter') {
    // let utterance = new SpeechSynthesisUtterance(words);
    // speechSynthesis.speak(utterance);
    robot.speak(words)
    words = '';
  } else {
    words += letter; 
  }
  print(words)
   // let utterance = new SpeechSynthesisUtterance("hi guys welcome to my world");
}

window.addEventListener('keydown', pressAKey)


