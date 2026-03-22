/*
 * @Author: czy0729
 * @Date: 2023-06-28 09:59:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-22 06:42:24
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex, Iconfont, Touchable } from '@components'
import { _, useStore } from '@stores'
import { info } from '@utils'
import { styles } from './styles'

import type { Ctx } from '../../../types'

function Member() {
  const { $ } = useStore<Ctx>()

  if (!$.isAdvance) return null

  return (
    <Touchable
      onPress={() => info(`TA 也是高级会员${$.advanceDetail ? ` ${$.advanceDetail}` : ''}`)}
    >
      <Flex style={styles.icon} justify='center'>
        <Iconfont name='md-attach-money' color={_.__colorPlain__} shadow />
      </Flex>
    </Touchable>
  )
}

export default observer(Member)
