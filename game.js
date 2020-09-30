'use strict'

/* Game code goes here! */

var VALUES = {
    HUMANO_VELOCITY: 130,
    MOSQUITO_VELOCITY: 240
}

var config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'game-container',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 960, // FULL HD
        height: 720
    },
    physics: {
        default: 'arcade',
        arcade: {
            //gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
}
var game = new Phaser.Game(config)

var humano
var mosquito

var canhao
var canhaoMosquito
var canhaoRaquete

var boom

var chinelos
var venenos
var raquetada

var casaP
var casaG

var barrios
var barrioA1
var barrioA2
var ovob1 = 0, ovob2 = 0

var arvoresG
var arvoreG

var pocasDir
var pocaDir1
var pocaDir2
var ovopd1 = 0, ovopd2 = 0

var pocasN
var pocaN1
var pocaN2
var ovopn1 = 0, ovopn2 = 0

var cursors
var cursors2

var aux = 0
var auxtt = 0
var auxe = 0

var bg

var vidaM = 1
var scoreText
var shieldRect
var graphics

var space
var shift
var ctrl

function preload() {

    this.load.spritesheet('humano', 'assets/sprite_humano.png',
        { frameWidth: 32, frameHeight: 31 });

    this.load.spritesheet('chinelo', 'assets/chinelo_s.png',
        { frameWidth: 21, frameHeight: 21 });

    this.load.spritesheet('veneno', 'assets/sprite_tiro.png', {
        frameWidth: 15, frameHeight: 30
    });

    this.load.spritesheet('mosquito', 'assets/mosquito_s.png',
        { frameWidth: 33, frameHeight: 13 });

    this.load.image('canhao', 'assets/raquete.png');
    this.load.image('canhaoMosquito', 'assets/cannon.png');

    this.load.image('bg', 'assets/zikav3.png');

    this.load.image('casaP', 'assets/casaP.png');
    this.load.image('casaG', 'assets/casaG.png');

    this.load.image('barrioA', 'assets/barrioA.png');
    this.load.image('barrioT', 'assets/barrioT.png');
    this.load.image('barrioOvo', 'assets/barrioOvo.png');

    this.load.image('pocaDir', 'assets/pocaDir.png');
    this.load.image('pocaDirOvo', 'assets/pocaDirOvo.png');
    this.load.image('pocaDirT', 'assets/pocaDirT.png');

    this.load.image('pocaN', 'assets/pocaN.png');
    this.load.image('pocaNOvo', 'assets/pocaNOvo.png');
    this.load.image('pocaNT', 'assets/pocaNT.png');

    this.load.image('arvoreG', 'assets/arvoreG.png');

    this.load.image('boom', 'assets/raquete.png')

    this.load.image('canhao_e', 'assets/raquete_e.png');

}

function create() {

    space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    shift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
    ctrl = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL);

    bg = this.add.tileSprite(
        game.renderer.width / 2, game.renderer.height / 2,
        game.renderer.width, game.renderer.height, 'bg'
    );

    raquetada = this.physics.add.sprite(0, 0, 'boom');
    raquetada.setScale(1);
    raquetada.setSize(40, 50);
    raquetada.setVisible(false);

    pocasDir = this.physics.add.group();

    pocaDir1 = pocasDir.create(396, 85, 'pocaDir');
    pocaDir1.setImmovable(true);
    pocaDir1.setScale(1.5)
    pocaDir2 = pocasDir.create(251, 254, 'pocaDir');
    pocaDir2.setImmovable(true);
    pocaDir2.setScale(1.5)

    pocasN = this.physics.add.group();

    pocaN1 = pocasN.create(107, 611, 'pocaN');
    pocaN1.setImmovable(true);
    pocaN1.setScale(1.5)
    pocaN2 = pocasN.create(779, 61, 'pocaN');
    pocaN2.setImmovable(true);
    pocaN2.setScale(1.5)

    barrioA1 = this.physics.add.sprite(72, 335, 'barrioA');
    barrioA1.setImmovable(true);
    barrioA1.setScale(1.5)
    barrioA2 = this.physics.add.sprite(480, 432, 'barrioA');
    barrioA2.setImmovable(true);
    barrioA2.setScale(1.5);

    canhaoRaquete = this.physics.add.sprite(1, 1, 'canhao');
    canhaoRaquete.isShooting = false;
    canhaoRaquete.shotCounter = 3;
    canhaoRaquete.shotRate = 400;
    canhaoRaquete.setScale(1);
    canhaoRaquete.setSize(40, 50);

    humano = this.physics.add.sprite(130, 330, 'humano');
    humano.hitCounterHumano = 0;
    humano.setScale(2);
    humano.setSize(humano.width - 5, humano.height);
    humano.setOffset(2.5, 0);

    canhao = this.physics.add.sprite(humano.x, humano.y, 'canhao');
    canhao.isShooting = false;
    canhao.shotCounter = 3;
    canhao.shotRate = 30;
    canhao.setScale(0.001);

    chinelos = this.physics.add.group({ maxsize: 20, defaultKey: 'chinelo' })

    //----------------------------------------------------------------------------------------------------------

    mosquito = this.physics.add.sprite(780, 60, 'mosquito');
    mosquito.hitCounterMosquito = 0;
    mosquito.setScale(1.5);
    mosquito.setSize(mosquito.width - 15, mosquito.height);
    mosquito.setOffset(7.5, 0);

    canhaoMosquito = this.physics.add.sprite(mosquito.x, mosquito.y, 'canhaoMosquito');
    canhaoMosquito.isShooting = false;
    canhaoMosquito.shotCounter = 3;
    canhaoMosquito.shotRate = 30;
    canhaoMosquito.setScale(0.01);

    venenos = this.physics.add.group({ maxsize: 20, defaultKey: 'veneno' })

    arvoresG = this.physics.add.group();

    arvoreG = arvoresG.create(264, 155, 'arvoreG');
    arvoreG.setImmovable(true);
    arvoreG.setScale(1.5)
    arvoreG.setSize(arvoreG.width / 2, arvoreG.height / 3 - 35);
    arvoreG.setOffset(16, 75);

    arvoreG = arvoresG.create(408, 275, 'arvoreG');
    arvoreG.setImmovable(true);
    arvoreG.setScale(1.5)
    arvoreG.setSize(arvoreG.width / 2, arvoreG.height / 3 - 35);
    arvoreG.setOffset(16, 75);

    arvoreG = arvoresG.create(216, 491, 'arvoreG');
    arvoreG.setImmovable(true);
    arvoreG.setScale(1.5)
    arvoreG.setSize(arvoreG.width / 2, arvoreG.height / 3 - 35);
    arvoreG.setOffset(16, 75);

    casaP = this.physics.add.sprite(120, 252, 'casaP');
    casaP.setImmovable(true);
    casaP.setScale(1.5)
    casaP.setSize(casaP.width - 17, casaP.height - 66);
    casaP.setOffset(0, 16);

    casaG = this.physics.add.sprite(816, 540, 'casaG');
    casaG.setImmovable(true);
    casaG.setScale(1.5)
    casaG.setSize(casaG.width - 17, casaG.height - 115);
    casaG.setOffset(0, 47);

    scoreText = this.add.text(300, 16, 'VidasMosquito: 0', { fontSize: '32px', fill: '#ff0000' });
    shieldRect = new Phaser.Geom.Rectangle(0, 0, VALUES.SHIELD_RECT_WIDTH, 20);
    shieldRect.setPosition(game.renderer.width - VALUES.SHIELD_RECT_WIDTH - 20, 20)
    graphics = this.add.graphics()
    updateShieldUI()

    this.anims.create({
        key: 'humano-idle',
        frames: this.anims.generateFrameNumbers('humano'),
        frameRate: 18,
        repeat: -1
    })

    this.anims.create({
        key: 'mosquito-idle',
        frames: this.anims.generateFrameNumbers('mosquito', { start: 0, end: 1 }),
        frameRate: 20,
        repeat: -1
    })

    this.anims.create({
        key: 'chinelo-idle',
        frames: this.anims.generateFrameNumbers('chinelo'),
        frameRate: 25,
        repeat: -1
    })

    this.anims.create({
        key: 'veneno-idle',
        frames: this.anims.generateFrameNumbers('veneno'),
        frameRate: 20,
        repeat: -1
    })

    humano.anims.play('humano-idle');
    mosquito.anims.play('mosquito-idle');

    cursors = this.input.keyboard.createCursorKeys();
    cursors2 = this.input.keyboard.addKeys(
        {
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        }
    );

    shift.on('down', function (event) {
        canhao.isShooting = true;
    }, this)

    shift.on('up', function (event) {
        canhao.isShooting = false;
    }, this)

    ctrl.on('down', function (event) {
        canhaoRaquete.isShooting = true;
    }, this)

    ctrl.on('up', function (event) {
        canhaoRaquete.isShooting = false;
    }, this)

    //------------------------------------------------------------

    space.on('down', function (event) {
        canhaoMosquito.isShooting = true;
    }, this)

    space.on('up', function (event) {
        canhaoMosquito.isShooting = false;
    }, this)

}

