/*
 * @Author: czy0729
 * @Date: 2026-09-23 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-24 13:53:08
 */
import { _ } from '@stores'
import { AXIS_WIDTH, COLOR } from '../ds'

export const styles = _.create({
  axis: {
    width: AXIS_WIDTH,
    position: 'relative'
  },
  tick: {
    position: 'absolute',
    right: 6,
    width: 18,
    fontSize: 9,
    lineHeight: 10,
    textAlign: 'right',
    color: COLOR.sub
  },
  months: {
    position: 'relative',
    height: 12,
    marginTop: 6
  },
  month: {
    position: 'absolute',
    width: 44,
    fontSize: 10,
    lineHeight: 12,
    textAlign: 'center',
    color: COLOR.sub
  },
  /** 触摸探查 badge: 跟手平移的时间+数值气泡 */
  badge: {
    position: 'absolute',
    top: 0,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: COLOR.miniBg,
    borderWidth: 1,
    borderColor: COLOR.border
  },
  badgeText: {
    fontSize: 10,
    lineHeight: 13,
    color: COLOR.text
  },
  badgeValue: {
    fontSize: 11,
    lineHeight: 13,
    color: COLOR.miniSelect
  },
  side: {
    width: 14,
    alignItems: 'center',
    justifyContent: 'center'
  },
  sideText: {
    width: 90,
    fontSize: 9,
    lineHeight: 14,
    textAlign: 'center',
    color: COLOR.sub,
    transform: [
      {
        rotate: '90deg'
      }
    ]
  }
})
