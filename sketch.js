var back1, backgroundImage;

var pipeDown, pipeUp, pipeDownImage, pipeUpImage, pipeGroup;
var fruit, fruitGroup, fruitImage1, fruitImage2, fruitImage3;
var bird, birdAnimation;

var gameOverImage;
var score = 0;
var gameState = "PLAY";

function preload(){

    // Loading the image of the background
    backgroundImage = loadImage("BackgroundImage.png");

    // Loading the image of the pipes
    pipeDownImage = loadImage("Pipe_Down.png");
    pipeUpImage = loadImage("Pipe_Up.png");

    // Loading the animation of the bird
    birdAnimation = loadAnimation("Bird_01.png", "Bird_02.png", "Bird_03.png", "Bird_04.png", "Bird_05.png", "Bird_06.png", "Bird_07.png", "Bird_08.png", );

    // Loading the image of game over 
    gameOverImage = loadImage("gameOver.png");

    // Loading the image of the fruits
    fruitImage1 = loadImage("apple.png");
    fruitImage2 = loadImage("banana.png");
    fruitImage3 = loadImage("melon.png");
}

function setup(){

    createCanvas (800, 500);

    imageMode(CENTER);

    // Creating a group for pipes
    pipeGroup = new Group(); 
    
    // Creating a group for the fruits
    fruitGroup = new Group();

    // Creating a sprite for the background
    back1 = createSprite(400, 250);
    backgroundImage.resize(800, 500);
    back1.addImage(backgroundImage);

    // Creating a sprite for bird
    bird = createSprite(100, 300);
    bird.addAnimation("Flying", birdAnimation);
    bird.scale = 0.1;
    bird.setCollider("rectangle", 0, 0, 200, 200);

}

function draw(){

    if (gameState === "PLAY"){
     
        background("red");

        obstacle();
        fruits();

        if (keyDown("SPACE")){

            bird.velocityY = -5;
        }
    
        /* The y velocity of the bird is not hardcored so as to give a realistic effect
           like when the bird goes down for a long period of time the speed increases */
        bird.velocityY += 0.3;

        // If the bird touches the fruits then the score increases
        if (bird.isTouching(fruitGroup)){

            score += 5;
            fruitGroup.destroyEach();
        }

        // If the bird touches the pipe then the score decreases
        if (bird.isTouching(pipeGroup)){

            score -= 5;
            pipeGroup.destroyEach();
        }

        // If score becomes less than 0 
        if (score < 0){

            gameState = "END";
        }

        // If the bird goes out of the canvas
        if (bird.y  > 500 || bird.y < 0){

            bird.y = 250;
            bird.velocityY  = 0.4;
        }

        drawSprites();

        fill("red");
        textSize(15);
        text("Life : "+score, 650, 100);
    }

    if (gameState === "END"){

        background("blue");

        pipeGroup.setLifetimeEach(0);
        bird.visible = false;
        bird.velocityY = 0;

        image(gameOverImage, 400, 250);
    }

}

function obstacle(){

    if (frameCount % 250 === 0){

        imageMode(CORNER);

        var randDown  = Math.round(random(450, 550));
        var randUp = Math.round(random(0, 100));
        var speedRand = Math.round(random(-3, - 10))

        // Creating a sprite for the lower pipe
        pipeDown = createSprite(800, randDown);
        pipeDownImage.resize(50, 300);
        pipeDown.addImage(pipeDownImage);
        pipeDown.velocityX = speedRand;
        pipeDown.lifetime = 300;

        // Creating a sprite for the upper pipe
        pipeUp = createSprite(800, randUp);
        pipeUpImage.resize(50, 300);
        pipeUp.addImage(pipeUpImage);
        pipeUp.velocityX = speedRand;
        pipeUp.lifetime = 300;

        pipeGroup.add(pipeDown);
        pipeGroup.add(pipeUp);
        
    }
}

function fruits(){

    if (frameCount % 250 === 0){

        fruit = createSprite(800, 250);

        var randImage = Math.round(random(1, 3))
        var speedRand = Math.round(random(-3, -7))

        switch(randImage){

            case 1 : fruit.addImage(fruitImage1);
                break;

            case 2 : fruit.addImage(fruitImage2)
                break;

            case 3 : fruit.addImage(fruitImage3);
                break;
        }

        fruit.velocityX = speedRand;
        fruit.lifetime = 300;
        fruitGroup.add(fruit);
    }
}