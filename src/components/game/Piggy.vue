<script setup>
import { ref, inject, onMounted, computed } from 'vue';
import { dialogues } from '@/assets/js/dialogues';

const movement = inject('movementSystem');
const characterControl = inject('characterControl');
const characterPosition = inject('characterPosition');

const position = ref({ x: 0, y: 0 });
const isVisible = ref(false);
const isWalking = ref(false);
const isSitting = ref(true);
const direction = ref('left');
const spriteIndex = ref(0);

const spriteUrl = 'sprites/piggy';
const sprites = {
    sit: `${spriteUrl}/chanchito_sit.webp`,
    stand: `${spriteUrl}/chanchito_stand.webp`,
    walk: [
        `${spriteUrl}/chanchito_left.webp`,
        `${spriteUrl}/chanchito_stand.webp`,
        `${spriteUrl}/chanchito_right.webp`,
        `${spriteUrl}/chanchito_stand.webp`
    ]
}

const getDialoguePosition = () => {
    const offsetX = 50;
    const offsetY = -30;

    if (position.value.x > window.innerWidth - 200) {
        return {
            x: position.value.x - offsetX,
            y: position.value.y + offsetY
        };
    }

    return {
        x: position.value.x + offsetX,
        y: position.value.y + offsetY
    }
}

const currentSprite = computed(() => {
    if (isSitting.value) return sprites.sit;
    return sprites.walk[spriteIndex.value % sprites.walk.length];
});

const checkCollision = () => {
    return (
        Math.abs(position.value.x - characterPosition.value.x) < 100
        &&
        Math.abs(position.value.y - characterPosition.value.y) < 100
    );
};

const reposition = () => {
    let attempts = 0;
    const maxAttemps = 100;

    do {
        position.value = {
            x: Math.random() * movement.boundaries.maxX,
            y: Math.random() * movement.boundaries.maxY
        };
        attempts++;
    } while (checkCollision() && attempts < maxAttemps);

    if (attempts >= maxAttemps) {
        console.warn('No se pudo encontrar una posición válida para el chanchito');
        isVisible.value = false;
    }
};

//Caminar hacia el costado.
const walkToEdge = () => {
    const targetX = position.value.x < window.innerWidth / 2 ? - 160 : window.innerWidth + 100;
    const deltaX = targetX - position.value.x;
    const speed = 2;

    direction.value = deltaX < 0 ? 'left' : 'right';

    const animate = () => {
        if (!isWalking.value) return;

        position.value.x += (deltaX < 0 ? - speed : speed);
        spriteIndex.value = (spriteIndex.value + 1) % 4;

        if ((deltaX < 0 && position.value.x <= targetX) || (deltaX > 0 && position.value.x >= targetX)) {
            isWalking.value = false;
            isVisible.value = false;
            return;
        }
        requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
};

const handleClick = () => {
    if (!isSitting.value || !isVisible.value) return;

    isSitting.value = false;
    setTimeout(() => {
        isWalking.value = true;
        walkToEdge();
    }, 1500);
};

onMounted(() => {
    isVisible.value = Math.random() > 0.5;

    if (isVisible.value) {
        position.value = {
            x: Math.random() * movement.boundaries.maxX,
            y: Math.random() * movement.boundaries.maxY
        };

        if (checkCollision()) reposition();


        setTimeout(() => {
            closeDialogue();
        }, 3000)
    }
});
</script>

<template>
    <div v-if="isVisible" class="piggy" :style="{
        top: `${position.y}px`,
        left: `${position.x}px`,
        backgroundImage: `url(${currentSprite})`,
        transform: direction === 'right' ? 'scaleX(-1)' : 'none'
    }" @click="handleClick"></div>
</template>

<style scoped>
.piggy {
    position: absolute;
    width: 48px;
    height: 48px;
    background-size: contain;
    background-repeat: no-repeat;
    cursor: pointer;
    z-index: 99;
    image-rendering: pixelated;
    transition: left 0.1s linear;
}
</style>