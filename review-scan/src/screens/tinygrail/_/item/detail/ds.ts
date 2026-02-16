/*
 * @Author: czy0729
 * @Date: 2025-01-09 10:50:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-09 10:50:43
 */
export const TYPES = ['bid', 'asks', 'chara', 'merge'] as const

export const COLOR_MAP = {
  bid: 'bid',
  asks: 'ask',
  chara: 'warning',
  ico: 'primary',
  auction: 'warning',
  merge: 'warning'
} as const

export const TEXT_SPLIT = ' / '

let TIMEZONE: any = new Date().getTimezoneOffset() / -60
if (String(TIMEZONE).length === 1) TIMEZONE = `0${TIMEZONE}`

export { TIMEZONE }
