/*
 * @Author: czy0729
 * @Date: 2022-07-10 03:36:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-05 04:22:59
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
  outdate: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginTop: _.md,
    backgroundColor: _.colorMainLight,
    borderWidth: _.select(1, 0),
    borderColor: _.colorMainLightBorder,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  }
}))