function firePlayerBullet(context) {
    var rotation = Phaser.Math.Angle.BetweenPoints(canhao, mosquito);
    fireBullet(context, chinelos, canhao.x, canhao.y, canhao.rotation, 400, 'chinelo-idle');
}

function firePlayerBulletR(context) {
    raquetada.x = canhaoRaquete.x;
    raquetada.y = canhaoRaquete.y;
    canhaoRaquete.setTexture('canhao_e');
    auxtt = 0;
    auxe = 1;
}

//-------

function fireEnemyBullet(context, enemy) {
    var rotation = Phaser.Math.Angle.BetweenPoints(canhaoMosquito, humano);
    fireBullet(context, venenos, canhaoMosquito.x, canhaoMosquito.y, canhaoMosquito.rotation, 470, 'veneno-idle')
    aux = 0;
}

//---------

function fireBullet(context, group, x, y, rotation, speed, anim) {
    var bullet = group.get();
    if (!bullet) return;
    bullet.enableBody(true, x, y, true, true);
    bullet.rotation = rotation;
    var velocity = new Phaser.Math.Vector2();
    context.physics.velocityFromRotation(rotation, speed, velocity);
    bullet.setVelocity(velocity.x, velocity.y);
    bullet.anims.play(anim, true);
}

function updatePlayer(context) {

    if (!humano.active) {
        return
    } if (cursors.left.isDown) {
        humano.setVelocityX(-VALUES.HUMANO_VELOCITY);
        canhaoRaquete.x = humano.x - 40;
        canhaoRaquete.y = humano.y;
    } else if (cursors.right.isDown) {
        humano.setVelocityX(+VALUES.HUMANO_VELOCITY);
        canhaoRaquete.x = humano.x + 40;
        canhaoRaquete.y = humano.y;
    } else {
        humano.setVelocityX(0);
    }
    if (cursors.up.isDown) {
        humano.setVelocityY(-VALUES.HUMANO_VELOCITY)
        canhaoRaquete.x = humano.x;
        canhaoRaquete.y = humano.y - 37;
    } else if (cursors.down.isDown) {
        humano.setVelocityY(+VALUES.HUMANO_VELOCITY);
        canhaoRaquete.x = humano.x;
        canhaoRaquete.y = humano.y + 29;
    } else {
        humano.setVelocityY(0);
    }

    //---------------------------------------------------------------

    if (!mosquito.active) {
        return
    } if (cursors2.left.isDown) {
        mosquito.setVelocityX(-VALUES.MOSQUITO_VELOCITY)
    } else if (cursors2.right.isDown) {
        mosquito.setVelocityX(+VALUES.MOSQUITO_VELOCITY);
    } else {
        mosquito.setVelocityX(0);
    }
    if (cursors2.up.isDown) {
        mosquito.setVelocityY(-VALUES.MOSQUITO_VELOCITY)
    } else if (cursors2.down.isDown) {
        mosquito.setVelocityY(+VALUES.MOSQUITO_VELOCITY);
    } else {
        mosquito.setVelocityY(0);
    }

    //---------------------------------------------------------------

    canhao.x = humano.x + 2;
    canhao.y = humano.y;

    auxtt++;
    if (auxtt > 50) {
        auxe = 0;
        auxtt = 0;
        canhaoRaquete.setTexture('canhao');
        raquetada.x = 0;
        raquetada.y = 0;
    }

    canhaoMosquito.x = mosquito.x;
    canhaoMosquito.y = mosquito.y;

    canhao.rotation = Phaser.Math.Angle.BetweenPoints(canhao, mosquito);
    canhaoMosquito.rotation = Phaser.Math.Angle.BetweenPoints(canhaoMosquito, humano);

    canhao.shotCounter++;
    if (canhao.isShooting && canhao.shotCounter > canhao.shotRate) {
        canhao.shotCounter = 0;
        firePlayerBullet(context);
    }
    canhaoRaquete.shotCounter++;
    if (canhaoRaquete.isShooting && canhaoRaquete.shotCounter > canhaoRaquete.shotRate) {
        canhaoRaquete.shotCounter = 0;
        firePlayerBulletR(context);
    }

    //---------------------------------------

    canhaoMosquito.shotCounter++;
    if (canhaoMosquito.isShooting && canhaoMosquito.shotCounter > canhaoMosquito.shotRate) {
        canhaoMosquito.shotCounter = 0;
        fireEnemyBullet(context);
    }

}

