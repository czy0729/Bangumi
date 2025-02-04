/*
 * @Author: czy0729
 * @Date: 2021-12-07 12:22:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-05 04:24:28
 */
import { _ } from '@stores'

export default _.create({
  touch: {
    paddingLeft: _.xs,
    marginRight: -_.sm,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  icon: {
    padding: _.sm,
    marginRight: -_.sm,
    marginLeft: _.xs,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  }
})

export const styles = _.create({
  touch: {
    borderRadius: 20,
    overflow: 'hidden'
  },
  btn: {
    minWidth: 38,
    height: 38
  },
  btn2: {
    width: 38,
    height: 38
  },
  text: {
    marginRight: _.sm,
    marginLeft: _.xs
  },
  action: {
    marginRight: 4,
    borderRadius: 20,
    overflow: 'hidden'
  },
  actionBtn: {
    width: 38,
    height: 38
  },
  close: {
    marginRight: -11,
    marginLeft: 3
  },
  comment: {
    marginRight: -12
  },
  disc: {
    marginLeft: _.sm,
    marginRight: -_.sm
  },
  num: {
    position: 'absolute',
    zIndex: 1,
    right: -2,
    bottom: 6
  },
  game: {
    marginRight: -_.sm,
    borderRadius: 20,
    overflow: 'hidden'
  },
  hidden: {
    paddingVertical: 0,
    marginRight: -_.sm,
    marginLeft: 4
  },
  actions: {
    marginRight: 4,
    marginLeft: 2
  },
  iconReverse: {
    marginRight: -11,
    marginLeft: 4
  },
  searchDiscBtn: {
    paddingVertical: 2,
    paddingHorizontal: 8
  },
  searchBtn: {
    paddingVertical: 2,
    paddingHorizontal: 4
  },
  version: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 4
  },
  reverse: {
    transform: [
      {
        rotateX: '180deg'
      }
    ]
  }
})
