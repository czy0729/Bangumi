/*
 * @Author: czy0729
 * @Date: 2021-01-21 14:29:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 07:31:43
 */
import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import { Flex, Iconfont, Touchable } from '@components'
import { useStore } from '@stores'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../../types'
import type { Props } from './types'

function BtnBookNext({ subjectId, epStatus, volStatus }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const handlePress = useCallback(() => {
    $.doUpdateNext(subjectId, epStatus, volStatus)
  }, [$, epStatus, subjectId, volStatus])

  return (
    <Touchable style={styles.touch} onPress={handlePress}>
      <Flex style={styles.btn} justify='center'>
        <Iconfont style={styles.icon} name='md-check-circle-outline' size={18} />
      </Flex>
    </Touchable>
  )
}

export default observer(BtnBookNext)
