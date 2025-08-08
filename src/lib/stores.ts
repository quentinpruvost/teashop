// Dans src/lib/stores.ts
import { writable, derived } from 'svelte/store'; // On importe 'derived'
import type { Writable, Readable } from 'svelte/store'; // On importe 'Readable'

// --- Interfaces (inchangées) ---
export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  desc: string;
}

// --- Store Principal (inchangé) ---
export const cart: Writable<CartItem[]> = writable([]);

// --- Fonctions de manipulation (inchangées) ---
export const addToCart = (productToAdd: Product | CartItem, quantity: number = 1) => {
  cart.update((items) => {
    const existingItem = items.find(item => item.id === productToAdd.id);

    if (existingItem) {
      // Si l'article existe déjà, on augmente la quantité
      existingItem.quantity += quantity;
      return [...items];
    } else {
      // Sinon, on l'ajoute au panier avec la bonne quantité
      return [...items, { ...productToAdd, quantity: quantity }];
    }
  });
};


export const removeFromCart = (productId: number) => {
  cart.update((items) => {
    const existingItem = items.find(item => item.id === productId);
    if (existingItem && existingItem.quantity > 1) {
      existingItem.quantity--;
      return [...items];
    } else {
      return items.filter(item => item.id !== productId);
    }
  });
};


// --- NOUVEAU : STORES DÉRIVÉS ---

// Store pour le sous-total
export const cartSubtotal: Readable<number> = derived(
  cart,
  ($cart) => $cart.reduce((total, item) => total + item.price * item.quantity, 0)
);

// Store pour le total final (avec livraison)
export const cartTotal: Readable<number> = derived(
  cart,
  ($cart) => {
    const subtotal = $cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const shippingCost = 3.50;
    return subtotal + ($cart.length > 0 ? shippingCost : 0);
  }
);
export const cartItemCount: Readable<number> = derived(
  cart,
  ($cart) => $cart.reduce((sum, item) => sum + item.quantity, 0)
);