/*
 * @Author: czy0729
 * @Date: 2022-08-19 02:49:14
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-08-19 02:49:14
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingTop: _.xs,
    paddingHorizontal: _.wind,
    paddingBottom: _.md
  },
  input: {
    height: 40,
    paddingVertical: 0,
    paddingHorizontal: _.device(_.sm, _.md),
    ..._.device(_.fontSize12, _.fontSize15),
    backgroundColor: _.colorBg
  },
  captchaTouch: {
    marginLeft: _.sm,
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  },
  captchaContainer: {
    width: 118,
    height: 38
  },
  captcha: {
    width: 118,
    height: 38
  }
}))
