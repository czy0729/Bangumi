/*
 * @Author: czy0729
 * @Date: 2022-11-20 09:43:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-21 07:40:37
 */
import React from 'react'
import { Text } from '@components'
import { cnjp, HTMLDecode } from '@utils'
import { obc } from '@utils/decorators'
import { rerender } from '@utils/dev'
import { Ctx } from '../../types'

function Title({ subjectId, subject = {} }: any, { $ }: Ctx) {
  rerender('Home.GridInfo.Title')

  const _subject = $.subject(subjectId)
  const title = HTMLDecode(
    cnjp(_subject?.name_cn || subject?.name_cn, _subject?.name || subject?.name)
  )
  return (
    <Text size={15} numberOfLines={$.eps(subjectId).length >= 14 ? 1 : 2} bold>
      {title}
    </Text>
  )
}

export default obc(Title)
