/*
 * @Author: czy0729
 * @Date: 2022-11-20 09:07:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 07:20:07
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex, Iconfont, Touchable } from '@components'
import { useStore } from '@stores'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../../../types'
import type { Props } from './types'

function BookNextBtn({ subjectId, epStatus, volStatus }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  return (
    <Touchable
      style={styles.touchable}
      onPress={() => {
        $.doUpdateNext(subjectId, epStatus, volStatus)
      }}
    >
      <Flex justify='center'>
        <Iconfont style={styles.icon} name='md-check-circle-outline' size={18} />
      </Flex>
    </Touchable>
  )
}

export default observer(BookNextBtn)
