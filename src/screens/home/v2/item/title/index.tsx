/*
 * @Author: czy0729
 * @Date: 2021-01-21 15:55:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-07 07:43:00
 */
import React from 'react'
import { Highlight, Text } from '@components'
import { _ } from '@stores'
import { cnjp, HTMLDecode } from '@utils'
import { obc } from '@utils/decorators'
import { getPinYinFirstCharacter } from '@utils/thirdParty/pinyin'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectTypeCn } from '@types'
import { Ctx } from '../../types'
import { WEEK_DAY_MAP } from '../ds'
import { Props } from './types'

const PIN_YIN_FIRST_CHARACTER = {}

function Title({ subject, subjectId, title: tabLabel }: Props, { $ }: Ctx) {
  const type = MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(subject.type)
  const isBook = type === '书籍'
  const action = isBook ? '读' : '看'

  const { weekDay, isExist } = $.onAirCustom(subjectId)
  const weekDayText = isExist ? ` · 周${WEEK_DAY_MAP[weekDay]}` : ''

  const _subject = $.subject(subjectId)
  const doing = subject?.collection?.doing || _subject?.collection?.doing || 0

  const title = HTMLDecode(
    cnjp(_subject?.name_cn || subject.name_cn, _subject?.name || subject.name)
  )

  let value = ''
  if ($.isFilter(tabLabel)) {
    if ($.filter) {
      if (/^[a-zA-Z]+$/.test($.filter)) {
        // 简单过滤掉不能获得拼音的字符
        const _title = title.replace(
          /~| |!|\?|;|:|"|&|\.|，|。|？|！|：|“|”|；|（|）/g,
          ''
        )
        if (!PIN_YIN_FIRST_CHARACTER[_title]) {
          PIN_YIN_FIRST_CHARACTER[_title] = getPinYinFirstCharacter(
            _title,
            _title.length
          ).replace(/ /g, '')
        }

        const pinyin = PIN_YIN_FIRST_CHARACTER[_title]
        if (typeof pinyin === 'string' && pinyin) {
          const index = pinyin.indexOf($.filter)
          if (index !== -1) {
            value = _title.slice(index, index + $.filter.length)
          }
        }
      } else if (!value) {
        value = $.filter
      }
    }
  }

  return (
    <>
      <Highlight numberOfLines={2} bold value={value}>
        {title}
      </Highlight>
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