function updateBullet(context, chinelo) {
    if (!chinelo.active) {
        return
    } if (!Phaser.Geom.Rectangle.Overlaps(context.physics.world.bounds, chinelo.getBounds())) {
        chinelo.disableBody(true, true);
    }
}

function updateVeneno(context, veneno) {
    if (!veneno.active) {
        return
    } if (!Phaser.Geom.Rectangle.Overlaps(context.physics.world.bounds, veneno.getBounds())) {
        veneno.disableBody(true, true);
    }
}

function hitHumano(humano, other) {
    humano.disableBody(true, true);
    canhao.disableBody(true, true);
    console.log("winner: Mosquito")
}

function hitMosquito(mosquito, other) {
    if (vidaM == 1) {
        vidaM--;
        scoreText.setText('VidasMosquito: ' + vidaM)
        mosquito.disableBody(true, true);
        canhaoMosquito.disableBody(true, true);
        console.log("winner: Humano")
    } else {
        vidaM--;
        scoreText.setText('VidasMosquito: ' + vidaM)
        aux = 1;
        mosquito.x = 500;
        mosquito.y = 250;
    }
}

function barrioA1T() {
    barrioA1.setTexture('barrioT');
    if (vidaM != 1 && ovob1 == 1) {
        vidaM--;
        scoreText.setText('VidasMosquito: ' + vidaM)
    }
    ovob1 = 0
}

