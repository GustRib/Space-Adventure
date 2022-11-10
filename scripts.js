// As tarefas são:
// 1) Contabilize o número de colisões entre o objeto referente à "nave" e ao "asteróide".
// 2) Dê um número de 5 vidas ao jogador. Cada vez que a "nave" colidir com o "asteróide" 1 vida é perdida.
// 3) Quando atingir 0 vidas, mude para cena 3, que deve ter um escrito "Game Over - Clique para jogar novamente". Clicando na tela da cena 3 o jogador volta à Cena 2 com os valores vida etc zerados (uma nova jogada).
// 4) Crie um contador de tempo para o jogo, e crie um Ranking com os melhores tempos. Só precisa manter o Ranking dos 3 primeiros lugares.
// 5) Faça com que apareçam mais objetos "asteróides" para quando a nave não tem colisão por mais de X tempo (considere um tempo razoável - e.g. a cada 30 segundos). No mínimo deve haver 3 "asteróides" na tela.
// 6) Crie um novo objeto (parecido com o Bouncing -- procure no Khan soluções para Boucing e desenvolva a sua) que faz com que uma imagem/objeto (use, por exemplo, a imagem avatars/primosaur-seed") fica saltando na tela. Como no exemplo da nosa aula do retângulo que aumentava de velocidade você não deve criar regras para que ele não saia da tela.
// 7) Crie os níveis: fácil, normal e difícil. Cada um dos níveis deve ter um nível de dificuldade. Por exemplo:
//     Nível 1: 1 asteróide e não aumenta a velocidade
//     Nível 2: 2 asteróides e aumenta a velocidade destes asteróides
//     Nível 3: 3 asteróides, aumenta a velocidade destes asteróides e insere o objeto saltando na tela (nosso bouncing do item 6)
// 8) Crie um objeto que soma 1 vida às vidas do jogador (1 UP). Ele deve surgir em um momento aleatório (Esse bônus deve respeitar o intervalo de, no mínimo, 2 min entre cada aparição).
// 9) Crie um objeto que quando o jogador passar por cima tem o benefício de reduzir a velocidade de todos os outros objetos (asteróides etc) que estão aparecendo na tela. Este objeto deve surgir em intervalos de 30 segundos, pelo menos.

// Atenção! Faça primeiro o que é pedido no enunciado. Jogos com mais características do que solicitado podem ganhar pontos extras, desde que devidamente justificados.

// Mas não esqueça, mais uma vez, o principal é desenvolver o que o enunciado pede, extra é extra!

//--------------------------------------------------------------------------------------------------------------------------
// controla a cena
// controla a cena
var currentScene;

// contador de estrelas

//1) Contabilize o número de colisões entre o objeto referente à "nave" e ao "asteróide".

