/*
 * @Author: czy0729
 * @Date: 2022-08-26 10:01:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-05 22:30:55
 */
import { _ } from '@stores'

export const styles = _.create({
  icon: {
    marginRight: -10,
    opacity: 0.4
  }
})

export const memoStyles = _.memoStyles(() => ({
  relation: {
    paddingLeft: 2,
    marginTop: _.sm + 4,
    marginBottom: _.sm + 4
  },
  series: {
    width: _.r(164),
    paddingLeft: 2,
    paddingRight: _.sm,
    marginVertical: _.sm + 2
  }
}))
