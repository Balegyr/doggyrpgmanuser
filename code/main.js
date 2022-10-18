import kaboom from "kaboom"
import rooms from "./rooms"
import loadAssets from "./assets"
import shoot from "./shooting"
import openChest from "./chest"
import loadUI from "./ui"
import roomsboss from "./roomsboss"
import {bossCutsceneMove, bossCutsceneCam, bossBattle, phase1Boss, phase2Boss, phase3Boss, bossShoot, addBoss} from "./boss"
import move from "./playermove"
import {startScreen, deathScreen} from "./screens"
import checkEnemyCollision from "./enemycollision"

kaboom({
  background: [70, 70, 70],
})

loadAssets()

let start = true

let levelNum = 1
let roomNum = 1

let roomCount = 0
let bossRoom = false
let bossNumber = 0
let bossBattleStart = false
let cutscene = false
let preBossBattle = true
let bossSpawned = false
let fightingboss = false

let playerSpawned = false

let shotisDelayed = false
let roomCleared = false
var killCount = 0
let playerTookDmg = false

let rockHealth = 3

let enemy1Dmg = 1
let enemy1Speed = 150
let enemy1Health = 3

let enemy2Speed = 180
let enemy2Health = 5

let bossDmg = 4
let boss1BulletDmg = 2
let bossSpeed = 75
let bossHealth = 100
let bossScale = 15

let playerSpeed = 200
let playerDiagSpeed = (playerSpeed * Math.sqrt(0.5))
let playerHealth = 5
let playerScale = 1

let bulletSpeed = 400
let bulletDmg = 1 
let bulletShootDelay = 0.7
let bulletScale = 1

scene('startScreen', () => {
  startScreen(roomCount)
});

scene('deathScreen', () => {
  deathScreen(roomCount)
});

