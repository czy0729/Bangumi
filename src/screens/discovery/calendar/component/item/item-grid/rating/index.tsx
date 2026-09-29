/*
 * @Author: czy0729
 * @Date: 2024-03-30 07:18:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-29 17:10:00
 */
import { observer } from 'mobx-react'
import { Flex, Text } from '@components'
import { Stars } from '@_'
import { _ } from '@stores'
import { formatTime } from '../../../../utils'

import type { Props } from './types'

function Rating({ hideScore, time, score }: Props) {
  const showScore = !hideScore && !!score
  const middle = formatTime(time)

  return (
    <Flex style={_.mt.xs}>
      {showScore && <Stars value={score} simple />}
      {!!middle && (
        <Text type='sub' size={11} bold noWrap>
          {showScore && score ? ' · ' : ''}
          {middle}
        </Text>
      )}
    </Flex>
  )
}

export default observer(Rating)
