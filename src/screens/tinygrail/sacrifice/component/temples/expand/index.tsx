/*
 * @Author: czy0729
 * @Date: 2024-03-08 16:09:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 16:20:18
 */
import React from 'react'
import { Flex, Iconfont, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../../types'
import { styles } from './styles'

function Expand() {
  const { $ } = useStore<Ctx>()
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

export default ob(Expand)
