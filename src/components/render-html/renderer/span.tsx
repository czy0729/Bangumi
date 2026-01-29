/*
 * @Author: czy0729
 * @Date: 2024-08-14 07:18:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-16 23:12:31
 */
import React from 'react'
import { logger } from '@utils/dev'
import { SPAN_MARK } from '../ds'
import { BgmText } from '../../bgm-text'
import HiddenText from '../hidden-text'
import LineThroughtText from '../line-throught-text'
import MaskText from '../mask-text'
import TagText from '../tag-text'
import { fixedBaseFontStyle } from '../utils'

import type { TextStyle } from '@types'
export function span({
  key,
  style,
  className,
  defaultBaseFontStyle,
  baseFontStyle,
  rawChildren,
  children
}) {
  if (typeof style === 'string' && style.includes('font-size:0px')) return null

  try {
    // 暂时没有对样式混合情况作出正确判断, 以重要程度优先(剧透 > 删除 > 隐藏 > 其他)
    // 防剧透字
    if (style.includes(SPAN_MARK.mask)) {
      const text = []
      const target = rawChildren?.[0]
      if (target) {
        if (target?.children) {
          // 防剧透字中有表情
          target?.children?.forEach((item: { data: any; children: any[] }, index: number) => {
            if (item.data) {
              // 文字
              text.push(item.data)
            } else if (item.children) {
              const _baseFontStyle: TextStyle = fixedBaseFontStyle(baseFontStyle)
              item.children.forEach((i, idx) => {
                // 表情
                text.push(
                  <BgmText
                    key={`${index}-${idx}`}
                    size={_baseFontStyle.fontSize}
                    lineHeight={_baseFontStyle.lineHeight}
                  >
                    {i.data}
                  </BgmText>
                )
              })
            }
          })
        } else {
          // 防剧透字中没表情
          text.push(target?.data)
        }
      }

      return (
        <MaskText
          style={{
            ...defaultBaseFontStyle,
            ...baseFontStyle
          }}
        >
          {text}
        </MaskText>
      )
    }

    // 删除字
    if (style.includes(SPAN_MARK.lineThrough)) {
      const target = rawChildren?.[0]
      const text = target?.parent?.children?.[0]?.data || target?.children?.[0]?.data || ''
      return (
        <LineThroughtText
          key={key}
          style={{
            ...defaultBaseFontStyle,
            ...baseFontStyle
          }}
        >
          {text}
        </LineThroughtText>
      )
    }

    // 隐藏字
    if (style.includes(SPAN_MARK.hidden)) {
      const target = rawChildren?.[0]
      const text = target?.data || ''
      return (
        <HiddenText
          key={key}
          style={{
            ...defaultBaseFontStyle,
            ...baseFontStyle
          }}
        >
          {text}
        </HiddenText>
      )
    }

    // 标签样式
    if (className?.includes('tag')) {
      const target = rawChildren?.[0]
      const text = target?.data || ''
      return (
        <TagText
          key={key}
          style={{
            ...defaultBaseFontStyle,
            ...baseFontStyle
          }}
        >
          {text}
        </TagText>
      )
    }
  } catch (error) {
    logger.info('RenderHtml', 'generateConfig', error)
  }

  return children
}
