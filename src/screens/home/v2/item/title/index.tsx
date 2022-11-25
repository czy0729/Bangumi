/*
 * @Author: czy0729
 * @Date: 2021-01-21 15:55:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-23 15:47:00
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

  const { weekDay, isExist } = $.onAirCustom(subjectId)
  const weekDayText = systemStore.setting.homeOnAir
    ? ''
    : isExist
    ? ` · 周${WEEK_DAY_MAP[weekDay]}`
    : ''

  const _subject = $.subject(subjectId)
  const doing = subject?.collection?.doing || _subject?.collection?.doing || 0

  const title = HTMLDecode(
    cnjp(_subject?.name_cn || subject.name_cn, _subject?.name || subject.name)
  )

  let filterValue = ''
  if ($.isFilter(tabLabel)) filterValue = getPinYinFilterValue(title, $.filter)

  return (
    <>
      {filterValue ? (
        <Highlight size={15} numberOfLines={2} bold value={filterValue}>
          {title}
        </Highlight>
      ) : (
        <Katakana.Provider size={15} numberOfLines={2} bold>
          <Katakana size={15} numberOfLines={2} bold>
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
