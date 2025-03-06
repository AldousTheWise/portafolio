<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import emailjs from '@emailjs/browser';

const form = ref({ name: '', email: '', message: '' });
const successMessage = ref(false);
const loading = ref(false);
const router = useRouter();
const goToPortafolio = () => router.push('/');

const sendEmail = () => {
    loading.value = true;

    emailjs.send(
        'service_h4845cv',
        'template_5sm9uwb',
        {
            name: form.value.name,
            email: form.value.email,
            message: form.value.message
        },
        'eZJVF3mH1YWlzZtnm'
    )
        .then(() => {
            successMessage.value = true;
            form.value = { name: '', email: '', message: '' };
            setTimeout(() => (successMessage.value = false), 3000);
        })
        .catch(error => {
            console.error('Error al enviar el mensaje: ', error);
        })
        .finally(() => {
            loading.value = false;
        })
};
</script>

<template>
    <section class="contact">
        <button class="back-button" @click="goToPortafolio">
            <span>Volver</span>
        </button>
        <h2 class="section-title">Contact</h2>
        <p class="description">Hey! Mantengamonos en contacto </p>
        <form @submit.prevent="sendEmail" class="contact-form">
            <div class="input-group">
                <label for="name">Nombre: </label>
                <input type="text" id="name" v-model="form.name" required />
            </div>

            <div class="input-group">
                <label for="email">Correo Electrónico: </label>
                <input type="email" id="email" v-model="form.email" required />
            </div>

            <div class="input-group">
                <label for="message">Mensaje: </label>
                <textarea id="message" v-model="form.message" rows="5" required></textarea>
            </div>

            <button type="submit" class="btn-submit" :disabled="loading">
                {{ loading ? 'Enviando...' : 'Enviar' }}
            </button>
        </form>

        <div v-if="successMessage" class="success-message">
            What a big success, boy! Mensaje enviado!
        </div>
    </section>
</template>

<style scoped>
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

.contact {
    text-align: center;
    font-family: monospace;
    padding: 40px;
    height: 100vh;
    border: 4px solid #444;
    background-color: #b1adad;
}

.section-title {
    font-family: "Press-Start", sans-serif;
    font-size: 1.5rem;
    color: #ffcc00;
    text-shadow: 2px 2px 0 #000;
}

.contact-form {
    max-width: 500px;
    margin: 0 auto;
    text-align: left;
}

.input-group {
    margin-bottom: 15px;
}

label {
    display: block;
    font-weight: bold;
    color: #000;
}

input,
textarea {
    width: 100%;
    padding: 8px;
    border: 2px solid #ffcc00;
    border-radius: 5px;
    font-size: 1rem;
}

.btn-submit {
    background: #ffcc00;
    color: #000;
    padding: 10px 15px;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    border-radius: 5px;
    font-weight: bold;
}

.btn-submit:disabled {
    background: #888;
    cursor: not-allowed;
}

.success-message {
    margin-top: 15px;
    color: #00ff00;
    font-weight: bold;
}

@media(max-width: 768px) {
    .back-button {
        width: 6rem;
        top: 20px;
        left: 10px;
        padding: 8px 16px;
        font-size: 0.6rem;
    }
}
</style>