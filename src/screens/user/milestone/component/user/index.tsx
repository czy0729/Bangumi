/*
 * @Author: czy0729
 * @Date: 2024-10-10 12:41:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-16 21:54:48
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Avatar, Flex, Text, Touchable } from '@components'
import { IconBack } from '@_'
import { _, useStore } from '@stores'
import { open, stl } from '@utils'
import Filter from '../filter'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function User() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const styles = memoStyles()

  const { userInfo } = $.state
  const { userId, userName } = $.users

  return (
    <Flex style={stl(styles.user, !userInfo && styles.userSm)}>
      {_.isPad && <IconBack style={styles.back} navigation={navigation} color={_.colorDesc} />}
      {userInfo && (
        <Flex.Item>
          {!!$.users.avatar && (
            <Flex>
              <Avatar
                navigation={navigation}
                userId={userId}
                name={userName}
                src={$.users.avatar}
                size={52}
                radius={$.state.radius ? _.radiusXs : 0}
                placeholder={false}
              />
              <Touchable
                style={styles.content}
                onPress={() => {
                  open($.url)
                }}
              >
                <Text size={userName.length >= 6 ? 13 : 14} bold>
                  {userName}
                </Text>
                <Text style={_.mt.xs} type='sub' size={12} lineHeight={14} bold>
                  @{userId}
                </Text>
              </Touchable>
            </Flex>
          )}
        </Flex.Item>
      )}
      <Filter />
    </Flex>
  )
}

export default observer(User)
