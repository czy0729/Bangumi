/*
 * @Author: czy0729
 * @Date: 2021-01-21 15:55:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-18 07:26:22
 */
import React from 'react'
import { Katakana, Highlight, Text } from '@components'
import { systemStore, _ } from '@stores'
import { cnjp, HTMLDecode, getPinYinFilterValue } from '@utils'
import { obc } from '@utils/decorators'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectTypeCn } from '@types'
import { Ctx } from '../../types'
import { WEEK_DAY_MAP } from '../ds'
import { Props } from './types'

function Title({ subject, subjectId, title: tabLabel }: Props, { $ }: Ctx) {
  const type = MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(subject.type)
  const action = type === '书籍' ? '读' : type === '游戏' ? '玩' : '看'

  const { weekDay, isOnair } = $.onAirCustom(subjectId)
  const weekDayText = systemStore.setting.homeOnAir
    ? ''
    : isOnair
    ? ` · 周${WEEK_DAY_MAP[weekDay]}`
    : ''

  const _subject = $.subject(subjectId)
  const doing = subject?.collection?.doing || _subject?.collection?.doing || 0

  const title = HTMLDecode(
    cnjp(_subject?.name_cn || subject.name_cn, _subject?.name || subject.name)
  )

  let filterValue = ''
  if ($.isFilter(tabLabel)) filterValue = getPinYinFilterValue(title, $.filter)

  const { length } = title
  const size = length > 28 ? 12 : length > 20 ? 13 : 15
  return (
    <>
      {filterValue ? (
        <Highlight size={size} numberOfLines={2} bold value={filterValue}>
          {title}
        </Highlight>
      ) : (
        <Katakana.Provider size={size} numberOfLines={2} bold>
          <Katakana size={size} numberOfLines={2} bold>
            {title}
          </Katakana>
        </Katakana.Provider>
      )}
      {!!doing && (
        <Text style={_.mt.xs} type='sub' size={12}>
          {doing} 人在{action}
          {weekDayText}
        </Text>
      )}
    </>
  )
}

export default obc(Title)
