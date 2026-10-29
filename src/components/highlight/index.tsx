/*
 * @Author: czy0729
 * @Date: 2022-07-30 17:33:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-29 00:00:00
 */
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { t2s as t2sUtils } from '@utils'
import { r } from '@utils/dev'
import { Text } from '../text'
import { COMPONENT } from './ds'

import type { Props as HighlightProps } from './types'
export type { HighlightProps }

/** 多关键词: 按命中区间切分文本片段 */
function splitByValues(text: string, values: string[]) {
  const upperText = text.toLocaleUpperCase()
  const ranges: [number, number][] = []

  values.forEach(value => {
    let index = upperText.indexOf(value)
    while (index !== -1) {
      ranges.push([index, index + value.length])
      index = upperText.indexOf(value, index + value.length)
    }
  })

  const segments: { text: string; hit: boolean }[] = []
  let cursor = 0
  ranges
    .sort((a, b) => a[0] - b[0])
    .forEach(([start, end]) => {
      if (end <= cursor) return

      if (start > cursor) segments.push({ text: text.slice(cursor, start), hit: false })

      segments.push({ text: text.slice(Math.max(start, cursor), end), hit: true })
      cursor = end
    })
  if (cursor < text.length) segments.push({ text: text.slice(cursor), hit: false })

  return segments
}

/** 文字高亮 */
export const Highlight = observer(
  ({
    style,
    value = '',
    type,
    size,
    lineHeight,
    bold,
    t2s = true,
    children,
    ...other
  }: HighlightProps) => {
    r(COMPONENT)

    const props = {
      size,
      lineHeight,
      bold
    }
    const values = (Array.isArray(value) ? value : [value]).filter(
      item => typeof item === 'string' && !!item.trim()
    )
    if (typeof children !== 'string' || !values.length) {
      return (
        <Text style={style} type={type} {...props} {...other}>
          {children}
        </Text>
      )
    }

    // 多关键词: 逐个标出所有命中位置
    if (typeof value !== 'string') {
      const segments = splitByValues(
        children,
        values.map(item => {
          const keyword = item.toLocaleUpperCase()
          return (t2s ? t2sUtils(keyword) : keyword).trim()
        })
      )
      if (!segments.length) {
        return (
          <Text style={style} type={type} {...props} {...other}>
            {children}
          </Text>
        )
      }

      return (
        <Text style={style} {...props} {...other}>
          {segments.map((segment, index) => (
            <Text
              key={`${index}-${segment.hit}`}
              type={segment.hit ? _.select('main', 'warning') : type}
              {...props}
            >
              {segment.text}
            </Text>
          ))}
        </Text>
      )
    }

    const _value = t2s
      ? t2sUtils(value.toLocaleUpperCase()).trim()
      : value.toLocaleUpperCase().trim()
    const index = children.toLocaleUpperCase().indexOf(_value)
    if (index === -1) {
      return (
        <Text style={style} type={type} {...props} {...other}>
          {children}
        </Text>
      )
    }

    const left = children.slice(0, index)
    const middle = children.slice(index, index + _value.length)
    const right = children.slice(index + _value.length)
    return (
      <Text style={style} {...props} {...other}>
        {!!left && (
          <Text type={type} {...props}>
            {left}
          </Text>
        )}
        {!!middle && (
          <Text type={_.select('main', 'warning')} {...props}>
            {middle}
          </Text>
        )}
        {!!right && (
          <Text type={type} {...props}>
            {right}
          </Text>
        )}
      </Text>
    )
  }
)

export default Highlight
