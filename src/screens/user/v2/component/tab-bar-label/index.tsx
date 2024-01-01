/*
 * @Author: czy0729
 * @Date: 2021-11-27 17:23:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-01 11:41:48
 */
import React from 'react'
import { Flex, Text } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectTypeCn } from '@types'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { Props } from './types'

function TabBarLabel({ style, title, focused }: Props, { $ }: Ctx) {
  const { subjectType } = $.state
  const count: number = $.counts[MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(subjectType)][title]
  return (
    <Flex style={style || _.container.block} justify='center' align='start'>
      <Text type='title' size={13} bold={focused} noWrap>
        {title.replace('看', $.action)}
      </Text>
      {!!count && (
        <Text type='sub' size={10} lineHeight={11} bold>
          {' '}
          {count}{' '}
        </Text>
      )}
    </Flex>
  )
}

export default obc(TabBarLabel, COMPONENT)
