/*
 * @Author: czy0729
 * @Date: 2022-09-06 19:24:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-06 21:35:31
 */
import { _ } from '@stores'

export const styles = _.create({
  fixedToolBar: {
    paddingTop: _.headerHeight
  },
  contentContainerStyle: {
    paddingTop: _.headerHeight
  },
  container: {
    minHeight: Math.floor(_.window.height * 0.64),
    marginBottom: _.md
  },
  empty: {
    minHeight: Math.floor(_.window.height * 0.75)
  },
  text: {
    maxWidth: _.window.contentWidth - 2 * _.md,
    marginTop: _.sm,
    ..._.fontSize14
  }
})
