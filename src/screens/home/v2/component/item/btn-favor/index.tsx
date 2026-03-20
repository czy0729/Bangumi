/*
 * @Author: czy0729
 * @Date: 2021-01-21 14:56:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 07:32:48
 */
import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import { Flex, Heatmap, Iconfont, Touchable } from '@components'
import { useStore } from '@stores'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../../types'
import type { Props } from './types'

function BtnFavor({ subjectId, name, name_cn, isFirst }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const handlePress = useCallback(() => {
    $.showManageModal(subjectId, {
      title: name_cn || name,
      desc: name
    })
  }, [$, name, name_cn, subjectId])

  return (
    <Touchable style={styles.touch} onPress={handlePress}>
      <Flex style={styles.btn} justify='center'>
        <Iconfont name='md-star-outline' size={19.5} />
      </Flex>
      {isFirst && <Heatmap id='首页.显示收藏管理' />}
    </Touchable>
  )
}

export default observer(BtnFavor)
