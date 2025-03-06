<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
    initialX: { type: Number, default: 0 },
    initialY: { type: Number, default: 0 },
});

const spriteUrl = '/sprites/character';
const sprites = {
    down: [`${spriteUrl}/front-stand.webp`, `${spriteUrl}/front-right.webp`, `${spriteUrl}/front-left.webp`],
    up: [`${spriteUrl}/back-stand.webp`, `${spriteUrl}/back-right.webp`, `${spriteUrl}/back-left.webp`],
    left: [`${spriteUrl}/left-stand.webp`, `${spriteUrl}/left-right.webp`, `${spriteUrl}/left-left.webp`],
    right: [`${spriteUrl}/right-stand.webp`, `${spriteUrl}/right-right.webp`, `${spriteUrl}/right-left.webp`]
};

// Posición del personaje
const x = ref(props.initialX);
const y = ref(props.initialY);

// Dirección y animación
const direction = ref('down');
const currentSprite = ref(sprites[direction.value][0]);

// Velocidad de movimiento
const moveSpeed = 5;

// Estado de las teclas
const keysPressed = ref({});

// Control de movimiento desbloqueado
const isControlEnabled = ref(false);

// Límites de la pantalla
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

// Animación
let animationInterval = null;
const frameDuration = 150; // Duración de cada frame en milisegundos

// Desbloquear el control de movimiento al hacer click
const enableControl = () => {
    isControlEnabled.value = true;
};

// Mover al personaje
const move = (dx, dy, dir) => {
    if (!isControlEnabled.value) return;

    const newX = x.value + dx;
    const newY = y.value + dy;

    // Limitar el movimiento dentro de los bordes de la pantalla
    if (newX >= 0 && newX <= screenWidth - 64) { x.value = newX; }
    if (newY >= 0 && newY <= screenHeight - 64) { y.value = newY; }

    // Actualizar la dirección y el frame inicial
    if (direction.value !== dir) {
        direction.value = dir;
        currentSprite.value = sprites[dir][0]; // Mostrar el primer frame de la nueva dirección
    }
};

// Animación del sprite
const animateSprite = () => {
    const spriteFrames = sprites[direction.value];
    let frameIndex = 0;

    // Detener la animación anterior si existe
    if (animationInterval) {
        clearInterval(animationInterval);
    }

    // Iniciar la nueva animación
    animationInterval = setInterval(() => {
        frameIndex = (frameIndex + 1) % spriteFrames.length;
        currentSprite.value = spriteFrames[frameIndex];
    }, frameDuration); // Velocidad de animación (ms)
};

// Manejar las teclas presionadas
const handleKeyDown = (event) => {
    if (!isControlEnabled.value) return;

    if (!keysPressed.value[event.key]) {
        keysPressed.value[event.key] = true;

        switch (event.key) {
            case 'ArrowUp': move(0, -moveSpeed, 'up'); break;
            case 'ArrowDown': move(0, moveSpeed, 'down'); break;
            case 'ArrowLeft': move(-moveSpeed, 0, 'left'); break;
            case 'ArrowRight': move(moveSpeed, 0, 'right'); break;
            default: break;
        }

        // Iniciar animación si no está activa
        if (!animationInterval) {
            animateSprite();
        }
    }
};

// Manejar teclas liberadas
const handleKeyUp = (event) => {
    keysPressed.value[event.key] = false;

    // Detener la animación si no hay teclas presionadas
    if (!Object.values(keysPressed.value).some((pressed) => pressed)) {
        if (animationInterval) {
            clearInterval(animationInterval);
            animationInterval = null;
        }
        currentSprite.value = sprites[direction.value][0]; // Volver al frame inicial
    }
};

// Actualizar el movimiento continuamente
const updateMovement = () => {
    if (keysPressed.value['ArrowUp']) move(0, -moveSpeed, 'up');
    if (keysPressed.value['ArrowDown']) move(0, moveSpeed, 'down');
    if (keysPressed.value['ArrowLeft']) move(-moveSpeed, 0, 'left');
    if (keysPressed.value['ArrowRight']) move(moveSpeed, 0, 'right');

    // Solicitar el próximo frame
    requestAnimationFrame(updateMovement);
};

// Escuchar eventos de teclado
onMounted(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    requestAnimationFrame(updateMovement); // Iniciar el bucle de actualización
});

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown);
    window.removeEventListener('keyup', handleKeyUp);
    if (animationInterval) {
        clearInterval(animationInterval);
    }
});
</script>

<template>
    <div class="character" :style="{
        backgroundImage: `url(${currentSprite})`,
        left: `${x}px`,
        top: `${y}px`,
    }" @click="enableControl"></div>
</template>

<style scoped>
.character {
    position: absolute;
    width: 64px;
    height: 70px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    transition: left 0.1s ease, top 0.1s ease;
    cursor: pointer;
}
</style>
