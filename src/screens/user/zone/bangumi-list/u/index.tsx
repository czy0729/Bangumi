/*
 * @Author: czy0729
 * @Date: 2023-01-03 06:40:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-20 21:29:40
 */
import React, { useState } from 'react'
import { Text } from '@components'
import { _ } from '@stores'
import { date } from '@utils'
import { obc } from '@utils/decorators'
import { useMount } from '@utils/hooks'
import { get } from '@utils/kv'

function U({ username }, { $ }) {
  const [value, setValue] = useState({})
  useMount(async () => {
    const data: any = await get(`u_${username}`)
    if (typeof data === 'object') {
      if (data.ts) data.ts = date(data.ts)
      setValue(data)
    }
  })

  return (
    <>
      <Text style={[_.mt.md, _.ml.md]}>
        {JSON.stringify(
          {
            avatar: $.avatar,
            bg: $.bg
          },
          null,
          2
        )}
      </Text>
      <Text style={[_.mt.md, _.ml.md]}>{JSON.stringify(value, null, 2)}</Text>
    </>
  )
}

export default obc(U)
