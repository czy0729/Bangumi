/* eslint-disable no-param-reassign */
/*
 * @Author: czy0729
 * @Date: 2021-08-09 01:49:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-08-09 20:50:08
 */
import React from 'react'
import { memoCompare } from '@utils'

export default function memo(Component, defaultProps, customCompareFn) {
  if (defaultProps) Component.defaultProps = defaultProps
  return React.memo(Component, (prevProps, nextProps) =>
    typeof customCompareFn === 'function'
      ? memoCompare(customCompareFn(prevProps), customCompareFn(nextProps))
      : memoCompare(prevProps, nextProps, Component.defaultProps)
  )
}
