/*
 * @Author: czy0729
 * @Date: 2023-12-30 15:07:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-22 06:15:26
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Avatar, Flex } from '@components'
import { VerticalAlign } from '@_'
import { _, useStore } from '@stores'
import { HTMLDecode } from '@utils'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'

function TopNavbarComponent() {
  const { $ } = useStore<Ctx>(COMPONENT)

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
        type='__plain__'
        align='center'
        bold
        shadow
        numberOfLines={1}
      >
        {HTMLDecode(nickname)}
      </VerticalAlign>
    </Flex>
  )
}

export default observer(TopNavbarComponent)
