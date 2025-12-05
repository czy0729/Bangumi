/*
 * @Author: czy0729
 * @Date: 2024-01-28 07:28:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-28 07:36:09
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
    <Text style={_.mt.xs} size={10} type='icon' bold align='center'>
      last logged on: {date('y-m-d H:i', ts[0])}, {DEVICE_MODEL_NAME}
    </Text>
  )
}

export default ob(Lasttime)
