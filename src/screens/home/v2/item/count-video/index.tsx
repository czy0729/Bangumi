/*
 * @Author: czy0729
 * @Date: 2021-01-21 15:22:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-14 17:31:02
 */
import React from 'react'
import { Flex, Text } from '@components'
import { IconExpand } from '@_'
import { systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { styles } from './styles'
import { Props } from './types'

function Count({ subjectId, subject, epStatus }: Props, { $ }: Ctx) {
  const { expand } = $.$Item(subjectId)

  const { homeCountView } = systemStore.setting
  const current = $.currentOnAir(subjectId)
  const total = subject.eps || subject.eps_count || '?'
  let right = ''
  switch (homeCountView) {
    case 'B':
      right = `${current}`
      if (total !== current) right += ` (${total})`
      break
    case 'C':
      right = `${total}`
      if (total !== current) right += ` (${current})`
      break
    case 'D':
      right = `${current}`
      if (total !== current) right += ` / ${total}`
      break
    default:
      right = `${total}`
      break
  }

  return (
    <Flex style={styles.count}>
      <Text type='primary' size={20}>
        {$.countFixed(subjectId, epStatus)}
        <Text type='sub' lineHeight={20}>
          {' '}
          / {right}
        </Text>
      </Text>
      <IconExpand style={styles.icon} expand={expand} />
    </Flex>
  )
}

export default obc(Count)
