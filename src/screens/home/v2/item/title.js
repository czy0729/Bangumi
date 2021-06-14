/*
 * @Author: czy0729
 * @Date: 2021-01-21 15:55:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-06-15 06:03:31
 */
import React from 'react'
import { Text } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { HTMLDecode } from '@utils/html'
import { getWeekDay } from '@utils/app'
import { MODEL_SUBJECT_TYPE } from '@constants/model'

const weekDayMap = {
  0: '日',
  1: '一',
  2: '二',
  3: '三',
  4: '四',
  5: '五',
  6: '六',
  7: '日'
}

function Title({ subject, subjectId }, { $ }) {
  const type = MODEL_SUBJECT_TYPE.getTitle(subject.type)
  const isBook = type === '书籍'
  const doing = isBook ? '读' : '看'

  const weekDay = $.sortOnAir ? getWeekDay($.onAir[subjectId]) : ''
  const weekDayText =
    weekDay === undefined || weekDay === '' ? '' : ` / 周${weekDayMap[weekDay]}`
  return (
    <>
      <Text numberOfLines={2} bold>
        {HTMLDecode(subject.name_cn || subject.name)}
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
