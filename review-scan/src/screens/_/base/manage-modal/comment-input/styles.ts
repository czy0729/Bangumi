/*
 * @Author: czy0729
 * @Date: 2024-07-28 04:11:53
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-07-28 04:11:53
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  comment: {
    marginTop: 4,
    backgroundColor: _.select(_.colorPlain, _._colorDarkModeLevel2),
    borderWidth: _.select(_.hairlineWidth, 0),
    borderColor: _.colorBorder,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  input: {
    borderWidth: 0
  },
  length: {
    position: 'absolute',
    zIndex: 1,
    left: 12,
    bottom: _.sm,
    opacity: 0.8,
    userSelect: 'none'
  },
  sensitive: {
    width: '100%',
    paddingHorizontal: 4,
    marginTop: 6,
    marginBottom: -_.xs
  },
  touch: {
    marginRight: 6,
    marginBottom: _.sm
  }
}))
