<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';

const props = defineProps({
    messages: {
        type: Array,
        default: () => []
    },
    position: Object,
    show: Boolean
});

const emit = defineEmits(['close']);
const currentMessage = ref(0);

// Función para avanzar el diálogo con Enter
const handleKey = (e) => {
    if (props.show && e.key === 'Enter') {
        if (currentMessage.value < props.messages.length - 1) {
            currentMessage.value++;
        } else {
            emit('close');
        }
    }
};

// Reiniciar el índice cuando cambian los mensajes
watch(() => props.messages, () => {
    currentMessage.value = 0;
});

onMounted(() => window.addEventListener('keydown', handleKey));
onUnmounted(() => window.removeEventListener('keydown', handleKey));
</script>

<template>
    <div v-if="show" class="dialogue-box" :style="{ left: `${position.x}px`, top: `${position.y}px` }">
        <div class="dialogue-content">
            <p>{{ messages[currentMessage] }}</p>
        </div>
    </div>
</template>

<style scoped>
.dialogue-box {
    position: absolute;
    min-width: 100px;
    max-width: 80vw;
    padding: 10px;
    background: #2c3e50;
    color: white;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    z-index: 200;
}

.dialogue-content p {
    margin: 0;
    word-wrap: break-word;
}
</style>