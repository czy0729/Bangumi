/*
 * @Author: czy0729
 * @Date: 2022-11-20 09:07:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-21 07:39:52
 */
import React from 'react'
import { Flex, Iconfont, Touchable } from '@components'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../../../types'
import { COMPONENT } from './ds'
import { styles } from './styles'

function BookNextBtn({ subjectId, epStatus, volStatus }) {
  const { $ } = useStore<Ctx>()
  return (
    <Touchable
      style={styles.touchable}
      onPress={() => $.doUpdateNext(subjectId, epStatus, volStatus)}
    >
      <Flex justify='center'>
        <Iconfont style={styles.icon} name='md-check-circle-outline' size={18} />
      </Flex>
    </Touchable>
  )
}

export default ob(BookNextBtn, COMPONENT)
