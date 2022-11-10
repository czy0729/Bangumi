/*
 * @Author: czy0729
 * @Date: 2019-09-01 22:34:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-11 04:22:11
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text } from '@components'
import { Avatar, IconHeader, IconTouchable } from '@_'
import { _ } from '@stores'
import { toFixed, tinygrailOSS } from '@utils'
import { t } from '@utils/fetch'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import Today from './today'
import { memoStyles } from './styles'

function Header({ goBack = () => {} }, { $, navigation }: Ctx) {
  const styles = memoStyles()
  const { icon, name, current, fluctuation, bonus } = $.chara
  let color = _.colorTinygrailPlain
  if (fluctuation < 0) {
    color = _.colorAsk
  } else if (fluctuation > 0) {
    color = _.colorBid
  }

  let fluctuationText = '-%'
  if (fluctuation > 0) {
    fluctuationText = `+${toFixed(fluctuation, 2)}%`
  } else if (fluctuation < 0) {
    fluctuationText = `${toFixed(fluctuation, 2)}%`
  }

  return (
    <View style={styles.container}>
      <Flex align='end'>
        <Flex.Item>
          <Flex>
            <IconHeader
              style={_.ml._sm}
              name='md-arrow-back'
              color={_.colorTinygrailPlain}
              onPress={goBack}
            />
            <Avatar
              style={styles.avatar}
              src={tinygrailOSS(icon)}
              borderColor='transparent'
              name={name}
              onPress={() => {
                t('K线.跳转', {
                  to: 'Mono',
                  monoId: $.monoId
                })

                navigation.push('Mono', {
                  monoId: `character/${$.monoId}`,
                  _name: name
                })
              }}
            />
            <Text
              style={_.ml.md}
              type='tinygrailPlain'
              size={16}
              bold
              numberOfLines={1}
            >
              {name}
              {!!bonus && (
                <Text size={12} lineHeight={16} type='warning'>
                  {' '}
                  X{bonus}
                </Text>
              )}
            </Text>
            <IconTouchable
              name='md-workspaces-outline'
              color={_.colorTinygrailPlain}
              onPress={() => {
                t('K线.跳转', {
                  to: 'TinygrailSacrifice',
                  monoId: $.monoId
                })

                const { form, monoId } = $.params
                if (form === 'sacrifice') {
                  navigation.goBack()
                  return
                }

                navigation.push('TinygrailSacrifice', {
                  monoId,
                  form: 'kline'
                })
              }}
            />
          </Flex>
          <Flex style={_.mt.md}>
            <Text type='tinygrailPlain' size={24}>
              {current && toFixed(current, 2)}
            </Text>
            <Text
              style={[
                _.ml.sm,
                {
                  color
                }
              ]}
              lineHeight={17}
              align='center'
            >
              {fluctuationText}
            </Text>
          </Flex>
        </Flex.Item>
        <Today />
      </Flex>
    </View>
  )
}

export default obc(Header)
