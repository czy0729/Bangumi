/*
 * @Author: czy0729
 * @Date: 2021-02-28 14:52:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 05:45:25
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Image, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { formatNumber, tinygrailOSS } from '@utils'
import Stars from '@tinygrail/_/stars'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'

function Item({ id, size, icon, name, rank, stars, starForces, hover, isDisabled }) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  return (
    <View>
      <Touchable
        withoutFeedback
        onPress={() => {
          $.setHover(id)
        }}
      >
        <Image
          style={isDisabled && styles.disabled}
          src={tinygrailOSS(icon)}
          size={_.window.width * (size === 'lg' ? 0.25 : 0.2)}
          radius={0}
          skeletonType='tinygrail'
        />
      </Touchable>
      {hover && (
        <Touchable
          style={styles.hover}
          useRN
          onPress={() => {
            navigation.push('TinygrailSacrifice', {
              monoId: `character/${id}`
            })
          }}
        >
          <Flex style={_.container.flex} direction='column' justify='center'>
            <Text type='__plain__' size={12} bold align='center'>
              第{rank}位
            </Text>
            <Text align='center' numberOfLines={1}>
              <Stars value={stars} />
            </Text>
            <Text style={_.mt.xxs} type='__plain__' size={10} bold align='center' numberOfLines={2}>
              {name}
            </Text>
            <Text type='__plain__' size={10} bold align='center'>
              +{formatNumber(starForces, 0)}
            </Text>
          </Flex>
        </Touchable>
      )}
    </View>
  )
}

export default observer(Item)
