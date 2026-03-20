/*
 * @Author: czy0729
 * @Date: 2026-03-20 19:05:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 19:16:36
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex, Text } from '@components'
import { _ } from '@stores'
import { Rank, Stars } from '../../../base'
import { styles } from './styles'

function Rating({ rank, score, total }) {
  return (
    <Flex style={_.mt.md}>
      <Rank value={rank} />
      <Stars value={score} />
      <Text style={styles.total} type='sub' size={11}>
        {total}
      </Text>
    </Flex>
  )
}

export default observer(Rating)
