/*
 * @Author: czy0729
 * @Date: 2021-01-21 14:56:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-20 07:40:55
 */
import React from 'react'
import { Flex, Heatmap, Iconfont, Touchable } from '@components'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { SubjectId } from '@types'
import { Ctx } from '../../../types'
import { COMPONENT } from './ds'
import { styles } from './styles'

function BtnFavor({
  subjectId,
  name,
  name_cn,
  isFirst
}: {
  subjectId: SubjectId
  name: string
  name_cn: string
  isFirst: boolean
}) {
  const { $ } = useStore<Ctx>()
  return (
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
  )
}

export default ob(BtnFavor, COMPONENT)
