/*
 * @Author: czy0729
 * @Date: 2019-11-17 12:08:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-05 05:03:44
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text } from '@components'
import { _ } from '@stores'
import { HTMLDecode, stl } from '@utils'
import { obc } from '@utils/decorators'
import { EVENT } from '@constants'
import { Navigation } from '@types'
import Level from '../level'
import Progress from '../progress'
import Rank from '../rank'
import Cover from './cover'
import User from './user'
import { memoStyles } from './styles'

function ItemTemple(
  {
    style = undefined,
    assets,
    avatar,
    cover,
    event,
    level,
    cLevel,
    name,
    rank = undefined,
    nickname,
    sacrifices,
    refine,
    type = undefined,
    userId = undefined,
    onPress = undefined
  },
  {
    navigation
  }: {
    navigation: Navigation
  }
) {
  const styles = memoStyles()

  /** 最近圣殿页面用 */
  const isFromTemplesPage = type === 'view'

  return (
    <View style={stl(styles.item, style)}>
      <Cover
        level={level}
        cover={cover}
        name={name}
        refine={refine}
        event={event || EVENT}
        onPress={onPress}
      />
      <User
        navigation={navigation}
        userId={isFromTemplesPage ? userId : name}
        avatar={avatar}
        nickname={nickname}
        event={event || EVENT}
      />
      <Flex style={isFromTemplesPage && _.mt.xs}>
        {!isFromTemplesPage && <Rank value={rank} />}
        <Level value={cLevel} />
        <Flex.Item>
          <Text type='tinygrailPlain' size={11} bold numberOfLines={isFromTemplesPage ? 2 : 1}>
            {HTMLDecode(name)}
          </Text>
        </Flex.Item>
      </Flex>
      {!isFromTemplesPage && (
        <Progress style={_.mt.sm} size='sm' assets={assets} sacrifices={sacrifices} />
      )}
    </View>
  )
}

export default obc(ItemTemple)
