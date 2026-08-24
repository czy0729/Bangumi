/*
 * @Author: czy0729
 * @Date: 2024-01-03 15:49:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-25 05:13:02
 */
import { _ } from '@stores'
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../../ds'

export const COMPONENT = rc(PARENT, 'List')

/** 刷新控件样式 (取函数以在主题切换时取到最新颜色) */
export function refreshControlProps() {
  return {
    tintColor: _.__colorPlain__,
    titleColor: _.__colorPlain__
  }
}
