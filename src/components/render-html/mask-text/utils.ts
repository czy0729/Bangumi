/*
 * @Author: czy0729
 * @Date: 2026-02-26 21:45:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-05 20:29:39
 */
import React from 'react'
import { IOS, MEIZU } from '@constants'
import EmojiText from '../emoji-text'

import type { ReactElement } from 'react'
import type { ReactNode, TextStyle } from '@types'

export const MASK_BACKGROUND_COLOR = '#555'

export const MASK_TEXT_COLOR = '#fff'

export function getMaskTextStyle(show: boolean): TextStyle {
  return {
    color: show ? MASK_TEXT_COLOR : MASK_BACKGROUND_COLOR,
    ...(!show && {
      opacity: IOS ? 1 : 0
    })
  }
}

export function maskRichText(children: ReactNode, show: boolean): ReactNode {
  return maskChildren(children, show, getMaskTextStyle(show))
}

/** 元素 props 的可访问字段 */
type ElementProps = {
  style?: TextStyle
  onPress?: unknown
  children?: ReactNode
}

function maskChildren(children: ReactNode, show: boolean, style: TextStyle): ReactNode {
  if (children == null || typeof children === 'boolean') return children

  if (typeof children === 'string' || typeof children === 'number') {
    // 魅族 Flyme 强制深色/高对比度会把同色遮盖的文字重绘提亮导致剧透字现形,
    // 隐藏态参照 EmojiText 的处理, 替换成等长全角空格, 原文不进渲染树
    if (!show && MEIZU) return '　'.repeat(String(children).length)

    return children
  }

  if (Array.isArray(children))
    return (children as ReactNode[]).map(item => maskChildren(item, show, style))

  if (React.isValidElement(children)) {
    const element = children as ReactElement<ElementProps>
    const props = (element.props ?? {}) as ElementProps

    if (!show && element.type === EmojiText) {
      return '　'
    }

    const nextProps: {
      style?: unknown[]
      children?: ReactNode
      onPress?: undefined
    } = {}

    if (element.type !== React.Fragment) nextProps.style = [props.style, style]
    if (!show && props.onPress) nextProps.onPress = undefined
    if ('children' in props) nextProps.children = maskChildren(props.children, show, style)

    return React.cloneElement(element, nextProps as Record<string, unknown>)
  }

  return children
}
