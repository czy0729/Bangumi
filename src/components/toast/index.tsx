/*
 * @Author: czy0729
 * @Date: 2020-09-28 18:32:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-26 01:31:46
 */
import React from 'react'
import { Portal } from '../portal'
import Container from './container'

function notice(
  content: string,
  type: string,
  duration: number = 2,
  onClose: (() => void) | undefined,
  mask: boolean = true
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
