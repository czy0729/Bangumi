/*
 * @Author: czy0729
 * @Date: 2022-09-10 07:30:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-13 14:00:00
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  modal: {
    width: _.windowSm.width - 2 * _.windSm,
    maxWidth: 400,
    marginBottom: Math.floor(_.windowSm.height * 0.4),
    backgroundColor: _.colorBg,
    borderRadius: _.radiusMd
  }
}))
