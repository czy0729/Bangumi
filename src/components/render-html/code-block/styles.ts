/*
 * @Author: czy0729
 * @Date: 2026-06-30 19:20:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-30 19:20:00
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  codeBlock: {
    paddingVertical: _.xs,
    paddingHorizontal: _.sm,
    marginBottom: _.sm,
    backgroundColor: _.select(_.colorBg, _.colorDarkModeLevel1),
    borderWidth: 1,
    borderColor: _.colorBorder,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  codeText: {
    fontFamily: _.ios('Menlo', 'monospace'),
    letterSpacing: -0.2
  }
}))
