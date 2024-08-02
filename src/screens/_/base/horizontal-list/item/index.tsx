/*
 * @Author: czy0729
 * @Date: 2023-07-03 06:53:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-21 21:10:02
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

function Item({ item, count, width, height, findCn, ellipsizeMode, isFirst, onPress, onSubPress }) {
  const desc = String(item.desc || '')
  let typeCn: SubjectTypeCn | '' = ''
  if (
    (!desc.includes('演出') && desc.includes('曲') && desc !== '作曲') ||
    (!desc.includes('演出') && desc.includes('歌')) ||
    desc.includes('声') ||
    desc.includes('广播')
  ) {
    typeCn = '音乐'
  } else if (desc.includes('书籍') || desc.includes('画')) {
    typeCn = '书籍'
  } else if (desc.includes('游戏')) {
    typeCn = '游戏'
  }

  const isMusic = typeCn === '音乐'
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
          type={typeCn}
        />
        <Title
          id={item.id}
          name={item.name}
          findCn={findCn}
          typeCn={typeCn}
          ellipsizeMode={ellipsizeMode}
        />
        <Desc item={item} typeCn={typeCn} onPress={onSubPress || onPress} />
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
