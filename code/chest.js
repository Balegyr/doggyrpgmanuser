export default function openChest(chestPosX, chestPosY, levelNum) {
  
  var Bruh = randi(0, 2) //randi(0, levelNum+1)

  const itemTiers = ['itemsSelL', 'itemsSelD', 'itemsSelC', 'itemsSelB', 'itemsSelA', 'itemsSelS', 'itemsSelBOSS']

  var itemTier = itemTiers[Bruh]

  const itemsTierL = [
    "Weight Loss Pill", "Tiny Muscle Enhancement", "Faster Reflexes", "Aspirin", "Slightly Better Bullets", 
  ]
  
  const itemsTierD = [
    "Speed Gem", "Damage Gem", "Fire Rate Gem", "Health Gem", "Bullet Speed Gem",
  ]

  const itemsTierC = [
    
  ]
  const itemsTierB = [
    
  ]
  const itemsTierA = [
    
  ]
  const itemsTierS = [
    
  ]
  const itemsTierBOSS = [
    
  ]
  
  if (itemTier == 'itemsSelL') {
    var itemSelL = randi(0, itemsTierL.length);
    add([
      text("Obtained " + itemsTierL[itemSelL], { size: 24 }),
      pos(chestPosX, chestPosY-30),
      color(255, 255, 255),
      origin("center"),
      layer('ui'),
      lifespan(1, { fade: 0.5 }),
    ])
  }
  else if (itemTier == 'itemsSelD') {
    var itemSelD = randi(0, itemsTierD.length);
    add([
      text("Obtained " + itemsTierD[itemSelD], { size: 24 }),
      pos(chestPosX, chestPosY-30),
      color(255, 255, 255),
      origin("center"),
      layer('ui'),
      lifespan(1, { fade: 0.5 }),
    ])
  }
  else if (itemTier == 'itemsSelC') {
    var itemSelC = randi(0, itemsTierC.length);
    add([
      text("Obtained " + itemsTierC[itemSelC], { size: 24 }),
      pos(chestPosX, chestPosY-30),
      color(255, 255, 255),
      origin("center"),
      layer('ui'),
      lifespan(1, { fade: 0.5 }),
    ])
  }
  else if (itemTier == 'itemsSelB') {
    var itemSelB = randi(0, itemsTierB.length);
    add([
      text("Obtained " + itemsTierB[itemSelB], { size: 24 }),
      pos(chestPosX, chestPosY-30),
      color(255, 255, 255),
      origin("center"),
      layer('ui'),
      lifespan(1, { fade: 0.5 }),
    ])
  }
  else if (itemTier == 'itemsSelA') {
    var itemSelA = randi(0, itemsTierA.length);
    add([
      text("Obtained " + itemsTierA[itemSelA], { size: 24 }),
      pos(chestPosX, chestPosY-30),
      color(255, 255, 255),
      origin("center"),
      layer('ui'),
      lifespan(1, { fade: 0.5 }),
    ])
  }
  else if (itemTier == 'itemsSelS') {
    var itemSelS = randi(0, itemsTierS.length);
    add([
      text("Obtained " + itemsTierS[itemSelS], { size: 24 }),
      pos(chestPosX, chestPosY-30),
      color(255, 255, 255),
      origin("center"),
      layer('ui'),
      lifespan(1, { fade: 0.5 }),
    ])
  }
  else if (itemTier == 'itemsSelBOSS') {
    var itemSelBOSS = randi(0, itemsTierBOSS.length);
    add([
      text("Obtained " + itemsTierBOSS[itemSelBOSS], { size: 24 }),
      pos(chestPosX, chestPosY-30),
      color(255, 255, 255),
      origin("center"),
      layer('ui'),
      lifespan(1, { fade: 0.5 }),
    ])
  }
  
  // atrtribute types:
  // speed, damage, bulletdelay, health, bulletspeed, size, bulletsize
//"Machine Gun", "Five Guys", "CRACK INEJCTION",
  
  switch (itemSelL) {
    case 0: return ['speed', 1]
    case 1: return ['damage', 0.1]
    case 2: return ['bulletdelay', 0.01]
    case 3: return ['health', .25]
    case 4: return ['bulletspeed', 10]
  }
  
  switch (itemSelD) {
    case 0: return ["speed", 10]
    case 1: return ["damage", 0.5]
    case 2: return ["bulletdelay", 0.08]
    case 3: return ["health", 1]
    case 4: return ["bulletspeed", 50]
  }

  switch (itemSelC) {
    case 0: return ["speed", 30]
    case 1: return ["damage", 1]
    case 2: return ["bulletdelay", 0.1]
    case 3: return ["health", 1.5]
    case 4: return ["bulletspeed", 100]
  }

  switch (itemSelB) {
    case 0: return ["speed", 80]
    case 1: return ["damage", 1.25]
    case 2: return ["bulletdelay", 0.12]
    case 3: return ["health", 1.75]
    case 4: return ["bulletspeed", 120]
  }

  switch (itemSelA) {
case 0: return ["bulletdelay", 0.3, "bulletspeed", 200]
  case 1: return ["size", 0.25, "bulletsize", 0.5, "speed", -25, "health", 2]
  case 1: return ["speed", 250, "size", -0.25]
  case 3: return ["damage", 2, "bulletsize", 0.5]
  }

  switch (itemSelS) {
    case 0: return []
    case 1: return []
    case 2: return []
    case 3: return []
  }

  switch (itemSelBOSS) {
    case 0: return []
    case 1: return []
    case 2: return []
    case 3: return []
  }
}