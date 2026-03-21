/*
 * @Author: czy0729
 * @Date: 2024-03-30 07:18:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-21 03:41:36
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex, Text } from '@components'
import { Stars } from '@_'
import { _ } from '@stores'

function Rating({ hideScore, time, score }) {
  const showScore = !hideScore && !!score
  let middle: any = []
  if (!!time && time !== '2359') {
    middle.push(`${time.slice(0, 2)}:${time.slice(2)}`)
  }
  middle = middle.join(' · ')

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
