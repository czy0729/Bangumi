/*
 * 文字高亮
 * @Author: czy0729
 * @Date: 2022-07-30 17:33:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-23 05:02:46
 */
import React from 'react'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { t2s as t2sUtils } from '@utils'
import { Text } from '../text'
import { Props as HighlightProps } from './types'

export { HighlightProps }

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
    const props = {
      size,
      lineHeight,
      bold
    }
    if (typeof children !== 'string' || !value || typeof value !== 'string') {
      return (
        <Text style={style} type={type} {...props} {...other}>
          {children}
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
