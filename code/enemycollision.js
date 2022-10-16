export default function checkEnemyCollision(enemySpeed) {
  let enemies = get("enemy")
  if (enemies.length > 1) {
    let temp1 = enemies[0]
    let temp2 = enemies[1]
    if (temp2.isTouching(temp1)) {
      const dir1 = temp2.pos.sub(temp1.pos).unit()
      temp2.move(dir1.scale(enemySpeed))
    }
  
    if (enemies.length > 2) {
      let temp3 = enemies[2]
      if (temp3.isTouching(temp2)) {
        const dir2 = temp3.pos.sub(temp2.pos).unit()
        temp3.move(dir2.scale(enemySpeed))
      }
      if (temp3.isTouching(temp1)) {
        const dir3 = temp3.pos.sub(temp1.pos).unit()
        temp3.move(dir3.scale(enemySpeed))
      }
  
      if (enemies.length > 3) {
        let temp4 = enemies[3]
        if (temp4.isTouching(temp1)) {
          const dir4 = temp4.pos.sub(temp1.pos).unit()
          temp4.move(dir4.scale(enemySpeed)) 
        }
        if (temp4.isTouching(temp2)) {
          const dir5 = temp4.pos.sub(temp2.pos).unit()
          temp4.move(dir5.scale(enemySpeed)) 
        }
        if (temp4.isTouching(temp3)) {
          const dir6 = temp4.pos.sub(temp3.pos).unit()
          temp4.move(dir6.scale(enemySpeed)) 
        }
        
        if (enemies.length > 4) {
          let temp5 = enemies[4]
          if (temp5.isTouching(temp1)) {
            const dir7 = temp5.pos.sub(temp1.pos).unit()
            temp5.move(dir7.scale(enemySpeed)) 
          }
          if (temp5.isTouching(temp2)) {
            const dir8 = temp5.pos.sub(temp2.pos).unit()
            temp5.move(dir8.scale(enemySpeed)) 
          }
          if (temp5.isTouching(temp3)) {
            const dir9 = temp5.pos.sub(temp3.pos).unit()
            temp5.move(dir9.scale(enemySpeed)) 
          }
          if (temp5.isTouching(temp4)) {
            const dir10 = temp5.pos.sub(temp4.pos).unit()
            temp5.move(dir10.scale(enemySpeed)) 
          }
  
          if (enemies.length > 5) {
            let temp6 = enemies[5]
            if (temp6.isTouching(temp1)) {
              const dir11 = temp6.pos.sub(temp1.pos).unit()
              temp6.move(dir11.scale(enemySpeed)) 
            }
            if (temp6.isTouching(temp2)) {
              const dir12 = temp6.pos.sub(temp2.pos).unit()
              temp6.move(dir12.scale(enemySpeed)) 
            }
            if (temp6.isTouching(temp3)) {
              const dir13 = temp6.pos.sub(temp3.pos).unit()
              temp6.move(dir13.scale(enemySpeed)) 
            }
            if (temp6.isTouching(temp4)) {
              const dir14 = temp6.pos.sub(temp4.pos).unit()
              temp6.move(dir14.scale(enemySpeed)) 
            }
            if (temp6.isTouching(temp5)) {
              const dir15 = temp6.pos.sub(temp5.pos).unit()
              temp6.move(dir15.scale(enemySpeed)) 
            }
  
            if (enemies.length > 6) {
              let temp7 = enemies[6]
              if (temp7.isTouching(temp1)) {
                const dir16 = temp7.pos.sub(temp1.pos).unit()
                temp7.move(dir16.scale(enemySpeed)) 
              }
              if (temp7.isTouching(temp2)) {
                const dir17 = temp7.pos.sub(temp2.pos).unit()
                temp7.move(dir17.scale(enemySpeed)) 
              }
              if (temp7.isTouching(temp3)) {
                const dir18 = temp7.pos.sub(temp3.pos).unit()
                temp7.move(dir18.scale(enemySpeed)) 
              }
              if (temp7.isTouching(temp4)) {
                const dir19 = temp7.pos.sub(temp4.pos).unit()
                temp7.move(dir19.scale(enemySpeed)) 
              }
              if (temp7.isTouching(temp5)) {
                const dir20 = temp7.pos.sub(temp5.pos).unit()
                temp7.move(dir20.scale(enemySpeed)) 
              }
              if (temp7.isTouching(temp6)) {
                const dir21 = temp7.pos.sub(temp6.pos).unit()
                temp7.move(dir21.scale(enemySpeed)) 
              }
  
              if (enemies.length > 7) {
                let temp8 = enemies[7]
                if (temp8.isTouching(temp1)) {
                  const dir22 = temp8.pos.sub(temp1.pos).unit()
                  temp8.move(dir22.scale(enemySpeed)) 
                }
                if (temp8.isTouching(temp2)) {
                  const dir23 = temp8.pos.sub(temp2.pos).unit()
                  temp8.move(dir23.scale(enemySpeed)) 
                }
                if (temp8.isTouching(temp3)) {
                  const dir24 = temp8.pos.sub(temp3.pos).unit()
                  temp8.move(dir24.scale(enemySpeed)) 
                }
                if (temp8.isTouching(temp4)) {
                  const dir25 = temp8.pos.sub(temp4.pos).unit()
                  temp8.move(dir25.scale(enemySpeed)) 
                }
                if (temp8.isTouching(temp5)) {
                  const dir26 = temp8.pos.sub(temp5.pos).unit()
                  temp8.move(dir26.scale(enemySpeed)) 
                }
                if (temp8.isTouching(temp6)) {
                  const dir27 = temp8.pos.sub(temp6.pos).unit()
                  temp8.move(dir27.scale(enemySpeed)) 
                }
                if (temp8.isTouching(temp7)) {
                  const dir28 = temp8.pos.sub(temp7.pos).unit()
                  temp8.move(dir28.scale(enemySpeed)) 
                }
              }
            }
          }
        }
      }
    }
  }  
}