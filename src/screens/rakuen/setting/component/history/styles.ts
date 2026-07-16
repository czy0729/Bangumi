/*
 * @Author: czy0729
 * @Date: 2022-08-22 15:53:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 20:45:42
 */
import { _ } from '@stores'

export const styles = _.create({
  container: {
    paddingLeft: _._wind,
    paddingBottom: _.sm
  },
  item: {
    paddingRight: _.sm
  },
  content: {
    marginTop: _.sm
  },
  touch: {
    borderRadius: 20,
    overflow: 'hidden'
  },
  icon: {
    width: 36,
    height: 36
  }
})
