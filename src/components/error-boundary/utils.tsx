/*
 * @Author: czy0729
 * @Date: 2024-08-03 11:52:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-01 03:12:51
 */
import React from 'react'
import ErrorBoundary from './index'

/** 可被包裹的组件 (memo 包装的组件通过 type 读取内部 displayName) */
type WrapComponent<P> = React.ComponentType<P> & { type?: { displayName?: string } }

/** 捕捉错误异常组件包裹组件 */
export function renderWithErrorBoundary<P>(data: WrapComponent<P>, index?: number, props?: P) {
  const Component = data

  return (
    <ErrorBoundary key={String(data.type?.displayName || index || 0)}>
      <Component {...props} />
    </ErrorBoundary>
  )
}
