/*
 * @Author: czy0729
 * @Date: 2026-09-23 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-23 12:00:00
 *
 * 作者贡献卡片: 深色卡片、头像行与统计数字
 */
import { _ } from '@stores'
import { CARD_WIND, COLOR } from '../ds'

export const styles = _.create({
  card: {
    padding: CARD_WIND,
    backgroundColor: COLOR.card,
    borderRadius: _.radiusSm
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
