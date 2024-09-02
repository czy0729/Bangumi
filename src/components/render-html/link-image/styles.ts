/*
 * @Author: czy0729
 * @Date: 2024-08-22 15:35:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-02 16:10:49
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  img: {
    padding: 12,
    marginTop: _.sm,
    marginBottom: _.xs,
    borderWidth: 1,
    borderColor: _.colorBorder
  }
}))
