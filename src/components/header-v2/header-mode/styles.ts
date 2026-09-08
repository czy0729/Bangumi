/*
 * @Author: czy0729
 * @Date: 2026-09-09 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-09 01:30:00
 */
import { _ } from '@stores'

export const styles = _.create({
  header: {
    position: 'absolute',
    /** @fixed 沿用 v1 header-component 的 zIndex 1, 过高可能遮挡页面浮层 */
    zIndex: 1,
    top: 0,
    right: 0,
    left: 0,
    paddingRight: 6,
    paddingLeft: 5
  },
  back: {
    zIndex: 1
  }
})
