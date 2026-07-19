/*
 * @Author: czy0729
 * @Date: 2021-01-21 15:55:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-19 23:11:54
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Highlight, Katakana } from '@components'
import { systemStore, useStore } from '@stores'
import { cnjp, getPinYinFilterValue, getVisualLength, HTMLDecode } from '@utils'
import { MODEL_SETTING_HOME_ANIME_INFO_INLINE } from '@constants'
import { COMPONENT } from './ds'

import type { Ctx } from '../../../types'
import type { Props } from './types'

function Title({ subjectId, title, name, name_cn }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const text = HTMLDecode(
    cnjp(name_cn || $.subject(subjectId)?.name_cn, name || $.subject(subjectId)?.name)
  )

  let filterValue = ''
  if ($.isFilter(title)) filterValue = getPinYinFilterValue(text, $.filter)

  const visualLength = getVisualLength(text)
  const textProps = {
    size: visualLength > 28 ? 12 : visualLength > 18 ? 13 : 15,
    numberOfLines:
      systemStore.setting.homeListCompact ||
      MODEL_SETTING_HOME_ANIME_INFO_INLINE.getLabel(systemStore.setting.homeAnimeInfoInline) ===
        '行内'
        ? 2
        : 3,
    bold: true
  } as const

  return (
    <>
      {filterValue ? (
        <Highlight {...textProps} value={filterValue}>
          {text}
        </Highlight>
      ) : (
        <Katakana.Provider {...textProps}>
          <Katakana {...textProps}>{text}</Katakana>
        </Katakana.Provider>
      )}
    </>
  )
}

export default observer(Title)
