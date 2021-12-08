export interface ITransactionsParams {
  page?: number
  startDate?: string | Date
  endDate?: string | Date
}

export interface ITransactionParams {
  id: string
}

export interface IAccount {
  id: string
  name: string
}

export interface ICategory {
  id: string
  name: string
}

export type TransactionStatusEnum = 'BOOKED'

export interface ITransaction {
  id?: string
  accountId: string
  account?: IAccount
  description?: string | null
  categoryId?: string | null
  category?: ICategory | null
  reference?: string | null
  currency: string
  amount: number
  status: TransactionStatusEnum
  transactionDate: string | Date
  createdAt?: string | Date
  updatedAt?: string | Date
}

export interface IPagination {
  from: number
  to: number
  total: number
  last_page: number
  current_page: number
}

export interface ITransactionsResponse {
  pagination: IPagination
  transactions: ITransaction[]
}
