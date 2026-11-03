/*
 * @Author: czy0729
 * @Date: 2026-09-23 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-23 12:00:00
 *
 * 提交趋势卡片: 深色卡片与标题排版
 */
import { _ } from '@stores'
import { CARD_WIND, COLOR } from '../ds'

export const styles = _.create({
  card: {
    padding: CARD_WIND,
    backgroundColor: COLOR.card,
    borderRadius: _.radiusSm
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
