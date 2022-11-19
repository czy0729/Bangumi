/*
 * @Author: czy0729
 * @Date: 2021-01-21 15:22:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-19 09:26:41
 */
import React from 'react'
import { Flex, Text } from '@components'
import { IconExpand } from '@_'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { styles } from './styles'
import { Props } from './types'

function Count({ subjectId, epStatus }: Props, { $ }: Ctx) {
  const { expand } = $.$Item(subjectId)
  return (
    <Flex style={styles.count}>
      <Text type='primary' size={20}>
        {$.countFixed(subjectId, epStatus)}
        <Text type='sub' lineHeight={20}>
          {' '}
          / {$.countRight(subjectId)}
        </Text>
      </Text>
      <IconExpand style={styles.icon} expand={expand} />
    </Flex>
  )
}

export default obc(Count)
