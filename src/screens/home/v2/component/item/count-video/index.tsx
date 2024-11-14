/*
 * @Author: czy0729
 * @Date: 2021-01-21 15:22:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-20 07:11:29
 */
import React from 'react'
import { Flex, Text } from '@components'
import { IconExpand } from '@_'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { SubjectId } from '@types'
import { Ctx } from '../../../types'
import { COMPONENT } from './ds'
import { styles } from './styles'

function CountVideo({ subjectId, epStatus }: { subjectId: SubjectId; epStatus: string | number }) {
  const { $ } = useStore<Ctx>()
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

export default ob(CountVideo, COMPONENT)
