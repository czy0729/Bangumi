/*
 * @Author: czy0729
 * @Date: 2023-04-12 08:13:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 22:36:20
 */
import React from 'react'
import { observer } from 'mobx-react'
import { stl } from '@utils'
import { Flex } from '../../flex'
import { Iconfont } from '../../iconfont'
import { memoStyles } from './styles'

import type { Props } from './types'

function Error({ style, size }: Props) {
  const styles = memoStyles()

  return (
    <Flex style={stl(style, styles.error)} justify='center'>
      <Iconfont
        style={styles.icon}
        name='md-do-not-disturb-alt'
        size={Math.min((size || 80) / 2.4, 80)}
      />
    </Flex>
  )
}

export default observer(Error)
