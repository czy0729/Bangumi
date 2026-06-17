/*
 * @Author: czy0729
 * @Date: 2022-10-22 09:46:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-17 19:04:59
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  contentContainerStyle: {
    paddingTop: _.parallaxImageHeight + _.md * 2,
    paddingHorizontal: _.wind,
    minHeight: _.window.height + _.parallaxImageHeight - _.tabBarHeight
  },
  page: {
    minHeight: _.window.height - _.parallaxImageHeight
  },
  touch: {
    paddingVertical: _.sm,
    paddingHorizontal: _.md,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  modal: {
    width: Math.floor(_.window.contentWidth * 0.92),
    marginTop: -88
  },
  modalContent: {
    paddingTop: _.md,
    paddingBottom: _.sm
  },
  input: {
    height: 36,
    fontSize: 14,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  stepBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 36,
    height: 36,
    marginLeft: _.sm,
    backgroundColor: _.select(_.colorBg, _.colorDarkModeLevel2),
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  cancelBtn: {
    paddingVertical: _.sm,
    paddingHorizontal: _.md,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  sendBtn: {
    paddingVertical: _.sm,
    paddingHorizontal: _.md,
    marginLeft: _.md,
    backgroundColor: _.colorMain,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  logScroll: {
    maxHeight: 480
  },
  logContent: {
    paddingVertical: _.md
  },
  emptyText: {
    textAlign: 'center',
    paddingVertical: _.lg
  },
  logItem: {
    paddingVertical: 12,
    borderBottomWidth: _.hairlineWidth,
    borderBottomColor: _.colorBorder
  }
}))
