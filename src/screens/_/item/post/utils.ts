/*
 * @Author: czy0729
 * @Date: 2021-11-26 04:08:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-04 05:00:00
 *
 * 楼层渲染工具: 高度记录 / 屏蔽用户 / decode 与屏蔽词命中缓存
 */
import { rakuenStore } from '@stores'
import { ensureCacheLimit, getIsBlocked, getTimestamp } from '@utils'
import decoder from '@utils/thirdParty/html-entities-decoder'

import type { UserId } from '@types'

/** 记录每个楼层的高度 */
export const layoutHeightMap = new Map<number, number>()

/** 处理屏蔽用户, 追踪计数 uuid */
const memoBlockedUser = new Map<string, true>()

/** 缓存上限, 超限淘汰最早写入 */
const CACHE_MAX = 500

/** 记录楼层高度 (带上限, 防止无限增长) */
export function setLayoutHeight(id: number, height: number) {
  layoutHeightMap.set(id, height)
  ensureCacheLimit(layoutHeightMap, CACHE_MAX)
}

/** decode 结果缓存, 长楼层在状态变化重算时重复 decode 很贵 */
const decodeCache = new Map<string, string>()

/** HTML 实体解码 (带缓存) */
export function decodeMessage(message: string) {
  let result = decodeCache.get(message)
  if (result === undefined) {
    result = decoder(message)
    decodeCache.set(message, result)
    ensureCacheLimit(decodeCache, CACHE_MAX)
  }
  return result
}

/** 屏蔽词命中结果缓存, key 含屏蔽词内容指纹, 修改屏蔽词后自动失效 */
const blockedCache = new Map<string, boolean>()

/** 屏蔽词命中 (带缓存) */
export function isBlockedMessage(
  blockKeywords: string[] | readonly string[],
  msg: string,
  uuid: string
) {
  const key = `${blockKeywords.join('\n')}\n${uuid}\n${msg}`
  let result = blockedCache.get(key)
  if (result === undefined) {
    result = getIsBlocked(blockKeywords, msg, uuid)
    blockedCache.set(key, result)
    ensureCacheLimit(blockedCache, CACHE_MAX)
  }
  return result
}

/**
 * 楼层公共派生: decode + 屏蔽词命中 + 新楼层 + 跳转判定, 供主/子楼层共用
 *
 * @param message 原始楼层内容
 * @param id 楼层 Id
 * @param time 楼层时间
 * @param postId 跳转目标楼层 Id
 * @param readedTime 已读时间
 * @param newFloorStyle 新楼层样式
 * @param blockKeywords 屏蔽词列表
 * @param blockedSource 屏蔽词检测用的文本, 默认用解码后的 msg (子楼层传去 HTML 标签后的 rawMsg)
 */
export function deriveFloorState({
  message,
  id,
  time,
  postId,
  readedTime,
  newFloorStyle,
  blockKeywords,
  blockedSource
}: {
  message: string
  id: number | string
  time: string
  postId?: string | number
  readedTime?: string | number
  newFloorStyle?: string
  blockKeywords: string[] | readonly string[]
  blockedSource?: string
}) {
  const msg = decodeMessage(message)
  const isBlocked = isBlockedMessage(
    blockKeywords,
    blockedSource === undefined ? msg : blockedSource,
    `Topic|${id}`
  )

  let isNew = false
  if (newFloorStyle !== '不设置') {
    isNew = !!readedTime && getTimestamp(time) > Number(readedTime)
  }

  const isJump = !!postId && postId === String(id)

  return {
    /** 解码后的楼层内容 */
    msg,

    /** 是否命中屏蔽词 */
    isBlocked,

    /** 是否新楼层 */
    isNew,

    /** 是否跳转目标楼层 */
    isJump
  }
}

/** 是否屏蔽用户 */
export function isBlockUser(
  userId: UserId,
  userName: string,
  replySub: string = '',
  trackUUID?: string
) {
  const findIndex = rakuenStore.blockUserIds.findIndex(item => {
    const [itemUserName, itemUserId] = item.split('@')
    if (itemUserId === 'undefined') return itemUserName === userName

    /**
     * userId 可能是用户更改后的英文单词, 但是外面屏蔽的 userId 一定是整数 ID
     * 所以需要优先使用 subReply('group',361479,1773295,0,456208,[572818],0) 中的 userId 进行匹配
     */
    if (replySub) {
      const splits = replySub.split(',')
      if (splits.length === 7 && itemUserId == splits[5]) return true
    }

    return itemUserId == userId || itemUserName === userName
  })

  const isBlock = findIndex !== -1
  if (isBlock && trackUUID) {
    const key = `${userId}|${trackUUID}`
    if (!memoBlockedUser.has(key)) {
      memoBlockedUser.set(key, true)
      ensureCacheLimit(memoBlockedUser, CACHE_MAX)
      setTimeout(() => {
        rakuenStore.trackBlockedUser(userId)
      }, 0)
    }
  }

  return isBlock
}

/** 是否特殊显示楼层 */
export function isSpecFloor(text: string, subLength: number) {
  // 屏蔽内容删除
  if (rakuenStore.setting.filterDelete && text.includes('删除了回复')) return true

  // 有子楼层或者本楼层文本很长
  if (subLength || text.length > 10) return false

  return (
    text.toLocaleLowerCase().includes('mark') ||
    text.includes('+1') ||
    text.includes('马克') ||
    text.includes('插眼') ||
    // text === '1' ||
    text === 'm'
  )
}
