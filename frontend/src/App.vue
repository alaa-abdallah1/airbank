<template>
  <div id="app">
    <!-- Navbar -->
    <nav id="nav" class="flex flex-wrap p-4 shadow">
      <div class="max-w-7xl mx-auto font-semibold">
        <router-link to="/transactions?page=1">
          <span v-if="cursor">&#x3c;</span>
          Transactions
        </router-link>
      </div>
    </nav>

    <!-- views -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cursor: false,
    }
  },

  methods: {
    cursorStatus() {
      this.cursor = this.$route.name !== 'Transactions' ? true : false
    },
  },

  mounted() {
    this.cursorStatus()
  },

  watch: {
    $route() {
      this.cursorStatus()
    },
  },
}
</script>
