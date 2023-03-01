/*
 * @Author: czy0729
 * @Date: 2022-07-10 03:36:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-01 04:12:22
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingTop: _.md,
    paddingHorizontal: _.wind
  },
  sectionTitle: {
    height: 28
  },
  btn: {
    marginTop: 8
  },
  bottom: {
    marginTop: -_.select(44, 50) + _.sm
  },
  hide: {
    position: 'absolute',
    zIndex: 1,
    top: -10,
    right: -_.sm
  }
}))
