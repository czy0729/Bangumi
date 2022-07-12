/*
 * @Author: czy0729
 * @Date: 2021-01-21 15:55:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-12 10:51:17
 */
import React from 'react'
import { Text } from '@components'
import { _ } from '@stores'
import { cnjp, HTMLDecode } from '@utils'
import { obc } from '@utils/decorators'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectTypeCn } from '@types'
import { Ctx } from '../../types'
import { WEEK_DAY_MAP } from '../ds'
import { Props } from './types'

function Title({ subject, subjectId }: Props, { $ }: Ctx) {
  const type = MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(subject.type)
  const isBook = type === '书籍'
  const action = isBook ? '读' : '看'
  const { weekDay, isExist } = $.onAirCustom(subjectId)
  const weekDayText = isExist ? ` · 周${WEEK_DAY_MAP[weekDay]}` : ''
  return (
    <>
      <Text numberOfLines={2} bold>
        {HTMLDecode(cnjp(subject.name_cn, subject.name))}
      </Text>
      {!!subject?.collection?.doing && (
        <Text style={_.mt.xs} type='sub' size={12}>
          {subject.collection.doing} 人在{action}
          {weekDayText}
        </Text>
      )}
    </>
  )
}

export default obc(Title)
