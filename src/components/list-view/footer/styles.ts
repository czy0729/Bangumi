/*
 * @Author: czy0729
 * @Date: 2022-05-17 04:00:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-12 18:43:36
 */
import { _ } from '@stores'

export const styles = _.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 40,
    paddingVertical: 8,
    paddingHorizontal: _.lg
  },
  text: {
    maxWidth: _.window.contentWidth - 2 * _.md,
    ..._.fontSize(14)
  },
  textMt: {
    maxWidth: _.window.contentWidth - 2 * _.md,
    marginTop: _.sm,
    ..._.fontSize(14)
  },
  empty: {
    minHeight: 240
  },
  noMore: {
    padding: 8,
    marginTop: _.lg
  }
})
