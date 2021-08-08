/*
 * @Author: czy0729
 * @Date: 2021-08-09 01:54:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-08-09 02:27:39
 */
import memo from './memo'
import context from './context'

/**
 * @param {*} Component
 * @param {*} propsOrKeys
 */
export default function withMemoContext(Component, defaultProps, dev) {
  return memo(context(Component, defaultProps), dev)
}
