let birds = [];
let score = 0;
let lives = 5;
let maxBirds = 2;
let gameOver = false;

function setup() {
  createCanvas(800, 600);
  for (let i = 0; i < maxBirds; i++) {
    birds.push(new Bird());
  }
}

function draw() {
  background(135, 206, 235); // céu azul

  if (gameOver) {
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(48);
    text("Game Over", width / 2, height / 2);
    textSize(24);
    text("Pontuação: " + score, width / 2, height / 2 + 50);
    return;
  }

  for (let i = 0; i < birds.length; i++) {
    birds[i].move();

    // Se o pássaro passou da tela, perde uma vida
    if (birds[i].x > width + birds[i].r) {
      lives--;
      if (lives <= 0) {
        gameOver = true;
      }
      birds[i] = new Bird(); // reposiciona o pássaro
    }

    birds[i].show();
  }

  // Exibe pontuação e vidas
  fill(0);
  textSize(24);
  text("Pontuação: " + score, 10, 30);
  text("Vidas: " + lives, 10, 60);
}

function mousePressed() {
  if (gameOver) return;

  for (let i = 0; i < birds.length; i++) {
    if (birds[i].isHit(mouseX, mouseY)) {
      score++;
      birds[i] = new Bird(); // substitui o pássaro
      break;
    }
  }
}

class Bird {
  constructor() {
    this.r = 30;
    this.x = random(-200, -50);
    this.y = random(50, height - 100);
    this.speed = 2 + score * 0.3;
    this.color = color(random(255), random(255), random(255));
  }

  move() {
    this.x += this.speed;
  }

  show() {
    fill(this.color);
    ellipse(this.x, this.y, this.r * 2, this.r);
    triangle(this.x + this.r, this.y, this.x + this.r + 10, this.y - 5, this.x + this.r + 10, this.y + 5);
    fill(0);
    ellipse(this.x - 10, this.y - 5, 5, 5);
  }

  isHit(px, py) {
    let d = dist(px, py, this.x, this.y);
    return d < this.r;
  }
}