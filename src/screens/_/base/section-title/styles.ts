/*
 * @Author: czy0729
 * @Date: 2022-06-13 20:34:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-12 02:32:22
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  touch: {
    zIndex: 2,
    paddingHorizontal: _.xs,
    marginLeft: -_.xs,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  title: {
    width: 3,
    height: 18,
    marginTop: 1,
    marginRight: 10,
    marginLeft: 2,
    borderRadius: 2,
    overflow: 'hidden'
  },
  titleMain: {
    backgroundColor: _.colorMain
  },
  titleWarning: {
    backgroundColor: _.colorWarning
  },
  titlePrimary: {
    backgroundColor: _.colorPrimary
  },
  titleSuccess: {
    backgroundColor: _.colorSuccess
  },
  underline: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    height: 10,
    minWidth: 44,
    borderRadius: 1,
    opacity: _.select(0.72, 0.88),
    overflow: 'hidden'
  },
  underlineMain: {
    backgroundColor: _.colorMain
  },
  underlineWarning: {
    backgroundColor: _.colorWarning
  },
  underlinePrimary: {
    backgroundColor: _.colorPrimary
  },
  underlineSuccess: {
    backgroundColor: _.colorSuccess
  }
}))
