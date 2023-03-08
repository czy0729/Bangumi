/*
 * @Author: czy0729
 * @Date: 2023-03-07 16:23:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-07 19:00:32
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  subjects: {
    height: 432,
    maxHeight: _.window.height * 0.64,
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
    marginTop: _.sm,
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
  editWrap: {
    height: '100%'
  },
  submit: {
    position: 'absolute',
    zIndex: 1,
    right: 0,
    bottom: -4
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
