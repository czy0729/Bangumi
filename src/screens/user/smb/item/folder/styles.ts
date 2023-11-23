/*
 * @Author: czy0729
 * @Date: 2023-02-22 02:12:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-23 08:44:54
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  folder: {
    paddingRight: 4,
    paddingVertical: 5,
    paddingLeft: 12,
    marginTop: 12,
    backgroundColor: _.select(_.colorBg, 'rgb(24, 24, 24)'),
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
  }
}))
