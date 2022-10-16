import loadAssests from './assets'

function startScreen(roomCount) {
  add([
    sprite('startScreen', {width: width(), height: height()}),
  ])
  loop(3, () => {
    add([
      text("Press P to Start", { size:  48}),
      pos(width()/2, height()/2),
      color(255, 255, 255),
      origin("center"),
      lifespan(2.5, { fade: 2}),
    ])
  })
  onKeyPress("p", () => {
    go('game', {roomCount}) 
  })
}

function deathScreen(roomCount) {
  add([
    sprite('deathScreen', {width: width(), height: height()}),
  ])
  
  add([
    text("NICE\nTRY"),
    pos(width()*0.5-150, height()*0.66-100),
  ])
  
  const restartButton = add([
    pos(width()*0.5-250, height()*0.66+100),
    area(),
    solid(),
    rect(200, 48),
    text("RESTART BITCH ASS", { size:  48}),
    color(70, 0, 0),
    'restartButton',
  ])
  
  onClick('restartButton', (restartButton) =>
    go('game', {roomCount}))
}

export {startScreen, deathScreen}