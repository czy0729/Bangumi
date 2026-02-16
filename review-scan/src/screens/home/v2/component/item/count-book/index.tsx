/*
 * @Author: czy0729
 * @Date: 2021-01-21 15:08:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-20 07:44:56
 */
import React from 'react'
import { Flex, Heatmap, Text } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { SubjectId } from '@types'
import { Ctx } from '../../../types'
import BtnBookNext from '../btn-book-next'
import { COMPONENT } from './ds'

function CountBook({ subjectId, isFirst }: { subjectId: SubjectId; isFirst: boolean }) {
  const { $ } = useStore<Ctx>()
  const { list = [] } = $.collection
  const { ep_status: epStatus, vol_status: volStatus } =
    list.find(item => item.subject_id === subjectId) || {}

  const subject = $.subject(subjectId)
  const chap = subject.eps_count || 0
  return (
    <Flex>
      <Text type='primary' size={16}>
        <Text type='primary' size={10} lineHeight={16}>
          Chap.{' '}
        </Text>
        {epStatus}
        {!!chap && (
          <Text type='sub' size={12} lineHeight={16}>
            {' '}
            / {chap}
          </Text>
        )}
      </Text>
      <BtnBookNext subjectId={subjectId} epStatus={epStatus + 1} volStatus={volStatus} />
      <Text style={_.device(_.ml.sm, _.ml.md)} type='primary' size={16}>
        <Text type='primary' size={10} lineHeight={16}>
          Vol.{' '}
        </Text>
        {volStatus}
      </Text>
      <BtnBookNext subjectId={subjectId} epStatus={epStatus} volStatus={volStatus + 1} />
      {isFirst && <Heatmap right={40} id='首页.更新书籍下一个章节' />}
    </Flex>
  )
}

export default ob(CountBook, COMPONENT)
