/*
 * @Author: czy0729
 * @Date: 2023-01-07 21:53:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-01 05:34:24
 */
import { observer } from 'mobx-react'
import { Flex, Text, UserStatus } from '@components'
import { Avatar, InView } from '@_'
import { _ } from '@stores'
import { HTMLDecode } from '@utils'
import { useNavigation } from '@utils/hooks'
import { LEVELS, USERS_MAP } from '../../ds'
import { getLevelIndex, getSponsorAvatar } from '../../utils'
import LevelIcon from '../level-icon'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Props } from './types'

/** 两列列表项 */
function ListItem({ item, index }: Props) {
  const navigation = useNavigation(COMPONENT)

  const data = USERS_MAP[item.data]
  const userId = item.data

  const levelIndex = getLevelIndex(item.weight)
  const icon = levelIndex >= 0 ? LEVELS[levelIndex].icon : ''

  return (
    <Flex style={styles.item}>
      <InView style={styles.inView} y={48 * (Math.floor(index / 2) + 1)}>
        <UserStatus userId={userId}>
          <Avatar
            navigation={navigation}
            src={getSponsorAvatar(userId)}
            name={data?.n}
            userId={userId}
            size={32}
          />
        </UserStatus>
      </InView>
      <Flex.Item style={_.ml.sm}>
        <Flex>
          <Flex.Item>
            <Text size={12} bold numberOfLines={1}>
              {HTMLDecode(data?.n)}
            </Text>
            <Text size={10} lineHeight={12} type='sub'>
              @{userId}
            </Text>
          </Flex.Item>
          {!!icon && (
            <Flex style={styles.level} justify='center'>
              <LevelIcon type={icon} />
            </Flex>
          )}
        </Flex>
      </Flex.Item>
    </Flex>
  )
}

export default observer(ListItem)
