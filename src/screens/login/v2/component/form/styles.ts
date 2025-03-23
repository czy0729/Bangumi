/*
 * @Author: czy0729
 * @Date: 2022-09-03 03:41:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-22 17:51:33
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  form: {
    width: _.r(300),
    paddingBottom: 200
  },
  input: {
    height: 44,
    paddingVertical: 0,
    paddingHorizontal: 14,
    ..._.device(_.fontSize12, _.fontSize15),
    backgroundColor: _.colorBg,
    borderRadius: _.radiusSm
  },
  touchCaptcha: {
    height: 44,
    marginLeft: _.sm,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  captchaContainer: {
    width: 118,
    height: 44
  },
  captcha: {
    width: 118,
    height: 44
  },
  touch: {
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  touchIcon: {
    marginLeft: _.md,
    borderRadius: 20,
    overflow: 'hidden'
  },
  config: {
    paddingTop: 12
  },
  icon: {
    width: 36,
    height: 36
  }
}))
