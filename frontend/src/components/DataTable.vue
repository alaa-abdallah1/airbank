<template>
  <div>
    <div class="flex flex-col md:flex-row md:justify-between mb-4 items-center">
      <div class="font-semibold mb-2 md:mb-0 capitalize">
        {{ title }}
      </div>
      <div>
        <slot name="headerRightContent"></slot>
      </div>
    </div>
    <div id="dataTable">
      <div class="w-full card">
        <div class="overflow-x-auto border-b border-gray-200">
          <table class="min-w-full card-table">
            <thead class="relative">
              <tr
                class="
                  leading-4
                  capitalize
                  tracking-wider
                  text-base
                  border-b border-gray-200
                "
              >
                <slot name="tableHead">
                  <th
                    :key="index"
                    class="font-bold"
                    v-for="(header, index) in headers"
                  >
                    <slot :name="`header.${header.key}`" :header="header">
                      {{ header.title || header.key }}
                    </slot>
                  </th>
                </slot>
              </tr>
            </thead>

            <tbody v-if="items.length">
              <tr
                :key="index"
                v-for="(item, index) in items"
                @click="$emit('clickRow', item)"
                class="
                  cursor-pointer
                  hover:bg-blue-600
                  text-gray-900
                  border-b border-gray-200
                "
              >
                <slot name="tableRow" :item="item">
                  <td
                    :key="headerIndex"
                    class="whitespace-no-wrap"
                    v-for="(header, headerIndex) in headers"
                  >
                    <slot :name="`item.${header.key}`" :item="item">
                      {{ displayCellValue(item, header.key) || '_' }}
                    </slot>
                  </td>
                </slot>
              </tr>
            </tbody>
            <tfoot
              v-else
              class="text-center text-gray-500 p-4 capitalize w-full"
            >
              <td :colspan="headers.length">{{ message }}</td>
            </tfoot>
          </table>
        </div>
        <div
          v-if="show_footer && items.length"
          id="pagination"
          class="mt-4 px-5 py-4 flex justify-between"
        >
          <span>
            showing {{ pagination.from }} to {{ pagination.to }} of
            {{ pagination.total }}
          </span>

          <span>
            <button
              @click="paginate('prev')"
              :disabled="pagination.current_page == 1"
              :class="`${
                pagination.current_page == 1
                  ? 'text-gray-500 cursor-not-allowed'
                  : 'text-primary'
              }`"
            >
              &laquo; Previous
            </button>
            |
            <button
              @click="paginate('next')"
              :disabled="pagination.current_page == pagination.last_page"
              :class="`${
                pagination.current_page == pagination.last_page
                  ? 'text-gray-500 cursor-not-allowed'
                  : 'text-primary'
              }`"
            >
              Next &raquo;
            </button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    url: String,
    title: {
      type: String,
      default: 'DataTable Title',
    },
    headers: {
      type: Array,
      default: () => [],
    },
    items: {
      type: Array,
      default: () => [],
    },
    pagination: {
      type: Object,
      default() {
        return { current_page: 1, last_page: 1 }
      },
    },
  },
  data: () => ({
    currentPage: 1,
    show_footer: true,
    message: 'no items to show',
  }),

  methods: {
    paginate(action) {
      let current_page = +this.pagination.current_page
      action === 'next' ? current_page++ : current_page--
      this.$router.replace({ query: { page: current_page } })
      this.$emit('refetchDate')
    },
  },

  watch: {
    $route() {
      this.$emit('refetchDate')
    },
  },
}
</script>
