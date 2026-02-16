/*
 * @Author: czy0729
 * @Date: 2023-03-07 16:23:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-13 20:21:14
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  subjects: {
    height: 364,
    maxHeight: Math.floor(_.window.height * 0.64),
    paddingLeft: _.sm,
    paddingBottom: _.sm,
    marginTop: -_.sm
  },
  subject: {
    paddingVertical: _.sm
  },
  content: {
    paddingLeft: 12
  },
  close: {
    marginTop: -_.sm
  },
  check: {
    marginRight: -6,
    marginLeft: _.sm
  },
  collection: {
    position: 'absolute',
    zIndex: 1,
    top: 2,
    left: 0
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
  },
  control: {
    paddingRight: _.sm,
    marginTop: _.md
  },
  popover: {
    marginLeft: _.xs,
    marginRight: -2,
    borderRadius: 20,
    overflow: 'hidden'
  },
  touch: {
    width: 38,
    height: 38
  }
}))
