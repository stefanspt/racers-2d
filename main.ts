namespace SpriteKind {
    export const side = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    speed += 10
})
controller.A.onEvent(ControllerButtonEvent.Released, function () {
    speed += -10
})
let car: Sprite = null
let road2: Sprite = null
let projectile: Sprite = null
let mySprite = sprites.create(img`
. . . . . . e e c c e e . . . . 
. . . . . e 2 2 2 2 2 2 e . . . 
. . . . 2 c 2 2 2 2 2 2 c 2 . . 
. . . e 2 c 4 2 2 2 2 2 c 2 e . 
. . . f 2 2 4 2 2 2 2 2 c 2 f . 
. . . f 2 2 4 2 2 2 2 2 2 2 f . 
. . . f 2 2 4 2 2 2 2 2 2 2 f . 
. . . f 2 c 2 4 4 2 2 2 c 2 f . 
. . . e 2 c e c c c c e c 2 e . 
. . . e 2 e c b b b b c e 2 e . 
. . . e 2 e b b b b b b e 2 e . 
. . . e e e e e e e e e e e e . 
. . . f e d e e e e e e d e f . 
. . . f e 2 d e e e e d 2 e f . 
. . . f f e e e e e e e e f f . 
. . . . f f . . . . . . f f . . 
`, SpriteKind.side)
controller.moveSprite(mySprite, 100, 0)
mySprite.setPosition(75, 91)
let speed = 50
game.onUpdateInterval(100, function () {
    projectile = sprites.createProjectileFromSide(img`
7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . . . . 
7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . . . . 
7 7 7 7 7 7 7 7 7 7 7 8 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . . . . 
7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 8 8 7 7 7 7 7 7 7 7 7 8 8 7 7 7 7 7 7 7 7 8 7 7 8 7 8 7 7 7 7 7 7 7 8 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . . . . 
7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 8 8 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 8 8 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . . . . 
7 8 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 8 7 7 8 7 7 7 7 7 7 . . . . 
7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 8 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 8 7 7 7 . . . . 
7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 8 8 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 8 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . . . . 
7 7 7 7 7 7 7 7 7 7 7 7 7 7 8 7 7 7 7 7 7 7 7 8 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 8 7 7 7 7 7 7 7 7 7 . . . . 
7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . . . . 
7 7 7 7 7 7 7 7 8 8 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 8 7 7 7 7 7 8 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . . . . 
7 7 7 8 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 8 7 7 7 7 7 7 7 7 7 7 7 7 7 8 7 7 7 7 7 7 . . . . 
7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 8 7 7 7 7 7 7 8 7 7 7 7 7 8 8 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 8 7 7 7 7 7 7 7 7 7 . . . . 
7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 8 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 8 7 7 7 7 7 7 7 7 7 7 . . . . 
7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 8 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 8 7 7 7 7 . . . . 
7 7 7 7 7 7 7 7 8 8 8 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 8 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . . . . 
`, 0, 50)
    road2 = sprites.createProjectileFromSide(img`
. . . . . . . . . . . . . . . . . . . . . . . . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
. . . . . . . . . . . . . . . . . . . . . . . . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
. . . . . . . . . . . . . . . . . . . . . . . . 7 7 7 7 7 7 7 7 7 7 7 8 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
. . . . . . . . . . . . . . . . . . . . . . . . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 8 8 7 7 7 7 7 7 7 7 7 8 8 7 7 7 7 7 7 7 7 8 7 7 8 7 8 7 7 7 7 
. . . . . . . . . . . . . . . . . . . . . . . . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 8 8 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
. . . . . . . . . . . . . . . . . . . . . . . . 7 8 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
. . . . . . . . . . . . . . . . . . . . . . . . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 8 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
. . . . . . . . . . . . . . . . . . . . . . . . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 8 8 7 7 7 7 7 7 7 7 7 7 7 7 7 
. . . . . . . . . . . . . . . . . . . . . . . . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 8 7 7 7 7 7 7 7 7 8 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
. . . . . . . . . . . . . . . . . . . . . . . . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
. . . . . . . . . . . . . . . . . . . . . . . . 7 7 7 7 7 7 7 7 8 8 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 8 7 7 7 7 7 7 
. . . . . . . . . . . . . . . . . . . . . . . . 7 7 7 8 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
. . . . . . . . . . . . . . . . . . . . . . . . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 8 7 7 7 7 7 7 8 7 7 7 7 7 8 8 7 7 7 7 7 7 7 7 7 
. . . . . . . . . . . . . . . . . . . . . . . . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 8 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
. . . . . . . . . . . . . . . . . . . . . . . . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 8 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
. . . . . . . . . . . . . . . . . . . . . . . . 7 7 7 7 7 7 7 7 8 8 8 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 8 7 7 7 7 7 7 
`, 0, 50)
    road2.right = 180
})
game.onUpdateInterval(5000, function () {
    car = sprites.createProjectileFromSide(img`
. . . . . . 8 8 c c 8 8 . . . . 
. . . . . 8 6 6 6 6 6 6 8 . . . 
. . . . 6 c 6 6 6 6 6 6 c 6 . . 
. . . 8 6 c 9 6 6 6 6 6 c 6 8 . 
. . . f 6 6 9 6 6 6 6 6 c 6 f . 
. . . f 6 6 9 6 6 6 6 6 6 6 f . 
. . . f 6 6 9 6 6 6 6 6 6 6 f . 
. . . f 6 c 6 9 9 6 6 6 c 6 f . 
. . . 8 6 c 8 c c c c 8 c 6 8 . 
. . . 8 6 8 c b b b b c 8 6 8 . 
. . . 8 6 8 b b b b b b 8 6 8 . 
. . . 8 8 8 8 8 8 8 8 8 8 8 8 . 
. . . f 8 d 8 8 8 8 8 8 d 8 f . 
. . . f 8 6 d 8 8 8 8 d 6 8 f . 
. . . f f 8 8 8 8 8 8 8 8 f f . 
. . . . f f . . . . . . f f . . 
`, 0, 50)
    car.x = Math.randomRange(50, 110)
})
