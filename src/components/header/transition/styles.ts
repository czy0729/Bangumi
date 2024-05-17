/*
 * @Author: czy0729
 * @Date: 2023-04-11 16:15:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-19 11:25:31
 */
import { _ } from '@stores'
import { STORYBOOK, WSA } from '@constants'

let minHeight: number
if (WSA) {
  minHeight = 40
} else if (STORYBOOK) {
  minHeight = 32
} else {
  minHeight = 20 * 1.28
}

export const memoStyles = _.memoStyles(() => ({
  view: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: _.colorPlain,
    overflow: 'hidden'
  },
  body: {
    position: 'absolute',
    zIndex: 1,
    bottom: 8,
    left: _.device(48, 56),
    right: STORYBOOK ? 0 : 56,
    minHeight
  },
  bodyTitle: {
    bottom: _.device(6, 10)
  },
  scrollView: {
    maxWidth: STORYBOOK ? '100%' : '80%'
  },
  container: {
    width: '100%',
    paddingRight: _.md,
    paddingLeft: _.sm
  },
  text: {
    marginBottom: _.ios(0, 10),
    marginLeft: -8
  }
}))
