/*
 * @Author: czy0729
 * @Date: 2020-05-04 18:42:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-21 05:47:34
 */
import React from 'react'
import { View } from 'react-native'
import { Flex } from '@components'
import { IconNavigate, SectionTitle } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../../types'
import ItemLg from './item-lg'
import ItemSm from './item-sm'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Rank(_props, { $, navigation }: Ctx) {
  const styles = memoStyles()
  const { rankTop = [], rank = [] } = $.channel
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
        关注榜
      </SectionTitle>
      <View style={_.mt.sm}>
        {rankTop.map((item, index) => (
          <ItemLg key={item.id} item={item} index={index} />
        ))}
        <Flex style={styles.container} wrap='wrap'>
          {rank.map((item, index) => (
            <ItemSm key={item.id} item={item} index={index} />
          ))}
        </Flex>
      </View>
    </View>
  )
}

export default obc(Rank, COMPONENT)
