/*
 * @Author: czy0729
 * @Date: 2019-09-01 22:34:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-04 19:36:08
 */
import React from 'react'
import { View } from 'react-native'
import { Avatar, Flex, Text } from '@components'
import { IconHeader, IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { tinygrailOSS, toFixed } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { FROZEN_FN } from '@constants'
import { Ctx } from '../types'
import Today from './today'
import { memoStyles } from './styles'

function Header({ goBack = FROZEN_FN }) {
  const { $, navigation } = useStore<Ctx>()
  const styles = memoStyles()
  const { icon, name, current, fluctuation } = $.chara
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
              src={tinygrailOSS(icon)}
              size={36}
              borderColor='transparent'
              name={name}
              skeletonType='tinygrail'
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
            <Text style={_.ml.sm} type='tinygrailPlain' bold numberOfLines={1}>
              {name}
            </Text>
            <IconTouchable
              name='md-workspaces-outline'
              color={_.colorTinygrailPlain}
              size={18}
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

export default ob(Header)
