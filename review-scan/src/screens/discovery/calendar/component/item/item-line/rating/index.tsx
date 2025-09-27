/*
 * @Author: czy0729
 * @Date: 2024-03-29 10:30:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-30 06:20:18
 */
import React from 'react'
import { Flex, Text } from '@components'
import { Rank, Stars } from '@_'
import { _ } from '@stores'
import { ob } from '@utils/decorators'

function Rating({ hideScore, rank, score, total }) {
  const showScore = !hideScore && !!score
  return (
    <Flex>
      {showScore && (
        <>
          <Rank value={rank} />
          <Stars style={_.mr.xs} value={score} />
          {!!total && (
            <Text type='sub' size={11} bold>
              ({total})
            </Text>
          )}
        </>
      )}
    </Flex>
  )
}

export default ob(Rating)
