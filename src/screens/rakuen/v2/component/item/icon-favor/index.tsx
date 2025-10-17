/*
 * @Author: czy0729
 * @Date: 2021-01-21 19:41:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-17 11:52:35
 */
import React from 'react'
import { Iconfont } from '@components'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { styles } from './styles'

import type { Ctx } from '../../../types'
import type { Props } from './types'

function IconFavor({ topicId }: Props) {
  const { $ } = useStore<Ctx>()

  return useObserver(() => {
    if (!$.isFavor(topicId)) return null

    return <Iconfont style={styles.icon} size={14} name='md-star' color={_.colorYellow} />
  })
}

export default IconFavor
