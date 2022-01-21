/**
 * Represents a user.
 */
export type User = {
  id: string
  name: string
  email: string
  password?: string
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
  isActive: boolean
  isAdmin: boolean
  isVerified: boolean
}
