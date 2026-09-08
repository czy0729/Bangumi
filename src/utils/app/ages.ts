/*
 * @Author: czy0729
 * @Date: 2025-01-25 08:41:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-31 20:44:26
 *
 * 站龄推测（自增 ID / 头像地址推断注册年份）
 */
import { ensureCacheLimit } from '../cache'

import type { UserId } from '@types'

/**
 * x.0: 01-01, x.1: 02-06, x.2: 03-13, x.3: 04-18, x.4: 05-24
 * x.5: 06-29, x.6: 07-31, x.7: 08-26, x.8: 09-30, x.9: 11-05
 */
const SPLITS = [
  [2, 2008],
  [1859, 2009],
  [7338, 2010],
  [14072, 2011],
  [65402, 2012],
  [114438, 2013],
  [179065, 2014],
  [226840, 2015],
  [273082, 2016],
  [315562, 2017],
  [391386, 2018],
  [451922, 2019],
  [517357, 2020],
  [568529, 2021],
  [656637, 2022],
  [753039, 2023],
  [846679, 2024],
  [947430, 2025],
  [1195000, 2026],
  [1210000, 2026.1],
  [1225000, 2026.2],
  [1238500, 2026.3],
  [1251000, 2026.4],
  [1260500, 2026.5],
  [1270000, 2026.6],
  [1276000, 2026.7],
  [1282000, 2026.8],
  [1288000, 2026.9]
] as const

const CURRENT_YEAR = getCurrentYearWithDecimal()

/** 站龄缓存上限 (限制缓存条目数, 避免无限增长) */
const AGES_CACHE_MAX = 500

const MEMO = new Map<UserId, string | number | null>()

/**
 * 根据自增 ID 或头像地址推测站龄
 * @param id - 自增 ID
 * @param avatar - 头像地址（头像最后有原始 ID，可以用来判断）
 * @returns 年龄
 */
export function getAge(userId: UserId, avatar?: string): string | number | null {
  const id = `${userId}|${avatar}`

  // 检查缓存
  if (MEMO.has(id)) return MEMO.get(id)

  let age: string | number = 0

  // 尝试从 ID 获取年龄
  const intId = Number(userId)
  if (Number.isInteger(intId) && intId > 0) age = calculateAgeFromId(intId)

  // 如果 ID 无效，尝试从头像地址获取年龄
  if (age === 0 && avatar && typeof avatar === 'string') {
    const extractedId = extractIdFromAvatar(avatar)
    if (extractedId) {
      age = calculateAgeFromId(extractedId)
    } else {
      // 改过 ID 并且没有设置过头像的用户是无法推断的, 直接返回
      MEMO.set(id, null)
      ensureCacheLimit(MEMO, AGES_CACHE_MAX)
      return null
    }
  }

  age = formatNumber(age)

  // 缓存结果
  MEMO.set(id, age)
  ensureCacheLimit(MEMO, AGES_CACHE_MAX)
  return age
}

/**
 * 根据自增 ID 计算年龄
 * @param id - 自增 ID
 * @returns 年龄
 */
function calculateAgeFromId(id: number): number {
  const item = SPLITS.find(([splitId]) => id <= splitId)
  return item ? CURRENT_YEAR - item[1] : 0
}

/**
 * 从头像地址中提取原始 ID
 * @param avatar - 头像地址
 * @returns 提取的 ID，如果未找到则返回 undefined
 */
export function extractIdFromAvatar(avatar: string): number | undefined {
  if (!avatar || typeof avatar !== 'string' || !avatar.includes('pic/user')) return

  const temp = avatar.split('.jpg')[0].split('_')[0]
  const match = temp.match(/(\d+)(?=[^\d]*$)/)
  return match ? Number(match[1]) : undefined
}

/**
 * 格式化数字，保留最多一位小数，但如果小数部分为0则不显示小数部分
 * @param {number} num - 要格式化的数字
 * @returns {string} - 格式化后的字符串
 */
function formatNumber(num: number): string {
  if (num < 1) return num.toFixed(1)
  return Math.round(num).toString()
}

function getCurrentYearWithDecimal(): number {
  const now = new Date()
  const year = now.getFullYear()
  const startOfYear = new Date(year, 0, 1)
  const nowTime = now.getTime()
  const startOfYearTime = startOfYear.getTime()
  const daysSinceStartOfYear = (nowTime - startOfYearTime) / (24 * 60 * 60 * 1000)
  const fractionOfYear = daysSinceStartOfYear / 365
  const yearWithDecimal = year + fractionOfYear
  return parseFloat(yearWithDecimal.toFixed(1))
}
