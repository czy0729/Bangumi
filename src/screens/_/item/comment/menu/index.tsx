/*
 * @Author: czy0729
 * @Date: 2025-01-26 13:38:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 23:57:56
 */
import React, { useCallback, useRef } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Iconfont } from '@components'
import { _, uiStore } from '@stores'
import { IOS } from '@constants'
import { Popover } from '../../../base'
import { styles } from './styles'

import type { Props } from './types'

function Menu({ data, avatar, userId, userName, comment, relatedId, onSelect }: Props) {
  const viewRef = useRef<View>(null)

  const handleSelect = useCallback(
    (title: string) => {
      const callback = () => {
        onSelect(
          title,
          {
            avatar,
            userId,
            userName
          },
          comment,
          relatedId
        )
      }

      if (title === '贴贴') {
        viewRef.current.measure(
          (_x: any, _y: any, _width: any, _height: any, pageX: number, pageY: number) => {
            uiStore.setXY(pageX, pageY - (IOS ? 0 : 12))
            callback()
          }
        )
        return
      }

      callback()
    },
    [avatar, comment, onSelect, relatedId, userId, userName]
  )

  return (
    <Popover style={styles.touch} data={data} onSelect={handleSelect}>
      <View ref={viewRef} collapsable={false}>
        <Flex style={styles.icon} justify='center'>
          <Iconfont style={_.ml.md} name='md-more-vert' size={18} />
        </Flex>
      </View>
    </Popover>
  )
}

export default observer(Menu)
