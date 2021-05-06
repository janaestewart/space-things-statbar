// so the spaceShip wont fly off screen
// this is so the projectile will spawn on our spaceship sprite when we hit the A button
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . 1 . . . . 1 . . . . . . 
        . . 9 9 9 9 9 9 9 9 9 9 9 9 . . 
        . . 1 . . . 1 . . . . . 1 . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, spaceShip, 200, 0)
})
statusbars.onZero(StatusBarKind.EnemyHealth, function (status) {
    status.spriteAttachedTo().destroy()
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value += -25
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeLifeBy(-1)
})
/**
 * enemyShip = sprites.create(img`
 * 
 * . . . . . . . . . . . . . . . .
 * 
 * . . . . . . . . . . . . . . . .
 * 
 * . . . . . . . . . . . a a a . .
 * 
 * . . . . . . . . . . . a a a . .
 * 
 * . . . . . . . . . . a a a a . .
 * 
 * . . . . . . . . a a a a a a . .
 * 
 * . . . . . . a a a a a a a a a .
 * 
 * . . . . a a a a a a a a a a a .
 * 
 * . . a a a a a a a a a a a a a .
 * 
 * . . a a a a a a a a a a a a a .
 * 
 * . . . a a a a a a a a a a a a .
 * 
 * . . . . . a a a a a a a a a a .
 * 
 * . . . . . . . a a a a a a a a .
 * 
 * . . . . . . . . a a a a a a a .
 * 
 * . . . . . . . . . . a a a a . .
 * 
 * . . . . . . . . . . . a a a . .
 * 
 * `, SpriteKind.Enemy)
 */
let statusbar: StatusBarSprite = null
let projectile: Sprite = null
let enemyShip: Sprite = null
let spaceShip: Sprite = null
spaceShip = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . 2 2 2 . . . . . . . . . . . 
    . . 2 8 2 2 2 . . . . . . . . . 
    . . 2 8 8 8 2 2 2 2 . . . . . . 
    . . 2 8 8 8 8 8 8 2 2 2 . . . . 
    . . 2 2 8 8 8 8 8 8 8 2 2 2 . . 
    . . . 2 2 8 8 8 8 8 8 8 8 2 2 . 
    . . . . 2 8 8 8 8 8 8 8 8 8 2 . 
    . . . . 2 8 8 8 8 8 8 8 8 2 2 . 
    . . . 2 2 8 8 8 8 8 8 2 2 2 . . 
    . . 2 2 8 8 8 8 8 2 2 2 . . . . 
    . . 2 8 8 8 2 2 2 2 . . . . . . 
    . . 2 8 2 2 2 . . . . . . . . . 
    . . 2 2 2 . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
// info.setLife(3)
controller.moveSprite(spaceShip)
// so the spaceShip wont fly off screen
spaceShip.setFlag(SpriteFlag.StayInScreen, true)
let projectile2 = sprites.createProjectileFromSprite(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . 3 3 . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, enemyShip, 10, 10)
statusbars.getStatusBarAttachedTo(0, null)
// continously spawn enemies every half second
game.onUpdateInterval(1000, function () {
    enemyShip = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . a a a . . 
        . . . . . . . . . . . a a a . . 
        . . . . . . . . . . a a a a . . 
        . . . . . . . . a a a a a a . . 
        . . . . . . a a a a a a a a a . 
        . . . . a a a a a a a a a a a . 
        . . a a a a a a a a a a a a a . 
        . . a a a a a a a a a a a a a . 
        . . . a a a a a a a a a a a a . 
        . . . . . a a a a a a a a a a . 
        . . . . . . . a a a a a a a a . 
        . . . . . . . . a a a a a a a . 
        . . . . . . . . . . a a a a . . 
        . . . . . . . . . . . a a a . . 
        `, SpriteKind.Enemy)
    enemyShip.x = scene.screenWidth()
    enemyShip.setVelocity(-60, 0)
    enemyShip.y = randint(10, scene.screenHeight() - 10)
    statusbar = statusbars.create(15, 2, StatusBarKind.EnemyHealth)
    statusbar.attachToSprite(enemyShip)
})
