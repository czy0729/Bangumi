/*
 * @Author: czy0729
 * @Date: 2022-08-26 00:44:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-19 16:32:12
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    minHeight: 216,
    marginTop: _.lg
  },
  image: {
    marginLeft: _.sm,
    overflow: 'hidden'
  },
  imageSide: {
    overflow: 'hidden'
  },
  details: {
    paddingHorizontal: _.wind,
    marginTop: _.md
  }
}))
