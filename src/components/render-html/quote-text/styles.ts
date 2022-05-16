/*
 * @Author: czy0729
 * @Date: 2022-05-17 06:35:30
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-05-17 06:35:30
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  quoteTextPlaceholder: {
    paddingBottom: 2,
    color: _.colorSub,
    textAlign: 'center'
  },
  quote: {
    padding: 8,
    paddingLeft: 10,
    marginTop: 4,
    marginRight: 4,
    marginBottom: 8,
    backgroundColor: _.colorBg,
    borderLeftWidth: 4,
    borderLeftColor: _.colorIcon,
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  }
}))
