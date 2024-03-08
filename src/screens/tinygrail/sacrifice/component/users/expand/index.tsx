/*
 * @Author: czy0729
 * @Date: 2024-03-08 18:04:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-08 18:06:04
 */
import React from 'react'
import { Flex, Iconfont, Touchable } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../../types'
import { styles } from './styles'

function Expand(props, { $ }: Ctx) {
  return (
    <Flex style={_.mt.md} justify='center'>
      <Touchable style={styles.expand} onPress={$.toggleUsers}>
        <Iconfont
          name={$.state.showUsers ? 'md-keyboard-arrow-up' : 'md-keyboard-arrow-down'}
          color={_.colorTinygrailText}
        />
      </Touchable>
    </Flex>
  )
}

export default obc(Expand)
