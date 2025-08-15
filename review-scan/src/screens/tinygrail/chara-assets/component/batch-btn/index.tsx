/*
 * @Author: czy0729
 * @Date: 2024-03-05 03:03:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-24 20:27:15
 */
import React from 'react'
import { Flex, Iconfont, Touchable } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { styles } from './styles'

function BatchBtn() {
  const { $ } = useStore<Ctx>()
  if (!$.state.editing) return null

  return (
    <Touchable onPress={$.increaseBatchSelect}>
      <Flex style={styles.check}>
        <Iconfont name='md-done-all' size={16} color={_.colorTinygrailText} />
      </Flex>
    </Touchable>
  )
}

export default ob(BatchBtn, COMPONENT)
