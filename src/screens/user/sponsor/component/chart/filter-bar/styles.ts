/*
 * @Author: czy0729
 * @Date: 2022-09-07 03:01:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-10 13:51:27
 */
import { _ } from '@stores'
import { levelStyles } from '../../levels'

export const memoStyles = _.memoStyles(() => ({
  filter: {
    paddingVertical: 12
  },
  refresh: {
    marginRight: -24
  },
  block: {
    marginTop: _.sm
  },
  touch: {
    padding: 4,
    marginHorizontal: 2
  },
  l: {
    width: 16,
    height: 16,
    marginRight: 6,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: _.colorBorder,
    overflow: 'hidden'
  },
  ...levelStyles()
}))
