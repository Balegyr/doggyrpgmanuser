import loadAssets from "./assets"

function addBoss(bossSpawn) {
  const boss1 = add([
    sprite('boss1'),
    pos(bossSpawn),
    area(),
    scale(4),
    solid(),
    origin("center"),
    health(300),
    "enemy",
    "boss",
    "boss1",
  ])
}

function bossBattle(player, boss1, enemy1Health, enemy2Health) {
  (function bossBattle(i) {
  setTimeout(function() {
    
    if (boss1.hp() > 200) {
      phase1Boss(player, boss1, enemy1Health, enemy2Health)
    }
    else if (boss1.hp() > 100 && boss1.hp() <= 200) {
      phase2Boss(player, boss1, enemy1Health, enemy2Health)
    }
    else if (boss1.hp() > 0 && boss1.hp() <= 100) {
      phase3Boss(player, boss1, enemy1Health, enemy2Health)
    }
    else if (boss1.hp() == 0) {
      console.log("BOSS DIED")
      go('game', {roomCount})
    }
    if (--i) bossBattle(i)
  }, 10000)
  })(100)
}

function phase1Boss(player, boss1, enemy1Health, enemy2Health) {
  
  let attack = randi(0, 5)
  
  switch(attack) {
    case 0: 
      boss1.frame = 1
      wait(1, () => {
        let randomspawn = randi(0, 36)
        let randomspawner = get("boss1spawner")[randomspawn]

        add([
          sprite('enemy2'),
          pos(randomspawner.pos),
          area(),
          health(enemy2Health),
          origin("center"),
          solid(),
          'enemy',
          'enemy2',
          scale(1),
        ])
  
        boss1.frame = 0
      })
      break
    case 1:
      boss1.frame = 2
      wait(1, () => {
        boss1.frame = 3
        for (let i = 0; i < 10; i++) {
          let randomx = rand(32, 1248)
          let randomy = rand(32, 768)
          add([
            sprite('web'),
            pos(randomx, randomy),
            area(),
            health(3),
            origin("center"),
            scale(1),
            "web"
          ])
        }
        boss1.frame = 0
      })
      break
    case 2:
      boss1.frame = 4
      wait(1, () => {
        let randomx = rand(32, 1248)
        let randomy = rand(32, 768)
        add([
          sprite('enemy1'),
          pos(randomx, randomy),
          area(),
          health(enemy1Health),
          origin("center"),
          solid(),
          'enemy',
          'enemy1',
          scale(1),
        ])
        
        let webs = get("web")
        console.log(webs)
        for (let i = 0; i < webs.length; i++) {
          let chance = randi(0, 3)
          let webNum = webs[i]
          if (chance == 0) {
            add([
              sprite('enemy1'),
              pos(webNum.pos),
              area(),
              health(3),
              solid(),
              origin("center"),
              scale(1),
              'enemy',
              'enemy1'
            ])
            destroy(webNum)
          }
          else if (chance == 1) {
            destroy(webNum)
          }
          else if (chance == 2) {
            destroy(webNum)
          }
        }
        boss1.frame = 0
      })
      break
    case 3:
      boss1.frame = 5
      wait(1, () => {
        bossShoot(player, boss1, 1, boss1.pos.x, boss1.pos.y, player.pos.angle(boss1.pos), 600)
        boss1.frame = 0
      })
      break
    case 4:
      boss1.frame = 6
      wait(1, () => {
        boss1.frame = 7
        boss1Roar(boss1, player)
      })
      wait(7.5, () => {
        boss1.frame = 0
      })
  }
}

function bossShoot(player, boss1, bulletsize, posX, posY, dir, speed) {
    const bulletboss1 = add([
      sprite("bulletboss1"),
      scale(bulletsize),
      pos(posX,posY),
      area(),
      origin("center"),
      move(dir, speed),
      "bulletboss1"
    ])
    bossShootTrail(bulletboss1)
}

function bossShootTrail(bulletboss1) {
  (function bossShootTrail(i) {
  setTimeout(function() {
    add([
      sprite('web'),
      pos(bulletboss1.pos),
      area(),
      health(3),
      origin("center"),
      scale(1),
      "web"
    ])
    if (--i) bossShootTrail(i)
  }, 100)
  })(10)
}

function bossDiagShoot(boss1, bulletsize, posX, posY, dirx, diry) {
    const bulletboss1 = add([
      sprite("bulletboss1"),
      scale(bulletsize),
      pos(posX,posY),
      area(),
      origin("center"),
      move(dirx, diry),
      "bulletboss1"
    ])
}

function boss1Roar(boss1, player) {
  (function boss1Roar(i) {
  setTimeout(function() {
    every("enemy1", (enemy) => {
      const dir = boss1.pos.sub(enemy.pos).unit()
      enemy.move(dir.scale(650))
    })
    every("enemy2", (enemy) => {
      const dir = boss1.pos.sub(enemy.pos).unit()
      enemy.move(dir.scale(650))
    })
    const dir = boss1.pos.sub(player.pos).unit()
    player.move(dir.scale(400))
    if (--i) boss1Roar(i)
  }, 1)
  })(200)
}


function phase2Boss(player, boss1, enemy1Health) {
  var attack = randi(0, 4)
  
  switch(attack) {
    case 0: 
      console.log("ATK1")
      break
    case 1: 
      console.log("ATK2")
      break
    case 2: 
      console.log("ATK3")
      break
    case 3: 
      console.log("ATK4")
      break
  }
}

function phase3Boss(player, boss1, enemy1Health) {
  let attack = randi(0, 4)
  
  switch(attack) {
    case 0: 
      console.log("ATK1")
      break
    case 1: 
      console.log("ATK2")
      break
    case 2: 
      console.log("ATK3")
      break
    case 3: 
      console.log("ATK4")
      break
  }
}

function bossCutsceneMove(player, moving, moveherepos) {
  (function bossCutsceneMove(i) {
  setTimeout(function() {
    
    if (player.pos.dist(moveherepos) > 2) {
      player.move(moving.scale(45))
    }
    else if (player.pos.dist(moveherepos) >2) {
      
    }
    else {
      return
    }
    if (--i) bossCutsceneMove(i)
  }, 1)
  })(600)
}


function bossCutsceneCam (player, bossSpawn) {
  let campos = player.pos.y
  let camsize = 1
  let i = 0
  loop(0.05, () => {
    if (i <= 250) {
      camPos(player.pos.x, campos)
      campos -= 1.9
      camScale(camsize)
      camsize -= 0.0008
      i++
    }
  })

  wait(3, () => {
    let bossSpawning = true
    
    loop(1.5, () => {
      if (bossSpawning == true) {
        shake(40)
      }
    })
    wait(9, () => {
      bossSpawning = false
      addBoss(bossSpawn)
      
    })
  })
}



export { bossCutsceneMove, bossCutsceneCam, bossBattle, phase1Boss, phase2Boss, phase3Boss, bossShoot, boss1Roar, addBoss} 