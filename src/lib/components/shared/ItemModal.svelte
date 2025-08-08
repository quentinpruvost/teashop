<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import { scale, fade } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import { X, Plus, Minus, ShoppingCart, ArrowRight } from 'lucide-svelte';
  import { addToCart } from '$lib/stores';
  import type { Product } from '$lib/stores';
  import { goto } from '$app/navigation'; // Pour la redirection

  export let item: Product | null = null;

  const dispatch = createEventDispatcher();

  // --- NOUVEAU : Gestion de l'état interne de la modale ---
  let quantity = 1; // Quantité par défaut
  let showConfirmation = false; // Pour afficher l'étape de confirmation

  // Réinitialiser l'état quand un nouvel item est chargé
  $: if (item) {
    quantity = 1;
    showConfirmation = false;
  }
  
  function increment() {
    quantity++;
  }
  function decrement() {
    if (quantity > 1) {
      quantity--;
    }
  }

  function close() {
    dispatch('close');
  }

  function handleAddToCart() {
    if (!item) return;
    addToCart(item, quantity);
    showConfirmation = true; // On affiche l'étape de confirmation
  }

  function goToCommander() {
    close();
    goto('/commander'); // Redirige vers la page commander
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && item) {
      close();
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if item}
  <div class="modal-overlay" on:click={close}>
    <div 
      class="modal-window" 
      on:click|stopPropagation
      transition:scale={{ duration: 300, start: 0.9, easing: cubicOut }}
    >
      <img src={item.image} alt={item.name} class="modal-image" />
      
      <div class="modal-content">
        {#if !showConfirmation}
          <div in:fade={{ duration: 200 }} out:fade={{ duration: 200 }}>
            <div class="flex justify-between items-start gap-4">
              <h2 class="text-3xl font-bold text-gray-900">{item.name}</h2>
              <span class="text-3xl font-light text-pink-600 whitespace-nowrap">{item.price.toFixed(2)}€</span>
            </div>
            <p class="text-lg text-gray-600 my-6">{item.desc}</p>
            
            <div class="flex items-center gap-4 mb-6">
              <span class="font-semibold">Quantité :</span>
              <div class="quantity-selector">
                <button on:click={decrement}><Minus size={20}/></button>
                <span class="quantity-display">{quantity}</span>
                <button on:click={increment}><Plus size={20}/></button>
              </div>
            </div>
            
            <button on:click={handleAddToCart} class="add-to-cart-button">
              Ajouter au Panier ({ (item.price * quantity).toFixed(2) }€)
            </button>
          </div>
        {:else}
          <div class="text-center p-8" in:fade={{ duration: 200, delay: 200 }}>
            <ShoppingCart class="mx-auto h-16 w-16 text-pink-500" />
            <h3 class="text-2xl font-bold mt-4 text-gray-800">Ajouté au panier !</h3>
            <p class="text-gray-600 mt-2">Que souhaitez-vous faire maintenant ?</p>
            <div class="mt-8 space-y-4">
              <button on:click={goToCommander} class="confirm-button primary">
                Voir le panier & Commander <ArrowRight class="inline ml-2" size={16}/>
              </button>
              <button on:click={close} class="confirm-button secondary">
                Continuer mes achats
              </button>
            </div>
          </div>
        {/if}
      </div>

      <button class="close-button" on:click={close} aria-label="Fermer la modale">
        <X size={28} />
      </button>
    </div>
  </div>
{/if}


<style>
  .modal-overlay {
    position: fixed;
    inset: 0;
    z-index: 100;
    background-color: rgba(16, 17, 34, 0.7);
    backdrop-filter: blur(8px);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
  }

  .modal-window {
    position: relative;
    max-width: 800px;
    width: 100%;
    background-color: white;
    border-radius: 1rem;
    box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
    display: grid;
    grid-template-columns: repeat(1, 1fr);
  }
  @media (min-width: 768px) {
    .modal-window {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .modal-image {
    width: 100%;
    height: 100%;
    max-height: 500px;
    object-fit: cover;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
  }
  @media (min-width: 768px) {
    .modal-image {
      border-radius: 1rem 0 0 1rem;
    }
  }

  .modal-content {
    padding: 2.5rem;
  }

  .close-button {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    color: #9ca3af;
    transition: all 0.2s ease;
  }
  .close-button:hover {
    color: #111827;
    transform: rotate(90deg);
  }
  
  .add-to-cart-button {
    width: 100%;
    background-color: #ec4899;
    color: white;
    font-weight: 700;
    padding: 1rem;
    border-radius: 0.5rem;
    text-align: center;
    transition: all 0.2s ease;
  }
  .add-to-cart-button:hover {
    background-color: #db2777;
    transform: scale(1.02);
  }
  @media (max-width: 767px) {
  .modal-overlay {
    /* On retire le padding pour que la modale prenne tout l'espace */
    padding: 0;
    align-items: flex-start; /* On aligne la modale en haut */
  }

  .modal-window {
    /* La modale prend 100% de la hauteur et n'a pas de coins arrondis */
    height: 100%;
    border-radius: 0;
    /* On s'assure que le contenu peut défiler si l'écran est très petit */
    overflow-y: auto;
  }

  .modal-image {
    /* L'image n'est plus à côté mais au-dessus */
    grid-column: 1 / -1; /* Prend toute la largeur de la grille */
    height: 300px; /* Hauteur fixe pour l'image */
    border-radius: 0; /* Pas de coins arrondis */
  }

  .modal-content {
    padding: 1.5rem; /* On réduit le padding */
  }

  .close-button {
    /* On rend le bouton plus visible sur un fond potentiellement clair */
    color: #6b7280; /* gray-500 */
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 9999px;
    padding: 0.25rem;
    top: 1rem;
    right: 1rem;
  }
}
.quantity-selector {
    display: inline-flex;
    align-items: center;
    border: 1px solid #d1d5db;
    border-radius: 9999px;
  }
  .quantity-selector button {
    padding: 0.5rem;
  }
  .quantity-display {
    padding: 0.5rem 1rem;
    font-weight: 700;
    min-width: 50px;
    text-align: center;
    border-left: 1px solid #d1d5db;
    border-right: 1px solid #d1d5db;
  }

  .confirm-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 0.8rem 1rem;
    font-weight: 600;
    border-radius: 0.5rem;
    transition: all 0.2s ease;
  }
  .confirm-button.primary {
    background-color: #ec4899;
    color: white;
  }
  .confirm-button.primary:hover {
    background-color: #db2777;
  }
  .confirm-button.secondary {
    background-color: #f3f4f6;
    color: #374151;
  }
  .confirm-button.secondary:hover {
    background-color: #e5e7eb;
  }
    .modal-overlay{position:fixed;inset:0;z-index:100;background-color:rgba(16,17,34,.7);backdrop-filter:blur(8px);display:flex;justify-content:center;align-items:center;padding:1rem}@media (max-width:767px){.modal-overlay{padding:0;align-items:flex-start}}.modal-window{position:relative;max-width:800px;width:100%;background-color:white;border-radius:1rem;box-shadow:0 25px 50px -12px rgba(0,0,0,.25);display:grid;grid-template-columns:repeat(1,1fr)}@media (min-width:768px){.modal-window{grid-template-columns:repeat(2,1fr)}}@media (max-width:767px){.modal-window{height:100%;border-radius:0;overflow-y:auto}}.modal-image{width:100%;height:100%;max-height:500px;object-fit:cover;border-top-left-radius:1rem;border-top-right-radius:1rem}@media (min-width:768px){.modal-image{border-radius:1rem 0 0 1rem}}@media (max-width:767px){.modal-image{grid-column:1 / -1;height:300px;border-radius:0}}.modal-content{padding:2.5rem}@media (max-width:767px){.modal-content{padding:1.5rem}}.close-button{position:absolute;top:.75rem;right:.75rem;color:#9ca3af;transition:all .2s ease}@media (max-width:767px){.close-button{color:#6b7280;background-color:rgba(255,255,255,.7);border-radius:9999px;padding:.25rem;top:1rem;right:1rem}}.close-button:hover{color:#111827;transform:rotate(90deg)}.add-to-cart-button{width:100%;background-color:#ec4899;color:white;font-weight:700;padding:1rem;border-radius:.5rem;text-align:center;transition:all .2s ease}.add-to-cart-button:hover{background-color:#db2777;transform:scale(1.02)}
</style>