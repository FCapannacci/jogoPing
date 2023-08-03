// Definir variáveis do jogo
let ball, playerPaddle, computerPaddle;
const paddleWidth = 10;
const paddleHeight = 100;
const ballSize = 10;
let ballSpeedX = 5;
let ballSpeedY = 0;
let playerScore = 0;
let computerScore = 0;
let ballSpeedIncrease = 1.1; // Fator de aumento de velocidade da bola

function setup() {
  createCanvas(600, 400);
  // Inicializar a bola e as raquetes do jogador e computador no centro
  ball = createVector(width / 2, height / 2);
  playerPaddle = createVector(paddleWidth, height / 2 - paddleHeight / 2);
  computerPaddle = createVector(width - paddleWidth * 2, height / 2 - paddleHeight / 2);
}

function draw() {
  background(0);
  // Desenhar a bola e as raquetes
  drawBall();
  drawPaddle(playerPaddle);
  drawPaddle(computerPaddle);

  // Movimento da bola
  ball.x += ballSpeedX;
  ball.y += ballSpeedY;

  // Colisão com a raquete do jogador
  if (ball.x - ballSize / 2 < playerPaddle.x + paddleWidth &&
      ball.y > playerPaddle.y &&
      ball.y < playerPaddle.y + paddleHeight) {
    ballSpeedX *= -1;
    // Ajustar a velocidade Y da bola após colidir com a raquete
    const relativeIntersectY = playerPaddle.y + paddleHeight / 2 - ball.y;
    const normalizedRelativeIntersectionY = relativeIntersectY / (paddleHeight / 2);
    ballSpeedY = normalizedRelativeIntersectionY * 5;
  }

  // Colisão com a raquete do computador
  if (ball.x + ballSize / 2 > computerPaddle.x &&
      ball.y > computerPaddle.y &&
      ball.y < computerPaddle.y + paddleHeight) {
    ballSpeedX *= -1;
    // Ajustar a velocidade Y da bola após colidir com a raquete
    const relativeIntersectY = computerPaddle.y + paddleHeight / 2 - ball.y;
    const normalizedRelativeIntersectionY = relativeIntersectY / (paddleHeight / 2);
    ballSpeedY = normalizedRelativeIntersectionY * 5;

    // Aumentar a velocidade da bola
    ballSpeedX *= ballSpeedIncrease;
    ballSpeedY *= ballSpeedIncrease;
  }

  // Colisão com as paredes superior e inferior
  if (ball.y - ballSize / 2 < 0 || ball.y + ballSize / 2 > height) {
    ballSpeedY *= -1;
  }

  // Verificar se a bola fez gol
  if (ball.x - ballSize / 2 < 0) {
    // Gol do computador
    computerScore++;
    resetBall();
  } else if (ball.x + ballSize / 2 > width) {
    // Gol do jogador
    playerScore++;
    resetBall();
  }

  // Atualizar posição da raquete do computador
  const computerPaddleSpeed = 4;
  const randomMoveThreshold = 0.4;
  if (ball.y > computerPaddle.y + paddleHeight / 2) {
    computerPaddle.y += computerPaddleSpeed;
  } else if (ball.y < computerPaddle.y + paddleHeight / 2) {
    computerPaddle.y -= computerPaddleSpeed;
  } else if (random() < randomMoveThreshold) {
    computerPaddle.y += random(-computerPaddleSpeed, computerPaddleSpeed);
  }

  // Atualizar posição da raquete do jogador usando as teclas "W" e "S"
  const playerPaddleSpeed = 6;
  if (keyIsDown(87)) { // Tecla "W" para cima
    playerPaddle.y -= playerPaddleSpeed;
  }
  if (keyIsDown(83)) { // Tecla "S" para baixo
    playerPaddle.y += playerPaddleSpeed;
  }

  // Garantir que as raquetes não saiam da tela
  playerPaddle.y = constrain(playerPaddle.y, 0, height - paddleHeight);
  computerPaddle.y = constrain(computerPaddle.y, 0, height - paddleHeight);

  // Mostrar a pontuação na tela
  fill(255);
  textSize(32);
  textAlign(CENTER);
  text(playerScore + " - " + computerScore, width / 2, 50);
}

function drawBall() {
  fill(255);
  ellipse(ball.x, ball.y, ballSize);
}

function drawPaddle(paddle) {
  fill(255);
  rect(paddle.x, paddle.y, paddleWidth, paddleHeight);
}

function resetBall() {
  ball.x = width / 2;
  ball.y = height / 2;
  ballSpeedX = 5;
  ballSpeedY = 0;
}
// Colisão com a raquete do jogador
if (ball.x - ballSize / 2 < playerPaddle.x + paddleWidth &&
    ball.y > playerPaddle.y &&
    ball.y < playerPaddle.y + paddleHeight) {
  // Calcular o ângulo de reflexão da bola após colidir com a raquete do jogador
  const relativeIntersectY = playerPaddle.y + paddleHeight / 2 - ball.y;
  const normalizedRelativeIntersectionY = relativeIntersectY / (paddleHeight / 2);
  const bounceAngle = normalizedRelativeIntersectionY * PI / 4; // Ângulo máximo de 45 graus
  ballSpeedX = ballSpeedX * cos(bounceAngle) * -1;
  ballSpeedY = ballSpeedX * sin(bounceAngle);
}

// Colisão com a raquete do computador
if (ball.x + ballSize / 2 > computerPaddle.x &&
    ball.y > computerPaddle.y &&
    ball.y < computerPaddle.y + paddleHeight) {
  // Calcular o ângulo de reflexão da bola após colidir com a raquete do computador
  const relativeIntersectY = computerPaddle.y + paddleHeight / 2 - ball.y;
  const normalizedRelativeIntersectionY = relativeIntersectY / (paddleHeight / 2);
  const bounceAngle = normalizedRelativeIntersectionY * PI / 4; // Ângulo máximo de 45 graus
  ballSpeedX = ballSpeedX * cos(bounceAngle);
  ballSpeedY = ballSpeedX * sin(bounceAngle);
}
