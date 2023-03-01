/*
 * @Author: czy0729
 * @Date: 2022-07-10 03:36:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-01 04:07:12
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
  right: {
    marginLeft: -_.hairlineWidth,
    borderLeftWidth: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  }
})
