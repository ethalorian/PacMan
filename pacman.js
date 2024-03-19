var pos = 0;
const pacArray = [
  ['PacMan1.png', 'PacMan2.png'], // Right
  ['PacMan3.png', 'PacMan4.png']  // Left
];
const pacMen = [];

function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}

function makePac() {
  let velocity = setToRandom(10);
  let position = setToRandom(200);
  let game = document.getElementById('game');
  let newimg = document.createElement('img');
  newimg.style.position = 'absolute';
  newimg.src = pacArray[0][0]; // Start with the first image in the right direction
  newimg.width = 100;
  newimg.style.left = position.x + 'px';
  newimg.style.top = position.y + 'px';
  game.appendChild(newimg);

  return {
    position,
    velocity,
    newimg,
    direction: 0, // 0 for right, 1 for left
    imgIndex: 0,
  };
}

function update() {
  pacMen.forEach((item) => {
    checkCollisions(item);
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    item.newimg.style.left = item.position.x + 'px';
    item.newimg.style.top = item.position.y + 'px';

    // Update the image based on direction and imgIndex
    item.newimg.src = pacArray[item.direction][item.imgIndex];

    // Increment imgIndex to cycle through the images
    item.imgIndex = (item.imgIndex + 1) % pacArray[item.direction].length;
  });
  setTimeout(update, 200);
}

function checkCollisions(item) {
  if (
    item.position.x + item.velocity.x + item.newimg.width > window.innerWidth ||
    item.position.x + item.velocity.x < 0
  ) {
    item.velocity.x = -item.velocity.x;
    item.direction = item.velocity.x > 0 ? 0 : 1; // Update direction based on the new velocity
  }
  if (
    item.position.y + item.velocity.y + item.newimg.height > window.innerHeight ||
    item.position.y + item.velocity.y < 0
  ) {
    item.velocity.y = -item.velocity.y;
  }
}

function makeOne() {
  pacMen.push(makePac());
}
