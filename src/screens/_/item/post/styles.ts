/*
 * @Author: czy0729
 * @Date: 2022-06-14 22:57:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-10 20:05:20
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  item: {
    width: _.window.width,
    paddingTop: _.sm,
    paddingBottom: _.md,
    paddingHorizontal: _.wind
  },
  itemWithSub: {
    paddingBottom: _.sm
  },
  itemDelete: {
    width: _.window.width,
    paddingBottom: _.sm,
    paddingHorizontal: _.wind
  },
  itemJump: {
    borderBottomWidth: 2,
    borderColor: _.colorSuccess
  },
  inView: {
    minWidth: 36,
    minHeight: 36
  },
  content: {
    paddingLeft: _.sm
  },
  html: {
    paddingRight: _.sm,
    marginTop: _.sm
  },
  translate: {
    padding: _.sm,
    marginTop: _.sm,
    marginRight: _.sm,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  },
  direct: {
    position: 'absolute',
    top: -_.sm - 1,
    right: 0,
    bottom: -_.sm,
    left: -_._wind + 4,
    borderWidth: 2,
    borderColor: _.colorBorder,
    borderRadius: _.radiusMd,
    overflow: 'hidden'
  },
  left: {
    width: _.r(36)
  },
  sub: {
    paddingTop: _.md
  },
  expandContainer: {
    marginTop: -_.sm
  },
  expand: {
    paddingVertical: _.sm,
    marginLeft: 44
  }
}))
