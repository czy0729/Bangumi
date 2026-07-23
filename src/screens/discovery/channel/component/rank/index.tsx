/*
 * @Author: czy0729
 * @Date: 2020-05-04 18:42:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-05 20:35:24
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Text } from '@components'
import { IconNavigate, SectionTitle } from '@_'
import { _, useStore } from '@stores'
import { t } from '@utils/fetch'
import ItemLg from './item-lg'
import ItemSm from './item-sm'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function Rank() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const styles = memoStyles()

  const { rank = [] } = $.channel
  const top = rank.slice(0, 3)
  const bottom = rank.slice(3)

  return (
    <View style={_.mt.md}>
      <SectionTitle
        style={_.container.wind}
        left={
          <Text style={_.ml.sm} type='sub' size={12} lineHeight={20}>
            根据最近 30 日标记
          </Text>
        }
        right={
          <IconNavigate
            onPress={() => {
              navigation.push('Rank', {
                type: $.type
              })

              t('频道.跳转', {
                to: 'Rank',
                from: '关注榜',
                type: $.type
              })
            }}
          />
        }
      >
        注目榜
      </SectionTitle>

      <View style={_.mt.sm}>
        {top.map((item, index) => (
          <ItemLg key={item.id} item={item} index={index} />
        ))}

        {!!bottom.length && (
          <Flex style={styles.container} wrap='wrap'>
            {bottom.map((item, index) => (
              <ItemSm key={item.id} item={item} index={index} />
            ))}
          </Flex>
        )}
      </View>
    </View>
  )
}

export default observer(Rank)
