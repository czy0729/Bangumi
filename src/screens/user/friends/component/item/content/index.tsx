/*
 * @Author: czy0729
 * @Date: 2026-05-21 01:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-21 02:00:58
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Avatar, Flex, Highlight, UserStatus } from '@components'
import { Name } from '@_'
import { _ } from '@stores'
import { getVisualLength } from '@utils'
import { memoStyles } from '../styles'

import type { Props } from './types'

function Content({ userId, avatar, name, filter }: Props) {
  const visualLength = getVisualLength(name)
  const textProps = {
    style: _.mt.sm,
    size: visualLength > 7 ? 8 : visualLength > 6 ? 9 : visualLength > 5 ? 10 : 11,
    lineHeight: 11,
    bold: true,
    numberOfLines: 1
  } as const

  const styles = memoStyles()

  return (
    <>
      <UserStatus userId={userId}>
        <Avatar size={styles.item.width} src={avatar} radius />
      </UserStatus>

      <Flex>
        {filter ? (
          <Highlight {...textProps} value={filter}>
            {name}
          </Highlight>
        ) : (
          <Name {...textProps} userId={userId}>
            {name}
          </Name>
        )}
      </Flex>

      <Highlight style={_.mt.xs} type='sub' size={9} bold numberOfLines={1} value={filter}>
        {userId}
      </Highlight>
    </>
  )
}

export default observer(Content)
