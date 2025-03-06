<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import background from '@/assets/img/background-about.webp';
import tarotCard from '@/assets/img/magician.webp';
import book from '@/assets/img/book.webp';

const router = useRouter();
const showModal = ref(false);
const goToPortafolio = () => router.push('/');

const cardUrl = "/cards";
const docUrl = "/docs";

const technologies = ref([
    { nombre: "The Trilogy", carta: `${cardUrl}/logos_trilogy.webp`, descripcion: "HTML, CSS y JavaScript." },
    { nombre: "Bootstrap", carta: `${cardUrl}/logos_bootstrap.webp`, descripcion: "Framework CSS para diseño responsive." },
    { nombre: "jQuery", carta: `${cardUrl}/logos_jquery.webp`, descripcion: "Librería de JavaScript." },
    { nombre: "Vue.js", carta: `${cardUrl}/logos_vue.webp`, descripcion: "Framework progresivo para interfaces de usuario." },
    { nombre: "Java", carta: `${cardUrl}/logos_java.webp`, descripcion: "Lenguaje de programación orientado a objetos." },
    { nombre: "Spring Boot", carta: `${cardUrl}/logos_spring.webp`, descripcion: "Framework para aplicaciones empresariales en Java." },
    { nombre: "PostgreSQL", carta: `${cardUrl}/logos_postgres.webp`, descripcion: "Sistema de gestión de bases de datos SQL." },
    { nombre: "Git", carta: `${cardUrl}/logos_git.webp`, descripcion: "Sistema de control de versiones distribuido." },
]);

const documents = ref([
    {
        title: 'Curriculum Vitae',
        description: 'Mi Curriculum actualizado. ;)',
        file: `${docUrl}/CVActualizado022025.pdf`,
        preview: `${docUrl}/CVActualizado022025.jpg`
    },
    {
        title: 'Certificado BC FrontEnd Javascript',
        description: 'Certificado emitido por Sence y DUOC por el programa TalentoDigital 2020',
        file: `${docUrl}/CertificadoFrontEndJavaScript.pdf`,
        preview: `${docUrl}/CertificadoFrontEndJavaScript.jpg`
    },
    {
        title: 'Certificado BC FullStack Java',
        description: 'Certificado emitido por Sence y Edutecno por el programa TalentoDigital 2024',
        file: `${docUrl}/CertificadoFullStackJava.pdf`,
        preview: `${docUrl}/CertificadoFullStackJava.jpg`
    },
    {
        title: 'Certificado Liderazgo y Trabajo en Equipo',
        description: 'Certificado emitido por Sence 2014',
        file: `${docUrl}/CertificadoLiderazgoyTrabajoEquipo.pdf`,
        preview: `${docUrl}/CertificadoLiderazgoyTrabajoEquipo.jpg`
    },
    {
        title: 'Diplomado Diseño y Programación Web',
        description: 'Certificado emitido por Sence, AIEP y Fundación Telefónica, programa ConectaEmpleo 2024',
        file: `${docUrl}/Diplomado - Diseño y Programación Web.pdf`,
        preview: `${docUrl}/Diplomado - Diseño y Programación Web.jpg`
    },
    {
        title: 'Diplomado Diseño y Experiencia de Usuario UX/UI',
        description: 'Certificado emitido por Sence, AIEP y Fundación Telefónica, programa ConectaEmpleo 2024',
        file: `${docUrl}/Diplomado - Diseño y Experiencia de Usuario UXUI.pdf`,
        preview: `${docUrl}/Diplomado - Diseño y Experiencia de Usuario UXUI.jpg`
    }
]);

const closeModal = () => showModal.value = false;
const openPreview = (doc) => window.open(doc.preview, '_blank');

const selectedTech = ref(null);
const isFlipped = ref(false);

const flipCard = () => isFlipped.value = !isFlipped.value;

const selectTech = (tech) => {
    selectedTech.value = tech;
    isFlipped.value = false;
};

</script>

