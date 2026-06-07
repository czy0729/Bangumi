/*
 * @Author: czy0729
 * @Date: 2026-02-26 21:45:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-07 21:25:09
 */
import React from 'react'
import EmojiText from '../emoji-text'

import type { ReactElement } from 'react'
import type { ReactNode, TextStyle } from '@types'

export const MASK_BACKGROUND_COLOR = '#555'
export const MASK_TEXT_COLOR = '#fff'

export function getMaskTextStyle(show: boolean): TextStyle {
  return {
    color: show ? MASK_TEXT_COLOR : MASK_BACKGROUND_COLOR,
    ...(!show && {
      opacity: 0
    })
  }
}

export function maskRichText(children: ReactNode, show: boolean): ReactNode {
  return maskChildren(children, show, getMaskTextStyle(show))
}

function maskChildren(children: ReactNode, show: boolean, style: TextStyle): ReactNode {
  if (children == null || typeof children === 'boolean') return children

  if (typeof children === 'string' || typeof children === 'number') return children

  if (Array.isArray(children)) return children.map(item => maskChildren(item, show, style))

  if (React.isValidElement(children)) {
    const element = children as ReactElement<any>
    const props = element.props || {}

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

    return React.cloneElement(element, nextProps)
  }

  return children
}
