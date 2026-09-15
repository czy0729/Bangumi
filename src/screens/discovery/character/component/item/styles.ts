/*
 * @Author: czy0729
 * @Date: 2022-09-28 01:13:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-09 21:54:11
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => {
  const num = _.portrait(5, 8)
  const gridStyles = _.grid(num)

  return {
    item: {
      width: gridStyles.width,
      marginTop: _.md,
      marginLeft: gridStyles.marginLeft
    },
    // 圆角由 Squircle 负责 (见 index.tsx); 这里只保留确定的正方形尺寸与裁剪,
    // 尺寸用于让 iOS 的遮罩轨迹与 children 实际尺寸一致, overflow 用于裁掉 autoSize 图片多出来的高度
    cover: {
      width: gridStyles.width,
      height: gridStyles.width,
      overflow: 'hidden'
    },
    side: {
      marginLeft: 0
    }
  }
})
