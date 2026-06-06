/*
 * @Author: czy0729
 * @Date: 2023-07-03 06:53:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-06 17:40:38
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { stl } from '@utils'
import { Cover } from '../../cover'
import { Text } from '../../text'
import { Touchable } from '../../touchable'
import Desc from './desc'
import Title from './title'
import { getTypeCn } from './utils'
import { HIT_SLOP } from './ds'

import type { ItemData } from '../types'
import type { Props } from './types'

function Item<T extends ItemData>({
  item,
  count,
  width = 60,
  height = 60,
  findCn,
  ellipsizeMode,
  isFirst,
  typeCn,
  relationTypeCn,
  onPress,
  onSubPress
}: Props<T>) {
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
          onPress?.(item, typeCn)
        }}
      >
        <Cover
          size={w}
          height={_.r(height)}
          src={item.image}
          radius={_.radiusSm}
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

export default observer(Item) as <T extends ItemData>(props: Props<T>) => React.JSX.Element
