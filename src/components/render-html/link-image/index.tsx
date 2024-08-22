/*
 * @Author: czy0729
 * @Date: 2024-08-22 15:23:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-22 15:39:29
 */
import React from 'react'
import { observer } from 'mobx-react'
import { open, stl } from '@utils'
import { Text } from '../../text'
import { Touchable } from '../../touchable'
import { styles } from './styles'

function LinkImage({ style, src }) {
  return (
    <Touchable
      style={stl(styles.img, style)}
      onPress={() => {
        open(src)
      }}
    >
      <Text type='sub' numberOfLines={2} underline>
        [图片] {src}
      </Text>
    </Touchable>
  )
}

export default observer(LinkImage)
