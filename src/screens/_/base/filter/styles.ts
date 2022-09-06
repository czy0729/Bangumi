/*
 * @Author: czy0729
 * @Date: 2022-06-13 10:02:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-06 18:59:00
 */
import { _ } from '@stores'

const vertical = 4

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingVertical: _.r(_.sm)
  },
  row: {
    paddingLeft: _.wind
  },
  multiple: {
    marginVertical: -_.r(vertical)
  },
  multipleTitle: {
    marginTop: _.r(8)
  },
  contentContainerStyle: {
    paddingVertical: _.r(vertical)
  },
  item: {
    paddingVertical: vertical,
    paddingHorizontal: _.r(12),
    borderRadius: _.r(12),
    overflow: 'hidden'
  },
  itemActive: {
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel2)
  },
  how: {
    position: 'absolute',
    zIndex: 1,
    left: 0,
    bottom: 0,
    width: _.r(34),
    marginBottom: -_.r(29)
  },
  more: {
    paddingVertical: _.xs,
    paddingHorizontal: _.md,
    borderRadius: _.radiusMd,
    overflow: 'hidden'
  }
}))
