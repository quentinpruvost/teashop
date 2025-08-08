<script>
  // Ce composant n'a plus besoin d'importer onMount ou gsap.
  // Il se contente de définir ses données.
  const products = [
    { name: 'Bubble Tea Taro', description: 'Un classique crémeux et réconfortant.', image: '/images/bubble-tea.jpg' },
    { name: 'Gaufre "Kuma"', description: 'Gaufre chaude en forme d\'ours, nappage au choix.', image: '/images/gaufre.jpg' },
    { name: 'Mochis Glacés', description: 'Assortiment de nos meilleures saveurs fruitées.', image: '/images/mochi.jpg' }
  ];
</script>

<section class="py-16 md:py-24 bg-white">
  <div class="container mx-auto px-6">
    <div class="text-center mb-12">
      <h2 class="text-3xl md:text-4xl font-bold text-gray-800">Nos Incontournables</h2>
      <p class="text-lg text-gray-500 mt-2">Les favoris de nos clients !</p>
    </div>

    <div class="grid md:grid-cols-3 gap-8">
      {#each products as product}
        <div class="product-card bg-pink-50 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
          <img src={product.image} alt={product.name} class="w-full h-56 object-cover">
          <div class="p-6">
            <h3 class="font-bold text-xl text-pink-500 mb-2">{product.name}</h3>
            <p class="text-gray-600">{product.description}</p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>