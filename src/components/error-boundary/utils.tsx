/*
 * @Author: czy0729
 * @Date: 2024-08-03 11:52:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-03 11:53:37
 */
import React from 'react'
import { AnyObject } from '@types'
import ErrorBoundary from './index'

/** 捕捉错误异常组件包裹组件 */
export function renderWithErrorBoundary(data: any, index?: number, props: AnyObject = {}) {
  const Component = data
  return (
    <ErrorBoundary key={index}>
      <Component {...props} />
    </ErrorBoundary>
  )
}
