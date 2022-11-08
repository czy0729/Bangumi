/*
 * @Author: czy0729
 * @Date: 2020-11-05 12:14:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-09 06:33:07
 */
import React from 'react'
import { View } from 'react-native'
import { Touchable, Flex, Text } from '@components'
import { Avatar } from '@_'
import { _ } from '@stores'
import { tinygrailOSS } from '@utils'
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
          <Flex style={[styles.wrap, index !== 0 && !_.flat && styles.border]}>
            {!!item.icon && (
              <Avatar
                style={styles.avatar}
                src={tinygrailOSS(item.icon)}
                size={28}
                borderColor='transparent'
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
