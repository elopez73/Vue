<!-- src/App.vue (Right-Aligned Logout) -->
<template>
  <div id="app" class="min-h-screen bg-gray-100">
    <nav v-if="isUserSet" ref="nav" class="bg-white shadow-lg p-6 flex justify-between items-center">
      <div class="flex">
        <router-link to="/main" class="text-green-600 hover:text-green-800 mx-4 font-semibold">
          Main Page
        </router-link>
        <router-link to="/notes" class="text-green-600 hover:text-green-800 mx-4 font-semibold">
          Internal Notes
        </router-link>
        <router-link to="/support" class="text-green-600 hover:text-green-800 mx-4 font-semibold">
          Contact Support
        </router-link>
      </div>
      <button @click="logout" class="text-green-600 hover:text-red-800 mx-4 font-semibold transition duration-300">
        Logout
      </button>
    </nav>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <router-view v-slot="{ Component }" class="self-center">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script>
import { gsap } from "gsap";

export default {
  name: "App",
  computed: {
    isUserSet() {
      return this.$store.getters.isUserSet;
    },
  },
  watch: {
    isUserSet(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          gsap.from(this.$refs.nav, {
            y: -100,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          });
        });
      }
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition: all 0.5s ease;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
