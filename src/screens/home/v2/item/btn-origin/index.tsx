/*
 * @Author: czy0729
 * @Date: 2021-01-21 14:49:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-25 10:39:03
 */
import React from 'react'
import { Flex, Heatmap, Iconfont } from '@components'
import { Popover } from '@_'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { styles } from './styles'
import { Props } from './types'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectTypeCn } from '@types'

function BtnOrigin({ subjectId, isTop = false }: Props, { $ }: Ctx) {
  if ($.homeOrigin === -1) return null

  const origins: string[] = [...$.actions(subjectId).map(item => item.name)]
  if ($.homeOrigin === true) {
    origins.push(
      ...$.onlineOrigins(subjectId).map(item =>
        typeof item === 'object' ? item.name : item
      )
    )
  }

  const subject = $.subject(subjectId)
  const title = MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(subject.type)
  const data = [...origins, isTop ? '取消置顶' : '置顶']

  if (['动画', '三次元'].includes(title)) {
    data.push('全部展开', '全部收起')

    // 条目非 SP 章节有未播才显示此选项
    if (
      subject?.eps?.length &&
      subject.eps.some(item => item.type === 0 && item.status === 'NA')
    ) {
      data.push('一键添加提醒')
    }
  }

  return (
    <Popover
      key={subjectId}
      style={styles.touch}
      data={data}
      onSelect={(label: string) => {
        $.onPopover(label, subjectId)
      }}
    >
      <Flex style={styles.btn} justify='center'>
        <Iconfont
          style={styles.icon}
          name={origins.length ? 'md-airplay' : 'md-menu'}
          size={origins.length ? 17 : 21}
        />
      </Flex>
      <Heatmap right={55} bottom={-7} id='首页.搜索源' />
    </Popover>
  )
}

export default obc(BtnOrigin)
