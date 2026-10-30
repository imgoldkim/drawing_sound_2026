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
 let isTypingMode = false;
 let titleText = 'Drawing Sound';

 function mousePressed() {
   userStartAudio();

   if (isPlaying) {
     song.pause();
     
     
     isPlaying = false;
isTypingMode = false;

  document.body.classList.remove('writing-active');
  document.body.classList.remove('no-cursor');

     
    

  } else {
     song.loop();
     loop();
     isPlaying = true;
     isTypingMode = true;

    document.body.classList.add('writing-active');
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
let points = []; //drawing sound
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
  
  let textAlpha = map(sin(frameCount * 0.05), -1, 1, 0.3, 1);
  let hue = map(mouseX, 0, width, 0, 360);
  let bright = map(mouseY, 0, height, 20, 60);
  background(hue, 250, bright, 0.02);
  
  if(!isPlaying) {
    posX = lerp(posX, width / 2, 0.15);
    posY = lerp(posY, height / 2, 0.15);

  let maxSize = map(sin(frameCount * 6.55), -1, 180, 160, 140);

noStroke();
    for (let i = maxSize; i > 0; i -= 4) {
      let alpha = map(i, 0, maxSize, 0.5, 0);
      fill((hue + 180) % 360, 80, 100, alpha);
      ellipse(posX, posY, i, i);
    } 
    
  let textAlpha = map(sin(frameCount * 0.05), -1, 1, 0.3, 1);

  let drawingBounds = font.textBounds('Drawing Sound', 0, 0, 60);

  let titleX = width / 2 - drawingBounds.w / 2;
  let titleY = height / 2 + 156 - drawingBounds.h / 2;


  let titleText = 'Drawing Sound';
  let titleBounds = font.textBounds(titleText, 0, 0, 60);
  let titlePoints = font.textToPoints(
    titleText,
    0,
    0,
    60,
    { sampleFactor: 0.25 }
  );

  stroke(hue, 0, 100, textAlpha);
  strokeWeight(2);

  push();

  translate(
    width / 2 - (titleBounds.x + titleBounds.w / 2),
    height / 2 + 156 - (titleBounds.y + titleBounds.h / 2)
  );

  for (let p of titlePoints) {
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
  let maxSize = 142;
for (let i = maxSize; i > 0; i -= 5) {
  let alpha = map(i, 0, maxSize, 0.5, 0);  
  fill((hue + 180) % 360, 80, 100, alpha);
  ellipse(posX, posY, i, i);
}

  // when it plays cursor appears
// let typingSize = 40;
// let typingX = 30;
// let typingY =80;

// if (words.length > 0) {
//   let typingBounds = font.textBounds(words, 0, 0, typingSize);
//   let typingPoints = font.textToPoints(
//     words,
//     0,
//     0,
//     typingSize,
//     { sampleFactor: 0.25 }
//   );

//   stroke(0, 0, 100, 1);
//   strokeWeight(2);

//   push();

//   translate(
//     typingX - typingBounds.x,
//     typingY - (typingBounds.y + typingBounds.h / 2)
//   );

//   for (let p of typingPoints) {
//     point(p.x, p.y);
//   }

//   pop();

//   typingX += typingBounds.w + 10;
// }

// if (frameCount % 20 < 10) {
//   stroke(0, 0, 100, 1);
//   strokeWeight(2);
//   line(typingX, typingY - 25, typingX, typingY + 25);
// }

  
}

let robot = new p5.Speech();

function pressAKey(event) {
  if (!isPlaying) {
    return;
  }

  robot.setVoice('Google UK English Female');

  if (event.key === 'Enter') {
    if (words.trim() !== '') {
      robot.speak(words);
      words = '';
    }
  } else if (event.key === 'Backspace') {
    words = words.slice(0, -1);
  } else if (event.key.length === 1) {
    words += event.key;
  }

  document.getElementById('textInner').textContent = words;
}

window.addEventListener('keydown', pressAKey);

// const toggleTypingMode = () => {
//   isTypingMode = !isTypingMode;
//   if (!isTypingMode) {
//     document.getElementById('textInner').classList.add('hidden');
//   } else {
//     document.getElementById('textInner').classList.remove('hidden');
//   }
// };

// window.addEventListener('click', toggleTypingMode);