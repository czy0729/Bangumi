/*
 * @Author: czy0729
 * @Date: 2023-03-07 16:11:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-20 16:04:35
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  catalog: {
    padding: _.device(_.sm, _.md),
    paddingRight: 0,
    marginBottom: _.sm
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
  control: {
    minWidth: 48,
    height: '100%'
  },
  star: {
    marginLeft: _.xs,
    marginRight: -5
  },
  popover: {
    marginLeft: _.xs,
    marginRight: -3,
    borderRadius: 20,
    overflow: 'hidden'
  },
  touch: {
    width: 38,
    height: 38
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
