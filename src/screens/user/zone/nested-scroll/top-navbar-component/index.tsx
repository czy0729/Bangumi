/*
 * @Author: czy0729
 * @Date: 2023-12-30 15:07:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-22 06:58:42
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Avatar, Flex } from '@components'
import { VerticalAlign } from '@_'
import { _, useStore } from '@stores'
import { AVATAR_SIZE, COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'

function TopNavbarComponent() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return (
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
        type='__plain__'
        align='center'
        bold
        shadow
        numberOfLines={1}
      >
        {$.nickname}
      </VerticalAlign>
    </Flex>
  )
}

export default observer(TopNavbarComponent)
