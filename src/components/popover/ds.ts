/*
 * @Author: czy0729
 * @Date: 2024-01-15 02:02:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-15 05:57:42
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Popover')

/** iOS: 等菜单收起动画结束(160ms 与关闭动画对齐)再触发动作, 避免跳转/弹窗与关闭动画重叠 */
export const MENU_CLOSE_DELAY = 160

/** Android: tap 模式下的按压延迟, 与长按区分 */
export const ANDROID_DELAY_PRESS_IN = 1600

/** Web: 选中后回到下一帧再回调, 让下拉先收起 */
export const WEB_SELECT_DELAY = 0
