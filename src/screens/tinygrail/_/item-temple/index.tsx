/*
 * @Author: czy0729
 * @Date: 2019-11-17 12:08:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-07 05:59:15
 */
import React from 'react'
import { View } from 'react-native'
import { Iconfont, Text, Touchable } from '@components'
import { _ } from '@stores'
import { formatNumber, stl } from '@utils'
import { ob } from '@utils/decorators'
import { useNavigation } from '@utils/hooks'
import { EVENT } from '@constants'
import Progress from '../progress'
import Cover from './cover'
import Title from './title'
import { Props } from './type'
import User from './user'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function ItemTemple({
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
  userStarForces,
  lastActive,
  type,
  userId,
  extra,
  state,
  onPress,
  onItem
}: Props) {
  const navigation = useNavigation()
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
      <View style={_.mt.sm}>
        <Progress size={isFromTemplesPage ? 'xs' : 'sm'} assets={assets} sacrifices={sacrifices} />
        {typeof onItem === 'function' && sacrifices - assets >= 50 && (
          <Touchable style={styles.btn} onPress={onItem}>
            <Iconfont name='md-add' size={13} color={'rgba(255, 255, 255, 0.4)'} />
          </Touchable>
        )}
      </View>
      {!!extra && (
        <Text style={_.mt.sm} type='tinygrailText' size={10} align='center' bold>
          {extra}
          {state ? ` · 持股 ${state}` : ''}
        </Text>
      )}
      {!!userStarForces && !onItem && (
        <Text style={_.mt.sm} type='warning' size={10} align='center' bold>
          星之力 {formatNumber(userStarForces, 0)}
        </Text>
      )}
    </View>
  )
}

export default ob(ItemTemple, COMPONENT)
