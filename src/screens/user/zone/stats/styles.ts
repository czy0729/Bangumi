/*
 * @Author: czy0729
 * @Date: 2022-12-26 04:30:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-12-26 05:08:52
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  contentContainerStyle: {
    paddingTop: _.parallaxImageHeight + _.md * 3,
    paddingHorizontal: _.wind,
    minHeight: _.window.height + _.parallaxImageHeight - _.tabBarHeight
  },
  page: {
    minHeight: _.window.height - _.parallaxImageHeight
  },
  touch: {
    paddingVertical: _.sm,
    paddingHorizontal: _.md,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
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
