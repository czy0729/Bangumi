/*
 * @Author: czy0729
 * @Date: 2022-05-13 05:17:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-19 08:36:06
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  wrap: {
    maxWidth: _.web('96%', _.window.contentWidth - (_.sm + 36) * 2),
    paddingTop: 10,
    paddingRight: 4,
    paddingBottom: _.web(_.md, 2)
  },
  body: {
    overflow: 'hidden',
    padding: 6,
    paddingRight: 10,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderRadius: _.radiusSm
  },
  top: {
    maxWidth: _.web('96%', _.window.contentWidth / 2)
  }
}))
