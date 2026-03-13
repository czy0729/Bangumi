/*
 * @Author: czy0729
 * @Date: 2022-11-20 09:43:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-21 07:40:37
 */
import React from 'react'
import { Text } from '@components'
import { useStore } from '@stores'
import { cnjp, HTMLDecode } from '@utils'
import { ob } from '@utils/decorators'
import { Ctx } from '../../../../types'
import { COMPONENT } from './ds'

function Title({ subjectId, subject = {} as any }) {
  const { $ } = useStore<Ctx>()
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

export default ob(Title, COMPONENT)
