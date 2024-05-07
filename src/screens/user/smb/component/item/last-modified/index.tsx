/*
 * @Author: czy0729
 * @Date: 2023-11-24 05:14:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-24 05:20:45
 */
import React, { useState } from 'react'
import { Touchable, Text } from '@components'
import { useObserver } from '@utils/hooks'
import { timeAgo } from './utils'

function LastModified({ value }) {
  const [fulltime, setFulltime] = useState(false)

  return useObserver(() => (
    <Touchable
      onPress={() => {
        setFulltime(!fulltime)
      }}
    >
      <Text size={11} lineHeight={12} type='icon'>
        [{fulltime ? String(value).replace('T', ' ').split('.')?.[0] : timeAgo(value)}]
      </Text>
    </Touchable>
  ))
}

export default LastModified
