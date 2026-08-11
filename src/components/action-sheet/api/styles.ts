/*
 * @Author: czy0729
 * @Date: 2026-08-11 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-12 06:28:57
 */
import { syncThemeStore } from '@utils/async'

const _ = syncThemeStore()

export const memoStyles = _.memoStyles(() => ({
  content: {
    backgroundColor: _.select(_.colorPlain, _._colorDarkModeLevel2),
    borderRadius: _.radiusMd,
    overflow: 'hidden',
    margin: _.sm
  },
  title: {
    alignItems: 'center',
    marginTop: _.lg,
    marginBottom: _.lg
  },
  titleText: {
    fontWeight: '500'
  },
  message: {
    alignItems: 'center',
    marginBottom: _.lg
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 57,
    borderTopWidth: _.hairlineWidth,
    borderTopColor: _.colorBorder
  },
  btnText: {
    color: '#007AFF',
    fontSize: 17
  },
  cancelBtn: {
    position: 'relative',
    marginTop: _.md,
    paddingBottom: _.sm
  },
  cancelBtnMask: {
    position: 'absolute',
    top: -_.md,
    right: 0,
    left: 0,
    height: _.md,
    backgroundColor: _.colorBg,
    borderTopWidth: _.hairlineWidth,
    borderTopColor: _.colorBorder
  },
  destructiveBtn: {
    color: _.colorDanger,
    fontSize: 17
  }
}))
