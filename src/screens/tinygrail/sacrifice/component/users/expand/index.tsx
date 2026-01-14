/*
 * @Author: czy0729
 * @Date: 2024-03-08 18:04:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-14 08:20:51
 */
import React from 'react'
import { Flex, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { styles } from './styles'

import type { Ctx } from '../../../types'

function Expand() {
  const { $ } = useStore<Ctx>()

  return useObserver(() => (
    <Flex style={_.mt.md} justify='center'>
      <Touchable style={styles.expand} onPress={$.toggleUsers}>
        <Text type='tinygrailText'>[{$.state.showUsers ? '隐藏' : '显示'}板块]</Text>
      </Touchable>
    </Flex>
  ))
}

export default Expand
