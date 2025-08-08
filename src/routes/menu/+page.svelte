<script lang="ts">
  import { onMount, beforeUpdate, afterUpdate, tick } from 'svelte';
  import gsap from 'gsap';
  import Flip from 'gsap/Flip';
  import ItemModal from '$lib/components/shared/ItemModal.svelte';

  // Le prix est bien de type 'number'
  type Item = { id: number; category: string; name: string; price: number; image: string; desc: string; };
  type Category = { id: string; name: string; };

  const categories: Category[] = [
    { id: 'tous', name: 'Toute la carte' },
    { id: 'boissons', name: 'Bubble Teas & Boissons' },
    { id: 'desserts', name: 'Desserts Chauds' },
    { id: 'glaces', name: 'Gourmandises Glacées' }
  ];

  // Les prix sont des nombres, sans le "€"
  const allItems: Item[] = [
    { id: 1, category: 'boissons', name: 'Bubble Tea Taro', price: 6.50, image: '/images/menu/taro-latte.jpg', desc: 'Le classique onctueux et réconfortant.' },
    { id: 2, category: 'boissons', name: 'Matcha Latte Glacé', price: 7.00, image: '/images/menu/matcha-latte.jpg', desc: 'La puissance du thé matcha, servi glacé.' },
    { id: 3, category: 'boissons', name: 'Brown Sugar Milk Tea', price: 6.80, image: '/images/menu/brown-sugar.jpg', desc: 'Un délice caramélisé avec des perles fondantes.' },
    { id: 4, category: 'boissons', name: 'Limonade Yuzu & Fraise', price: 5.50, image: '/images/menu/yuzu-lemonade.jpg', desc: 'Pétillant, acidulé et terriblement rafraîchissant.' },
    { id: 5, category: 'desserts', name: 'Gaufre "Kuma" Chocolat', price: 7.50, image: '/images/menu/gaufre-choco.jpg', desc: 'Notre fameuse gaufre ours, nappe de chocolat.' },
    { id: 6, category: 'desserts', name: 'Crêpe Suzette Japonaise', price: 8.00, image: '/images/menu/crepe-suzette.jpg', desc: 'Une crêpe fine et délicate, sauce aux agrumes.' },
    { id: 7, category: 'desserts', name: 'Pancakes Soufflés', price: 9.00, image: '/images/menu/souffle-pancake.jpg', desc: 'Incroyablement légers et aériens, servis par trois.' },
    { id: 8, category: 'glaces', name: 'Assortiment de Mochis', price: 6.00, image: '/images/menu/mochi-assortiment.jpg', desc: 'Trois saveurs surprise pour découvrir.' },
    { id: 9, category: 'glaces', name: 'Parfait Matcha', price: 8.50, image: '/images/menu/matcha-parfait.jpg', desc: 'Plusieurs couches de gourmandise autour du matcha.' },
    { id: 10, category: 'glaces', name: 'Kakigōri Fraise', price: 7.00, image: '/images/menu/kakigori.jpg', desc: 'Glace pilée japonaise, sirop de fraise maison.' }
  ];
  
  let activeCategory = 'tous';
  let menuGrid: HTMLElement;
  $: displayedItems = activeCategory === 'tous'
    ? allItems
    : allItems.filter(item => item.category === activeCategory);

  let selectedItem: Item | null = null;
  let state: any;
  let previousIds: string = ''; 

  onMount(() => {
    gsap.registerPlugin(Flip);
    previousIds = displayedItems.map(item => item.id).join(',');
  });

  beforeUpdate(() => {
    if (menuGrid) {
      state = Flip.getState(".menu-card");
    }
  });

  afterUpdate(() => {
    if (state) {
      const currentIds = displayedItems.map(item => item.id).join(',');
      if (previousIds !== currentIds) {
        Flip.from(state, {
          targets: ".menu-card",
          duration: 0.7,
          stagger: 0.05,
          ease: "power3.inOut",
          scale: true,
          absolute: true,
        });
      }
      previousIds = currentIds;
    }
  });
</script>

<div class="container mx-auto px-4 pt-24 pb-12 md:pt-32 md:pb-20">
  <div class="text-center mb-12">
    <h1 class="text-4xl md:text-6xl font-extrabold text-gray-800 tracking-tight">Notre Carte Gourmande</h1>
    <p class="text-xl text-gray-500 mt-4 max-w-2xl mx-auto">Découvrez nos créations, préparées avec passion et les meilleurs ingrédients.</p>
  </div>
  <div class="flex justify-center flex-wrap gap-2 md:gap-4 mb-12">
    {#each categories as category}
      <button 
        on:click={() => activeCategory = category.id}
        class="filter-button"
        class:active={activeCategory === category.id}
      >
        {category.name}
      </button>
    {/each}
  </div>
  <div bind:this={menuGrid} class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
    {#each displayedItems as item (item.id)}
      <div 
        class="menu-card cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        on:click={() => selectedItem = item}
        role="button"
        tabindex="0"
        on:keydown={(e) => e.key === 'Enter' && (selectedItem = item)}
      >
        <div class="aspect-w-16 aspect-h-9">
          <img src={item.image} alt={item.name} class="object-cover rounded-t-lg">
        </div>
        <div class="p-6">
          <div class="flex justify-between items-start">
            <h3 class="font-bold text-xl text-gray-800">{item.name}</h3>
            <p class="font-bold text-lg text-pink-500 whitespace-nowrap">{item.price.toFixed(2)}€</p>
          </div>
          <p class="text-gray-600 mt-2">{item.desc}</p>
        </div>
      </div>
    {/each}
  </div>
</div>

{#if selectedItem}
  <ItemModal item={selectedItem} on:close={() => selectedItem = null} />
{/if}


<style>
  .filter-button {
    padding: 0.75rem 1.5rem;
    font-weight: 600;
    border-radius: 9999px;
    background-color: #f3f4f6; /* gray-200 */
    color: #374151; /* gray-700 */
    transition: all 0.2s ease-in-out;
  }
  .filter-button:hover {
    background-color: #e5e7eb; /* gray-300 */
    transform: translateY(-2px);
  }
  .filter-button.active {
    background-color: #ec4899; /* pink-500 */
    color: white;
    box-shadow: 0 4px 14px 0 rgba(236, 72, 153, 0.3);
  }

  .menu-card {
    background-color: white;
    border-radius: 0.5rem; /* rounded-lg */
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.05), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    overflow: hidden;
  }

  /* Pour les images, Tailwind aspect-ratio n'est pas standard */
  /* Donc on l'ajoute manuellement au cas où */
  .aspect-w-16 {
    position: relative;
    padding-bottom: 56.25%; /* 9 / 16 = 0.5625 */
  }
  .aspect-h-9 > img {
    position: absolute;
    height: 100%;
    width: 100%;
  }
</style>