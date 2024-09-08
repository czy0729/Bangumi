/*
 * @Author: czy0729
 * @Date: 2024-08-03 11:52:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-08 19:11:52
 */
import React from 'react'
import { AnyObject } from '@types'
import ErrorBoundary from './index'

/** 捕捉错误异常组件包裹组件 */
export function renderWithErrorBoundary(data: any, index?: number, props: AnyObject = {}) {
  const Component = data
  return (
    <ErrorBoundary key={String(data?.type?.displayName || index || 0)}>
      <Component {...props} />
    </ErrorBoundary>
  )
}
