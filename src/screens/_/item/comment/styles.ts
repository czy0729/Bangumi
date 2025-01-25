/*
 * @Author: czy0729
 * @Date: 2022-06-17 12:43:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-25 14:36:36
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  item: {
    backgroundColor: _.colorPlain
  },
  avatar: {
    marginTop: _.md - 4,
    marginLeft: _.wind
  },
  content: {
    paddingVertical: _.md - 4,
    paddingRight: _.wind,
    marginLeft: _.sm
  },
  border: {
    borderTopColor: _.colorBorder,
    borderTopWidth: _.hairlineWidth
  },
  stars: {
    marginVertical: _.xs
  },
  touch: {
    marginVertical: -8,
    marginRight: -2,
    borderRadius: 20,
    overflow: 'hidden'
  },
  icon: {
    width: 36,
    height: 36
  },
  favor: {
    position: 'absolute',
    zIndex: 1,
    right: -6,
    bottom: -2,
    paddingTop: 1,
    paddingRight: 2,
    paddingBottom: 1,
    paddingLeft: 1,
    backgroundColor: _.colorPlain,
    borderRadius: _.web(12, 4),
    overflow: 'hidden',
    pointerEvent: 'none'
  },
  name: {
    maxWidth: '90%'
  },
  userAge: {
    marginTop: 2
  }
}))
