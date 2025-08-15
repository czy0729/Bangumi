/*
 * @Author: czy0729
 * @Date: 2022-11-11 07:03:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-16 17:34:03
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  modal: {
    width: _.r(_.window.width - 2 * _.wind),
    maxWidth: _.r(400),
    backgroundColor: _.select(_.__colorPlain__, _.colorTinygrailContainer),
    borderRadius: _.radiusMd
  },
  focus: {
    marginTop: -Math.floor(_.window.height * 0.56)
  },
  wrap: {
    width: '100%',
    maxWidth: _.window.maxWidth,
    height: _.window.height * 0.64,
    maxHeight: 664,
    paddingBottom: _.sm,
    marginTop: _.md
  },
  information: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 0,
    marginTop: -30,
    marginRight: 10
  },
  bottom: {
    height: 40,
    marginBottom: _.sm,
    marginLeft: 6
  },
  btn: {
    width: 80,
    height: 28,
    marginLeft: _.sm,
    borderRadius: 0
  },
  btnDisabled: {
    width: 80,
    height: 28,
    marginLeft: _.sm,
    opacity: 0.5,
    borderRadius: 0
  },
  btnText: {
    ..._.fontSize(11)
  },
  segmented: {
    width: '100%',
    height: 28
  },
  segmentedExtra: {
    borderRadius: _.radiusXs
  }
}))
