/*
 * @Author: czy0729
 * @Date: 2026-09-23 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-24 13:53:08
 *
 * 柱状图: 纵轴刻度、横轴月份、触摸探查 badge 与右侧说明
 */
import { _ } from '@stores'
import { AXIS_WIDTH, BADGE_HEIGHT, BADGE_WIDTH, COLOR, SIDE_WIDTH } from '../ds'

export const styles = _.create({
  axis: {
    position: 'relative',
    width: AXIS_WIDTH
  },
  main: {
    flex: 1
  },
  tick: {
    position: 'absolute',
    right: 6,
    width: 18,
    fontSize: 9,
    lineHeight: 10,
    color: COLOR.sub,
    textAlign: 'right'
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
    color: COLOR.sub,
    textAlign: 'center'
  },
  /** 触摸探查 badge: 跟手平移的时间+数值气泡, 定宽保证居中位置稳定 */
  badge: {
    position: 'absolute',
    top: 0,
    width: BADGE_WIDTH,
    height: BADGE_HEIGHT,
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: COLOR.miniBg,
    borderWidth: 1,
    borderColor: COLOR.border,
    borderRadius: 6
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
    alignItems: 'center',
    justifyContent: 'center',
    width: SIDE_WIDTH
  },
  sideText: {
    width: 90,
    fontSize: 9,
    lineHeight: 14,
    color: COLOR.sub,
    textAlign: 'center',
    transform: [
      {
        rotate: '90deg'
      }
    ]
  }
})
