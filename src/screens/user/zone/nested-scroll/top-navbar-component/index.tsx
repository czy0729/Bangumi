/*
 * @Author: czy0729
 * @Date: 2023-12-30 15:07:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-29 13:05:28
 */
import React from 'react'
import { Avatar, Flex } from '@components'
import { VerticalAlign } from '@_'
import { _, useStore } from '@stores'
import { HTMLDecode } from '@utils'
import { useObserver } from '@utils/hooks'
import { AVATAR_SIZE, COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'

function TopNavbarComponent() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => (
    <Flex style={styles.topNavbar}>
      <Avatar
        key={String($.src)}
        style={styles.avatar}
        size={AVATAR_SIZE}
        src={$.src}
        fallbackSrc={$.usersInfo.avatar.large}
        borderWidth={0}
      />
      <VerticalAlign
        style={_.ml.sm}
        text={$.usersInfo.nickname}
        type={_.select('plain', 'title')}
        align='center'
        bold
        shadow
        numberOfLines={1}
      >
        {HTMLDecode($.usersInfo.nickname)}
      </VerticalAlign>
    </Flex>
  ))
}

export default TopNavbarComponent
