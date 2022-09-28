/*
 * @Author: czy0729
 * @Date: 2022-09-28 17:31:01
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-09-28 17:31:01
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => {
  const width = _.window.contentWidth - (_.wind - _._wind)
  return {
    container: {
      height: 160,
      marginTop: -_.md,
      marginBottom: _.md,
      borderRadius: _.radiusMd,
      overflow: 'hidden'
    },
    body: {
      width,
      height: 160,
      backgroundColor: '#000',
      opacity: 0.99
    }
  }
})
