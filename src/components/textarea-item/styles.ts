/*
 * @Author: czy0729
 * @Date: 2026-08-11 10:00:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-11 10:00:00
 */
import { syncThemeStore } from '@utils/async'

const _ = syncThemeStore()

export const memoStyles = _.memoStyles(() => ({
  container: {
    borderBottomWidth: 0,
    borderBottomColor: 'transparent'
  },
  input: {
    paddingHorizontal: _.md,
    paddingVertical: _.md,
    backgroundColor: _.select(_.colorPlain, _._colorDarkModeLevel2),
    fontSize: _.fontSize(17),
    lineHeight: Math.round(_.fontSize(17) * 1.5),
    textAlignVertical: 'top'
  },
  count: {
    position: 'absolute',
    bottom: _.md,
    right: _.md,
    color: _.colorSub,
    fontSize: _.fontSize14
  },
  errorIcon: {
    position: 'absolute',
    right: 18,
    top: 12
  }
}))