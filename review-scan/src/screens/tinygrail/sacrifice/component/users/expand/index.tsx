/*
 * @Author: czy0729
 * @Date: 2024-03-08 18:04:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 16:20:45
 */
import React from 'react'
import { Flex, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../../types'
import { styles } from './styles'

function Expand() {
  const { $ } = useStore<Ctx>()
  return (
    <Flex style={_.mt.md} justify='center'>
      <Touchable style={styles.expand} onPress={$.toggleUsers}>
        <Text type='tinygrailText'>[{$.state.showUsers ? '隐藏' : '显示'}板块]</Text>
      </Touchable>
    </Flex>
  )
}

export default ob(Expand)
