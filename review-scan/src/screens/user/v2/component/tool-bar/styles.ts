/*
 * @Author: czy0729
 * @Date: 2022-08-04 20:54:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-26 08:48:19
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingTop: 20,
    paddingBottom: 12,
    backgroundColor: _.colorPlain
  },
  list: {
    paddingBottom: 0
  },
  touch: {
    paddingVertical: _.sm,
    paddingRight: _.lg
  }
}))

export const styles = _.create({
  touch: {
    paddingVertical: _.sm,
    paddingRight: _.lg
  }
})
