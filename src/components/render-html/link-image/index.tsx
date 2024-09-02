/*
 * @Author: czy0729
 * @Date: 2024-08-22 15:23:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-02 16:10:01
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
    ? 'jpg'
    : src.includes('.png')
    ? 'png'
    : src.includes('.gif')
    ? 'gif'
    : 'img'
  return (
    <Touchable
      style={stl(style, styles.img)}
      onPress={() => {
        open(src)
      }}
    >
      <Flex>
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
