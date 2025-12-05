/*
 * @Author: czy0729
 * @Date: 2025-04-11 04:09:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-12 03:07:49
 */
import { _ } from '@stores'
import { ITEM_WIDTH } from './ds'

export const memoStyles = _.memoStyles(() => ({
  block: {
    marginTop: _.sm,
    marginRight: -_._wind
  },
  scroll: {
    paddingRight: _._wind
  },
  item: {
    width: ITEM_WIDTH,
    height: 112
  },
  container: {
    marginTop: 16
  },
  off: {
    height: 1,
    marginVertical: _.sm
  },
  line1: {
    height: 1,
    width: 88,
    marginVertical: _.sm,
    backgroundColor: _.colorBorder
  },
  line2: {
    height: 3,
    width: 24,
    marginLeft: 4,
    marginVertical: _.sm,
    backgroundColor: _.colorBorder,
    borderRadius: 2,
    overflow: 'hidden'
  },
  title: {
    width: 3,
    height: 12,
    marginRight: 8,
    marginLeft: -8,
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
  }
}))
