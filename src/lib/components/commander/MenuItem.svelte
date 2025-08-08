<script lang="ts">
  import type { Product } from '$lib/stores';
  import { addToCart } from '$lib/stores';
  import { PlusCircle } from 'lucide-svelte';

  export let product: Product;
</script>

<div class="menu-item-card">
  <img src={product.image} alt={product.name} class="item-image" />
  <div class="item-details">
    <h3 class="font-bold">{product.name}</h3>
    <p class="text-sm text-gray-500">{product.desc}</p>
  </div>
  <div class="item-actions">
    <span class="font-bold text-lg">{product.price.toFixed(2)}€</span>
    <button on:click={() => addToCart(product)} class="add-button" aria-label="Ajouter {product.name} au panier">
      <PlusCircle />
    </button>
  </div>
</div>

<style>
  .menu-item-card {
    display: flex;
    align-items: center;
    gap: 1rem;
    background-color: white;
    padding: 0.75rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05);
    transition: all 0.2s ease-out;
  }
  .menu-item-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.07);
  }
  .item-image {
    width: 64px; /* 4rem */
    height: 64px;
    object-fit: cover;
    border-radius: 0.375rem;
  }
  .item-details {
    flex-grow: 1;
  }
  .item-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .add-button {
    color: #ec4899; /* pink-500 */
    transition: all 0.2s;
  }
  .add-button:hover {
    color: #db2777; /* pink-600 */
    transform: scale(1.1);
  }
</style>