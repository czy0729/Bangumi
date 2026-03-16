/*
 * @Author: czy0729
 * @Date: 2021-01-21 15:55:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 06:46:14
 */
import React from 'react'
import { Highlight, Katakana } from '@components'
import { systemStore, useStore } from '@stores'
import { cnjp, getPinYinFilterValue, getVisualLength, HTMLDecode } from '@utils'
import { useObserver } from '@utils/hooks'
import Doing from './doing'
import { COMPONENT } from './ds'

import type { Ctx } from '../../../types'
import type { Props } from './types'

function Title({ subjectId, typeCn, title, name, name_cn, doing }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const text = HTMLDecode(
      cnjp(name_cn || $.subject(subjectId)?.name_cn, name || $.subject(subjectId)?.name)
    )

    let filterValue = ''
    if ($.isFilter(title)) filterValue = getPinYinFilterValue(text, $.filter)

    const visualLength = getVisualLength(text)
    const textProps = {
      size: visualLength > 28 ? 12 : visualLength > 18 ? 13 : 15,
      numberOfLines: systemStore.setting.homeListCompact ? 2 : 3,
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
        <Doing subjectId={subjectId} typeCn={typeCn} doing={doing} />
      </>
    )
  })
}

export default Title
