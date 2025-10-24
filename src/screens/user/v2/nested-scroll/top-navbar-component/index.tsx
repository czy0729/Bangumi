/*
 * @Author: czy0729
 * @Date: 2023-12-30 15:07:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-23 10:49:13
 */
import React from 'react'
import { Avatar, Flex } from '@components'
import { VerticalAlign } from '@_'
import { _, useStore } from '@stores'
import { HTMLDecode } from '@utils'
import { useObserver } from '@utils/hooks'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'

function TopNavbarComponent() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const { avatar, nickname } = $.usersInfo

    return (
      <Flex justify='center'>
        <Avatar
          style={styles.avatar}
          size={28}
          src={$.avatar || avatar.large}
          fallbackSrc={avatar.large}
          borderWidth={0}
        />
        <VerticalAlign
          style={_.ml.sm}
          text={nickname}
          type={_.select('plain', 'title')}
          align='center'
          bold
          shadow
          numberOfLines={1}
        >
          {HTMLDecode(nickname)}
        </VerticalAlign>
      </Flex>
    )
  })
}

export default TopNavbarComponent
