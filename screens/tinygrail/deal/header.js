/*
 * @Author: czy0729
 * @Date: 2019-09-10 20:58:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-01-24 23:20:12
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Flex, Text } from '@components'
import { Avatar, IconBack } from '@screens/_'
import { _ } from '@stores'
import { toFixed } from '@utils'
import { tinygrailOSS } from '@utils/app'
import { observer } from '@utils/decorators'
import { t } from '@utils/fetch'

function Header(props, { $, navigation }) {
  const { icon, name, fluctuation, bonus, rate } = $.chara
  let color = _.colorTinygrailPlain
  if (fluctuation < 0) {
    color = _.colorAsk
  } else if (fluctuation > 0) {
    color = _.colorBid
  }

  let fluctuationText = '- %'
  if (fluctuation > 0) {
    fluctuationText = `+${toFixed(fluctuation, 2)}%`
  } else if (fluctuation < 0) {
    fluctuationText = `${toFixed(fluctuation, 2)}%`
  }

  return (
    <Flex style={styles.container}>
      <Flex.Item>
        <Flex>
          <IconBack
            style={{
              marginLeft: -8
            }}
            navigation={navigation}
          />
          <Avatar
            src={tinygrailOSS(icon)}
            size={32}
            borderColor='transparent'
            name={name}
            onPress={() => {
              t('交易.跳转', {
                to: 'Mono',
                monoId: $.monoId
              })

              navigation.push('Mono', {
                monoId: `character/${$.monoId}`
              })
            }}
          />
          <Flex.Item style={_.ml.sm}>
            <Flex>
              <Text
                style={{
                  color: _.colorTinygrailPlain
                }}
                size={16}
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
            <Text
              style={{
                color: _.colorTinygrailText
              }}
              size={12}
              lineHeight={17}
            >
              +{toFixed(rate, 2)}
            </Text>
          </Flex.Item>
        </Flex>
      </Flex.Item>
      <Text
        style={{
          paddingVertical: _.sm,
          color: _.colorTinygrailText
        }}
        size={15}
        onPress={() => {
          t('交易.跳转', {
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
            form: 'deal'
          })
        }}
      >
        [资产重组]
      </Text>
      <Text
        style={[
          {
            paddingVertical: _.sm,
            color: _.colorTinygrailText
          },
          _.ml.sm,
          _.mr.sm
        ]}
        size={15}
        onPress={() => {
          t('交易.跳转', {
            to: 'TinygrailTrade',
            monoId: $.monoId
          })

          const { form, monoId } = $.params
          if (form === 'trade') {
            navigation.goBack()
            return
          }

          navigation.push('TinygrailTrade', {
            monoId,
            form: 'deal'
          })
        }}
      >
        [K线]
      </Text>
    </Flex>
  )
}

Header.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Header)

const styles = StyleSheet.create({
  container: {
    paddingVertical: _.wind,
    paddingLeft: _.wind,
    paddingRight: 8
  }
})
