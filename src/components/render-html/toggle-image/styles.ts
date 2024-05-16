/*
 * @Author: czy0729
 * @Date: 2022-05-17 06:41:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-16 16:12:47
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  image: {
    paddingVertical: _.ios(4, 0),
    marginTop: 4,
    marginBottom: 4
  },
  isLoad: {
    width: _.window.contentWidth * 0.64,
    height: _.r(64),
    borderRadius: _.radiusSm
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
    borderRadius: _.radiusSm,
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
    marginRight: 4,
    borderRadius: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    overflow: 'hidden'
  },
  remoteImage: {
    marginLeft: -8
  },
  textSrc: {
    maxWidth: '72%',
    marginTop: _.xs
  }
}))
