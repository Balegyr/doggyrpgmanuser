export default function loadUI(killCount, playerHealth, playerSpeed, bulletShootDelay, bulletDmg, bulletSpeed, playerScale, bulletScale, levelNum, roomNum) {
  destroyAll("stat")

  const levelTrack = add([
    text(`${levelNum}-${roomNum}`, {size : 80}),
    pos(width()-210, 50),
    fixed(),
    layer('ui'),
  ])
  
  const killCountTrack = add([
    text("KILLED: " + killCount, {size : 50}),
    pos(25, 720),
    fixed(),
    layer("ui"),
    "stat"
  ])

  const playerHealthTrack = add([
    text("HP: " + playerHealth),
    pos(25, 40),
    fixed(),
    layer("ui"),
    "stat"
  ])

  const playerSpeedTrack = add([
    text("MOVEMENT SPEED: " + playerSpeed, {size : 20}),
    pos(25, 110),
    fixed(),
    layer("ui"),
    "stat"
  ])

  const shootDelayTrack = add([
    text("SHOOT COOLDOWN: " + (Math.round(bulletShootDelay*100)/100), {size: 20}),
    pos(25, 140),
    fixed(),
    layer("ui"),
    "stat"
  ])

  const bulletDmgTrack = add([
    text("DAMAGE: " + (Math.round(bulletDmg*10)/10), {size : 20}),
    pos(25, 170),
    fixed(),
    layer("ui"),
    "stat"
  ])

  const bulletSpeedTrack = add([
    text("BULLET SPEED: " + bulletSpeed, {size : 20}),
    pos(25, 200),
    fixed(),
    layer("ui"),
    "stat"
  ])
  
  const playerScaleTrack = add([
    text("FAT: " + playerScale, {size : 20}),
    pos(25, 230),
    fixed(),
    layer("ui"),
    "stat"
  ])

  const bulletScaleTrack = add([
      text("Bullet Size: " + bulletScale, {size : 20}),
      pos(25, 260),
      fixed(),
      layer("ui"),
      "stat"
  ])

  if (get("boss").length > 0) {
    let boss = get("boss")[0]
    const bossHealthTrack = add([
      text("BOSS HP: " + boss.hp()),
      pos(500 ,720),
      fixed(),
      layer("ui"),
      "stat"
    ])
  }
}