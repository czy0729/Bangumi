/*
 * @Author: czy0729
 * @Date: 2024-08-22 15:35:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-04 15:36:58
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  img: {
    padding: 12,
    marginTop: _.sm,
    marginBottom: _.xs,
    borderWidth: 1,
    borderColor: _.colorBorder,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  }
}))
