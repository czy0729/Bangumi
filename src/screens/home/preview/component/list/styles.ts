/*
 * @Author: czy0729
 * @Date: 2022-10-21 13:28:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-28 09:00:00
 *
 * 预览图块尺寸 (按窗口宽 16:9 估算) 与容器样式
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => {
  const width = Math.floor(_.window.width - (2 * _.wind - _._wind))
  const height = Math.floor(width * 0.56)

  return {
    container: {
      paddingHorizontal: _.wind - _._wind,
      paddingBottom: _.bottom
    },
    item: {
      width,
      minHeight: height,
      marginLeft: _.sm,
      marginBottom: _.md
    }
  }
})
