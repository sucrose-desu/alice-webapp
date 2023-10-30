interface BaseRecord<V = any> {
  label: string
  value: V
}

interface BaseDate {
  createdAt: Date | string
  updatedAt: Date | string
}

interface BaseQuery {
  page?: number
  limit?: number
}
