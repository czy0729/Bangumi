/*
 * @Author: czy0729
 * @Date: 2023-12-11 20:10:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-30 00:00:00
 *
 * 条目正文区样式
 */
import { _ } from '@stores'

export const styles = _.create({
  item: {
    paddingTop: _.md - _.web(7, 3),
    paddingBottom: _.md - 4,
    paddingLeft: _.sm + 1,
    marginTop: -3,
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  }
})
