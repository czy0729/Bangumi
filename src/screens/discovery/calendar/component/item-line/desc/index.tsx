/*
 * @Author: czy0729
 * @Date: 2024-03-29 10:25:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-29 12:50:31
 */
import React from 'react'
import { Text } from '@components'
import { getOnAirItem } from '@utils'
import { ob } from '@utils/decorators'

function Desc({ subjectId, sites }) {
  const extra = []
  if (sites.b) extra.push('bilibili')
  if (!sites.b && sites.bhmt) extra.push('bilibili 港澳台')
  if (sites.i) extra.push('爱奇艺')
  if (sites.q) extra.push('腾讯视频')

  const { type = '', tag = '', origin = '' } = getOnAirItem(subjectId)
  if (type) extra.push(type)
  if (origin) extra.push(...origin.split('/'))
  if (tag) extra.push(...tag.split('/'))

  if (!extra.length) return null

  return (
    <Text type='sub' size={11} bold>
      {extra.join(' / ')}
    </Text>
  )
}

export default ob(Desc)
