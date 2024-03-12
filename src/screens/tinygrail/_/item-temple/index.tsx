/*
 * @Author: czy0729
 * @Date: 2019-11-17 12:08:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-11 18:37:28
 */
import React from 'react'
import { View } from 'react-native'
import { _ } from '@stores'
import { stl } from '@utils'
import { obc } from '@utils/decorators'
import { EVENT } from '@constants'
import { Navigation } from '@types'
import Progress from '../progress'
import Cover from './cover'
import Title from './title'
import { Props } from './type'
import User from './user'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function ItemTemple(
  {
    style,
    assets,
    avatar,
    cover,
    coverSize,
    event,
    level,
    cLevel,
    name,
    rank,
    nickname,
    sacrifices,
    refine,
    lastActive,
    type,
    userId,
    onPress
  }: Props,
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
        coverSize={coverSize}
        name={name}
        refine={refine}
        event={event || EVENT}
        onPress={onPress}
      />
      <User
        navigation={navigation}
        userId={(isFromTemplesPage ? userId : name) || userId}
        avatar={avatar}
        nickname={nickname}
        lastActive={lastActive}
        event={event || EVENT}
      />
      <Title
        style={isFromTemplesPage && _.mt.xs}
        name={name || nickname}
        rank={rank}
        cLevel={cLevel}
      />
      {!isFromTemplesPage && !!sacrifices && (
        <Progress style={_.mt.sm} size='sm' assets={assets} sacrifices={sacrifices} />
      )}
    </View>
  )
}

export default obc(ItemTemple, COMPONENT)
