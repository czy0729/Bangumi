/*
 * @Author: czy0729
 * @Date: 2024-08-22 15:23:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-17 11:04:17
 */
import React from 'react'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { open, stl } from '@utils'
import Flex from '../../flex'
import { Iconfont } from '../../iconfont'
import { Text } from '../../text'
import { Touchable } from '../../touchable'
import { memoStyles } from './styles'

function LinkImage({ style, src }) {
  if (typeof src !== 'string') return null

  const styles = memoStyles()
  const ext = src.includes('.jpg')
    ? 'JPG'
    : src.includes('.png')
    ? 'PNG'
    : src.includes('.gif')
    ? 'GIF'
    : 'IMG'

  return (
    <Touchable
      style={stl(style, styles.img)}
      onPress={() => {
        open(src)
      }}
    >
      <Flex style={styles.content}>
        <Flex.Item>
          <Text type='sub' size={12} numberOfLines={1}>
            [{ext}] {src}
          </Text>
        </Flex.Item>
        <Iconfont style={_.ml.xs} name='md-open-in-new' size={16} />
      </Flex>
    </Touchable>
  )
}

export default observer(LinkImage)
