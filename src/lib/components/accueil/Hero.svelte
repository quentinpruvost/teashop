<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import { browser } from '$app/environment';

  // --- LOGIQUE POUR ORDINATEUR ---
  const coords = tweened({ x: 0, y: 0 }, { duration: 400, easing: cubicOut });
  let heroElement: HTMLElement | undefined;
  function handleMouseMove(event: MouseEvent) {
    if (!heroElement) return;
    const { left, top, width, height } = heroElement.getBoundingClientRect();
    const x = ((event.clientX - left) / width - 0.5) * 2;
    const y = ((event.clientY - top) / height - 0.5) * 2;
    coords.set({ x, y });
  }
  type Star = { top: number; left: number; size: number; delay: number; duration: number };
  let stars: Star[] = [];

  // --- LOGIQUE D'ANIMATION (DESKTOP + MOBILE) ---
  onMount(() => {
    if (browser) {
      if (window.innerWidth >= 768) {
        // --- Logique pour ordinateur ---
        for (let i = 0; i < 50; i++) {
          stars.push({ top: Math.random() * 100, left: Math.random() * 100, size: Math.random() * 2 + 1, delay: Math.random() * 5, duration: Math.random() * 3 + 2 });
        }
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
      } else {
        // --- Animation pour mobile ---
        const tl = gsap.timeline({ delay: 0.3 });
        tl.from('.mobile-anim-text', { opacity: 0, y: 20, stagger: 0.2, ease: 'power3.out' })
          .from('.mobile-deco', { opacity: 0, scale: 0.5, stagger: 0.2, ease: 'back.out(1.7)' }, "-=0.5");
      }
    }
  });
</script>