function barrioA2T() {
    barrioA2.setTexture('barrioT');
    if (vidaM != 1 && ovob2 == 1) {
        vidaM--;
        scoreText.setText('VidasMosquito: ' + vidaM)
    }
    ovob2 = 0
}

function hpocaN1T() {
    pocaN1.setTexture('pocaNT');
    if (vidaM != 1 && ovopn1 == 1) {
        vidaM--;
        scoreText.setText('VidasMosquito: ' + vidaM)
    }
    ovopn1 = 0
}

function hpocaN2T() {
    pocaN2.setTexture('pocaNT');
    if (vidaM != 1 && ovopn2 == 1) {
        vidaM--;
        scoreText.setText('VidasMosquito: ' + vidaM)
    }
    ovopn2 = 0
}

function hpocaDir1T() {
    pocaDir1.setTexture('pocaDirT');
    if (vidaM != 1 && ovopd1 == 1) {
        vidaM--;
        scoreText.setText('VidasMosquito: ' + vidaM)
    }
    ovopd1 = 0
}

function hpocaDir2T() {
    pocaDir2.setTexture('pocaDirT');
    if (vidaM != 1 && ovopd2 == 1) {
        vidaM--;
        scoreText.setText('VidasMosquito: ' + vidaM)
    }
    ovopd2 = 0
}

