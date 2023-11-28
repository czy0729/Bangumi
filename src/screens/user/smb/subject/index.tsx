/*
 * @Author: czy0729
 * @Date: 2023-11-24 16:11:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-29 03:04:00
 */
import React from 'react'
import { Flex, Text } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import Title from './title'
import Bottom from './bottom'
import Manage from './manage'
import { Ctx } from '../types'

function Subject({ subjectId }, { $ }: Ctx) {
  if (!subjectId) return null

  const { jp, cn, eps = 0, rank, rating } = $.subjectV2(subjectId)
  return (
    <Flex align='start'>
      <Flex.Item>
        <Title name={jp} nameCn={cn} />
        <Text style={_.mt.sm} size={11} bold numberOfLines={2}>
          {!!eps && `${eps}话 / `}
          {$.airDate(subjectId) || '-'}
        </Text>
        <Bottom rank={rank} rating={rating} />
      </Flex.Item>
      <Manage subjectId={subjectId} />
    </Flex>
  )
}

export default obc(Subject)
