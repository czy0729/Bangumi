/*
 * @Author: czy0729
 * @Date: 2021-01-21 19:41:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-22 02:58:55
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Iconfont } from '@components'
import { _, useStore } from '@stores'
import { memoStyles } from './styles'

import type { Ctx } from '../../../types'
import type { Props } from './types'

function IconFavor({ topicId }: Props) {
  const { $ } = useStore<Ctx>()

  if (!$.isFavor(topicId)) return null

  const styles = memoStyles()

  return <Iconfont style={styles.icon} size={14} name='md-star' color={_.colorYellow} />
}

export default observer(IconFavor)
