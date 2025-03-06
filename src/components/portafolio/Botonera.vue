<script setup>
import { ref } from "vue";

const isOpen = ref(false);
const toggleMenu = () => isOpen.value = !isOpen.value;

</script>

<template>
    <div class="botonera">
        <button class="menu-toggle d-md-none" @click="toggleMenu">▣ menu</button>
        <div :class="['botonera-container', { 'show-menu': isOpen }]">
            <router-link to="/"><button> 🏰 home</button></router-link>
            <router-link to="/about"><button> 🤖 about</button></router-link>
            <router-link to="/works"><button> 🛠️ works</button></router-link>
            <router-link to="/contact"><button> 📩 contact</button></router-link>
        </div>
    </div>
</template>

<style scoped>
/* Contenedor general */
.botonera {
    display: flex;
    font-family: monospace;
    flex-direction: column;
    align-items: center;
    width: 100%;
    position: relative;
    z-index: 100;
}

/* Contenedor de los botones */
.botonera-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 100%;
    position: absolute;
    bottom: 100%;
    left: 0;
    border-radius: 8px;
    box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.1);
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    transform: translateY(20px);
    visibility: hidden;
    transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
}

/* Mostrar menú cuando se active */
.show-menu {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
    max-height: 300px;
}

/* Botones */
button {
    width: 150px;
    max-width: 150px;
    padding: 12px;
    font-size: 1.2rem;
    background: #b8b8f3;
    color: black;
    border: 5px solid #5e5eb7;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.3s, transform 0.2s;
}

/* Hover */
button:hover {
    background: #5e5eb7;
    transform: scale(1.1);
    color: white;
}

/* Botón MENÚ */
.menu-toggle {
    background: #b8b8f3;
    color: black;
    border: 5px solid #5e5eb7;
    margin-top: 1rem;
    padding: 12px;
    font-size: 1.2rem;
    cursor: pointer;
    border-radius: 8px;
    transition: background 0.3s, transform 0.2s;
}

.menu-toggle:hover {
    background: #5e5eb7;
    transform: scale(1.1);
    color: white;
}

/* Responsivo */
@media (min-width: 768px) {
    .menu-toggle {
        display: none;
    }

    .botonera-container {
        display: flex !important;
        position: static;
        max-height: none;
        transform: none;
        opacity: 1;
        visibility: visible;
        box-shadow: none;
        background: transparent;

    }
}
</style>
