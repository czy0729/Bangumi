/*
 * @Author: czy0729
 * @Date: 2023-03-07 16:50:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-07 16:53:00
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  create: {
    paddingTop: _.sm,
    paddingRight: 48,
    paddingLeft: _.sm,
    marginBottom: _.md
  },
  textarea: {
    padding: _.sm,
    marginTop: _.md,
    marginBottom: -4,
    color: _.colorDesc,
    ..._.fontSize10,
    backgroundColor: _.select(_.colorPlain, _._colorDarkModeLevel1),
    borderWidth: 1,
    borderColor: _.select(_.colorIcon, _.colorBorder),
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  },
  cancel: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: -4
  },
  submit: {
    position: 'absolute',
    zIndex: 1,
    right: -4,
    bottom: -4
  }
}))
