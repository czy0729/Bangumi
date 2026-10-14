/*
 * @Author: czy0729
 * @Date: 2023-04-23 15:51:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-31 05:21:36
 *
 * 日志与 Dollars 的纯函数工具
 */
import { extractIdFromAvatar } from '@utils/app/ages'
import { H, HOST_IMAGE } from '@constants'

import type { DollarsItem } from './types'

/**
 * Dollars 增量合并去重键
 * - since_id 只有秒精度, 服务端会把边界上已有的项再次返回
 * - 列表 id 为秒级时间戳, 增量项可能带完整毫秒, 统一取前 10 位再配合昵称与内容
 */
export function getDollarsKey(item: DollarsItem) {
  return `${String(item.id).slice(0, 10)}|${item.nickname}|${item.msg}`
}

/** 留言用户 id (头像路径里的数字) */
export function getDollarsUserId(avatar: string) {
  return extractIdFromAvatar(`${HOST_IMAGE}/pic/user/l/${avatar}`)
}

/**
 * 1 小时内独立发布过消息的用户数
 *
 * @param list 留言列表
 * @param now 当前时间戳 (秒)
 */
export function getDollarsOnline(list: DollarsItem[], now: number) {
  const users = new Set<string>()
  list.forEach(item => {
    // id 可能带毫秒, 统一取前 10 位即秒级时间戳
    const timestamp = Number(String(item.id).slice(0, 10))
    if (!timestamp || now - timestamp > H) return

    users.add(String(getDollarsUserId(item.avatar) || item.nickname))
  })

  return users.size
}

export function getBlogItemTime(str: string) {
  try {
    const temps = str
      .split('·')
      .map(item => item.trim())
      .filter(Boolean)
    if (temps.length) return temps[temps.length - 1]
  } catch {}
  return ''
}
