/*
 * @Author: czy0729
 * @Date: 2023-01-03 06:40:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 08:29:40
 */
import React, { useState } from 'react'
import { View } from 'react-native'
import { Divider, Expand, Text } from '@components'
import { _, userStore, useStore } from '@stores'
import { date, omit, pick } from '@utils'
import { useMount, useObserver } from '@utils/hooks'
import { get } from '@utils/kv'
import { AnyObject } from '@types'
import { Ctx } from '../../types'
import { formatString } from './utils'
import { KEYS } from './ds'

function U() {
  const { $ } = useStore<Ctx>()
  const [value, setValue] = useState<AnyObject>({})
  useMount(() => {
    const fn = async () => {
      const data: any = await get(`u_${$.usersInfo.username}`)
      if (typeof data === 'object') {
        if (data.ts) data.ts = date(data.ts)
        setValue(data)
      }
    }
    setTimeout(() => {
      fn()
    }, 0)
  })

  return useObserver(() => {
    if (!userStore.isDeveloper) return null

    return (
      <View style={_.mt.md}>
        <Divider />
        <Text>
          {JSON.stringify(
            {
              ...pick(value, KEYS),
              avatar: $.avatar,
              bg: $.bg
            },
            null,
            2
          )}
        </Text>
        {!!value?.v && (
          <Expand style={_.mt.md}>
            <Text>{JSON.stringify(formatString(omit(value, KEYS)), null, 2)}</Text>
          </Expand>
        )}
      </View>
    )
  })
}

export default U
