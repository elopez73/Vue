<!-- src/components/MainPage.vue -->
<template>
  <div class="main-page container mx-auto px-4 py-8 bg-white rounded-lg shadow-md">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Main Page</h1>
    <h2 class="text-xl font-semibold text-gray-700 mb-4">Your Information</h2>
    <p class="text-gray-600"><strong>Name:</strong> {{ user.name || 'Not set' }}</p>
    <p class="text-gray-600"><strong>Email:</strong> {{ user.email || 'Not set' }}</p>
    <p class="text-gray-600"><strong>Favorite Thing:</strong> {{ user.favoriteThing || 'Not set' }}</p>
  </div>
</template>

<script>
export default {
  name: 'MainPage',
  computed: {
    user() {
      return this.$store.getters.getUser;
    }
  }
};
</script>
