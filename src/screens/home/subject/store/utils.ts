/*
 * @Author: czy0729
 * @Date: 2025-12-18 19:06:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-18 19:10:47
 */
import { pad } from '@utils'

export const PRIMARY_KEYS = '连载开始|开始'

export const SECONDARY_KEYS = '发售日|发售日期|放送开始|上映年度|上映时间|上映日|发行日期'

export function pickInfoValue(info: string, keys: string) {
  return info.match(new RegExp(`<li><span>(${keys}): <\\/span>(.+?)<\\/li>`))?.[2] || ''
}

export function extractYear(str: string) {
  return str.match(/(\d{4})/)?.[0] || ''
}

export function extractYearMonth(str: string) {
  return str.match(/(\d{4}[-年]\d{1,2})/)?.[0] || ''
}

export function normalizeYearMonth(value: string) {
  return value
    .replace('年', '-')
    .split('-')
    .map(item => pad(Number(item)))
    .join('-')
}
