/*
 * @Author: czy0729
 * @Date: 2022-11-20 09:07:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-21 07:39:52
 */
import React from 'react'
import { Flex, Touchable, Iconfont } from '@components'
import { obc } from '@utils/decorators'
import { rerender } from '@utils/dev'
import { Ctx } from '../../types'
import { styles } from './styles'

function BookNextBtn({ subjectId, epStatus, volStatus }, { $ }: Ctx) {
  rerender('Home.GridInfo.BookNextBtn')

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

export default obc(BookNextBtn)
