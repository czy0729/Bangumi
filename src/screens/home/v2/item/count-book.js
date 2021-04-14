/*
 * @Author: czy0729
 * @Date: 2021-01-21 15:08:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-21 15:17:20
 */
import React from 'react'
import { Flex, Heatmap, Text } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import BtnBookNext from './btn-book-next'

function CountBook({ index, subjectId }, { $ }) {
  const { list = [] } = $.userCollection
  const { ep_status: epStatus, vol_status: volStatus } = list.find(
    item => item.subject_id === subjectId
  )
  return (
    <Flex>
      <Text type='primary' size={20}>
        <Text type='primary' size={12} lineHeight={20}>
          Chap.{' '}
        </Text>
        {epStatus}
      </Text>
      <BtnBookNext
        subjectId={subjectId}
        epStatus={epStatus + 1}
        volStatus={volStatus}
      />
      <Text style={_.ml.sm} type='primary' size={20}>
        <Text type='primary' size={12} lineHeight={20}>
          Vol.{' '}
        </Text>
        {volStatus}
      </Text>
      <BtnBookNext
        subjectId={subjectId}
        epStatus={epStatus}
        volStatus={volStatus + 1}
      />
      {index === 1 && <Heatmap right={40} id='首页.更新书籍下一个章节' />}
    </Flex>
  )
}

export default obc(CountBook)
