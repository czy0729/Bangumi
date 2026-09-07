/*
 * @Author: czy0729
 * @Date: 2022-05-13 05:12:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-07 03:00:00
 *
 * html 中的 a 标签, 按设置渲染成媒体块或文字链接
 */
import React from 'react'
import { observer } from 'mobx-react'
import { WEB } from '@constants'
import { Text } from '../../text'
import { useA } from './hooks'
import { filterChildren, isToggleImage } from './utils'
import { LINK_PRESS_DELAY } from './ds'

import type { Props } from './types'

function A({ style, attrs = {}, passProps, children, onPress, ...other }: Props) {
  const { el, onLinkPress } = useA({ style, attrs, passProps, onPress })

  if (el) return el

  const childrens = React.Children.toArray(children)
  if (isToggleImage(childrens)) return childrens[0] as React.ReactElement

  return (
    <Text
      style={style}
      underline={!WEB}
      {...other}
      onPress={
        typeof onPress === 'function'
          ? () => {
              setTimeout(onLinkPress, LINK_PRESS_DELAY)
            }
          : undefined
      }
    >
      {filterChildren(childrens)}
    </Text>
  )
}

export default observer(A)
