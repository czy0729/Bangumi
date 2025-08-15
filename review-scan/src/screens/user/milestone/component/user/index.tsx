/*
 * @Author: czy0729
 * @Date: 2024-10-10 12:41:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 06:50:30
 */
import React from 'react'
import { Avatar, Flex, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { open } from '@utils'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import Filter from '../filter'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function User() {
  const { $, navigation } = useStore<Ctx>()
  const styles = memoStyles()
  const { userId, userName } = $.users
  return (
    <Flex style={styles.user}>
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
      <Filter />
    </Flex>
  )
}

export default ob(User, COMPONENT)
