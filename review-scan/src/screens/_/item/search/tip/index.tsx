/*
 * @Author: czy0729
 * @Date: 2025-01-25 23:11:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-25 23:12:19
 */
import React from 'react'
import { Text } from '@components'
import { _ } from '@stores'
import { HTMLDecode } from '@utils'
import { ob } from '@utils/decorators'

function Tip({ tip, isMusic }) {
  return (
    <Text style={isMusic && _.mt.xs} size={11} lineHeight={14} numberOfLines={isMusic ? 2 : 3}>
      {HTMLDecode(tip)}
    </Text>
  )
}

export default ob(Tip)
