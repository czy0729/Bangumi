/*
 * @Author: czy0729
 * @Date: 2022-10-30 15:17:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-21 02:10:06
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingLeft: _.wind
  },
  wrap: {
    paddingVertical: _.md,
    paddingRight: _.wind
  },
  body: {
    marginTop: -1,
    marginLeft: _.md
  },
  rating: {
    marginTop: 12,
    marginBottom: 4
  },
  up: {
    marginTop: -3,
    marginRight: -4,
    marginLeft: _.xs
  },
  tag: {
    paddingRight: 6,
    paddingLeft: 6,
    marginRight: _.sm,
    marginBottom: _.sm
  },
  folder: {
    paddingRight: 4,
    paddingVertical: 5,
    paddingLeft: 12,
    marginTop: 13,
    marginBottom: _.sm,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderWidth: 1,
    borderColor: _.colorBorder,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  folderList: {
    paddingRight: 12,
    paddingVertical: _.sm
  },
  path: {
    paddingTop: 8,
    marginTop: 8,
    borderTopWidth: _.hairlineWidth,
    borderColor: _.colorBorder
  },
  item: {
    paddingVertical: _.xs
  }
}))
