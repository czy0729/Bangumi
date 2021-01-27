/*
 * @Author: czy0729
 * @Date: 2019-09-01 22:34:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-27 10:25:55
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text } from '@components'
import { Avatar, IconHeader } from '@screens/_'
import { _ } from '@stores'
import { toFixed } from '@utils'
import { tinygrailOSS } from '@utils/app'
import { t } from '@utils/fetch'
import { obc } from '@utils/decorators'
import Today from './today'

function Header({ goBack }, { $, navigation }) {
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
              style={{
                marginLeft: -8
              }}
              name='left'
              color={_.colorTinygrailPlain}
              onPress={goBack}
            />
            <Avatar
              style={styles.avatar}
              src={tinygrailOSS(icon)}
              size={32}
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
              style={_.ml.sm}
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
            <Text
              style={[
                {
                  paddingVertical: _.sm
                },
                _.ml.sm
              ]}
              type='tinygrailText'
              size={15}
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
            >
              [资产重组]
            </Text>
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
        <Today
          style={[
            _.ml.sm,
            {
              marginBottom: 4
            }
          ]}
        />
      </Flex>
    </View>
  )
}

export default obc(Header, {
  goBack: Function.prototype
})

const memoStyles = _.memoStyles(_ => ({
  container: {
    zIndex: 1,
    paddingTop: _.space,
    paddingHorizontal: _._wind,
    paddingBottom: _.sm
  },
  avatar: {
    backgroundColor: _.tSelect(_._colorDarkModeLevel2, _.colorTinygrailBg)
  }
}))
