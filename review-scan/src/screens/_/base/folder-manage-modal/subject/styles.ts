/*
 * @Author: czy0729
 * @Date: 2025-03-19 22:51:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-20 16:05:37
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  subject: {
    paddingVertical: _.sm
  },
  content: {
    paddingLeft: 12
  },
  manage: {
    marginTop: 5,
    marginRight: 7
  },
  comment: {
    padding: _.sm,
    marginTop: _.sm,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderWidth: 1,
    borderColor: _.select(_.colorIcon, _.colorBorder),
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  },
  close: {
    marginTop: -_.sm
  },
  popover: {
    marginTop: -6,
    marginRight: -3,
    borderRadius: 20,
    overflow: 'hidden'
  },
  touch: {
    width: 38,
    height: 38
  },
  control: {
    paddingRight: _.sm,
    marginTop: _.md
  },
  check: {
    marginRight: -6,
    marginLeft: _.sm
  },
  textarea: {
    padding: _.sm,
    marginBottom: -4,
    color: _.colorDesc,
    ..._.fontSize10,
    backgroundColor: _.select(_.colorPlain, _._colorDarkModeLevel1),
    borderWidth: 1,
    borderColor: _.select(_.colorIcon, _.colorBorder),
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  }
}))
