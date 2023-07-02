/*
 * @Author: czy0729
 * @Date: 2023-07-03 06:53:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-07-03 07:04:59
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, Touchable } from '@components'
import { _ } from '@stores'
import { findSubjectCn, HTMLDecode, stl } from '@utils'
import { ob } from '@utils/decorators'
import { SubjectTypeCn } from '@types'
import { Cover } from '../../cover'
import { HIT_SLOP } from './ds'

function Item({
  item,
  count,
  width,
  height,
  quality,
  findCn,
  ellipsizeMode,
  isFirst,
  onPress,
  onSubPress
}) {
  const desc = String(item.desc || '')
  let typeCn: SubjectTypeCn | '' = ''
  if (
    (!desc.includes('演出') && desc.includes('曲')) ||
    (!desc.includes('演出') && desc.includes('歌')) ||
    desc.includes('声') ||
    desc.includes('广播')
  ) {
    typeCn = '音乐'
  } else if (desc.includes('书籍')) {
    typeCn = '书籍'
  } else if (desc.includes('游戏')) {
    typeCn = '游戏'
  }

  const isMusic = typeCn === '音乐'
  const w = _.r(isMusic ? width * 1.16 : width)

  const title = findCn ? findSubjectCn(item.name, item.id) : item.name
  const { length } = title
  const size = length >= 12 ? 9 : length >= 5 ? 10 : 11

  const descSize = desc.length >= 6 ? 9 : 10
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
        onPress={() => onPress(item, typeCn)}
      >
        <Cover
          size={w}
          height={_.r(height)}
          src={item.image}
          radius={isMusic ? _.radiusSm : true}
          shadow
          quality={quality}
          type={typeCn}
        />
        <Text
          style={_.mt.sm}
          size={size}
          numberOfLines={typeCn === '音乐' ? 3 : 2}
          ellipsizeMode={ellipsizeMode}
          bold
        >
          {HTMLDecode(title)}
        </Text>
        {!!desc && (
          <Touchable
            style={_.mt.xs}
            animate
            scale={0.85}
            onPress={() => (onSubPress || onPress)(item, typeCn)}
          >
            <Flex>
              {!!item.actorCover && (
                <Cover
                  style={this.styles.actor}
                  src={item.actorCover}
                  size={16}
                  radius
                />
              )}
              <Flex.Item>
                <Text type='sub' size={descSize} numberOfLines={2} bold>
                  {desc}
                </Text>
              </Flex.Item>
            </Flex>
          </Touchable>
        )}
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
