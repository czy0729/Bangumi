/*
 * @Author: czy0729
 * @Date: 2021-01-21 14:29:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-25 14:45:05
 */
import React from 'react'
import { Flex, Iconfont, Touchable } from '@components'
import { obc } from '@utils/decorators'
import { Ctx } from '../../../types'
import { COMPONENT } from './ds'
import { styles } from './styles'

function BtnBookNext({ subjectId, epStatus, volStatus }, { $ }: Ctx) {
  return (
    <Touchable style={styles.touch} onPress={() => $.doUpdateNext(subjectId, epStatus, volStatus)}>
      <Flex style={styles.btn} justify='center'>
        <Iconfont style={styles.icon} name='md-check-circle-outline' size={18} />
      </Flex>
    </Touchable>
  )
}

export default obc(BtnBookNext, COMPONENT)
