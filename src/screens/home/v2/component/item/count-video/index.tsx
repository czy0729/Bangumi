/*
 * @Author: czy0729
 * @Date: 2021-01-21 15:22:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 07:36:29
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex, Text } from '@components'
import { IconExpand } from '@_'
import { useStore } from '@stores'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../../types'
import type { Props } from './types'

function CountVideo({ subjectId, epStatus }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

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

export default observer(CountVideo)
