import { ApolloServer, gql } from 'apollo-server'
import { prisma } from '@/setup'
import {
  ITransaction,
  ITransactionsParams,
  ITransactionParams,
  ITransactionsResponse,
} from '@/types'

const typeDefs = gql`
  #  scalar
  scalar DateTime

  # Account query types
  type Account {
    id: ID!
    name: String!
  }

  # Category query types
  type Category {
    id: ID!
    name: String!
  }

  # Transaction query types
  type Transaction {
    id: ID!
    account: Account!
    description: String
    category: Category
    reference: String
    currency: String!
    amount: Float!
    status: Status!
    transactionDate: DateTime!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  # this enum uses by transaction's status
  enum Status {
    BOOKED
  }

  type Pagination {
    from: Int!
    to: Int!
    total: Int!
    last_page: Int!
    current_page: Int!
  }

  type PaginatedTransactions {
    transactions: [Transaction]
    pagination: Pagination
  }

  type Query {
    transactions(
      page: Int
      startDate: String
      endDate: String
    ): PaginatedTransactions

    transaction(id: ID!): Transaction
  }
`

const resolvers = {
  Query: {
    transactions: async (
      _: any,
      { page, startDate, endDate }: ITransactionsParams,
    ): Promise<ITransactionsResponse> => {
      page = isNaN(page as number) ? 1 : Number(page)
      startDate = startDate ? new Date(startDate) : ''
      endDate = endDate ? new Date(endDate) : ''

      let transactionQuery = undefined
      if (startDate && endDate) {
        transactionQuery = {
          transactionDate: {
            gte: startDate,
            lt: endDate,
          },
        }
      }

      const total = await prisma.transaction.count({
        where: transactionQuery,
      })

      let limit = 5,
        skip = limit * (page - 1),
        last_page = Math.ceil(total / limit)

      if (total % limit !== 0) {
        if (page === last_page) {
          limit = total % limit
        }
      }

      const pagination = {
        total,
        last_page,
        from: skip + 1,
        to: skip + limit,
        current_page: +page,
      }

      const transactions = await prisma.transaction.findMany({
        skip,
        take: limit,
        where: transactionQuery,
        include: { account: true, category: true },
      })

      return { transactions, pagination }
    },

    transaction: (
      _: any,
      { id }: ITransactionParams,
    ): Promise<ITransaction | null> => {
      return prisma.transaction.findUnique({
        where: { id },
        include: { account: true, category: true },
      })
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
