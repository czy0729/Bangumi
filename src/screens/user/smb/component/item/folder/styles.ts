/*
 * @Author: czy0729
 * @Date: 2023-02-22 02:12:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-26 12:38:12
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
  next: {
    marginHorizontal: _.xs
  },
  up: {
    marginTop: -3,
    marginRight: -4,
    marginLeft: _.xs
  },
  folderOpen: {
    marginTop: -8,
    marginRight: -4,
    marginLeft: 2
  },
  folderOpenFixed: {
    height: 22,
    transform: [
      {
        translateY: 3
      }
    ]
  },
  path: {
    paddingTop: 8,
    marginTop: 8,
    borderTopWidth: _.hairlineWidth,
    borderColor: _.colorBorder
  }
}))