Mover.prototype.display = function() {
    stroke(0);
    strokeWeight(2);
    fill(127);
    ellipse(this.position.x, this.position.y, 30, 30);

    if(mouseX > this.position.x-10 && mouseX < this.position.x+10 && mouseY > this.position.y-10 && mouseY < this.position.y+10 && bater)
    {
        bater = false;
        vida--;
    }
    if(vida === 0)
    {
        drawScene3();
    }

  //3) Quando atingir 0 vidas, mude para cena 3, que deve ter um escrito "Game Over - Clique para jogar novamente". Clicando na tela da cena 3 o jogador volta à Cena 2 com os valores vida etc zerados (uma nova jogada).

var drawScene3 = function() {
    currentScene = 3;
    background(0, 0, 0);
    fill(255, 255, 255);
    textSize(39);
    text("Game Over", 65, height/2);
    textSize(15);
    text("Clique para jogar novamente", (width/2)-60, (height/2)+50);
};

//4) Crie um contador de tempo para o jogo, e crie um Ranking com os melhores tempos. Só precisa manter o Ranking dos 3 primeiros lugares.

var drawScene2 = function() {
    currentScene = 2;
    background(173, 239, 255);
    fill(7, 14, 145);
    image(getImage("space/background"), 0,0, width, height);
    fill(255, 255, 255);
    textSize(15);
    text("Número de vidas: " + vida, 10, 25);
    text("Tempo: " + minutos + " :" + segundos + " :" + millisegundos , 150, 25);
    
    millisegundos++;
    tempoTotal ++;

        if(millisegundos === 100){
            segundos++;
            millisegundos = 0;
        }

        if(segundos === 60){
            segundos = 0;
            minutos++;
        }

        if(bater){
            tempoBatida++;
        }
        else{
            tempoBatida = 0;
        }

        if(asteroides === 0 && tempoBatida >= 3000){
            asteroides = 1;
            tempoBatida = 0;
        }

        else if(asteroides === 1 && tempoBatida >= 3000){
            asteroides = 2;
        }

//continua o resto da função aqui.....

//7) Crie os níveis: fácil, normal e difícil. Cada um dos níveis deve ter um nível de dificuldade. Por exemplo:  

var drawScene2 = function() {

//código anterior vem antes aqui

//código para os níveis de dificuldade. É necessário criar as funções antes: var moverNivel2 = new Mover(); 
//comentário - var moverNivel3 = new Mover();  var bouncing = new Bouncing(); e as demais

    mover.update();
    mover.checkEdges();
    mover.display(); 

    if(nivel >= 2){
        moverNivel2.update();
        moverNivel2.checkEdges();
        moverNivel2.display(); 

        if(nivel === 3){
            moverNivel3.update();
            moverNivel3.checkEdges();
            moverNivel3.display(); 
        }
    }

    if(asteroides >= 1){
        mover2.update();
        mover2.checkEdges();
        mover2.display(); 

        if(asteroides === 2){
            mover3.update();
            mover3.checkEdges();
            mover3.display(); 
        }
    }

    if(nivel === 3){
    bouncing.update();
    bouncing.checkEdges();
    bouncing.display(); 
    }
};

var count=0;
var contador=0;
var MAX_HEALTH = 5,
    STARTING_SCALE = 1.2,
    POWER_UP_LIFETIME = 200;

var healthImage = getImage("cute/Heart");
var enemyRockImage = getImage("cute/Rock");
var player = {
    health: MAX_HEALTH
};

var State = {
    START: 0,
    PLAYING: 1,
    PAUSED: 2,
    LOST: 3,
    WON: 4
};
var state = State.START;

var canvasScale = STARTING_SCALE;

/** Show loss of health for a few frames after being hit. */
var drawPlayerImpact = function() 
{
    var impactFrames = 15;
    if (frameCount - player.lastCollided >= impactFrames) 
    {
        return;
    }
    
    var createBody = function(x, y) {
    return {
        x: x,
        y: y,
        deathFrame: Infinity
    };
};
    
    var canvas = {
    x: 0,
    y: 0,
    height: height * canvasScale,
    width: width * canvasScale
    };
    
    var createProjectile = function(x, y, dx, dy) {
    var projectile = createBody(x, y);
    projectile.dx = dx;
    projectile.dy = dy;
    return projectile;
};
    
    var createPowerUp = function(x, y) 
    {
        var powerUp = createProjectile(x, y, 0, 0);
        powerUp.deathFrame = frameCount + POWER_UP_LIFETIME;
        powerUp.scale = 1;
    
        var randVal = random();
        
        if (randVal < 0.06 && player.health < MAX_HEALTH) 
        {
            powerUp.typeof = powerUp.HEALTH;
        
        }
    };

    
    var drawHealth = function() 
    {
        var x = 4 * (canvas.width - 30) / canvasScale;
        for (var i = 0; i < min(player.health, 40); i += 1) 
        {
            pushMatrix();
            scale(0.48, 0.48);
            image(healthImage, x, -30);
            popMatrix();
            x -= 110;
        }
    };
};

var drawMeta = function() {
    resetMatrix();
    scale(0.5, 0.5);

    if (state === State.PLAYING || state === State.PAUSED) {
        //drawHealth();
    }
};

// funcao desenha estrela
var makeStars = function() {
    fill(212, 239, 247);
    ellipse(random(width),random(height),5,5);
    count++;
    //println(count);
};
/* Objeto Mover */

var Mover = function() {
//  this.position = new PVector(random(width), random(height));
    this.position = new PVector(500, random(height));
    this.velocity = new PVector(random(-25, -1), random(-0.4, -0.4));
    // adicionando acelerando crescente mas constante ao objeto
    this.acceleration = new PVector(-0.001,0.005);
    //this.acceleration = new PVector(-0.003,-0.00001);
    // limite de velocidade
    this.topspeed = 10;    
};

Mover.prototype.update = function() {
    // adicionando a aceleração à velocidade que já temos
    this.velocity.add(this.acceleration);
    // respeitar o limite de velocidae
    this.velocity.limit(this.topspeed);
    //
    // agora move objeto
//  this.position.add(this.velocity);
    this.position.add(this.velocity);

};

Mover.prototype.display = function() {
    fill(29, 247, 5);
    ellipse((this.position.x),(this.position.y), 50, 50);
};

Mover.prototype.checkEdges = function() {
    if (this.position.x > width) {
        this.position.x = 0;
    }  
    else if (this.position.x < 0) {
        this.position.x = width;
        //this.position.y = random(1,200);
        //println(this.position.y + " " + this.position.x);
    }
    
    if (this.position.y > height) {
        this.position.y = 0;
    }  
    else if (this.position.y < 0) {
        this.position.y = height;
    }
};

Mover.prototype.bateu = function(){
    if(mouseX > this.position.x && mouseY < this.position.y)
    {
        contador++;
        println("Bateu: "+ contador);
    }  
};

var mover = new Mover();
///////////////////////////////////////
// Scene 1
var drawScene1 = function() {
    currentScene = 1;
    background(0, 0, 0);
    fill(255, 255, 255);
    textSize(39);
    text("A Space Adventure", 35, height/2);
    textSize(15);
    text("Clique para começar", (width/2)-60, (height/2)+50);
};
// Scene 2
var drawScene2 = function() {
    currentScene = 2;
    background(173, 239, 255);
    fill(7, 14, 145);
    image(getImage("space/background"), 0,0, width, height);
    
    
    // desenhar estrelas
    //makeStars();
    
    // desenha a nave e a desloca na tela seguindo o mouse
    image(getImage("space/rocketship"), mouseX-30, mouseY-30, 60,60);
    
    // crie ou chama uma função que desenhe e mova 1 objeto
    mover.update();
    mover.checkEdges();
    mover.display(); 

    // crie um função de aceleração do objeto
        mover.bateu();
};


var drawScene3 = function() {
    currentScene = 3;
    background(173, 239, 255);
    println (" GAME OVER ");
};

// clicou no mouse, avança cena
mouseClicked = function() {
    if (currentScene === 1) {
        drawScene2();
    } else if (currentScene === 2) {
        drawScene3();
    } else if (currentScene === 3) {
        drawScene1();
    }
};

// funcao draw que desenha na tela.
draw = function() {
    if (count < 300 && currentScene === 1) {
        makeStars();
    }
    if (currentScene === 2) {
        // chame a função para desenha a posição da nave no cenário
        drawScene2();
    }
};

// vamos começar pela Cena 1
drawScene1();
}
