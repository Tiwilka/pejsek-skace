// Základní nastavení hry
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Nastavení postavy (pejsek)
const dog = {
    x: 50,
    y: canvas.height - 150,
    width: 50,
    height: 50,
    speed: 5,
    jumpPower: 15,
    isJumping: false,
    jumpHeight: 0,
    color: 'brown',
    bones: 10
};

// Nastavení gravitace a plošiny
const gravity = 0.8;
let groundHeight = canvas.height - 50;
let groundY = groundHeight;

// Funkce pro vykreslení pejska
function drawDog() {
    ctx.fillStyle = dog.color;
    ctx.fillRect(dog.x, dog.y - dog.jumpHeight, dog.width, dog.height);
}

// Funkce pro zpracování skoku
function handleJump() {
    if (dog.isJumping) {
        dog.jumpHeight += dog.jumpPower;
        if (dog.jumpHeight >= 100) { // Maximální výška
            dog.isJumping = false;
        }
    } else if (dog.jumpHeight > 0) {
        dog.jumpHeight -= gravity;
    }
    if (dog.y - dog.jumpHeight > groundY) {
        dog.jumpHeight = 0;
    }
}

// Funkce pro hod kostí
let bones = [];
function throwBone() {
    if (dog.bones > 0) {
        bones.push({
            x: dog.x + dog.width,
            y: dog.y - dog.jumpHeight,
            radius: 10,
            speed: 8
        });
        dog.bones--;
    }
}

// Funkce pro vykreslení kostí
function drawBones() {
    bones.forEach(bone => {
        bone.x += bone.speed;
        ctx.beginPath();
        ctx.arc(bone.x, bone.y, bone.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
    });
}

// Funkce pro vykreslení hry
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDog();
    handleJump();
    drawBones();
    requestAnimationFrame(gameLoop);
}

// Kontrola klávesových vstupů
document.addEventListener('keydown', (e) => {
    if (e.key === ' ' && dog.jumpHeight === 0) { // Skok (mezerník)
        dog.isJumping = true;
    }
    if (e.key === 'Enter') { // Hod kosti (Enter)
        throwBone();
    }
});

gameLoop();
