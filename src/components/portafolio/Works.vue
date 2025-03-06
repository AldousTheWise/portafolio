<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const username = 'AldousTheWise';
const repositories = ref([]);
const loading = ref(true);
const goToPortafolio = () => router.push('/');

onMounted(async () => {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        if (!response.ok) throw new Error('Error al obtener los repositorios');
        const data = await response.json();

        repositories.value = data.filter(repo => !repo.fork);
    } catch (error) {
        console.error(error);
    } finally {
        loading.value = false;
    }
});
</script>

<template>
    <section class="works">
        <button class="back-button" @click="goToPortafolio">
            <span>Volver</span>
        </button>
        <h2 class="section-title">Mis Proyectos.</h2>
        <div v-if="loading" class="loading">Cargando proyectos...</div>
        <div v-else class="projects-grid">
            <div v-for="repo in repositories" :key="repo.id" class="project-card">
                <h3 class="project-title">{{ repo.name }}</h3>
                <p class="project-description">{{ repo.description || 'Sin descripción' }}</p>
                <div class="buttons">
                    <a :href="repo.html_url" target="_blank" class="btn">Ver Código</a>
                    <a v-if="repo.homepage" :href="repo.homepage" target="_blank" class="btn">Ver Demo</a>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.works {
    text-align: center;
    padding: 40px;
    background-color: #444;
    max-height: 100vh;
    overflow-y: auto;
}

.section-title {
    font-family: "Press-Start", sans-serif;
    font-size: 1.5rem;
    color: #ffcc00;
    text-shadow: 2px 2px 0 #000;
}

.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-top: 20px;
}

.project-card {
    background: rgba(0, 0, 0, 0.8);
    padding: 15px;
    border: 3px solid #ffcc00;
    border-radius: 10px;
    box-shadow: 5px 5px 0px #222;
    transition: transition 0.3s ease-in-out;
}

.project-card:hover {
    transform: scale(1.05);
}

.project-title {
    font-family: "Press-Start", sans-serif;
    color: #fff;
    font-size: 1rem;
    margin-top: 1px;
}

.project-description {
    color: #ccc;
    font-size: 0.8rem;
}

.button {
    margin-top: 10px;
}

.btn {
    display: inline-block;
    margin: 5px;
    padding: 8px 12px;
    background: #ffcc00;
    color: #000;
    text-decoration: none;
    border-radius: 5px;
    font-size: 0.8rem;
    font-weight: bold;
    box-shadow: 3px 3px 0px #222;
}

.btn:hover {
    background: #ffaa00;
    box-shadow: 2px 2px 0px #000;
}

.loading {
    font-size: 1.2rem;
    color: #ffcc00;
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
</style>