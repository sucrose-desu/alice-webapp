import type { Permission } from '@prisma/client'

export default [
  {
    key: 'Account/Manage/A0',
    name: 'Manage account (Full Access)',
    canRead: true,
    canCreate: true,
    canEdit: true,
    canDelete: true
  },
  {
    key: 'Account/Manage/A1',
    name: 'Manage account (CRU Only)',
    canRead: true,
    canCreate: true,
    canEdit: true,
    canDelete: false
  },
  {
    key: 'Account/Manage/A2',
    name: 'Manage account (Read Only)',
    canRead: true,
    canCreate: false,
    canEdit: false,
    canDelete: false
  },
  {
    key: 'Permission/Manage/A0',
    name: 'Manage Permission (Full Access)',
    canRead: true,
    canCreate: true,
    canEdit: true,
    canDelete: true
  },
  {
    key: 'Permission/Manage/A1',
    name: 'Manage Permission (CRU Only)',
    canRead: true,
    canCreate: true,
    canEdit: true,
    canDelete: false
  },
  {
    key: 'Permission/Manage/A2',
    name: 'Manage Permission (Read Only)',
    canRead: true,
    canCreate: false,
    canEdit: false,
    canDelete: false
  }
] as Omit<Permission, 'id' | 'createdAt' | 'updatedAt'>[]
