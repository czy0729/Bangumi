/*
 * @Author: czy0729
 * @Date: 2025-07-02 16:56:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-08 19:48:46
 */
import { _ } from '@stores'

export const styles = _.create({
  chart: {
    height: 104,
    marginBottom: _.ios(-_.sm, _.md)
  },
  scroll: {
    paddingTop: 16,
    paddingHorizontal: _.sm
  },
  item: {
    width: 30
  },
  bar: {
    height: 48,
    marginVertical: _.sm
  },
  progress: {
    width: 8,
    marginTop: _.xs,
    borderRadius: 2
  }
})
