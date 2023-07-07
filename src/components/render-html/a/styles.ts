/*
 * @Author: czy0729
 * @Date: 2022-05-13 05:17:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-07-06 15:27:56
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  wrap: {
    maxWidth: _.window.contentWidth - (_.sm + 36) * 2,
    paddingTop: 10,
    paddingRight: 4,
    paddingBottom: 2
  },
  body: {
    overflow: 'hidden',
    padding: 6,
    paddingRight: 10,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderRadius: _.radiusSm
  },
  top: {
    maxWidth: _.window.contentWidth / 2
  },
  bottom: {
    maxWidth: _.window.contentWidth / 2.2
  },
  a: {
    color: _.colorMain
  }
}))
