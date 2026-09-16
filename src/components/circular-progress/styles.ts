/*
 * @Author: czy0729
 * @Date: 2026-09-16 22:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-16 22:40:00
 *
 * 圆环进度的静态样式 (无主题依赖, 故用 _.create 而非 memoStyles)
 */
import { _ } from '@stores'

export const styles = _.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    position: 'absolute',
    zIndex: 1
  }
})
