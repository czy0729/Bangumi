/*
 * @Author: czy0729
 * @Date: 2023-03-31 14:30:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-01 08:46:15
 */
import { IOS } from '@constants'
import { _ } from '@stores'
import { memoStyles } from './styles'

type Position = 'bottom' | 'left' | 'right' | 'top'

type Style = {
  top?: number
  left?: number
  right?: number
}

/** 大概一行的高度 */
const LINE_HEIGHT = 24

/** 手机显示的左边距 */
const MOBILE_MARGIN_LEFT = _._wind

/** 手机显示的右边距 */
const MOBILE_MARGIN_RIGHT = _._wind + _.sm - 2

/** 若可以优先用 top 效果最佳 */
export function getPosition(
  x: number,
  y: number
): {
  position: Position
  style: Style
} {
  let position: Position
  const style: Style = {}

  const { container } = memoStyles()
  if (y - container.height - LINE_HEIGHT * 3 >= 0) {
    position = 'top'

    style.top = y - container.height - LINE_HEIGHT + 8
    if (!IOS) style.top += 28
    if (_.isPad) style.top -= 32
  } else {
    position = 'bottom'

    style.top = y
    if (!IOS) style.top += 16
    if (!_.isPad) style.top += LINE_HEIGHT * 1.2
  }

  if (x >= _.window.width / 2) {
    style.right = MOBILE_MARGIN_RIGHT
  } else {
    style.left = MOBILE_MARGIN_LEFT
  }

  return {
    position,
    style
  }
}