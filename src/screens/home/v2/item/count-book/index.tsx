/*
 * @Author: czy0729
 * @Date: 2021-01-21 15:08:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-15 17:53:07
 */
import React from 'react'
import { Flex, Heatmap, Text } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import BtnBookNext from '../btn-book-next'
import { Props } from './types'

function CountBook({ subjectId, isFirst }: Props, { $ }: Ctx) {
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
      <BtnBookNext
        subjectId={subjectId}
        epStatus={epStatus + 1}
        volStatus={volStatus}
      />
      <Text style={_.device(_.ml.sm, _.ml.md)} type='primary' size={16}>
        <Text type='primary' size={10} lineHeight={16}>
          Vol.{' '}
        </Text>
        {volStatus}
      </Text>
      <BtnBookNext
        subjectId={subjectId}
        epStatus={epStatus}
        volStatus={volStatus + 1}
      />
      {isFirst && <Heatmap right={40} id='首页.更新书籍下一个章节' />}
    </Flex>
  )
}

export default obc(CountBook)