<template>
    <section class="about" :style="{ backgroundImage: `url(${background})` }">
        <button class="back-button" @click="goToPortafolio">
            <span>Volver</span>
        </button>

        <div class="book-link" @click="showModal = true">
            <img :src="book" alt="Descarga de Curriculum" class="book-icon" />
            <p>Mis Docs</p>
        </div>
        <div class="modal fade" :class="{ show: showModal }" tabindex="-1" v-show="showModal">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Mis documentos</h5>
                        <button type="button" class="btn-close" @click="closeModal" />
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-6 mb-3" v-for="(doc, index) in documents" :key="index">
                                <div class="card document-card h-100 d-flex flex-column">
                                    <div class="card-body">
                                        <h5 class="card-title">{{ doc.title }}</h5>
                                        <p class="card-text flex-grow-1">{{ doc.description }}</p>
                                        <a :href="doc.file" class="btn btn-primary" download>
                                            <i class="fas fa-download" /> Descargar
                                        </a>
                                        <button class="btn btn-secondary ms-2" @click="openPreview(doc)">
                                            <i class="fas fa-eye" /> Ver
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div class="desktop-layout">
            <div class="left-column">
                <div v-for="(tech, index) in technologies.slice(0, 4)" :key="index" class="tech-item"
                    @click="selectTech(tech)">
                    <img :src="tech.carta" :alt="tech.nombre" class="tech-logo" />
                </div>
            </div>

            <div class="center-column">
                <div class="about-section">
                    <h1 class="title">Sobre mí</h1>
                    <p class="description">
                        Soy Desarrollador Web FullStack con experiencia en UX/UI. Te ayudo a construir sitios web
                        funcionales y atractivos, optimizados para ofrecer una experiencia de usuario excepcional y
                        alineados con los objetivos de tu negocio.
                    </p>
                </div>
                <div class="center-card">
                    <div v-if="selectedTech" class="tech-details">
                        <img :src="selectedTech.carta" :alt="selectedTech.nombre" class="tech-img" />
                        <h3>{{ selectedTech.nombre }}</h3>
                        <p>{{ selectedTech.descripcion }}</p>
                        <button @click="selectedTech = null">Volver</button>
                    </div>

                    <div v-else class="mcard" :class="{ flipped: isFlipped }" @click="flipCard">
                        <div class="mcard-front">
                            <img :src="tarotCard" alt="El Mago" class="carta-tarot" />
                        </div>
                        <div class="mcard-back">
                            <h3>Soft Skills</h3>
                            <ul>
                                <li>Gran sentido del humor.</li>
                                <li>Creatividad inquieta.</li>
                                <li>Pensamiento crítico.</li>
                                <li>Comunicación efectiva.</li>
                                <li>Idioma inglés a nivel medio.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div class="right-column">
                <div v-for="(tech, index) in technologies.slice(4, 8)" :key="index" class="tech-item"
                    @click="selectTech(tech)">
                    <img :src="tech.carta" :alt="tech.nombre" class="tech-logo" />
                </div>
            </div>
        </div>

        <div class="mobile-layout">
            <div class="about-section">
                <h1 class="title">Sobre mí</h1>
                <p class="description">
                    Soy Desarrollador Web FullStack con experiencia en UX/UI. Te ayudo a construir sitios web
                    funcionales y atractivos, optimizados para ofrecer una experiencia de usuario excepcional y
                    alineados con los objetivos de tu negocio.
                </p>
            </div>
            <div class="center-card-mobile">
                <div v-if="selectedTech" class="tech-details">
                    <img :src="selectedTech.carta" :alt="selectedTech.nombre" class="tech-img" />
                    <h3>{{ selectedTech.nombre }}</h3>
                    <p>{{ selectedTech.descripcion }}</p>
                    <button @click="selectedTech = null">Volver</button>
                </div>

                <div v-else class="mcard" :class="{ flipped: isFlipped }" @click="flipCard">
                    <div class="mcard-front">
                        <img :src="tarotCard" alt="El Mago" class="carta-tarot" />
                    </div>
                    <div class="mcard-back">
                        <h3>Soft Skills</h3>
                        <ul>
                            <li>Gran sentido del humor.</li>
                            <li>Creatividad inquieta.</li>
                            <li>Pensamiento crítico.</li>
                            <li>Comunicación efectiva.</li>
                            <li>Idioma inglés a nivel medio.</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="tech-grid-mobile">
                <div v-for="(tech, index) in technologies" :key="index" class="tech-item-mobile"
                    @click="selectTech(tech)" :style="{ zIndex: selectedTech ? 0 : 1 }">
                    <img :src="tech.carta" :alt="tech.nombre" class="tech-logo">
                </div>
            </div>
        </div>

    </section>
</template>

<style scoped>
.about {
    background-size: cover;
    background-position: center;
    min-height: 100vh;
    margin: 0;
    padding: 0;
    font-family: monospace, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
}

.book-link {
    position: fixed;
    top: 20px;
    right: 20px;
    color: lightgray;
    z-index: 1000;
    transition: transform 0.3s ease;
}

.book-icon {
    width: 100px;
    height: auto;
    filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5));
}

.book-link:hover {
    transform: scale(1.1) rotate(-5deg);
}

.modal {
    background-color: rgba(0, 0, 0, 0.8);
    display: block;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
}

.modal.show {
    opacity: 1;
    pointer-events: all;
}

