/*
 * @Author: czy0729
 * @Date: 2022-06-14 15:54:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-05 18:09:51
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  modal: {
    width: _.r(_.window.width - 2 * _.wind),
    maxWidth: _.device(408, 560),
    paddingTop: _.device(_.md + 2, 28),
    paddingHorizontal: _.device(0, _.sm),
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderRadius: _.radiusMd
  },
  container: {
    width: _.r(_.window.width - 2 * _.wind),
    maxWidth: _.device(408, 560),
    paddingTop: 80
  },
  focus: {
    marginTop: -Math.floor(_.window.height * _.device(0.48, 0.24))
  },
  wrap: {
    minHeight: _.device(380, 448),
    marginTop: _.sm
  },
  content: {
    width: '100%',
    maxWidth: _.window.maxWidth,
    paddingBottom: _.sm,
    marginTop: _.isMobileLanscape ? -24 : 0
  },
  tags: {
    width: '100%',
    height: _.r(54),
    paddingVertical: 12
  },
  tag: {
    paddingVertical: _.xs,
    paddingHorizontal: _.sm,
    marginRight: _.sm,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel2),
    borderWidth: _.select(1, 0),
    borderColor: _.colorBorder,
    borderRadius: _.radiusSm
  },
  tagSelected: {
    backgroundColor: _.select(_.colorPrimaryLight, _._colorDarkModeLevel2),
    borderColor: _.select(_.colorPrimaryBorder, _._colorDarkModeLevel2)
  },
  btnEye: {
    width: _.r(88),
    marginLeft: 12
  },
  touch: {
    padding: _.xs,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  touchTag: {
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  inputTags: {
    height: 44,
    paddingVertical: 0,
    marginTop: _.md
  }
}))
