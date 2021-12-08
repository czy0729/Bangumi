/*
 * @Author: czy0729
 * @Date: 2021-12-07 12:22:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-07 13:02:52
 */
import { _ } from '@stores'

export default _.create({
  touch: {
    paddingLeft: _.xs,
    marginRight: -_.sm,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  icon: {
    padding: _.sm,
    marginRight: -_.sm,
    marginLeft: _.xs,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  }
})
