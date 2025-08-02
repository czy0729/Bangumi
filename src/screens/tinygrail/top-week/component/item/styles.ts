/*
 * @Author: czy0729
 * @Date: 2022-11-09 06:40:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-30 05:09:45
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  item: {
    height: 132,
    paddingHorizontal: _.sm
  },
  itemLg: {
    height: 164
  },
  itemMd: {
    height: 148
  },
  avatar: {
    backgroundColor: _.select(_.colorTinygrailBg, _._colorDarkModeLevel2)
  },
  rec: {
    top: 0,
    right: 2,
    minWidth: 32
  },
  recText: {
    opacity: _.select(0.8, 0.64)
  },
  recLg: {
    ..._.fontSize(56),
    color: _.colorMain
  },
  recMd: {
    ..._.fontSize(44),
    color: _.colorWarning
  },
  recSm: {
    ..._.fontSize(32),
    color: _.colorYellow
  },
  recXs: {
    ..._.fontSize(32),
    color: _.colorTinygrailText
  }
}))
