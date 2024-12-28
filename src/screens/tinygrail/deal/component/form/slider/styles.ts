/*
 * @Author: czy0729
 * @Date: 2024-12-28 11:12:26
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-12-28 11:12:26
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  inputWrap: {
    paddingLeft: 4,
    marginTop: -3,
    borderColor: _.select(_.colorTinygrailBorder, _.colorTinygrailIcon),
    borderWidth: 1
  },
  input: {
    paddingLeft: _.sm,
    height: 34,
    color: _.colorTinygrailPlain,
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderRadius: 0
  },
  placeholder: {
    position: 'absolute',
    zIndex: 100,
    top: 9,
    right: 12
  },
  balance: {
    marginTop: 16
  },
  slider: {
    height: 40,
    marginTop: _.sm,
    marginLeft: _.ios(0, -10),
    opacity: 0.8
  },
  sliderWrap: {
    width: '100%'
  },
  max: {
    paddingVertical: _.sm
  }
}))
