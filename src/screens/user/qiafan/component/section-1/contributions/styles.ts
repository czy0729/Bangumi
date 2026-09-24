/*
 * @Author: czy0729
 * @Date: 2026-09-23 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-23 12:00:00
 */
import { _ } from '@stores'
import { CARD_WIND, COLOR } from '../ds'

export const CHART_HEIGHT = 96

export const styles = _.create({
  card: {
    padding: CARD_WIND,
    borderRadius: _.radiusSm,
    backgroundColor: COLOR.card
  },
  login: {
    fontSize: 13,
    lineHeight: 16,
    color: COLOR.text
  },
  counts: {
    marginTop: 2
  },
  count: {
    fontSize: 10,
    lineHeight: 12,
    color: COLOR.text
  },
  add: {
    color: COLOR.add
  },
  del: {
    color: COLOR.del
  },
  rank: {
    paddingHorizontal: 5,
    paddingVertical: 1,
    fontSize: 9,
    lineHeight: 12,
    color: COLOR.text,
    borderWidth: 1,
    borderColor: COLOR.border,
    borderRadius: 9
  },
  chart: {
    marginTop: _.sm
  }
})
