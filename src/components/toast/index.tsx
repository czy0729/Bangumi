/*
 * @Author: czy0729
 * @Date: 2020-09-28 18:32:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-12 07:20:00
 */
import React from 'react'
import { Portal } from '../portal'
import Container from './container'

import type { Props as ToastProps } from './types'
export type { ToastProps }

/** 通过 Portal 挂载一条 Toast, 返回可用于移除的 key */
export function notice({
  content,
  type = '',
  duration = 2,
  onClose,
  mask = true
}: ToastProps): number {
  const key: number = Portal.add(
    <Container
      content={content}
      duration={duration}
      onClose={onClose}
      type={type}
      mask={mask}
      onAnimationEnd={() => {
        Portal.remove(key)
      }}
    />
  )
  return key
}

export const Toast = {
  info(content: string, duration?: number, onClose?: () => void, mask?: boolean) {
    return notice({ content, type: 'info', duration, onClose, mask })
  },
  loading(content: string, duration?: number, onClose?: () => void, mask?: boolean) {
    return notice({ content, type: 'loading', duration, onClose, mask })
  }
}
