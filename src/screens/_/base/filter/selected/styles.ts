/*
 * @Author: czy0729
 * @Date: 2026-11-13 15:20:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-13 15:20:00
 *
 * 已选条件样式 (行 / 滚动容器等与筛选组共享的样式见 ../styles)
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  selected: {
    paddingVertical: _.xs,
    marginVertical: _.xs,
    backgroundColor: _.colorBg
  },
  selectedTag: {
    paddingVertical: 4,
    paddingRight: _.r(12),
    paddingLeft: _.r(12),
    marginLeft: _.sm,
    borderRadius: _.r(12),
    backgroundColor: _.colorMainLight,
    overflow: 'hidden'
  },
  selectedTagText: {
    color: _.colorMain
  },
  selectedReset: {
    marginLeft: 24
  }
}))
