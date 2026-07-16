/*
 * @Author: czy0729
 * @Date: 2022-01-21 16:35:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 00:26:23
 */
import { _ } from '@stores'
import { ITEM_WIDTH } from './ds'

export const styles = _.create({
  block: {
    marginTop: _.sm,
    marginRight: -_._wind
  },
  sub: {
    marginLeft: 36
  },
  scroll: {
    paddingRight: _._wind
  },
  item: {
    width: ITEM_WIDTH,
    height: _.device(110, 128)
  }
})
