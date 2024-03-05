/*
 * @Author: czy0729
 * @Date: 2020-11-05 12:14:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-05 18:42:17
 */
import React from 'react'
import { View } from 'react-native'
import { Avatar, Flex, Text, Touchable } from '@components'
import { _ } from '@stores'
import { stl, tinygrailOSS } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../types'
import { memoStyles } from './styles'

function Result({ style }, { $, navigation }: Ctx) {
  const styles = memoStyles()
  const { list } = $.state
  return (
    <View style={style}>
      {list.map((item, index) => (
        <View key={index} style={styles.item}>
          <Flex style={stl(styles.wrap, index !== 0 && !_.flat && styles.border)}>
            {!!item.icon && (
              <View style={_.mr.sm}>
                <Avatar
                  src={tinygrailOSS(item.icon)}
                  size={28}
                  borderColor='transparent'
                  skeletonType='tinygrail'
                  onPress={() => {
                    t('人物直达.跳转', {
                      to: 'Mono',
                      monoId: item.id
                    })

                    navigation.push('Mono', {
                      monoId: `character/${item.id}`,
                      _name: item.name
                    })
                  }}
                />
              </View>
            )}
            <Flex.Item>
              <Touchable
                onPress={() => {
                  $.addHistory(item.id)

                  if (item.ico) {
                    t('人物直达.跳转', {
                      to: 'TinygrailICODeal',
                      monoId: item.id
                    })
                    navigation.push('TinygrailICODeal', {
                      monoId: `character/${item.id}`
                    })
                    return
                  }

                  t('人物直达.跳转', {
                    to: 'TinygrailDeal',
                    monoId: item.id
                  })
                  navigation.push('TinygrailDeal', {
                    monoId: `character/${item.id}`,
                    type: 'asks'
                  })
                }}
              >
                <Text type='tinygrailPlain' bold>
                  <Text type='bid'>{item.ico ? '[ICO] ' : ''}</Text>
                  {item.name} #{item.id}
                </Text>
              </Touchable>
            </Flex.Item>
          </Flex>
        </View>
      ))}
    </View>
  )
}

export default obc(Result)
