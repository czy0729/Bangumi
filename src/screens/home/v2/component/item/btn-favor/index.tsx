/*
 * @Author: czy0729
 * @Date: 2021-01-21 14:56:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-25 14:46:16
 */
import React from 'react'
import { Flex, Heatmap, Iconfont, Touchable } from '@components'
import { obc } from '@utils/decorators'
import { Ctx } from '../../../types'
import { COMPONENT } from './ds'
import { styles } from './styles'

function BtnFavor({ subjectId, subject, isFirst }, { $ }: Ctx) {
  return (
    <Touchable
      style={styles.touch}
      onPress={() =>
        $.showManageModal(subjectId, {
          title: subject.name_cn || subject.name,
          desc: subject.name
        })
      }
    >
      <Flex style={styles.btn} justify='center'>
        <Iconfont name='md-star-outline' size={19.5} />
      </Flex>
      {isFirst && <Heatmap id='首页.显示收藏管理' />}
    </Touchable>
  )
}

export default obc(BtnFavor, COMPONENT)
