/*
 * @Author: czy0729
 * @Date: 2025-01-26 13:38:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-26 13:39:50
 */
import React, { useRef } from 'react'
import { View } from 'react-native'
import { Flex, Iconfont } from '@components'
import { _, uiStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { Popover } from '../../../base'
import { styles } from './styles'

function Menu({ data, avatar, userId, userName, comment, relatedId, onSelect }) {
  const viewRef = useRef(null)

  return useObserver(() => {
    return (
      <Popover
        style={styles.touch}
        data={data}
        onSelect={title => {
          const handleCallback = () => {
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
                uiStore.setXY(pageX, pageY)
                handleCallback()
              }
            )
            return
          }

          handleCallback()
        }}
      >
        <View ref={viewRef}>
          <Flex style={styles.icon} justify='center'>
            <Iconfont style={_.ml.md} name='md-more-vert' size={18} />
          </Flex>
        </View>
      </Popover>
    )
  })
}

export default Menu
