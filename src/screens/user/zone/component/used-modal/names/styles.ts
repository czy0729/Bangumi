/*
 * @Author: czy0729
 * @Date: 2026-08-08 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-08 08:15:37
 */
import { _ } from '@stores'

export const styles = _.create({
  names: {
    height: _.r(240),
    paddingVertical: _.sm
  },
  loading: {
    height: _.r(200)
  },
  item: {
    paddingVertical: _.sm
  },
  date: {
    width: _.r(80)
  },
  empty: {
    height: _.r(240),
    marginTop: -_.md
  },
  content: {
    marginTop: 2,
    marginLeft: 2
  }
})
