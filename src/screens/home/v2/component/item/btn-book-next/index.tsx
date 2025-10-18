/*
 * @Author: czy0729
 * @Date: 2021-01-21 14:29:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-08 06:08:12
 */
import React from 'react'
import { Flex, Iconfont, Touchable } from '@components'
import { useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../../types'
import type { Props } from './types'

function BtnBookNext({ subjectId, epStatus, volStatus }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => (
    <Touchable
      style={styles.touch}
      onPress={() => {
        $.doUpdateNext(subjectId, epStatus, volStatus)
      }}
    >
      <Flex style={styles.btn} justify='center'>
        <Iconfont style={styles.icon} name='md-check-circle-outline' size={18} />
      </Flex>
    </Touchable>
  ))
}

export default BtnBookNext
