/*
 * @Author: czy0729
 * @Date: 2022-11-07 14:09:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-14 22:02:33
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  modal: {
    width: _.window.width - 2 * _.wind,
    maxWidth: 400,
    backgroundColor: _.select(_.__colorBg__, _.colorTinygrailContainer)
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
    width: 280,
    maxWidth: '100%',
    height: 40,
    marginTop: _.xs,
    backgroundColor: _.select(_.colorTinygrailBg, _.colorTinygrailIcon),
    borderColor: _.select(_.colorTinygrailBg, _.colorTinygrailIcon)
  },
  text: {
    width: 160,
    color: _.select(_.colorTinygrailPlain, _.__colorPlain__)
  },
  fluctuation: {
    paddingHorizontal: 4,
    paddingBottom: 1,
    marginLeft: _.xs,
    borderRadius: 2,
    overflow: 'hidden'
  }
}))
