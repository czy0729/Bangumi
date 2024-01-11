/*
 * @Author: czy0729
 * @Date: 2022-09-06 19:24:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-06 21:35:31
 */
import { _ } from '@stores'

export const styles = _.create({
  container: {
    minHeight: _.window.height * 0.64,
    marginBottom: _.md
  },
  empty: {
    minHeight: _.window.height * 0.5
  },
  text: {
    maxWidth: _.window.contentWidth - 2 * _.md,
    ..._.fontSize14
  }
})
