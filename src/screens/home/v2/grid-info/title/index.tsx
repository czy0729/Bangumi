/*
 * @Author: czy0729
 * @Date: 2022-11-20 09:43:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-20 09:45:31
 */
import React from 'react'
import { Touchable, Text } from '@components'
import { cnjp, HTMLDecode } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'

function Title({ subjectId }, { $ }: Ctx) {
  const subject = $.subject(subjectId)
  const title = HTMLDecode(cnjp(subject?.name_cn, subject?.name))
  return (
    <Touchable onPress={this.onPress}>
      <Text size={15} numberOfLines={$.eps(subjectId).length >= 14 ? 1 : 2} bold>
        {title}
      </Text>
    </Touchable>
  )
}

export default obc(Title)