//---------------------------------------------

function barrioA1O() {
    barrioA1.setTexture('barrioOvo');
    ovob1 = 1
    if (vidaM == 1) {
        vidaM++;
        scoreText.setText('VidasMosquito: ' + vidaM)
    }
}

function barrioA2O() {
    ovob2 = 1
    barrioA2.setTexture('barrioOvo');
    if (vidaM == 1) {
        vidaM++;
        scoreText.setText('VidasMosquito: ' + vidaM)
    }
}

function pocaN1O() {
    ovopn1 = 1
    pocaN1.setTexture('pocaNOvo');
    if (vidaM == 1) {
        vidaM++;
        scoreText.setText('VidasMosquito: ' + vidaM)
    }
}

function pocaN2O() {
    ovopn2 = 1
    pocaN2.setTexture('pocaNOvo');
    if (vidaM == 1) {
        vidaM++;
        scoreText.setText('VidasMosquito: ' + vidaM)
    }
}

function pocaDir1O() {
    ovopd1 = 1
    pocaDir1.setTexture('pocaDirOvo');
    if (vidaM == 1) {
        vidaM++;
        scoreText.setText('VidasMosquito: ' + vidaM)
    }
}

function pocaDir2O() {
    ovopd2 = 1
    pocaDir2.setTexture('pocaDirOvo');
    if (vidaM == 1) {
        vidaM++;
        scoreText.setText('VidasMosquito: ' + vidaM)
    }
}

function updateShieldUI() {
    graphics.clear()

    shieldRect.width = vidaM / VALUES.PLAYER_SHIELD * VALUES.SHIELD_RECT_WIDTH
    graphics.fillStyle(0x0000ff)
    graphics.fillRectShape(shieldRect)

    shieldRect.width = VALUES.SHIELD_RECT_WIDTH
    graphics.lineStyle(2, 0x00ff00)
    graphics.fillStyle(0x555555)
    graphics.strokeRectShape(shieldRect)
}

function update() {

    mosquito.setCollideWorldBounds();
    humano.setCollideWorldBounds();

    updatePlayer(this);
    if (auxe == 1) {
        raquetada.x = canhaoRaquete.x;
        raquetada.y = canhaoRaquete.y;
    } else if (auxe == 0) {
    }

    for (var chinelo of chinelos.getChildren()) {
        updateBullet(this, chinelo)
    }
    for (var veneno of venenos.getChildren()) {
        updateBullet(this, veneno)
    }

    this.physics.world.collide(humano, casaP);
    this.physics.world.collide(humano, casaG);
    this.physics.world.collide(humano, arvoresG);

    this.physics.world.overlap(mosquito, raquetada, hitMosquito, null, this);

    this.physics.world.overlap(humano, veneno, hitHumano, null, this);
    this.physics.world.overlap(mosquito, chinelo, hitMosquito, null, this);

    this.physics.world.overlap(humano, barrioA1, barrioA1T, null, this);
    this.physics.world.overlap(humano, barrioA2, barrioA2T, null, this);

    this.physics.world.overlap(humano, pocaN1, hpocaN1T, null, this);
    this.physics.world.overlap(humano, pocaN2, hpocaN2T, null, this);

    this.physics.world.overlap(humano, pocaDir1, hpocaDir1T, null, this);
    this.physics.world.overlap(humano, pocaDir2, hpocaDir2T, null, this);

    this.physics.world.overlap(mosquito, barrioA1, barrioA1O, null, this);
    this.physics.world.overlap(mosquito, barrioA2, barrioA2O, null, this);

    this.physics.world.overlap(mosquito, pocaN1, pocaN1O, null, this);
    this.physics.world.overlap(mosquito, pocaN2, pocaN2O, null, this);

    this.physics.world.overlap(mosquito, pocaDir1, pocaDir1O, null, this);
    this.physics.world.overlap(mosquito, pocaDir2, pocaDir2O, null, this);

}