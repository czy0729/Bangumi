/*
 * @Author: czy0729
 * @Date: 2022-09-10 07:30:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-28 03:57:53
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
  info: {
    position: 'absolute',
    zIndex: 1,
    top: 1,
    right: 20,
    marginTop: -20
  },
  item: {
    paddingVertical: 12
  }
}))
