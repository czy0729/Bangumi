/*
 * @Author: czy0729
 * @Date: 2022-11-20 09:43:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 07:24:22
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Text } from '@components'
import { useStore } from '@stores'
import { cnjp, HTMLDecode } from '@utils'
import { COMPONENT } from './ds'

import type { Ctx } from '../../../../types'
import type { Props } from './types'

function Title({ subjectId, subject = {} }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const current = $.subject(subjectId)
  const title = HTMLDecode(
    cnjp(current?.name_cn || subject?.name_cn, current?.name || subject?.name)
  )

  return (
    <Text size={15} numberOfLines={$.eps(subjectId).length >= 14 ? 1 : 2} bold>
      {title}
    </Text>
  )
}

export default observer(Title)
