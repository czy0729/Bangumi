/*
 * @Author: czy0729
 * @Date: 2023-02-21 23:44:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-22 00:34:38
 */
import React from 'react'
import { Flex, Text } from '@components'
import { Rank, Stars } from '@_'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { styles } from './styles'

function Bottom({ rating, rank }) {
  return (
    <Flex style={styles.rating}>
      {!!rank && <Rank style={_.mr.sm} value={rank} />}
      {!!rating?.score && <Stars style={_.mr.sm} value={rating.score} />}
      {!!rating?.total && (
        <Text size={10} type='sub'>
          ({rating.total}人评分)
        </Text>
      )}
    </Flex>
  )
}

export default ob(Bottom)
