/*
 * @Author: czy0729
 * @Date: 2023-12-17 10:05:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-21 17:15:14
 *
 * 新番档期页面常量
 */
import type { UserId } from '@types'

export const COMPONENT = 'Staff'

/** 目录编纂者 */
export type CatalogUser = {
  /** 用户 Id */
  userId: UserId

  /** 用户名 */
  userName: string
}

/** 可供切换的目录编纂者 */
export const DATA_USERS: readonly CatalogUser[] = [
  { userId: 'lilyurey', userName: '优莉雅' },
  { userId: '901710', userName: '久梦' }
]

/** 默认展示的目录编纂者 */
export const DEFAULT_USER_ID = DATA_USERS[0].userId
