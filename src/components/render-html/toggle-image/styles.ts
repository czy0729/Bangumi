/*
 * @Author: czy0729
 * @Date: 2022-05-17 06:41:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-23 23:03:02
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  image: {
    paddingVertical: 4,
    marginBottom: 4
  },
  isLoad: {
    width: _.window.contentWidth * 0.64,
    height: _.r(64),
    borderRadius: _.radiusXs
  },
  loading: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    width: _.window.contentWidth * 0.64,
    height: _.r(64)
  },
  imagePlaceholder: {
    width: _.window.contentWidth * 0.64,
    height: _.r(64),
    borderWidth: 1,
    borderColor: _.colorBorder,
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  },
  closeImageWrap: {
    position: 'absolute',
    zIndex: 10,
    top: 8,
    right: 8,
    borderRadius: 12,
    overflow: 'hidden'
  },
  closeImage: {
    width: 24,
    height: 24,
    borderRadius: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    overflow: 'hidden'
  },
  textSrc: {
    maxWidth: '96%',
    marginTop: _.xs
  }
}))
