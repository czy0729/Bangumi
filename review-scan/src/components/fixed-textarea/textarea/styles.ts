/*
 * @Author: czy0729
 * @Date: 2023-08-01 05:21:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-14 18:05:49
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingHorizontal: _.wind,
    border: 0,
    borderBottomColor: 'transparent'
  },
  containerSpec: {
    paddingHorizontal: _.wind,
    marginBottom: -16,
    border: 0,
    borderBottomColor: 'transparent'
  },
  containerSpecFixed: {
    paddingHorizontal: _.wind,
    marginTop: -12,
    marginBottom: -40,
    border: 0,
    borderBottomColor: 'transparent'
  },
  body: {
    overflow: 'hidden'
  },
  fixed: {
    marginBottom: -144
  },
  textarea: {
    minHeight: 48,
    maxHeight: 152,
    paddingTop: 12,
    paddingHorizontal: 0,
    paddingBottom: 8,
    marginBottom: -_.hairlineWidth,
    color: _.colorDesc,
    fontSize: 14 + _.fontSizeAdjust,
    lineHeight: 22,
    backgroundColor: 'transparent'
  },
  touch: {
    marginTop: _.ios(7, 4),
    marginLeft: _.sm,
    marginRight: -5,
    borderRadius: 20,
    overflow: 'hidden'
  },
  send: {
    width: 36,
    height: 36,
    marginTop: _.platforms(2, 2, 7, 0)
  },
  placeholder: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
}))
