/*
 * @Author: czy0729
 * @Date: 2023-07-03 06:53:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-02 18:00:50
 */
import React from 'react'
import { View } from 'react-native'
import { Cover, Text, Touchable } from '@components'
import { _ } from '@stores'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import Desc from './desc'
import Title from './title'
import { getTypeCn } from './utils'
import { HIT_SLOP } from './ds'

function Item({
  item,
  count,
  width,
  height,
  findCn,
  ellipsizeMode,
  isFirst,
  typeCn,
  relationTypeCn,
  onPress,
  onSubPress
}) {
  const typeCnValue = getTypeCn(item.name, item.desc, typeCn, relationTypeCn)
  const isMusic = typeCnValue === '音乐'
  const w = _.r(isMusic ? width * 1.16 : width)
  return (
    <View
      style={stl(
        {
          width: w
        },
        !isFirst && {
          marginLeft: _.r(isMusic ? 16 : 12)
        }
      )}
    >
      <Touchable
        animate
        scale={0.9}
        hitSlop={HIT_SLOP}
        onPress={() => {
          onPress(item, typeCn)
        }}
      >
        <Cover
          size={w}
          height={_.r(height)}
          src={item.image}
          radius={isMusic ? _.radiusSm : true}
          type={typeCnValue}
        />
        <Title
          id={item.id}
          name={item.name}
          findCn={findCn}
          typeCn={typeCnValue}
          ellipsizeMode={ellipsizeMode}
        />
        <Desc item={item} typeCn={typeCnValue} onPress={onSubPress || onPress} />
        {!!count && (
          <Text style={_.mt.xs} type='main' size={10} bold>
            +{count}
          </Text>
        )}
      </Touchable>
    </View>
  )
}

export default ob(Item)
