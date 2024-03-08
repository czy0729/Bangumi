/*
 * @Author: czy0729
 * @Date: 2024-03-08 16:09:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-08 16:22:30
 */
import React from 'react'
import { Flex, Iconfont, Text, Touchable } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../../types'
import { styles } from './styles'

function Expand(props, { $ }: Ctx) {
  return (
    <Flex style={_.mt.md} justify='center'>
      <Touchable style={styles.touch} onPress={$.toggleTemples}>
        <Iconfont
          name={$.state.showTemples ? 'md-keyboard-arrow-up' : 'md-keyboard-arrow-down'}
          color={_.colorTinygrailText}
        />
      </Touchable>
      {$.state.showTemples && $.charaTemple.list.length > 6 && (
        <Text style={styles.text} type='tinygrailText' onPress={$.toggleExpand}>
          [{$.state.expand ? '收起' : '展开'}圣殿]
        </Text>
      )}
    </Flex>
  )
}

export default obc(Expand)
