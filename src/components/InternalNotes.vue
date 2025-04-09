<!-- src/components/InternalNotes.vue -->
<template>
  <div class="notes container mx-auto px-4 py-8 bg-white rounded-lg shadow-md">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Internal Notes</h1>
    <form @submit.prevent="saveNote" class="space-y-4 mb-6">
      <div>
        <label class="block text-gray-700 font-medium">Note:</label>
        <textarea v-model="note" placeholder="Add a note" class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"></textarea>
      </div>
      <button type="submit" class="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-300">Save Note</button>
    </form>
    <h2 class="text-xl font-semibold text-gray-700 mb-4">Saved Notes</h2>
    <ul class="space-y-2">
      <li v-for="(note, index) in notes" :key="index" ref="noteItems" class="p-3 bg-gray-50 rounded border">{{ note }}</li>
    </ul>
  </div>
</template>

<script>
import { gsap } from 'gsap';

export default {
  name: 'InternalNotes',
  data() {
    return {
      note: ''
    };
  },
  computed: {
    notes() {
      return this.$store.getters.getNotes;
    }
  },
  methods: {
    saveNote() {
      if (this.note.trim()) {
        this.$store.dispatch('saveNote', this.note);
        this.$nextTick(() => {
          const lastNote = this.$refs.noteItems[this.$refs.noteItems.length - 1];
          gsap.from(lastNote, {
            opacity: 0,
            x: -20,
            duration: 0.5,
            ease: 'power2.out'
          });
        });
        this.note = '';
      }
    }
  }
};
</script>
