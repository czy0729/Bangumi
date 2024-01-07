/*
 * @Author: czy0729
 * @Date: 2023-01-12 06:39:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-22 00:35:50
 */
import { _ } from '@stores'
import { THUMB_HEIGHT, THUMB_WIDTH } from './ds'

export const memoStyles = _.memoStyles(() => ({
  container: {
    minHeight: 200,
    marginTop: _.lg
  },
  image: {
    height: THUMB_HEIGHT
  },
  void: {
    width: THUMB_WIDTH,
    height: THUMB_HEIGHT,
    backgroundColor: _.colorBg
  },
  title: {
    width: THUMB_WIDTH,
    paddingTop: _.sm
  },
  sub: {
    width: THUMB_WIDTH,
    paddingTop: _.xs
  },
  touch: {
    paddingLeft: _.xs,
    marginRight: -_.sm
  },
  layout: {
    width: '100%',
    height: 1
  }
}))
