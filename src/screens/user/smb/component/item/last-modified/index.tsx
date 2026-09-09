/*
 * @Author: czy0729
 * @Date: 2023-11-24 05:14:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-09 13:58:09
 */
import { useState } from 'react'
import { observer } from 'mobx-react'
import { Text, Touchable } from '@components'
import { _ } from '@stores'
import { timeAgo } from './utils'

function LastModified({ value }) {
  const [fulltime, setFulltime] = useState(false)

  return (
    <Touchable
      onPress={() => {
        setFulltime(!fulltime)
      }}
    >
      <Text type={_.select('sub', 'icon')} size={11} lineHeight={12}>
        [{fulltime ? String(value).replace('T', ' ').split('.')?.[0] : timeAgo(value)}]
      </Text>
    </Touchable>
  )
}

export default observer(LastModified)
