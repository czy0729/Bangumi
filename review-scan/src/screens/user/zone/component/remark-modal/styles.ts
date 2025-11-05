/*
 * @Author: czy0729
 * @Date: 2024-04-09 16:04:21
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-04-09 16:04:21
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  modal: {
    width: _.windowSm.width - 2 * _.windSm,
    maxWidth: 400,
    marginBottom: _.windowSm.height * 0.4,
    backgroundColor: _.select(_.colorBg, _.colorBg),
    borderRadius: _.radiusMd
  },
  container: {
    paddingVertical: _.md,
    paddingHorizontal: _.sm
  },
  ipt: {
    height: 44,
    paddingHorizontal: 14,
    paddingVertical: 0,
    color: _.colorDesc,
    backgroundColor: _.select(_.colorPlain, _._colorDarkModeLevel1),
    borderWidth: 2,
    borderColor: _.select(_.colorIcon, _.colorBorder),
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  btn: {
    paddingVertical: 4,
    paddingRight: _.sm,
    paddingLeft: 20
  }
}))
