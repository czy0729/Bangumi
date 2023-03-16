/*
 * @Author: czy0729
 * @Date: 2022-07-22 18:25:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-30 11:30:40
 */
import { _ } from '@stores'

export const styles = _.create({
  manage: {
    minWidth: 48,
    marginTop: -2,
    marginRight: -10
  },
  touch: {
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  touchNoCollect: {
    height: 22,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  container: {
    width: 40
  },
  icon: {
    width: 40
  },
  text: {
    width: 40,
    marginTop: 2
  }
})
