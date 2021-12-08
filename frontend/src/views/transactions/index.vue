<template>
  <div class="max-w-7xl mx-auto py-16 md:px-5">
    <Loader v-if="loader" />
    <div v-else>
      <DataTable
        :items="items"
        :headers="headers"
        @clickRow="clickRow"
        :pagination="pagination"
        @refetchDate="refetchDate"
        title="Transactions Overview"
      >
        <template #headerRightContent>
          <date-picker
            range
            type="month"
            v-model="date"
            format="YYYY-MM"
            @change="filterByDate"
            placeholder="Filter By Date Range"
          />
        </template>
      </DataTable>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import NProgress from 'nprogress'
import 'vue2-datepicker/index.css'
import DatePicker from 'vue2-datepicker'
import Loader from '@/components/Loader.vue'
import DataTable from '@/components/DataTable.vue'

export default {
  components: { DataTable, DatePicker, Loader },
  data() {
    return {
      date: '',
      startDate: '',
      endDate: '',

      loader: true,
      currentPage: 1,

      items: [],
      pagination: {},
      headers: [
        { title: 'account', key: 'account.name' },
        { title: 'category', key: 'category.name' },
        { key: 'currency' },
        { key: 'amount' },
        { key: 'status' },
        { key: 'transactionDate' },
      ],
    }
  },

  apollo: {
    transactions() {
      this.checkCurrentPage()
      return {
        query: gql`
          query Transactions(
            $page: Int!
            $startDate: String
            $endDate: String
          ) {
            transactions(
              page: $page
              startDate: $startDate
              endDate: $endDate
            ) {
              transactions {
                id
                account {
                  name
                }
                category {
                  name
                }
                amount
                status
                currency
                transactionDate
              }
              pagination {
                from
                to
                total
                last_page
                current_page
              }
            }
          }
        `,
        variables: {
          page: +this.currentPage,
          startDate: this.startDate,
          endDate: this.endDate,
        },
        result({ data, loading }) {
          if (!loading) {
            this.loader = false
            this.items = data.transactions.transactions
            this.pagination = data.transactions.pagination
          }
        },

        prefetch: false,

        watchLoading(isLoading) {
          isLoading ? NProgress.start() : NProgress.done()
        },
      }
    },
  },

  methods: {
    clickRow({ id }) {
      this.$router.push(`/transactions/${id}`)
    },

    filterByDate(date) {
      this.startDate = date[0]
      this.endDate = date[1]

      // reset currentPage
      this.currentPage = 1
      this.$route.query.page != 1 && this.$router.push({ query: { page: 1 } })

      // fetch new data
      this.refetchDate()
    },

    refetchDate() {
      this.checkCurrentPage()
      this.$apollo.queries.transactions.refetch({
        page: +this.currentPage,
        startDate: this.startDate,
        endDate: this.endDate,
      })
    },

    checkCurrentPage() {
      if (
        this.$route.query.page &&
        !isNaN(this.$route.query.page) &&
        this.$route.query.page > 0
      ) {
        this.currentPage = this.$route.query.page
      } else {
        this.currentPage = 1
        this.$router.replace({ query: { page: this.currentPage } })
      }
    },
  },
}
</script>
