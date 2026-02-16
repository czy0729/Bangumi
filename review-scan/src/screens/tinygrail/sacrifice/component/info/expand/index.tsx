/*
 * @Author: czy0729
 * @Date: 2024-03-07 06:39:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-19 16:11:21
 */
import React from 'react'
import { Flex, Iconfont, Touchable } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../../types'
import { styles } from './styles'

function Expand() {
  const { $ } = useStore<Ctx>()
  return (
    <Flex style={_.mt.sm} justify='center'>
      <Touchable onPress={$.toggleCover}>
        <Flex style={styles.expand} justify='center'>
          <Iconfont
            name={$.state.showCover ? 'md-keyboard-arrow-up' : 'md-keyboard-arrow-down'}
            color={_.colorTinygrailText}
          />
        </Flex>
      </Touchable>
    </Flex>
  )
}

export default ob(Expand)
