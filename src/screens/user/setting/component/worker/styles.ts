/*
 * @Author: czy0729
 * @Date: 2026-06-02 01:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-26 06:38:49
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  preview: {
    padding: _.sm,
    paddingLeft: 12,
    marginTop: 10,
    borderRadius: _.radiusXs,
    borderWidth: _.hairlineWidth,
    borderColor: _.colorBorder
  },
  previewOpen: {
    paddingHorizontal: 6
  },
  notice: {
    marginHorizontal: _._wind
  },
  info: {
    position: 'absolute',
    zIndex: 1,
    top: _.device(6, 10),
    right: _._wind,
    padding: 9
  },
  information: {
    maxWidth: '100%',
    marginTop: _.sm
  }
}))
