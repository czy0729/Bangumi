/*
 * @Author: czy0729
 * @Date: 2023-11-24 16:11:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 07:30:56
 */
import React from 'react'
import { Flex, Text } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import Bottom from './bottom'
import Manage from './manage'
import Title from './title'
import { COMPONENT } from './ds'

function Subject({ subjectId }) {
  const { $ } = useStore<Ctx>()
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

export default ob(Subject, COMPONENT)
