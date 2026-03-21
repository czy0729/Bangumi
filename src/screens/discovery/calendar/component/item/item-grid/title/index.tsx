/*
 * @Author: czy0729
 * @Date: 2024-03-30 07:24:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-21 03:41:59
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Text } from '@components'
import { _ } from '@stores'
import { getType, HTMLDecode } from '@utils'

function Title({ name, collection }) {
  const title = HTMLDecode(name)
  const size = title.length >= 16 ? 11 : 12

  return (
    <Text style={_.mt.sm} size={size} lineHeight={size + 1} numberOfLines={3} bold>
      {!!collection && (
        <>
          <Text type={getType(collection)} size={size} lineHeight={size + 1} bold>
            {collection}
          </Text>
          <Text size={size} lineHeight={size + 1} bold>
            ·
          </Text>
        </>
      )}
      {title}
    </Text>
  )
}

export default observer(Title)
