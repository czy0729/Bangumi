/*
 * @Author: czy0729
 * @Date: 2022-08-19 05:53:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-21 17:28:31
 */
import { _ } from '@stores'
import { CATALOG_WIDTH, WIDTH } from '../ds'

export const memoStyles = _.memoStyles(() => ({
  catalog: {
    width: CATALOG_WIDTH,
    height: CATALOG_WIDTH
  },
  num: {
    width: WIDTH,
    height: WIDTH
  },
  catalogLine: {
    position: 'absolute',
    right: 0,
    backgroundColor: _.select(_.colorPlain, _._colorDarkModeLevel1),
    borderWidth: 1,
    borderRadius: 2,
    borderColor: _.colorBorder
  },
  catalogLevel1: {
    zIndex: 2,
    top: 4,
    marginRight: -7
  },
  catalogLevel2: {
    zIndex: 1,
    top: 8,
    marginRight: -12
  },
  thumbs: {
    position: 'absolute',
    zIndex: 3,
    top: 0,
    left: 0,
    width: CATALOG_WIDTH + 2,
    height: CATALOG_WIDTH + 2,
    backgroundColor: _.select(_.colorPlain, _.colorBg),
    borderWidth: 1,
    borderColor: _.colorBorder,
    borderRadius: 3,
    overflow: 'hidden'
  },
  placeholder: {
    position: 'absolute',
    width: WIDTH,
    height: WIDTH,
    backgroundColor: _.select(_.colorBg, _.colorDarkModeLevel1)
  },
  placeholderTopRight: {
    top: 0,
    right: 0
  },
  placeholderBottomLeft: {
    bottom: 0,
    left: 0
  }
}))
