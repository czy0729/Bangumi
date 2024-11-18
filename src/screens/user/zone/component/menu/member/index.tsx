/*
 * @Author: czy0729
 * @Date: 2023-06-28 09:59:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 08:04:50
 */
import React from 'react'
import { Flex, Iconfont, Touchable } from '@components'
import { _, useStore } from '@stores'
import { info } from '@utils'
import { ob } from '@utils/decorators'
import { Ctx } from '../../../types'
import { styles } from './styles'

function Member() {
  const { $ } = useStore<Ctx>()
  if (!$.isAdvance) return null

  return (
    <Touchable
      onPress={() => info(`TA 也是高级会员${$.advanceDetail ? ` ${$.advanceDetail}` : ''}`)}
    >
      <Flex style={styles.icon} justify='center'>
        <Iconfont name='md-attach-money' color={_.__colorPlain__} />
      </Flex>
    </Touchable>
  )
}

export default ob(Member)
