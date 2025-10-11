/*
 * @Author: czy0729
 * @Date: 2022-10-18 16:31:07
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-10-18 16:31:07
 */
import { _ } from '@stores'

export const styles = _.create({
  icon: {
    padding: _.sm
  },
  left: {},
  right: {
    marginRight: _.ios(-_.sm, 0)
  },
  ios: {
    marginBottom: _.tabsHeight
  },
  touch: {
    borderRadius: 20,
    overflow: 'hidden'
  }
})
