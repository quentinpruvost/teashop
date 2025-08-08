<script>
  import { Instagram, Facebook, Twitter } from 'lucide-svelte';
</script>

<footer class="bg-pink-50 text-gray-700">
  <div class="container mx-auto px-6 py-10">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
      <div>
        <h3 class="font-bold text-lg text-pink-500 mb-2">Momocha Salon de Thé</h3>
        <p>123 Rue de la Douceur</p>
        <p>75000 Paris, France</p>
      </div>
      <div>
        <h3 class="font-bold text-lg text-pink-500 mb-2">Horaires</h3>
        <p>Mardi - Dimanche</p>
        <p>11:00 - 19:00</p>
      </div>
      <div>
        <h3 class="font-bold text-lg text-pink-500 mb-2">Suivez-nous</h3>
        <div class="flex justify-center md:justify-start space-x-4 mt-2">
          <a href=" " class="hover:text-pink-500 transition-colors"><Instagram /></a>
          <a href=" " class="hover:text-pink-500 transition-colors"><Facebook /></a>
          <a href=" " class="hover:text-pink-500 transition-colors"><Twitter /></a>
        </div>
      </div>
    </div>
    <div class="mt-10 pt-6 border-t border-pink-200 text-center text-sm">
      <p>&copy; {new Date().getFullYear()} Momocha. Tous droits réservés.</p>
    </div>
  </div>
</footer>