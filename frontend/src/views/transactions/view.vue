<template>
  <div class="max-w-7xl mx-auto py-16">
    <div class="card">
      <div class="card-body rounded-lg">
        <Loader v-if="loader" />
        <div v-else class="py-5 flex flex-wrap">
          <div
            v-for="(key, index) in itemKeys"
            :key="index"
            class="w-full px-6 mb-5 lg:w-1/2"
          >
            <div class="items-center border-b border-gray-250">
              <div class="text-gray-600 mb-1 capitalize">
                {{ editKeyFormat(key) }}
              </div>
              <div class="mb-1 font-semibold">
                {{ formatValue(displayCellValue(item, key)) }}

                <span v-if="item[key] && item[key].length > 60">
                  <span v-if="hasReadMore">... </span>
                  <span class="text-purple-700 cursor-pointer text-xs">
                    <span v-if="hasReadMore" @click="hasReadMore = false">
                      Read More &raquo;
                    </span>
                    <span v-else @click="hasReadMore = true">Read Less</span>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  data() {
    return {
      item: {},
      hasReadMore: true,
      itemKeys: [
        'account.name',
        'category.name',
        'description',
        'reference',
        'currency',
        'amount',
        'status',
        'transactionDate',
        'createdAt',
        'updatedAt',
      ],
    }
  },

  computed: {
    id() {
      return this.$route.params.id
    },
  },

  apollo: {
    transaction() {
      return {
        query: gql`
          query Transaction($transactionId: ID!) {
            transaction(id: $transactionId) {
              account {
                name
              }
              description
              category {
                name
              }
              reference
              currency
              amount
              status
              transactionDate
              createdAt
              updatedAt
            }
          }
        `,
        variables: {
          transactionId: this.id,
        },

        result({ data, loading }) {
          if (!loading) {
            this.loader = false
            if (data.transaction) {
              this.item = data.transaction
            } else {
              this.$router.push('/404')
            }
          }
        },
      }
    },
  },

  methods: {
    editKeyFormat(key) {
      return key.replace(/\./g, ' ')
    },

    formatValue(value) {
      if (value) {
        if (value.length > 60) {
          if (this.hasReadMore) {
            return value.slice(0, 60)
          }
          return value
        } else {
          return value
        }
      } else {
        return '_'
      }
    },
  },
}
</script>
