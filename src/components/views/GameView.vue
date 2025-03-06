<script setup>
import { useScreenSize } from '@/assets/js/useScreenSize';
import Character from '@/components/game/Character.vue';
import Piggy from '@/components/game/Piggy.vue';

const { isLargeScreen } = useScreenSize();
</script>

<template>
    <div v-if="isLargeScreen" class="game-view">
        <Character :initialX="100" :initialY="100" />
        <Piggy />

    </div>
</template>

<style scoped>
.game-view {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: transparent;
    z-index: 5;
    pointer-events: none;
}

.game-view * {
    pointer-events: auto;
}
</style>