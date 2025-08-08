<script lang="ts">
  import { cart, addToCart, removeFromCart, cartSubtotal, cartTotal } from '$lib/stores';
  import { Plus, Minus } from 'lucide-svelte';

  const shippingCost = 3.50;
</script>

<div class="summary-card">
  <h2 class="text-2xl font-bold border-b pb-4">Votre Commande</h2>
  
  {#if $cart.length === 0}
    <div class="text-center py-16 text-gray-500">
      <p>Votre panier est vide.</p>
    </div>
  {:else}
    <div class="cart-items">
      {#each $cart as item (item.id)}
        <div class="cart-item">
          <img src={item.image} alt={item.name} class="item-image" />
          <div class="item-info">
            <p class="font-semibold">{item.name}</p>
            <p class="text-sm text-gray-600">{item.price.toFixed(2)}€</p>
          </div>
          <div class="quantity-controls">
            <button on:click={() => removeFromCart(item.id)}><Minus size={16}/></button>
            <span>{item.quantity}</span>
            <button on:click={() => addToCart(item)}><Plus size={16}/></button>
          </div>
        </div>
      {/each}
    </div>
  {/if}

  <div class="totals">
    <div class="flex justify-between text-gray-600">
      <span>Sous-total</span>
      <span>{$cartSubtotal.toFixed(2)}€</span>
    </div>
    <div class="flex justify-between text-gray-600">
      <span>Livraison</span>
      <span>{($cart.length > 0 ? shippingCost.toFixed(2) : '0.00')}€</span>
    </div>
    <div class="flex justify-between font-bold text-xl mt-4 border-t pt-4">
      <span>Total</span>
      <span>{$cartTotal.toFixed(2)}€</span>
    </div>
  </div>

  <button class="w-full mt-6 bg-pink-500 text-white font-bold py-4 rounded-lg text-lg hover:bg-pink-600 transition-colors disabled:bg-gray-300"
    disabled={$cart.length === 0}
  >
    Commander ({$cartTotal.toFixed(2)}€)
  </button>
</div>
<style>
  /* ... Votre CSS existant reste inchangé ... */
  .summary-card {
    background-color: #f9fafb;
    padding: 1.5rem;
    border-radius: 1rem;
    border: 1px solid #e5e7eb;
    position: sticky;
    top: 8rem;
  }
  .cart-items {
    max-height: 300px;
    overflow-y: auto;
    margin: 1rem 0;
    padding-right: 0.5rem;
  }
  .cart-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }
  .item-image {
    width: 56px;
    height: 56px;
    object-fit: cover;
    border-radius: 0.375rem;
  }
  .item-info {
    flex-grow: 1;
  }
  .quantity-controls {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    background-color: white;
    border: 1px solid #e5e7eb;
    border-radius: 9999px;
    padding: 0.25rem 0.5rem;
  }
  .totals {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #e5e7eb;
  }
</style>