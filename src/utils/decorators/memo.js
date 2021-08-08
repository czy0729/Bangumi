/*
 * @Author: czy0729
 * @Date: 2021-08-09 01:49:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-08-09 02:27:54
 */
import React from 'react'
import { memoCompare } from '@utils'

/**
 * @param {*} Component
 */
export default function memo(Component, dev) {
  return React.memo(Component, (prevProps, nextProps) =>
    memoCompare(prevProps, nextProps, Component.defaultProps, dev)
  )
}
