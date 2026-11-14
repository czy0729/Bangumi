/*
 * @Author: czy0729
 * @Date: 2022-06-13 10:02:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-13 05:10:19
 *
 * 筛选面板样式
 */
import { _ } from '@stores'

const VERTICAL = 4

export const memoStyles = _.memoStyles(() => ({
  list: {
    paddingVertical: _.r(_.sm)
  },
  grid: {
    paddingVertical: _.r(_.sm),
    marginBottom: _.md
  },
  row: {
    paddingLeft: _.wind
  },
  multiple: {
    marginVertical: -_.r(VERTICAL)
  },
  multipleTitle: {
    marginTop: _.r(8)
  },
  contentContainerStyle: {
    paddingVertical: _.r(VERTICAL)
  },
  item: {
    paddingVertical: VERTICAL,
    paddingHorizontal: _.r(12),
    borderRadius: _.r(12),
    overflow: 'hidden'
  },
  itemActive: {
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel2)
  },
  itemDisabled: {
    opacity: 0.36
  },
  itemMultiSelect: {
    marginRight: _.sm
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
  },
  ft: {
    paddingHorizontal: _.wind,
    marginTop: _.md
  }
}))
