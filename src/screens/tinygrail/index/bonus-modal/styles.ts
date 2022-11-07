/*
 * @Author: czy0729
 * @Date: 2022-11-07 14:09:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-07 14:10:05
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  modal: {
    width: _.window.width - 2 * _.wind,
    maxWidth: 400,
    backgroundColor: _.tSelect(_.colorTinygrailContainer, _.__colorBg__),
    borderRadius: _.radiusMd
  },
  focus: {
    marginTop: -Math.floor(_.window.height * 0.56)
  },
  wrap: {
    width: '100%',
    maxWidth: _.window.maxWidth,
    paddingBottom: _.sm,
    marginTop: _.md
  },
  item: {
    marginBottom: _.md
  },
  btn: {
    width: 240,
    backgroundColor: _.tSelect(_.colorTinygrailIcon, _.colorTinygrailBg),
    borderColor: _.tSelect(_.colorTinygrailIcon, _.colorTinygrailBg)
  },
  text: {
    width: 160,
    color: _.tSelect(_.__colorPlain__, _.colorTinygrailPlain)
  }
}))
