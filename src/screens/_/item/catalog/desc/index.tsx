/*
 * @Author: czy0729
 * @Date: 2024-08-21 18:41:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-26 21:42:02
 */
import { observer } from 'mobx-react'
import { Avatar, Flex, Text, UserStatus } from '@components'
import { InView } from '@_/base'
import { _ } from '@stores'
import { useNavigation } from '@utils/hooks'
import { AVATAR_WIDTH, ITEM_CATALOG_HEIGHT } from '../ds'

import type { Props } from './types'

/** 目录编纂者信息 */
function Desc({ index, userId, avatar, name, date, event }: Props) {
  const navigation = useNavigation()

  return (
    <Flex style={_.mt.md}>
      <InView style={_.mr.sm} y={InView.y(index - 1, ITEM_CATALOG_HEIGHT, ITEM_CATALOG_HEIGHT / 2)}>
        <UserStatus userId={userId} mini>
          <Avatar
            key={avatar}
            navigation={navigation}
            size={AVATAR_WIDTH}
            userId={userId}
            name={name}
            src={avatar}
            radius={_.radiusXs}
            event={event}
          />
        </UserStatus>
      </InView>

      <Flex.Item>
        {!!name && (
          <Text size={12} bold numberOfLines={1}>
            {name}
          </Text>
        )}
        {!!date && (
          <Text size={10} lineHeight={11} type='sub'>
            {date}
          </Text>
        )}
      </Flex.Item>
    </Flex>
  )
}

export default observer(Desc)
