/*
 * @Author: czy0729
 * @Date: 2021-01-21 19:41:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 03:25:16
 */
import React from 'react'
import { Iconfont } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../../types'
import { styles } from './styles'

function IconFavor({ topicId }) {
  const { $ } = useStore<Ctx>()
  if (!$.isFavor(topicId)) return null

  return <Iconfont style={styles.icon} size={14} name='md-star' color={_.colorYellow} />
}

export default ob(IconFavor)
