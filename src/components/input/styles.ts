/*
 * @Author: czy0729
 * @Date: 2022-05-04 14:04:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-05-04 14:04:00
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    width: '100%'
  },
  input: {
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 12,
    color: _.colorDesc,
    ..._.fontSize(14),
    backgroundColor: _.select(_.colorPlain, _._colorDarkModeLevel2),
    borderWidth: _.select(_.hairlineWidth, 0),
    borderColor: _.colorBorder,
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  },
  multiContainer: {
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: _.select(_.colorPlain, _._colorDarkModeLevel2),
    borderWidth: _.select(_.hairlineWidth, 0),
    borderColor: _.colorBorder,
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  },
  multiInput: {
    width: '100%',
    paddingTop: 0,
    color: _.colorDesc,
    ..._.fontSize(14)
  },
  close: {
    position: 'absolute',
    zIndex: 10,
    top: '50%',
    right: 0,
    marginTop: -16,
    borderRadius: 20,
    overflow: 'hidden'
  },
  icon: {
    width: 32,
    height: 32
  }
}))
