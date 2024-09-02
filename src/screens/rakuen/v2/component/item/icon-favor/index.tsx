/*
 * @Author: czy0729
 * @Date: 2021-01-21 19:41:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-02 12:47:51
 */
import React from 'react'
import { Iconfont } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../../types'
import { styles } from './styles'

function IconFavor({ topicId }, { $ }: Ctx) {
  if (!$.isFavor(topicId)) return null

  return <Iconfont style={styles.icon} size={14} name='md-star' color={_.colorYellow} />
}

export default obc(IconFavor)
