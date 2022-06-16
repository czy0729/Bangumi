/*
 * @Author: czy0729
 * @Date: 2022-06-16 23:46:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-16 23:50:43
 */
import { _ } from '@stores'
import { WIDTH, CATALOG_WIDTH } from './ds'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingLeft: _.wind,
    backgroundColor: _.colorPlain
  },
  wrap: {
    paddingVertical: _.md,
    paddingRight: _.wind
  },
  content: {
    height: CATALOG_WIDTH,
    paddingVertical: _.xs,
    paddingLeft: 24 * _.ratio
  },
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
  }
}))
