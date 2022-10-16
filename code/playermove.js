export default function move(player, playerSpeed, playerDiagSpeed) {
  if (isKeyDown("w") && isKeyDown("a")) {
    player.move(-playerDiagSpeed, -playerDiagSpeed)
  }
  else if (isKeyDown("w") && isKeyDown("d")) { 
    player.move(playerDiagSpeed, -playerDiagSpeed)
  }
  else if (isKeyDown("w")) {
    player.move(0, -playerSpeed)
  }
  else if (isKeyDown("s") && isKeyDown("a")) {
    player.move(-playerDiagSpeed, playerDiagSpeed)
  }
  else if (isKeyDown("s") && isKeyDown("d")) { 
    player.move(playerDiagSpeed, playerDiagSpeed)
  }
  else if (isKeyDown("s")) {
    player.move(0, playerSpeed)
  }
  else if (isKeyDown("a")) {
    player.move(-playerSpeed, 0)
  }
  else if (isKeyDown("d")) {
    player.move(playerSpeed, 0)
  }
}