<section bind:this={heroElement} class="hero-container">
  <div class="stars-background hidden md:block">
    {#each stars as star}
      <div class="star" style="top: {star.top}%; left: {star.left}%; width: {star.size}px; height: {star.size}px; animation-delay: {star.delay}s; animation-duration: {star.duration}s;"></div>
    {/each}
  </div>

  <div class="text-content">
    <h1 class="title mobile-anim-text">Momocha</h1>
    <p class="subtitle mobile-anim-text">Le goût du rêve, à chaque gorgée.</p>
    <a href="/menu" class="cta-button mobile-anim-text">Découvrir notre univers</a>
  </div>

  <div class="floating-objects hidden md:block">
    <div class="object-wrapper" style="top: 10%; left: 15%; animation-duration: 8s;"><img src="/images/bubble-tea-hero.png" alt="Bubble Tea" class="object" style="transform: translate({$coords.x * 30}px, {$coords.y * 20}px); width: 250px;"/></div>
    <div class="object-wrapper" style="top: 20%; right: 15%; animation-duration: 10s; animation-delay: 1s;"><img src="/images/gaufre-hero.png" alt="Gaufre" class="object" style="transform: translate({$coords.x * -15}px, {$coords.y * -25}px); width: 200px;"/></div>
    <div class="object-wrapper" style="bottom: 15%; right: 30%; animation-duration: 7s; animation-delay: 0.5s;"><img src="/images/mochi-hero.png" alt="Mochi" class="object" style="transform: translate({$coords.x * 10}px, {$coords.y * -35}px); width: 150px;"/></div>
    <div class="object-wrapper" style="bottom: 10%; left: 8%; animation-duration: 9s; animation-delay: 0.2s;"><img src="/images/dango-hero.png" alt="Dango" class="object" style="transform: translate({$coords.x * -40}px, {$coords.y * 15}px); width: 180px;"/></div>
    <div class="object-wrapper" style="top: 55%; left: 30%; animation-duration: 11s;"><img src="/images/crepe-hero.png" alt="Crêpe japonaise" class="object" style="transform: translate({$coords.x * 25}px, {$coords.y * -20}px); width: 130px;"/></div>
    <div class="object-wrapper" style="top: 60%; right: 5%; animation-duration: 8.5s; animation-delay: 0.8s;"><img src="/images/mochii-hero.png" alt="Matcha Latte" class="object" style="transform: translate({$coords.x * -10}px, {$coords.y * 45}px); width: 160px;"/></div>
  </div>
  
  <div class="md:hidden">
    <div class="object-wrapper mobile-deco" style="top: 15%; right: 5%; animation-duration: 12s;">
        <img src="/images/mochi-hero.png" alt="Mochi" class="object" style="width: 80px;" />
    </div>
    <div class="object-wrapper mobile-deco" style="bottom: 5%; left: 5%; animation-duration: 15s; animation-delay: 1s;">
        <img src="/images/dango-hero.png" alt="Dango" class="object" style="width: 100px;" />
    </div>
  </div>
</section>

<style>
  /* --- STYLES PAR DÉFAUT (ORDINATEUR) --- */
  .hero-container {
    position: relative;
    height: 90vh;
    min-height: 600px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    color: white;
    text-align: center;
    background: linear-gradient(-45deg, #23153c, #4a286b, #1e3a5f, #0d1a2e);
    background-size: 400% 400%;
    animation: gradientBG 20s ease infinite;
  }
  .text-content { position: relative; z-index: 10; }
  /* Omission des autres styles desktop pour la clarté */
  @keyframes gradientBG{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}.stars-background{position:absolute;top:0;left:0;width:100%;height:100%}.star{position:absolute;background-color:white;border-radius:50%;box-shadow:0 0 8px 2px rgba(255,255,255,.7);animation-name:twinkle;animation-iteration-count:infinite;animation-timing-function:ease-in-out}@keyframes twinkle{0%,100%{opacity:.5;transform:scale(.8)}50%{opacity:1;transform:scale(1.2)}}.floating-objects{position:absolute;top:0;left:0;width:100%;height:100%}.object-wrapper{position:absolute;animation-name:levitate;animation-iteration-count:infinite;animation-timing-function:ease-in-out;animation-direction:alternate}@keyframes levitate{from{transform:translateY(-15px)}to{transform:translateY(15px)}}.object{will-change:transform;pointer-events:none;filter:drop-shadow(0px 15px 20px rgba(0,0,0,.3))}.title{font-size:clamp(3rem,12vw,8rem);font-weight:900;letter-spacing:.05em;text-shadow:0 0 10px rgba(255,192,203,.7),0 0 20px rgba(255,192,203,.5),0 0 45px rgba(173,216,230,.5)}.subtitle{font-size:1.5rem;margin:.5rem auto 2rem;text-shadow:0px 2px 5px rgba(0,0,0,.5)}.cta-button{background-color:#f9a8d4;color:#4c0519;font-weight:bold;font-size:1.1rem;padding:.9rem 2.2rem;border-radius:50px;text-decoration:none;transition:all .3s ease;box-shadow:0 0 20px rgba(249,168,212,.5)}.cta-button:hover{transform:translateY(-5px) scale(1.05);box-shadow:0 0 30px rgba(249,168,212,.8)}

  /* ============================================== */
  /* ===== NOUVEAU DESIGN COMPLET POUR LE MOBILE ===== */
  /* ============================================== */
  @media (max-width: 767px) {
    .hero-container {
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center; /* On centre le texte verticalement */
      align-items: flex-start; /* On aligne le texte à gauche */
      padding: 0 1.5rem; /* Marges gauche/droite */
      text-align: left;
      
      /* La nouvelle image de fond */
      background-image: url('/images/hero-background-mobile.jpg');
      background-size: cover;
      background-position: center;
      animation: none; /* On annule l'animation du dégradé */
    }

    /* Le voile sombre pour la lisibilité */
    .hero-container::before {
      content: '';
      position: absolute;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.4);
      z-index: 1;
    }

    .text-content {
      /* On s'assure que le texte est au-dessus du voile */
      z-index: 2;
    }
    
    .title {
      font-size: 3.5rem; /* un peu plus grand */
      color: white;
      text-shadow: 0 2px 10px rgba(0,0,0,0.5); /* Ombre simple et lisible */
    }

    .subtitle {
      font-size: 1.25rem;
      color: #e5e7eb; /* gris clair */
      max-width: 280px; /* Limite la largeur pour un meilleur flow */
      text-shadow: 0 1px 5px rgba(0,0,0,0.5);
    }

    .cta-button {
      background-color: #ec4899; /* pink-500 */
      color: white;
    }
    
    /* On positionne nos deux petites images décoratives */
    .mobile-deco {
      z-index: 2;
      animation-name: levitate; /* On garde l'animation de lévitation */
    }
  }
</style>