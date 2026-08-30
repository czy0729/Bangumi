/*
 * @Author: czy0729
 * @Date: 2019-03-26 18:37:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-31 00:57:27
 */
import { DEV } from '@src/config'
import { padDisplay } from './utils'

const TEXT_BADGES = {
  danger: '🔴',
  plain: '⚪',
  primary: '🔵',
  success: '🟢',
  warning: '🟠',
  yellow: '🟡',
  purple: '🟣'
} as const

/** method 名与第一个参数的目标对齐宽度 */
const PAD_LENGTH = 28

/** 对 others 第一个元素做 padEnd 对齐 */
function padOthersFirst(others: unknown[]): unknown[] {
  if (!others.length) return others
  return [padDisplay(String(others[0]), PAD_LENGTH - 8), ...others.slice(1)]
}

/** 内部打印统一入口 */
function print(badge: string, method: string, ...others: unknown[]) {
  if (!DEV) return

  // 按显示宽度 (中文双宽) 填充 method 名, 保证各日志纵向对齐
  // eslint-disable-next-line no-console
  console.info(badge, padDisplay(`[${method}]`, PAD_LENGTH), ...padOthersFirst(others))
}

/** 开发环境统一日志入口, 各级别输出不同颜色 badge */
export const logger = {
  /** ⚪ */
  log: (method: string, ...others: unknown[]) => print(TEXT_BADGES.plain, method, ...others),

  /** 🔵 */
  info: (method: string, ...others: unknown[]) => print(TEXT_BADGES.primary, method, ...others),

  /** 🟢 */
  success: (method: string, ...others: unknown[]) => print(TEXT_BADGES.success, method, ...others),

  /** 🟠 */
  warn: (method: string, ...others: unknown[]) => print(TEXT_BADGES.warning, method, ...others),

  /** 🔴 */
  error: (method: string, ...others: unknown[]) => print(TEXT_BADGES.danger, method, ...others),

  /** 🟡 */
  yellow: (method: string, ...others: unknown[]) => print(TEXT_BADGES.yellow, method, ...others),

  /** 🟣 */
  purple: (method: string, ...others: unknown[]) => print(TEXT_BADGES.purple, method, ...others)
} as const
