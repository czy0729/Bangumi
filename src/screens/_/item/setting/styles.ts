/*
 * @Author: czy0729
 * @Date: 2022-06-17 12:52:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-13 22:52:39
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  touchable: {
    paddingLeft: _._wind
  },
  item: {
    paddingVertical: 12,
    paddingRight: _._wind
  },
  itemWithExtra: {
    paddingRight: 7
  },
  information: {
    maxWidth: '84%',
    paddingRight: _.md
  },
  sub: {
    paddingTop: 8,
    paddingLeft: 20,
    marginLeft: 20,
    marginBottom: 12,
    borderLeftWidth: 2,
    borderLeftColor: _.colorBorder
  },
  touch: {
    padding: 12,
    margin: -6
  },
  split: {
    width: 2,
    height: 6,
    marginHorizontal: 4,
    borderRadius: 4,
    backgroundColor: _.colorIcon
  }
}))
