/*
 * @Author: czy0729
 * @Date: 2023-06-28 09:59:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-14 06:32:26
 */
import React from 'react'
import { Flex, Iconfont, Touchable } from '@components'
import { _ } from '@stores'
import { info } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../../../types'
import { styles } from './styles'

function Member(_props, { $ }: Ctx) {
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

export default obc(Member)
