/*
 * @Author: czy0729
 * @Date: 2022-09-07 02:44:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-21 19:06:32
 */
import { _ } from '@stores'

/** 放下头像的最小面积占比 */
const AVATAR_MIN_AREA_RATE = 0.016

/** 头像最大边长 */
const AVATAR_MAX_SIZE = 64

/** 色块内的头像与字号: 面积占比越大越突出 */
export function getItemMetrics(w: number, h: number, percent: number) {
  const ratio = (percent + 1) ** 2
  const ratioHeight = (Math.min(w, h) / _.window.height) * 1.2

  return {
    ratio,
    showAvatar: (w * h) / (_.window.width * _.window.height) > AVATAR_MIN_AREA_RATE,
    avatarSize: Math.min(AVATAR_MAX_SIZE, parseInt(String(ratioHeight * 240))),
    fontSize: Math.min(13, Math.max(10, parseInt(String(10 * ratio))))
  }
}