scene('game', ({roomCount}) => {
  playerSpawned = false
  
  layers([
    "bg",
    "game",
    "ui",
  ], "game")
  
  camScale(1)
  camPos(488, 280)

  if (roomNum % 10 == 0) {
    bossRoom = true
  }

  if (bossRoom != true) {
    currentLevel = rooms[roomCount]
  }
    
  else if (bossRoom == true) {
    currentLevel = roomsboss[bossNumber]
  }

  const roomConfig = {
    width:32,
    height:32,
    
    '=': () =>[
      sprite('wall'),
      area(),
      solid(),
      origin("center"),
      'block',
    ],

    '+': () =>[
      sprite('detect'),
      area(),
      origin("center"),
      'detect',
    ],

    '0': () =>[
      sprite('rock'),
      area(),
      solid(),
      origin("center"),
      health(rockHealth),
      'rock',
    ],

    'X': () =>[
      sprite('enemy1'),
      area(),
      health(enemy1Health),
      origin("center"),
      solid(),
      'enemy',
      'enemy1',
      scale(1),
    ],


    '*': () =>[
      sprite('spawntile'),
      area(),
      layer("bg"),
      origin("center"),
      "spawntile"
    ],
    
    '-': () =>[
      sprite('wall2'),
      area(),
      origin("center"),
      "wall2",
      "block"
    ],

    '$': () =>[
      sprite('middle'),
      area(),
      origin("center"),
      "middle"
    ],
    
    'P': () =>[
      sprite('playermoveshere'),
      area(),
      origin("center"),
      layer("bg"),
      "playermoveshere"
    ],

    'b': () =>[
      sprite('bossSpawntile'),
      area(),
      origin("center"),
      "bossSpawntile"
    ],

    '#': () =>[
      sprite('web'),
      area(),
      origin("center"),
      health(3),
      "web"
    ],

    '!': () =>[
      sprite('boss1spawner'),
      area(),
      origin("center"),
      "boss1spawner",
    ],
  }
    
  loadUI(killCount, playerHealth, playerSpeed, bulletShootDelay, bulletDmg, bulletSpeed, playerScale, bulletScale, levelNum, roomNum)

  const player = add([
    sprite('player'),
    pos(0, 0),
    area(),
    scale(playerScale),
    solid(),
    origin("center"),
    health(playerHealth),
    'player'
  ])

  player.onUpdate(() => {
    if (playerSpawned == false) {
      let spawn = get("spawntile")[0]
      player.moveTo(spawn.pos)
      playerSpawned = true
      loadUI(killCount, playerHealth, playerSpeed, bulletShootDelay, bulletDmg, bulletSpeed, playerScale, bulletScale, levelNum, roomNum)
    }
  })
  
  playerTookDmg = true
  shotisDelayed = true
  wait(1, () => {
    shotisDelayed = false
    playerTookDmg = false
  })

  player.onUpdate(() => {
    if (bossRoom == true) {
      if (preBossBattle == true) {
        camPos(player.pos)
      }
    }
  })

  onUpdate("wall", (b) => {
    b.solid = b.pos.dist(player.pos) <= 32
})

  onUpdate("player", (player) => {
    if (bossRoom == true && cutscene == false && bossSpawned == false) {
      every("detect", (detector) => {
        if (player.isTouching(detector)) {
          preBossBattle = false
          playCutscene()
        }
      }) 
    }
  })

  //boss1 eating
  onUpdate("boss1", (boss1) => {
    if (bossRoom == true) {
      every("enemy1", (enemy1) => {
        if (boss1.pos.dist(enemy1.pos) < 100) {
          boss1.frame = 8
          destroy(enemy1)
          boss1.heal(enemy1.hp()*5)

          wait(0.5, () => {
            boss1.frame = 0
          })
        }
      }) 
      every("enemy2", (enemy2) => {
        if (boss1.pos.dist(enemy2.pos) < 100) {
          boss1.frame = 8
          destroy(enemy2)
          boss1.heal(enemy2.hp()*5)

          wait(0.5, () => {
            boss1.frame = 0
          })
        }
      }) 
    }
  })

  var playCutscene = (function() {
    var playonce = false;
    return function() {
      if (!playonce) {
        playonce = true
        
        cutscene = true
        let movehere = get("playermoveshere")[0]
        let bosstile = get("bossSpawntile")[0]
        let bossSpawn = bosstile.pos
        let moveherepos = movehere.pos
        const moving = movehere.pos.sub(player.pos).unit()
        bossCutsceneMove(player, moving, moveherepos)
        bossCutsceneCam(player, bossSpawn)
        wait(13, () => {
          cutscene = false
          bossSpawned = true
          fightingboss = true
          startBossBattle(player)
          loadUI(killCount, playerHealth, playerSpeed, bulletShootDelay, bulletDmg, bulletSpeed, playerScale, bulletScale, levelNum, roomNum)
        })
        
      }
    }
  })()

  function startBossBattle(player) {
    let boss1 = get("boss1")[0]

    wait(1, () => {
      phase1Boss(player, boss1, enemy1Health, enemy2Health)
    })
    bossBattle(player, boss1, enemy1Health, enemy2Health)
  }
  

  wait(0.5, () => {
    onUpdate("enemy1", (enemy) => {
      const dir = player.pos.sub(enemy.pos).unit()
      enemy.move(dir.scale(enemy1Speed))

      checkEnemyCollision(enemy1Speed)
    })
  })


  wait(0.5, () => {
    onUpdate("enemy2", (enemy) => {
      const dir = player.pos.sub(enemy.pos).unit()
      enemy.move(dir.scale(enemy2Speed))
      
      checkEnemyCollision(enemy2Speed)
    })
  })

  onUpdate ("enemy2", (enemy) => {
    let webchance = randi(0, 300)
    if (webchance == 0) {
      add([
        sprite('web'),
        pos(enemy.pos),
        area(),
        health(3),
        origin("center"),
        scale(1),
        "web"
      ])
    }
  })


  onUpdate ("enemy", (enemy) => {
    if (player.isTouching(enemy) && playerTookDmg == false) {
      player.hurt(enemy1Dmg)
      if (playerHealth != 0) {
        playerHealth--
        loadUI(killCount, playerHealth, playerSpeed, bulletShootDelay, bulletDmg, bulletSpeed, playerScale, bulletScale, levelNum, roomNum)
      }      
      playerTookDmg = true
      wait (0.6, () => {
        playerTookDmg = false
      })
      
      player.on('death', () => {
        destroy(player)
        go('deathScreen')
        roomNum = 1
        levelNum = 1
        killCount = 0
        playerSpeed = 200
        playerDiagSpeed = (playerSpeed * Math.sqrt(0.5))
        playerHealth = 4
        playerScale = 1
        bulletSpeed = 400
        bulletDmg = 1 
        bulletShootDelay = 0.7
        bulletScale = 1
      })
    }
  })

  onUpdate("enemy", (enemy) => {
    every("bullet", (bullet) => {
      if (bullet.isTouching(enemy)) {
        destroy(bullet)
        if (enemy.hp() <= bulletDmg) {
          destroy(enemy)
          killCount++
          loadUI(killCount, playerHealth, playerSpeed, bulletShootDelay, bulletDmg, bulletSpeed, playerScale, bulletScale, levelNum, roomNum)
        }
        else {
          loadUI(killCount, playerHealth, playerSpeed, bulletShootDelay, bulletDmg, bulletSpeed, playerScale, bulletScale, levelNum, roomNum)
          enemy.hurt(bulletDmg)
        }
      }
    })
  })

  onUpdate ("bulletboss1", (boss1Bullet) => {
    if (player.isTouching(boss1Bullet) && playerTookDmg == false) {
      destroy(boss1Bullet)
      player.hurt(boss1BulletDmg)
      if (playerHealth != 0) {
        playerHealth--
        loadUI(killCount, playerHealth, playerSpeed, bulletShootDelay, bulletDmg, bulletSpeed, playerScale, bulletScale, levelNum, roomNum)
      }      
      playerTookDmg = true
      wait (0.6, () => {
        playerTookDmg = false
      })
      
      player.on('death', () => {
        destroy(player)
        go('deathScreen')
      })
    }
  })
  
  onUpdate('enemy', (enemy) => {
    let enemyCount = get("enemy")
    if (enemyCount.length <= 0) {
      const chest = add([
        sprite('chest'),
        pos(480, 288),
        area(),
        origin("center"),
        'block',
        'chest', 
      ])
      roomCleared = true
      wait(3, () => {
        loop(1.5, () => {
          shake(30)
        })
      })
      roomCount++        
      wait(7, () => {
        if (roomCount < rooms.length) {
          go('game', {roomCount})
          roomNum ++
          if (roomNum % 2 == 0) {
            enemy1Health += 0.25
          }
          if (roomNum == 11){
            levelNum ++
            roomNum = 1
          }
          roomCleared = false
        }
      })
    }
  })

  onCollide("bullet", "block", (bullet) => {
    destroy(bullet)
  })
  onCollide("bulletboss1", "block", (boss1Bullet) => {
    destroy(boss1Bullet)
  })
  

  onUpdate("rock", (rock) => {
    every("bullet", (bullet) => {
      if (bullet.isTouching(rock)) {
        destroy(bullet)
        if (rock.hp() <= bulletDmg) {
          destroy(rock)
        }
        else {
          rock.hurt(bulletDmg)
        }
      }
    })
  })

  onUpdate("web", (web) => {
    every("bullet", (bullet) => {
      if (bullet.isTouching(web)) {
        destroy(web)
      }
      web.on("death", () => {
        console.log("grr")
      })    
    })
  })

  onUpdate("rock", (rock) => {
    every("enemy", (enemy) => {
      if (enemy.isTouching(rock)) {
        destroy(rock)
      }
    })
  })

  onUpdate("chest", (chest) => {
    if (player.isTouching(chest) && roomCleared == true) {
    destroy(chest)
    
      var chestLoot = openChest(chest.pos.x,chest.pos.y, levelNum)
  3
      for (let i = 0; i < chestLoot.length; i += 2) {
        let statType = chestLoot[i]
        let statAmt = chestLoot[i+1]
        
        if (statType == "speed") {
        playerSpeed += statAmt
        playerDiagSpeed = (playerSpeed * Math.sqrt(0.5))
        }
        if (statType == "health") {
          playerHealth += statAmt
        }
        if (statType == "bulletspeed") {
          bulletSpeed += statAmt
        }
        if (statType == "damage") {
          bulletDmg += statAmt
        }
        if (statType == "bulletdelay") {
          bulletShootDelay -= statAmt
        }
        if (statType == "size") {
          playerScale += statAmt
          player.update()
        }
        if (statType == "bulletsize") {
          bulletScale += statAmt
        }
      }
    }
    loadUI(killCount, playerHealth, playerSpeed, bulletShootDelay, bulletDmg, bulletSpeed, playerScale, bulletScale, levelNum, roomNum)
  })

  player.onUpdate(() => {
    if (cutscene == false) {
      move(player, playerSpeed, playerDiagSpeed)

      if (isKeyDown("]")) {
        roomNum = 10
        go('game', {roomCount})
      }
      
      if (isKeyDown("left")) {
        if (shotisDelayed == false) {
          shoot(LEFT, bulletSpeed, player.pos.x,player.pos.y, bulletScale)
          shotisDelayed = true
          wait(bulletShootDelay, () => {
            shotisDelayed = false
          })
        }  
      }
      else if (isKeyDown("up")) {
        if (shotisDelayed == false) {
          shoot(UP, bulletSpeed, player.pos.x,player.pos.y, bulletScale)
          shotisDelayed = true
          wait(bulletShootDelay, () => {
            shotisDelayed = false
          })
        }  
      }
      else if (isKeyDown("down")) {
        if (shotisDelayed == false) {
          shoot(DOWN, bulletSpeed, player.pos.x,player.pos.y, bulletScale)
          shotisDelayed = true
  
          wait(bulletShootDelay, () => {
            shotisDelayed = false
          })
        }  
      }
      else if (isKeyDown("right")) {
        if (shotisDelayed == false) {
          
          shoot(RIGHT, bulletSpeed, player.pos.x,player.pos.y, bulletScale)
          shotisDelayed = true
  
          wait(bulletShootDelay, () => {
            shotisDelayed = false
          })
        }  
      }
    }
  })
  addLevel(currentLevel, roomConfig)
})

go('startScreen')
