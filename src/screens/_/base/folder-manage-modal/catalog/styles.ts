/*
 * @Author: czy0729
 * @Date: 2023-03-07 16:11:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-19 20:25:43
 */
import { _ } from '@stores'

export const styles = _.create({
  catalog: {
    paddingRight: 0,
    marginBottom: _.sm
  },
  control: {
    minWidth: 48,
    height: '100%'
  },
  star: {
    marginLeft: _.xs,
    marginRight: -5
  },
  popover: {
    marginLeft: _.xs,
    marginRight: -3,
    borderRadius: 20,
    overflow: 'hidden'
  },
  touch: {
    width: 38,
    height: 38
  }
})
