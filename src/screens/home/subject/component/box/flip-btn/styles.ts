/*
 * @Author: czy0729
 * @Date: 2022-07-10 03:36:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 22:04:51
 */
import { _ } from '@stores'

const height = _.device(44, 50)
const space = 14

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
})
