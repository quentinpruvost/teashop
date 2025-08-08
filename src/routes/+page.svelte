<script lang="ts">
  // On importe uniquement les composants nécessaires.
  // Toute la logique d'animation (GSAP, onMount, afterNavigate) a été retirée.
  import Hero from '$lib/components/accueil/Hero.svelte';
  import FeaturedProducts from '$lib/components/accueil/FeaturedProducts.svelte';
</script>

<svelte:head>
  <title>Momocha - Salon de Thé Japonais</title>
  <meta name="description" content="Découvrez le meilleur des bubble teas, gaufres et desserts japonais chez Momocha." />
</svelte:head>

<div>
  <Hero />
</div>

<div>
  <FeaturedProducts />
</div>