.modal-content {
    background-color: #1a1a1a;
    color: white;
    border-radius: 15px;
}

.model-header {
    border-bottom: 1px solid #333;
}

.modal-title {
    font-family: "Press-Start";
}

.card-body {
    color: white;
}

.document-card {
    background-color: #2a2a2a;
    border: 1px solid #444;
    transition: transform 0.3s ease;
}

.document-card:hover {
    transform: translateY(-5px);
}

.btn-primary {
    background-color: #0d6efd;
    border: none;
}

.btn-secondary {
    background-color: #6c757d;
    border: none;
}

.back-button {
    position: fixed;
    top: 20px;
    left: 20px;
    z-index: 1000;
    background-color: rgba(255, 255, 255. 0.1);
    border: 2px solid rgba(27, 26, 26, 0.781);
    border-radius: 25px;
    padding: 10px 20px;
    color: rgba(27, 26, 26, 0.781);
    font-family: "Press-Start";
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(5px);
}

.back-button:hover {
    background-color: rgba(255, 255, 255, 0.2);
    transform: scale(1.05);
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

.about-section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.title {
    font-size: 2rem;
    color: red;
    font-family: "Press-Start";
}

.description {
    font-size: 1rem;
    color: white;
    text-align: center;
}

/* Versión escritorio */
.desktop-layout {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 100%;
    max-width: 1200px;
}


.left-column,
.right-column {
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
}

.center-card {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
}

.mcard {
    width: 300px;
    height: 300px;
    cursor: pointer;
    position: absolute;
    top: 20px;
    transform-style: preserve-3d;
    transition: transform 0.6s;
}

.mcard.flipped {
    transform: rotateY(180deg);
}

.mcard-front,
.mcard-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.mcard-front img.carta-tarot {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.mcard-back {
    transform: rotateY(180deg);
    background: rgba(0, 0, 0, 0.9);
    padding: 20px;
}

.mcard-back h3 {
    font-family: "Press-Start";
}

.tech-details {
    position: absolute;
    top: 11.5rem;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    height: 380px;
    background-color: rgba(238, 236, 114, 0.726);
    padding: 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    border: solid 2px black;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    transition: opacity 0.3s ease-in-out;
}

.tech-img {
    width: 150px;
    height: 150px;
    object-fit: contain;
}

.tech-details h3 {
    margin: 15px 0;
    font-family: "Press-Start";
    font-size: 1.5rem;
}

.tech-details p {
    font-size: 1rem;
    margin-bottom: 15px;
}

.tech-details button {
    background-color: #333;
    color: white;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    font-size: 1rem;
}

.tech-details button:hover {
    background-color: #555;
}

.tech-item {
    cursor: pointer;
    transition: transform 0.3s;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
}

.tech-item:hover {
    transform: scale(1.1);
}

.tech-logo {
    width: 120px;
    height: 120px;
    object-fit: contain;
}

.mobile-layout {
    display: none;
    position: absolute;
    top: 5.5rem;
}


@media (max-width: 768px) {
    .desktop-layout {
        display: none !important;
    }

    .modal-dialog {
        margin: 20px;
    }

    .document-card {
        margin-bottom: 15px;
    }

    .book-link {
        top: 4px;
        right: 10px;
    }

    .book-icon {
        width: 70px;
    }

    .back-button {
        width: 6rem;
        top: 20px;
        left: 10px;
        padding: 8px 16px;
        font-size: 0.6rem;
    }

    .mobile-layout {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
        min-height: 100vh;
    }

    .about-section {
        order: 1;
        margin-bottom: 30px;
        background: rgba(0, 0, 0, 0.7);
    }

    .center-card-mobile {
        order: 2;
        position: relative;
        width: 100%;
        min-height: 300px;
        margin-bottom: 30px;
        z-index: 1;
    }

    .tech-grid-mobile {
        order: 3;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
        width: 100%;
        max-width: 500px;
        position: relative;
        z-index: 2;
    }

    .tech-item-mobile {
        transform: rotate(-5deg);
        transition: all 0.3s ease;
        margin: 0 auto;
    }

    .tech-item-mobile:nth-child(even) {
        transform: rotate(5deg);
    }

    .tech-item-mobile:hover {
        transform: rotate(0deg) scale(1.1);
        z-index: 3 !important;
    }

    .tech-details {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 4;
    }

    .mcard {
        position: static;
        margin: 0 auto;
    }
}

.tech-grid-mobile {
    justify-content: center;

}

.tech-grid-mobile:nth-last-child(-n+2) {
    grid-column: span 1;
    justify-self: center;
    touch-action: manipulation;
    cursor: pointer;
    padding: 10px;
}
</style>
