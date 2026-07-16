/*
 * @Author: czy0729
 * @Date: 2022-07-25 22:05:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 22:26:07
 */
import { _ } from '@stores'
import { COVER_HEIGHT, COVER_WIDTH } from '../../../ds'

export const styles = _.create({
  item: {
    width: '100%',
    paddingVertical: 12,
    paddingRight: _._wind
  },
  inView: {
    minWidth: COVER_WIDTH,
    minHeight: COVER_HEIGHT
  },
  time: {
    width: _.r(72),
    paddingLeft: _._wind,
    marginTop: 2
  },
  transparent: {
    opacity: 0
  },
  body: {
    width: '100%',
    height: COVER_HEIGHT - 2,
    paddingTop: 2
  },
  katakanas: {
    marginTop: -10
  },
  desc: {
    marginTop: -6,
    marginRight: -36
  }
})
