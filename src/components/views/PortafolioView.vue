<script setup>
import { ref, onMounted } from 'vue';
import Botonera from '@/components/portafolio/Botonera.vue';
import avatar from '@/assets/img/pixelated.webp';
import ghlogo from '@/assets/img/githubpixel.webp';
import inlogo from '@/assets/img/linkedinpixel.webp';

const showIntro = ref(false);
const textLines = ref([
    "       xxxxxxx       ",
    "     xx       xx     ",
    "    x  x     x  x    ",
    "   x   X     x   x   ",
    "   x  x       x  x   ",
    "    x  xx   xx  x    ",
    "     xx  xxx  xx     ",
    "       xxxxxxx       ",
    "",
    "",
    "Aldo Yáñez",
    "Desarrollador Full Stack // StoryTeller",
    "Cambiando el mundo una línea a la vez."
]);
const displayedText = ref([]);

const closeIntro = () => {
    showIntro.value = false;
    sessionStorage.setItem('hasSeenIntro', 'true');
}

const typeText = () => {
    let lineIndex = 0;
    let charIndex = 0;

    const type = () => {
        if (lineIndex < textLines.value.length) {
            if (charIndex < textLines.value[lineIndex].length) {
                displayedText.value[lineIndex] = textLines.value[lineIndex].substring(0, charIndex + 1);
                charIndex++;
                setTimeout(type, 10);
            } else {
                lineIndex++;
                charIndex = 0;
                if (lineIndex < textLines.value.length) {
                    displayedText.value.push("");
                    setTimeout(type, 200);
                }
            }
        }
    };

    displayedText.value.push("");
    type();
};

onMounted(() => {
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');

    if (!hasSeenIntro) {
        showIntro.value = true;
        setTimeout(() => {
            closeIntro();
        }, 3000);

    }
    typeText();
});
</script>

<template>
    <div class="portafolio">
        <Teleport to="body">
            <Transition name="fade">
                <div v-if="showIntro" class="intro-screen" @click="closeIntro">
                    <img :src="avatar" alt="Avatar" class="avatar" />
                    <h1 class="title">Hola, soy Aldo!</h1>
                    <p class="subtitle">Haz click en cualquier parte para empezar.</p>
                </div>
            </Transition>
        </Teleport>
        <div class="text-background">
            <span>H1T</span><span>M3</span>
        </div>
        <div class="content">
            <div class="screen">
                <div class="text">
                    <p v-for="(line, index) in displayedText" :key="index">{{ line }}</p>
                </div>
            </div>
            <div class="rrss">
                <a href="https://github.com/AldousTheWise"><img class="link-rs" :src="ghlogo" alt="github"></a>
                <a href="https://www.linkedin.com/in/aldoryanez"><img class="link-rs" :src="inlogo" alt="linkedin"></a>
            </div>
        </div>
        <Botonera class="botonera" />

    </div>
</template>

<style scoped>
@font-face {
    font-family: 'Press-Start';
    src: url('@/assets/fonts/PressStart2P-Regular.ttf') format('truetype');
}

.fade-enter-active,
.fade-leave-to {
    transition: opacity 1.5s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.portafolio {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100vw;
    height: 100vh;
    border: 5px solid rgba(255, 0, 0, 0.452);
    background-color: rgb(65, 65, 233);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.intro-screen {
    position: absolute;
    top: 4.4px;
    left: 4.6px;
    width: 99.3vw;
    height: 98.4vh;
    background: rgba(0, 0, 0, 0.85);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    z-index: 1000;
    color: #fff;
    cursor: pointer;
}

.avatar {
    width: 120px;
    height: 120px;
    image-rendering: pixelated;
    margin-bottom: 20px;
}

.title {
    font-family: "Press-Start", sans-serif;
    font-size: 1.5rem;
    color: #b8b8f3;
    text-shadow: 3px 3px 0px #5e5eb7;
}

.subtitle {
    font-size: 1rem;
    font-family: monospace;
    color: #f10b0b;
    margin-top: 10px;
}

.text-background {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: 'Press-Start', sans-serif;
    font-size: 18vw;
    font-weight: bold;
    color: rgba(211, 3, 3, 0.288);
    text-shadow: 4px 4px 2px rgba(0, 0, 0, 0.247);
    user-select: none;
    pointer-events: none;
    text-align: center;
    display: flex;
    flex-direction: row;
    gap: 2vw;
    white-space: nowrap;
}

.content {
    position: relative;
    z-index: 100;
}

.screen {
    border: 4px solid #333;
    background-color: #000;
    width: 25rem;
    height: 20rem;
    color: rgba(0, 255, 0, 0.692);
    padding: 0.5rem;
    position: relative;
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.8),
        inset 0 0 10px rgba(0, 255, 0, 0.5);
    border-radius: 10px;
    overflow: hidden;
}

.screen::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: repeating-linear-gradient(rgba(0, 255, 0, 0.08),
            rgba(0, 255, 0, 0.05) 1px,
            transparent 1px,
            transparent 2px);
    pointer-events: none;
    animation: moveLines 8s linear infinite;
}

.text {
    margin-top: 10rem;
    font-family: 'Press-Start';
    font-size: 0.5rem;
    white-space: pre-wrap;
}

.text p {
    margin: 0;
    line-height: 1.5;
}

.rrss {
    width: 15rem;
    display: flex;
    padding: 10px 0 10px 0;
    justify-content: space-around;
}

.link-rs {
    width: 2.5rem;
    background-color: white;
    border-radius: 50px;
}

.botonera {
    position: fixed;
    left: 35%;
    top: 33%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    gap: 15px;
}

@keyframes moveLines {
    0% {
        background-position: 0 0;
    }

    100% {
        background-position: 0 3px;
    }
}

@media(max-width: 768px) {
    .intro-screen {
        width: 98vw;
    }

    .text-background {
        flex-direction: column;
        font-size: 20vw;
        gap: 0;
    }

    .botonera {
        top: 88%;
        left: -5.9rem;
    }

    .screen {
        width: 20rem;
        height: 21rem;
    }
}
</style>