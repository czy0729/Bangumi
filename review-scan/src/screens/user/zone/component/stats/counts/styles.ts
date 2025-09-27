/*
 * @Author: czy0729
 * @Date: 2023-06-28 10:39:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-28 10:40:13
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  block: {
    paddingVertical: 8,
    paddingHorizontal: _.sm,
    margin: _.xs,
    borderRadius: _.radiusMd,
    overflow: 'hidden'
  },
  blockMain: {
    backgroundColor: _.colorMain
  },
  blockSuccess: {
    backgroundColor: '#70B941'
  },
  blockPrimary: {
    backgroundColor: '#6BAAE8'
  },
  blockWarning: {
    backgroundColor: _.colorWarning
  },
  blockPurple: {
    backgroundColor: '#9065ED'
  },
  blockSky: {
    backgroundColor: '#369CF8'
  }
}))
