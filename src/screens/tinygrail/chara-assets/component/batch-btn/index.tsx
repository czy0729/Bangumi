/*
 * @Author: czy0729
 * @Date: 2024-03-05 03:03:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-05 03:10:31
 */
import React from 'react'
import { Flex, Iconfont, Touchable } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { styles } from './styles'

function BatchBtn(props, { $ }: Ctx) {
  if (!$.state.editing) return null

  return (
    $.state.editing && (
      <Touchable onPress={$.increaseBatchSelect}>
        <Flex style={styles.check}>
          <Iconfont name='md-done-all' size={16} color={_.colorTinygrailText} />
        </Flex>
      </Touchable>
    )
  )
}

export default obc(BatchBtn, COMPONENT)
