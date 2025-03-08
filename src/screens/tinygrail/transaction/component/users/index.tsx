/*
 * @Author: czy0729
 * @Date: 2025-03-08 20:15:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-08 21:41:35
 */
import React, { useCallback, useMemo } from 'react'
import { View } from 'react-native'
import { useObserver } from 'mobx-react'
import { Avatar, Flex, Popover, Text } from '@components'
import { _, useStore } from '@stores'
import { r } from '@utils/dev'
import { Ctx } from '../../types'
import { COMPONENT, LIMIT } from './ds'

function Users({ id }) {
  r(COMPONENT)

  const { $, navigation } = useStore<Ctx>()

  return useObserver(() => {
    const likes = $.likes(id)
    const data = useMemo(
      () => likes?.list?.map(item => item.name) || [],
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [JSON.stringify(likes?.list)]
    )
    const el = useMemo(
      () => (
        <Flex>
          {likes?.list
            .filter((_item, index) => index <= LIMIT)
            .map(item => (
              <View key={item.userId} style={_.mr._sm}>
                <Avatar src={item.avatar} size={26} round />
              </View>
            ))}
          {likes?.list.length > LIMIT && (
            <Text size={12} type='sub' bold>
              +{likes?.list.length}
            </Text>
          )}
        </Flex>
      ),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [JSON.stringify(likes?.list)]
    )
    const handleSelect = useCallback(
      (_title: string, index: number) => {
        navigation.push('Zone', {
          userId: likes?.list[index].userId
        })
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [JSON.stringify(likes?.list)]
    )

    return (
      <Popover data={data} onSelect={handleSelect}>
        {el}
      </Popover>
    )
  })
}

export default Users
