/*
 * @Author: czy0729
 * @Date: 2022-09-27 23:48:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-23 02:02:33
 *
 * 页面容器与年鉴卡片尺寸
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => {
  const num = 1
  const width = Math.floor((_.window.width - 2 * _.wind - _.md * (num - 1)) / num)

  return {
    container: {
      paddingHorizontal: _.wind,
      paddingTop: _.sm,
      paddingBottom: _.bottom
    },
    award2022: {
      width,
      height: Math.floor(width * 0.4)
    }
  }
})
