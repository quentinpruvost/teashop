<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { Mail, MapPin, Phone } from 'lucide-svelte';

  onMount(() => {
    // Animation d'entrée pour le contenu de la page
    gsap.from('.contact-content', {
      opacity: 0,
      scale: 0.95,
      y: 40,
      duration: 1,
      ease: 'expo.out',
      delay: 0.3
    });
  });
</script>

<svelte:head>
  <title>Contact - Momocha</title>
  <meta name="description" content="Contactez-nous pour toute question ou réservation." />
</svelte:head>

<div class="contact-page-container">
  
  <div class="contact-content">
    
    <div class="text-center mb-8">
      <h1 class="text-4xl md:text-5xl font-extrabold text-white">Entrons en contact</h1>
<p class="title-anim font-script text-3xl text-pink-200 mt-6 max-w-2xl mx-auto">Nous sommes toujours ravis d'échanger avec vous.</p>    </div>

    <div class="card">
      
      <div class="form-section">
        <form>
          <div class="mb-4">
            <label for="name" class="form-label">Nom complet</label>
            <input type="text" id="name" name="name" class="form-input" placeholder="Votre nom" required />
          </div>
          <div class="mb-4">
            <label for="email" class="form-label">Adresse e-mail</label>
            <input type="email" id="email" name="email" class="form-input" placeholder="vous@exemple.com" required />
          </div>
          <div class="mb-4">
            <label for="message" class="form-label">Votre message</label>
            <textarea id="message" name="message" rows="4" class="form-input" placeholder="Votre message..." required></textarea>
          </div>
          <button type="submit" class="submit-button">
            Envoyer
          </button>
        </form>
      </div>

      <div class="info-section">
        <div class="info-item">
          <MapPin class="info-icon" />
          <div>
            <h3 class="font-semibold">Notre Adresse</h3>
            <p class="text-gray-400">123 Rue de la Douceur<br>75000 Paris</p>
          </div>
        </div>
        <div class="info-item">
          <Mail class="info-icon" />
          <div>
            <h3 class="font-semibold">E-mail</h3>
            <a href="mailto:contact@momocha.com" class="info-link">contact@momocha.com</a>
          </div>
        </div>
        <div class="info-item">
          <Phone class="info-icon" />
          <div>
            <h3 class="font-semibold">Téléphone</h3>
            <p class="text-gray-400">01 23 45 67 89</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>

<style>
  .contact-page-container {
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

    /* Espacements spécifiques et responsives corrigés */
    padding-top: 8rem; /* 128px */
    padding-bottom: 4rem; /* 64px */
    padding-left: 1rem; /* 16px */
    padding-right: 1rem; /* 16px */
    
    /* On garde le fond cohérent */
    background: linear-gradient(-45deg, #23153c, #4a286b, #1e3a5f, #0d1a2e);
    background-size: 400% 400%;
    animation: gradientBG 20s ease infinite;
  }

  /* On ajuste les marges latérales pour les plus grands écrans */
  @media (min-width: 768px) {
    .contact-page-container {
      padding-left: 2rem;
      padding-right: 2rem;
    }
  }

  @keyframes gradientBG {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .contact-content {
    width: 100%;
    max-width: 1024px; /* lg */
  }

  .card {
    display: grid;
    background-color: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 0 20px 50px rgba(0,0,0,0.3);
  }

  /* Sur ordinateur, on affiche 2 colonnes */
  @media (min-width: 1024px) {
    .card {
      grid-template-columns: 3fr 2fr; /* Le formulaire prend plus de place */
    }
  }

  .form-section {
    padding: 2.5rem;
  }
  
  .info-section {
    background-color: rgba(0, 0, 0, 0.2);
    padding: 2.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center; /* Centre les infos verticalement dans leur colonne */
    gap: 1.5rem;
  }

  .form-label {
    display: block;
    color: #d1d5db; /* gray-300 */
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
  }

  .form-input {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 0.5rem;
    padding: 0.75rem 1rem;
    color: white;
    transition: all 0.2s ease;
  }
  .form-input:focus {
    outline: none;
    border-color: #f9a8d4;
    box-shadow: 0 0 0 3px rgba(249, 168, 212, 0.3);
  }

  .submit-button {
    width: 100%;
    margin-top: 1rem;
    background-color: #ec4899;
    color: white;
    font-weight: 700;
    padding: 0.75rem;
    border-radius: 0.5rem;
    transition: all 0.2s ease;
  }
  .submit-button:hover {
    background-color: #db2777;
    transform: scale(1.02);
  }

  .info-item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    color: white;
  }

  .info-icon {
    flex-shrink: 0;
    width: 1.5rem;
    height: 1.5rem;
    color: #f9a8d4; /* rose-300 */
    margin-top: 0.125rem;
  }

  .info-link {
    color: #cbd5e1; /* gray-300 */
    text-decoration: none;
    transition: color 0.2s;
  }
  .info-link:hover {
    color: #f9a8d4;
  }
</style>