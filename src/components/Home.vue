<!-- src/components/Home.vue -->
<template>
  <div class="home container mx-auto px-4 py-8 bg-white rounded-lg shadow-md">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Welcome to My App</h1>
    <div v-if="!isLoggedIn" class="text-center text-gray-600">
      <p>Please <router-link to="/login" class="text-blue-600 hover:underline">login</router-link> to continue.</p>
    </div>
    <form v-else @submit.prevent="saveUser" class="space-y-4">
      <div class="field" ref="fields">
        <label class="block text-gray-700 font-medium">Name:</label>
        <input v-model="form.name" type="text" placeholder="Enter your name" class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500" />
      </div>
      <div class="field" ref="fields">
        <label class="block text-gray-700 font-medium">Email:</label>
        <input v-model="form.email" type="email" placeholder="Enter your email" class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500" />
      </div>
      <div class="field" ref="fields">
        <label class="block text-gray-700 font-medium">Favorite Thing to Do:</label>
        <input v-model="form.favoriteThing" type="text" placeholder="What do you love doing?" class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500" />
      </div>
      <button type="submit" class="btn w-full hover:bg-green-700 transition duration-300">Save & Go</button>
    </form>
  </div>
</template>

<script>
import { gsap } from 'gsap';

export default {
  name: 'HomePage',
  data() {
    return {
      form: {
        name: '',
        email: '',
        favoriteThing: ''
      }
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  },
  mounted() {
    if (this.isLoggedIn) {
      const userData = this.$store.getters.getUser;
      this.form = { ...userData }; // Prefill form with existing data
      if (this.$refs.fields) {
        gsap.from(this.$refs.fields, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          stagger: 0.2,
          ease: 'power2.out'
        });
      }
    }
  },
  methods: {
    saveUser() {
      if (!this.isLoggedIn) {
        this.$router.push('/login');
        return;
      }
      const currentUser = this.$store.state.currentUser;
      const existingUser = this.$store.state.users.find(u => u.username === currentUser);
      if (!existingUser) {
        console.error('No user found for', currentUser);
        return;
      }
      this.$store.dispatch('updateUser', {
        username: currentUser,
        password: existingUser.password,
        userData: { ...this.form }
      });
      console.log('User data saved for', currentUser);
      this.$router.push('/main');
    }
  }
};
</script>
