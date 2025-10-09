/*
 * @Author: czy0729
 * @Date: 2021-01-21 14:56:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-09 05:18:14
 */
import React from 'react'
import { Flex, Heatmap, Iconfont, Touchable } from '@components'
import { useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { Ctx } from '../../../types'
import { COMPONENT } from './ds'
import { styles } from './styles'
import { Props } from './types'

function BtnFavor({ subjectId, name, name_cn, isFirst }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => (
    <Touchable
      style={styles.touch}
      onPress={() => {
        $.showManageModal(subjectId, {
          title: name_cn || name,
          desc: name
        })
      }}
    >
      <Flex style={styles.btn} justify='center'>
        <Iconfont name='md-star-outline' size={19.5} />
      </Flex>
      {isFirst && <Heatmap id='首页.显示收藏管理' />}
    </Touchable>
  ))
}

export default BtnFavor
