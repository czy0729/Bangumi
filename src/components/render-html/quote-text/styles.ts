/*
 * @Author: czy0729
 * @Date: 2022-05-17 06:35:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-18 19:14:43
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  quote: {
    maxWidth: '98%',
    paddingVertical: 8,
    paddingRight: 12,
    paddingLeft: 10,
    marginTop: 4,
    marginRight: 4,
    marginBottom: 8,
    backgroundColor: _.colorBg,
    borderLeftWidth: 4,
    borderLeftColor: _.colorIcon,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    borderTopRightRadius: _.radiusXs,
    borderBottomRightRadius: _.radiusXs,
    overflow: 'hidden'
  },
  placeholder: {
    paddingBottom: 2,
    color: _.colorSub,
    textAlign: 'center'
  }
}))
