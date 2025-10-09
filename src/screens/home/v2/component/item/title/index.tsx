/*
 * @Author: czy0729
 * @Date: 2021-01-21 15:55:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-09 05:47:22
 */
import React from 'react'
import { Highlight, Katakana } from '@components'
import { useStore } from '@stores'
import { cnjp, getPinYinFilterValue, HTMLDecode } from '@utils'
import { useObserver } from '@utils/hooks'
import { Ctx } from '../../../types'
import Doing from './doing'
import { COMPONENT } from './ds'
import { Props } from './types'

function Title({ subjectId, typeCn, title, name, name_cn, doing }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const text = HTMLDecode(
      cnjp(name_cn || $.subject(subjectId)?.name_cn, name || $.subject(subjectId)?.name)
    )

    let filterValue = ''
    if ($.isFilter(title)) filterValue = getPinYinFilterValue(text, $.filter)

    const size = text.length > 28 ? 12 : text.length > 18 ? 13 : 15

    return (
      <>
        {filterValue ? (
          <Highlight size={size} numberOfLines={2} bold value={filterValue}>
            {text}
          </Highlight>
        ) : (
          <Katakana.Provider size={size} numberOfLines={2} bold>
            <Katakana size={size} numberOfLines={2} bold>
              {text}
            </Katakana>
          </Katakana.Provider>
        )}
        <Doing subjectId={subjectId} typeCn={typeCn} doing={doing} />
      </>
    )
  })
}

export default Title
