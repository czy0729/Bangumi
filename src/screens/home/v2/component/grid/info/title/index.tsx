/*
 * @Author: czy0729
 * @Date: 2022-11-20 09:43:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-08 00:08:17
 */
import React from 'react'
import { Text } from '@components'
import { useStore } from '@stores'
import { cnjp, HTMLDecode } from '@utils'
import { useObserver } from '@utils/hooks'
import { Ctx } from '../../../../types'
import { COMPONENT } from './ds'
import { Props } from './types'

function Title({ subjectId, subject = {} }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const current = $.subject(subjectId)
    const title = HTMLDecode(
      cnjp(current?.name_cn || subject?.name_cn, current?.name || subject?.name)
    )

    return (
      <Text size={15} numberOfLines={$.eps(subjectId).length >= 14 ? 1 : 2} bold>
        {title}
      </Text>
    )
  })
}

export default Title
