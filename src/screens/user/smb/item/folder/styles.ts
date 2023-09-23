/*
 * @Author: czy0729
 * @Date: 2023-02-22 02:12:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-09-23 12:02:36
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  folder: {
    paddingRight: 4,
    paddingVertical: 5,
    paddingLeft: 12,
    marginTop: 12,
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
  up: {
    marginTop: -3,
    marginRight: -4,
    marginLeft: _.xs
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
