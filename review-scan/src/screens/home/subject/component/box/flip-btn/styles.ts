/*
 * @Author: czy0729
 * @Date: 2022-07-10 03:36:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-29 15:35:01
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => {
  const height = _.device(44, 50)
  const space = 14
  return {
    container: {
      height: height * 2 + space,
      paddingTop: space
    },
    animated: {
      marginTop: -height
    },
    placeholder: {
      height
    }
  }
})

export const styles = _.create({
  left: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  },
  leftFocus: {
    paddingLeft: _.sm
  },
  right: {
    marginLeft: -_.hairlineWidth,
    borderLeftWidth: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  },
  rightFocus: {
    paddingRight: _.sm
  },
  open: {
    marginLeft: _.sm,
    marginRight: -22
  }
})
