/*
 * @Author: czy0729
 * @Date: 2022-07-30 17:33:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-30 18:10:29
 */
import React from 'react'
import { observer } from 'mobx-react'
import { t2s } from '@utils'
import { Text } from '../text'
import { Props as HighlightProps } from './types'

export { HighlightProps }

export const Highlight = observer(
  ({ style, value = '', type, size, lineHeight, bold, children, ...other }) => {
    if (typeof children !== 'string' || !value) {
      return (
        <Text style={style} type={type} {...other}>
          {children}
        </Text>
      )
    }

    const _value = t2s(value.toLocaleUpperCase()).trim()
    const index = children.toLocaleUpperCase().indexOf(_value)
    if (index === -1) {
      return (
        <Text style={style} type={type} {...other}>
          {children}
        </Text>
      )
    }

    const props = {
      size,
      lineHeight,
      bold
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
          <Text type='main' {...props}>
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
