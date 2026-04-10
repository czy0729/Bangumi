/*
 * @Author: czy0729
 * @Date: 2024-01-28 07:28:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-09 23:36:22
 */
import React from 'react'
import { Text } from '@components'
import { _, userStore } from '@stores'
import { date } from '@utils'
import { ob } from '@utils/decorators'
import { DEVICE_MODEL_NAME } from '@constants'

function Lasttime() {
  const ts = String(userStore.userCookie.userAgent).match(/(\d{10})/g)
  if (!ts?.[0]) return null

  return (
    <Text style={_.mt.xs} type={_.select('sub', 'icon')} size={10} bold align='center'>
      last logged on: {date('y-m-d H:i', ts[0])}, {DEVICE_MODEL_NAME}
    </Text>
  )
}

export default ob(Lasttime)
