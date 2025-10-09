/*
 * @Author: czy0729
 * @Date: 2021-01-21 15:22:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-09 05:31:16
 */
import React from 'react'
import { Flex, Text } from '@components'
import { IconExpand } from '@_'
import { useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { Ctx } from '../../../types'
import { COMPONENT } from './ds'
import { styles } from './styles'
import { Props } from './types'

function CountVideo({ subjectId, epStatus }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
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
  })
}

export default CountVideo
