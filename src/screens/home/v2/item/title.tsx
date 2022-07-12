/*
 * @Author: czy0729
 * @Date: 2021-01-21 15:55:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-11 17:06:48
 */
import React from 'react'
import { Text } from '@components'
import { _ } from '@stores'
import { cnjp, HTMLDecode } from '@utils'
import { obc } from '@utils/decorators'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { WEEK_DAY_MAP } from './ds'

function Title({ subject, subjectId }, { $ }) {
  const type = MODEL_SUBJECT_TYPE.getTitle(subject.type)
  const isBook = type === '书籍'
  const doing = isBook ? '读' : '看'

  const { weekDay, isExist } = $.onAirCustom(subjectId)
  const weekDayText = isExist ? ` / 周${WEEK_DAY_MAP[weekDay]}` : ''
  return (
    <>
      <Text numberOfLines={2} bold>
        {HTMLDecode(cnjp(subject.name_cn, subject.name))}
      </Text>
      {!!subject?.collection?.doing && (
        <Text style={_.mt.xs} type='sub' size={12}>
          {subject.collection.doing} 人在{doing}
          {weekDayText}
        </Text>
      )}
    </>
  )
}

export default obc(Title)
