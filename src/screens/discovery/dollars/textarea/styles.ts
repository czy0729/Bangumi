/*
 * @Author: czy0729
 * @Date: 2023-04-27 15:06:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-27 15:30:49
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingTop: _.sm,
    paddingHorizontal: _.wind,
    paddingBottom: _.md,
    backgroundColor: _.colorPlain
  },
  textarea: {
    borderWidth: 3,
    borderRadius: _.radiusMd,
    borderColor: 'rgba(255, 255, 255, 0.88)',
    backgroundColor: 'rgba(255, 255, 255, 0.24)'
  },
  input: {
    ..._.fontSize15,
    color: _.colorDesc,
    fontWeight: 'bold'
  },
  btn: {
    paddingVertical: _.sm,
    borderWidth: 3,
    borderRadius: _.radiusMd,
    borderColor: 'rgba(255, 255, 255, 0.88)'
  }
}))
