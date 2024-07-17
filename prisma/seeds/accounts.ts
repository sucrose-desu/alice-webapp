import type { Account } from '@prisma/client'
import { genSaltSync, hashSync } from 'bcrypt'

export default [
  {
    uid: '100001010',
    email: 'root@alice.live',
    password: hashSync('password', genSaltSync(16)),
    role: 'ROOT',
    isVerified: true
  },
  {
    uid: '100001011',
    email: 'admin@alice.live',
    password: hashSync('password', genSaltSync(16)),
    role: 'ADMIN',
    isVerified: true
  }
] as Omit<Account, 'id' | 'createdAt' | 'updatedAt'>[]
