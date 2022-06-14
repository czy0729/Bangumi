/*
 * @Author: czy0729
 * @Date: 2022-06-14 15:54:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-14 15:54:55
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  modal: {
    width: (_.window.width - 2 * _.wind) * _.ratio,
    maxWidth: _.device(408, 560),
    paddingTop: _.device(_.md + 2, 28),
    paddingHorizontal: _.device(0, _.sm),
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderRadius: _.radiusMd
  },
  focus: {
    marginTop: -Math.floor(_.window.height * 0.32)
  },
  wrap: {
    minHeight: _.device(380, 448)
  },
  content: {
    width: '100%',
    maxWidth: _.window.maxWidth,
    paddingBottom: _.sm,
    marginTop: _.isMobileLanscape ? -24 : 0
  },
  tags: {
    width: '100%',
    height: 54 * _.ratio,
    paddingVertical: 12
  },
  tag: {
    paddingVertical: _.xs,
    paddingHorizontal: _.sm,
    marginRight: _.sm,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel2),
    borderWidth: _.select(1, 0),
    borderColor: _.colorBorder,
    borderRadius: _.radiusXs
  },
  tagSelected: {
    backgroundColor: _.select(_.colorPrimaryLight, _._colorDarkModeLevel2),
    borderColor: _.select(_.colorPrimaryBorder, _._colorDarkModeLevel2)
  },
  btnEye: {
    width: 88 * _.ratio,
    marginLeft: _.sm
  },
  touch: {
    padding: _.xs,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  touchTag: {
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  }
}))
