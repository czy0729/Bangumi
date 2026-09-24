/*
 * @Author: czy0729
 * @Date: 2026-09-23 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-23 12:00:00
 */
import { _ } from '@stores'
import { CARD_WIND, COLOR } from '../ds'

/** 图表区高度 */
export const CHART_HEIGHT = 110

/** 总览缩略图高度 */
export const MINI_HEIGHT = 34

export const styles = _.create({
  card: {
    padding: CARD_WIND,
    borderRadius: _.radiusSm,
    backgroundColor: COLOR.card
  },
  title: {
    fontSize: 13,
    lineHeight: 16,
    fontStyle: 'italic',
    color: COLOR.text
  },
  subtitle: {
    marginTop: 1,
    fontSize: 10,
    lineHeight: 13,
    color: COLOR.sub
  },
  chart: {
    marginTop: _.sm
  }
})
