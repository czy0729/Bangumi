/*
 * @Author: czy0729
 * @Date: 2023-02-14 03:26:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-14 03:46:29
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingBottom: _.window.height * 0.32
  },
  icon: {
    width: 36,
    height: 36
  },
  section: {
    paddingVertical: _.sm,
    paddingRight: _.sm,
    paddingLeft: _._wind
  },
  input: {
    height: 44,
    paddingVertical: 0
  }
}))
