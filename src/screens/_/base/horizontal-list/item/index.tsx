/*
 * @Author: czy0729
 * @Date: 2023-07-03 06:53:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-18 08:28:05
 */
import React from 'react'
import { View } from 'react-native'
import { Cover, Text, Touchable } from '@components'
import { _ } from '@stores'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { SubjectTypeCn } from '@types'
import Desc from './desc'
import Title from './title'
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
  const desc = String(item.desc || '')
  let typeCnValue: SubjectTypeCn | '' = typeCn || ''
  if (!typeCnValue) {
    if (
      (!desc.includes('演出') && desc.includes('曲') && desc !== '作曲') ||
      (!desc.includes('演出') && desc.includes('歌')) ||
      desc.includes('声') ||
      desc.includes('广播')
    ) {
      typeCnValue = '音乐'
    } else if (desc.includes('书籍') || desc.includes('画')) {
      typeCnValue = '书籍'
    } else if (desc.includes('游戏')) {
      typeCnValue = '游戏'
    } else if (relationTypeCn && (desc.includes('不同演绎') || desc.includes('相同世界观'))) {
      typeCnValue = relationTypeCn
    }
  }

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
      <Touchable animate scale={0.9} hitSlop={HIT_SLOP} onPress={() => onPress(item, typeCn)}>
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
