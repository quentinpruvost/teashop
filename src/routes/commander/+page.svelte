<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import type { Product } from '$lib/stores';
  import { cartTotal } from '$lib/stores'; // On importe le store dérivé pour le total
  import MenuItem from '$lib/components/commander/MenuItem.svelte';
  import OrderSummary from '$lib/components/commander/OrderSummary.svelte';

  // --- Données du menu (vous pouvez les déplacer dans un fichier séparé plus tard si besoin) ---
  const menu: Product[] = [
    { id: 1, category: 'boissons', name: 'Bubble Tea Taro', price: 6.50, image: '/images/menu/taro-latte.jpg', desc: 'Le classique onctueux et réconfortant.' },
    { id: 2, category: 'boissons', name: 'Matcha Latte Glacé', price: 7.00, image: '/images/menu/matcha-latte.jpg', desc: 'La puissance du thé matcha, servi glacé.' },
    { id: 3, category: 'boissons', name: 'Brown Sugar Milk Tea', price: 6.80, image: '/images/menu/brown-sugar.jpg', desc: 'Un délice caramélisé avec des perles fondantes.' },
    { id: 5, category: 'desserts', name: 'Gaufre "Kuma" Chocolat', price: 7.50, image: '/images/menu/gaufre-choco.jpg', desc: 'Notre fameuse gaufre ours, nappe de chocolat.' },
    { id: 7, category: 'desserts', name: 'Pancakes Soufflés', price: 9.00, image: '/images/menu/souffle-pancake.jpg', desc: 'Incroyablement légers et aériens, servis par trois.' },
    { id: 8, category: 'glaces', name: 'Assortiment de Mochis', price: 6.00, image: '/images/menu/mochi-assortiment.jpg', desc: 'Trois saveurs surprise pour découvrir.' },
  ];

  // --- Animation d'entrée ---
  onMount(() => {
    gsap.from('.anim-element', {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.15
    });
  });
</script>

<svelte:head>
  <title>Commander - Momocha</title>
</svelte:head>

<div class="container mx-auto px-4 pt-32 pb-24">
  <div class="text-center mb-12 anim-element">
    <h1 class="text-4xl md:text-6xl font-extrabold text-gray-800 tracking-tight">Passez votre commande</h1>
    <p class="text-xl text-gray-500 mt-4">Choisissez vos produits et régalez-vous !</p>
  </div>

  <div class="grid lg:grid-cols-3 gap-8 md:gap-12 items-start">
    
    <div class="lg:col-span-2 space-y-12">
      <div class="anim-element">
        <h2 class="text-3xl font-bold mb-6">1. Choisissez vos produits</h2>
        <div class="space-y-4">
          {#each menu as product}
            <MenuItem {product} />
          {/each}
        </div>
      </div>

      <div class="anim-element">
        <h2 class="text-3xl font-bold mb-6">2. Vos informations</h2>
        <div class="bg-white p-8 rounded-lg shadow-sm border">
          <div class="grid md:grid-cols-2 gap-6">
            <input type="text" placeholder="Prénom" class="form-input" />
            <input type="text" placeholder="Nom" class="form-input" />
            <input type="email" placeholder="Adresse e-mail" class="form-input md:col-span-2" />
            <input type="text" placeholder="Adresse de livraison" class="form-input md:col-span-2" />
          </div>
        </div>
      </div>

      <div class="anim-element">
        <h2 class="text-3xl font-bold mb-6">3. Paiement</h2>
        <div class="bg-white p-8 rounded-lg shadow-sm border">
          <p class="text-gray-500 mb-4">Simulation de l'interface de paiement sécurisé.</p>
          <div class="border rounded-md p-4">
            <input type="text" placeholder="Numéro de carte" class="form-input mb-4" />
            <div class="grid grid-cols-2 gap-4">
              <input type="text" placeholder="MM / AA" class="form-input" />
              <input type="text" placeholder="CVC" class="form-input" />
            </div>
          </div>
        </div>
      </div>

    </div>

    <div class="lg:col-span-1 anim-element">
      <OrderSummary />

    </div>

  </div>
</div>

<style>
  .form-input {
    width: 100%;
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
    padding: 0.75rem 1rem;
    transition: all 0.2s;
  }
  .form-input:focus {
    outline: none;
    border-color: #ec4899;
    box-shadow: 0 0 0 3px rgba(236, 72, 153, 0.2);
  }
</style>