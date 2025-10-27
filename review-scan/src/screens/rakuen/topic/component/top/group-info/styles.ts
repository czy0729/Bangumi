/*
 * @Author: czy0729
 * @Date: 2025-04-23 08:29:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-23 10:22:58
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    minHeight: _.r(32),
    marginTop: _.sm,
    marginBottom: _.xs
  },
  label: {
    maxWidth: '100%',
    padding: 4,
    paddingRight: 10,
    marginRight: _.sm,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  },
  text: {
    maxWidth: _.window.contentWidth * 0.6,
    marginLeft: _.sm
  }
}))
