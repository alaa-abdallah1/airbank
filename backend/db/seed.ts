import data from './data.json'
import { prisma } from '@/setup'
import {
  IAccount,
  ICategory,
  ITransaction,
  TransactionStatusEnum,
} from '@/types'

async function main() {
  const accounts: string[] = [...new Set(data.map(({ account }) => account))]

  await prisma.account.createMany({
    data: accounts.map((account) => ({ name: account })),
  })

  const databaseAccounts: IAccount[] = await prisma.account.findMany()

  const accountsWithIds: Record<string, string> = databaseAccounts.reduce(
    (result, account) => ({
      ...result,
      [account.name]: account.id,
    }),
    {},
  )

  const categories: string[] = [
    ...new Set(data.map(({ category }) => category)),
  ]

  await prisma.category.createMany({
    data: categories
      .filter((category) => !!category)
      .map((category) => ({ name: category })),
  })

  const databaseCategories: ICategory[] = await prisma.category.findMany()

  const categoriesWithIds: Record<string, string> = databaseCategories.reduce(
    (result, category) => ({
      ...result,
      [category.name]: category.id,
    }),
    {},
  )

  const transactions: ITransaction[] = data.map(
    ({
      account,
      category,
      status,
      transactionDate,
      description,
      ...transaction
    }) => ({
      ...transaction,
      status: status as TransactionStatusEnum,
      description: String(description),
      transactionDate: new Date(transactionDate),
      accountId: accountsWithIds[account] as string,
      categoryId: categoriesWithIds[category],
    }),
  )

  await prisma.transaction.createMany({
    data: transactions,
  })
}

main()
  .then(() => console.log('Transactions Created Successfuly!'))
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
