/*
 * @Author: czy0729
 * @Date: 2025-04-03 18:58:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-03 20:06:33
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    height: 40,
    paddingTop: _.xs,
    marginTop: _.xs
  },
  item: {
    height: 88
  },
  page: {
    width: 24,
    height: 32,
    marginRight: 1,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: _.colorSub
  },
  pageVertical: {
    width: 32,
    height: 20,
    marginBottom: -2
  },
  pageScale: {
    position: 'absolute',
    zIndex: 2,
    top: 5,
    left: 0,
    transform: [
      {
        scale: 0.64
      }
    ],
    opacity: 0.5
  },
  pageCurrent: {
    zIndex: 2,
    transform: [
      {
        scale: 0.9
      }
    ],
    opacity: 0.5
  }
}))
