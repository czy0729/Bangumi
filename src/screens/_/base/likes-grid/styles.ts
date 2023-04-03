/*
 * @Author: czy0729
 * @Date: 2022-08-13 04:31:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-04 04:42:32
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => {
  const width = 240
  return {
    subject: {
      position: 'absolute',
      zIndex: 10000,
      width,
      borderRadius: _.radiusSm,
      overflow: 'hidden'
    },
    container: {
      width,
      height: width,
      backgroundColor: _.select(
        `rgba(0, 0, 0, ${_.ios('0.08', '0.16')})`,
        `rgba(255, 255, 255, ${_.ios('0.24', '0.05')})`
      ),
      borderRadius: _.radiusSm,
      overflow: 'hidden'
    },
    touch: {
      borderRadius: _.radiusSm,
      overflow: 'hidden'
    },
    item: {
      width: width * 0.2,
      height: width * 0.2
    },
    itemActive: {
      backgroundColor: 'rgba(254, 138, 149, 0.12)'
    },
    bgm: {
      marginTop: -3
    }
  }
})
