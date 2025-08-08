<script>
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import '../app.css'; // Assurez-vous que votre CSS Tailwind est importé ici
</script>

<div class="flex flex-col min-h-screen bg-gray-50">
  <Header />

  <main class="flex-grow">
    <slot /> </main>

  <Footer />
</div>