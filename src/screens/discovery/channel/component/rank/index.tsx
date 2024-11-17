/*
 * @Author: czy0729
 * @Date: 2020-05-04 18:42:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 07:29:30
 */
import React from 'react'
import { View } from 'react-native'
import { Flex } from '@components'
import { IconNavigate, SectionTitle } from '@_'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../../types'
import ItemLg from './item-lg'
import ItemSm from './item-sm'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Rank() {
  const { $, navigation } = useStore<Ctx>()
  const styles = memoStyles()
  const { rank = [] } = $.channel
  const top = rank.slice(0, 3)
  const bottom = rank.slice(3)
  return (
    <View style={_.mt.md}>
      <SectionTitle
        style={_.container.wind}
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

export default ob(Rank, COMPONENT)
