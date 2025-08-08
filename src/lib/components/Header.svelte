<script lang="ts">
  import { Coffee, X, Menu } from 'lucide-svelte';
  import { slide, scale } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import { cartItemCount } from '$lib/stores';

  let y = 0;
  $: scrolled = y > 50;
  let isMobileMenuOpen = false;

  function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
  }
</script>

<svelte:window bind:scrollY={y} />

<header class:scrolled>
  <nav class="container">
    <a href="/" class="logo">
      <Coffee class="h-8 w-8" />
      <span>Momocha</span>
    </a>

    <ul class="nav-links">
      <li><a href="/" class="link">Accueil</a></li>
      <li><a href="/menu" class="link">Notre Carte</a></li>
      <li><a href="/contact" class="link">Contact</a></li>
    </ul>
    
    <a href="/commander" class="cta-button">
      Commander
      {#if $cartItemCount > 0}
        <span class="badge" transition:scale={{ duration: 300, easing: cubicOut }}>
          {$cartItemCount}
        </span>
      {/if}
    </a>

    <div class="md:hidden">
      <button on:click={toggleMobileMenu} class="text-white hover:text-pink-300 transition-colors z-20" aria-label="Ouvrir ou fermer le menu de navigation">
        {#if isMobileMenuOpen}
          <X class="h-7 w-7" />
        {:else}
          <Menu class="h-7 w-7" />
        {/if}
      </button>
    </div>
  </nav>

  {#if isMobileMenuOpen}
    <div 
      class="mobile-menu-panel"
      transition:slide={{ duration: 400, easing: cubicOut }}
    >
      <ul>
        <li><a href="/" on:click={toggleMobileMenu} class="mobile-link">Accueil</a></li>
        <li><a href="/menu" on:click={toggleMobileMenu} class="mobile-link">Notre Carte</a></li>
        <li><a href="/contact" on:click={toggleMobileMenu} class="mobile-link">Contact</a></li>
      </ul>
      <a href="/commander" on:click={toggleMobileMenu} class="mobile-cta-button">
        Commander
        {#if $cartItemCount > 0}
          <span class="badge" transition:scale={{ duration: 300, easing: cubicOut }}>
            {$cartItemCount}
          </span>
        {/if}
      </a>
    </div>
  {/if}
</header>

<style>
  header {
    position: fixed;
    top: 0;
    z-index: 50;
    width: 100%;
    padding-top: 1rem;
    padding-bottom: 1rem;
    transition: background-color 0.4s ease-out, backdrop-filter 0.4s ease-out, box-shadow 0.4s ease-out;
    background: linear-gradient(to bottom, rgba(16, 17, 34, 0.5), transparent);
  }

  header.scrolled {
    background-color: rgba(24, 27, 52, 0.6); 
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  }

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.875rem;
    font-weight: 700;
    color: white;
    transition: color 0.2s;
    text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
  }
  .logo:hover {
    color: #fbcfe8;
  }

  .nav-links {
    display: none;
  }
  @media (min-width: 768px) {
    .nav-links {
      display: flex;
      align-items: center;
      gap: 2rem;
      font-weight: 500;
      color: #d1d5db;
    }
  }

  .link {
    color: white;
    position: relative;
    padding-bottom: 0.25rem;
    text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
  }
  .link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #f9a8d4;
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.3s ease-out;
  }
  .link:hover::after {
    transform: scaleX(1);
    transform-origin: left;
  }
  
  .cta-button {
    position: relative;
    display: none;
  }
  @media (min-width: 768px) {
    .cta-button {
      display: block;
      background-color: #f9a8d4;
      color: #581c87;
      font-weight: 700;
      padding: 0.6rem 1.25rem;
      border-radius: 9999px;
      transition: all 0.2s ease-out;
    }
    .cta-button:hover {
      background-color: #fbcfe8;
      transform: scale(1.05);
      box-shadow: 0 0 15px rgba(249, 168, 212, 0.5);
    }
  }

  .badge {
    position: absolute;
    top: -8px;
    right: -8px;
    background-color: #db2777;
    color: white;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    font-weight: 700;
    border: 2px solid white;
  }
  
  .mobile-menu-panel {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: rgba(24, 27, 52, 0.9);
    backdrop-filter: blur(10px);
    padding: 1rem 1.5rem 2rem;
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  }
  @media (min-width: 768px) {
    .mobile-menu-panel {
      display: none;
    }
  }

  .mobile-link {
    display: block;
    color: white;
    font-size: 1.25rem;
    font-weight: 600;
    padding: 1rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    transition: color 0.2s;
  }
  .mobile-link:hover {
    color: #f9a8d4;
  }

  .mobile-cta-button {
    position: relative;
    display: block;
    width: 100%;
    text-align: center;
    margin-top: 1.5rem;
    background-color: #f9a8d4;
    color: #581c87;
    font-weight: 700;
    padding: 0.9rem 2.2rem;
    border-radius: 9999px;
  }
</style>