/*
 * @Author: czy0729
 * @Date: 2026-08-20 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-20 00:00:00
 */
import { systemStore } from '@stores'

/** 根据年龄值和用户设置格式化显示文本 */
export function getUserAgeText(age: string | number | null) {
  if (age === null || !age || age == 0) return '最近'

  const userAgeType = systemStore.setting.userAgeType
  if (userAgeType === 'month' && Number(age) < 1) {
    return `${Math.floor(Number(age) * 12)}月`
  }
  return `${age}年`
}
