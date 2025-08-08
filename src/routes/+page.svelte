<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import Hero from '$lib/components/accueil/Hero.svelte';
  import FeaturedProducts from '$lib/components/accueil/FeaturedProducts.svelte';

  onMount(() => {
    // On cache les éléments au départ pour éviter tout flash
    gsap.set(['.hero-section', '.products-section'], { opacity: 0 });

    if (!sessionStorage.getItem('hasSeenIntro')) {
      // 1. On crée une timeline qui agira comme un conteneur d'animations
      const tl = gsap.timeline();

      // 2. Animation n°1 : On fait apparaître la section Hero
      tl.from('.hero-section', {
        opacity: 0,
        y: 100,
        duration: 1.2,
        ease: 'expo.out',
      });
      
      // 3. Animation n°2 : On fait apparaître le *conteneur* des produits
      tl.from('.products-section', {
        opacity: 0,
        y: 100,
        duration: 1.2,
        ease: 'expo.out',
      }, "<0.4"); 
      
      // 4. Animation n°3 : On fait apparaître les cartes *à l'intérieur* du conteneur
      tl.from('.product-card', {
        opacity: 0,
        y: 50,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.2,
      }, "<0.2");

      sessionStorage.setItem('hasSeenIntro', 'true');

    } else {
      // Si l'intro a déjà été vue, on affiche tout instantanément
      gsap.set(['.hero-section', '.products-section'], { opacity: 1 });
    }
  });
</script>

<svelte:head>
  <title>Momocha - Salon de Thé Japonais</title>
  <meta name="description" content="Découvrez le meilleur des bubble teas, gaufres et desserts japonais chez Momocha." />
</svelte:head>

<div class="hero-section">
  <Hero />
</div>

<div class="products-section">
  <FeaturedProducts />
</div>