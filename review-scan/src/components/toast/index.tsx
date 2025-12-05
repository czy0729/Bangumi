/*
 * @Author: czy0729
 * @Date: 2020-09-28 18:32:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-09 09:02:10
 */
import React from 'react'
import { Portal } from '../portal'
import Container from './container'

function notice(
  content: string,
  type: string,
  duration = 2,
  onClose: (() => void) | undefined,
  mask = true
) {
  const key = Portal.add(
    <Container
      content={content}
      duration={duration}
      onClose={onClose}
      type={type}
      mask={mask}
      onAnimationEnd={() => Portal.remove(key)}
    />
  )
  return key
}

export const Toast = {
  info(content: string, duration?: number, onClose?: () => void, mask?: boolean) {
    return notice(content, 'info', duration, onClose, mask)
  },
  loading(content: string, duration?: number, onClose?: () => void, mask?: boolean) {
    return notice(content, 'loading', duration, onClose, mask)
  }
}
