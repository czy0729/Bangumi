/*
 * @Author: czy0729
 * @Date: 2024-02-11 03:52:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-11 05:17:30
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => {
  const height = _.device(128, 164)
  const width = height * 2 + 16
  const headerHeight = 30
  return {
    container: {
      height,
      marginRight: _.md
    },
    body: {
      width,
      height,
      borderTopWidth: 2,
      borderRightWidth: 4,
      borderBottomWidth: 4,
      borderLeftWidth: 2,
      borderColor: _.colorTitle,
      backgroundColor: _.colorPlain,
      opacity: _.select(1, 0.88)
    },
    header: {
      height: headerHeight,
      paddingTop: _.select(3, 2.5),
      borderBottomWidth: 2,
      borderColor: _.colorTitle
    },
    line: {
      height: 2,
      marginTop: _.select(2, 3),
      marginHorizontal: 6,
      backgroundColor: _.colorTitle
    },
    close: {
      position: 'absolute',
      zIndex: 1,
      top: 3,
      left: 18,
      width: headerHeight - 8,
      height: headerHeight - 8,
      padding: 2,
      borderWidth: _.select(2, 3),
      backgroundColor: _.colorTitle,
      borderColor: _.colorPlain
    },
    closeMain: {
      width: '100%',
      height: '100%',
      backgroundColor: _.colorPlain
    },
    title: {
      position: 'absolute',
      zIndex: 1,
      top: 0,
      left: '50%',
      width: 56,
      marginLeft: -28,
      height: headerHeight - 2,
      backgroundColor: _.colorPlain
    },
    content: {
      height: height - headerHeight - 4,
      paddingBottom: 2
    }
  }
})
