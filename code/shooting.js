export default function shoot(dir, speed, posX, posY, bulletsize) {
  bullets = [];
    const bullet = add([
      sprite("bullet"),
      scale(bulletsize),
      pos(posX,posY),
      area(),
      origin("center"),
      move(dir, speed),
      lifespan(0.75),
      "bullet",
    ])
}

