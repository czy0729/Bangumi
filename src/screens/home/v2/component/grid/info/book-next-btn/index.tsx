/*
 * @Author: czy0729
 * @Date: 2022-11-20 09:07:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-07 21:13:55
 */
import React from 'react'
import { Flex, Iconfont, Touchable } from '@components'
import { useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { Ctx } from '../../../../types'
import { COMPONENT } from './ds'
import { styles } from './styles'
import { Props } from './types'

function BookNextBtn({ subjectId, epStatus, volStatus }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => (
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
  ))
}

export default BookNextBtn
