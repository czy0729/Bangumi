/*
 * @Author: czy0729
 * @Date: 2019-09-10 20:58:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-04-19 22:55:13
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { Flex, Text } from '@components'
import { Avatar, IconBack } from '@screens/_'
import { _ } from '@stores'
import { toFixed } from '@utils'
import { tinygrailOSS } from '@utils/app'
import { observer } from '@utils/decorators'
import { t } from '@utils/fetch'

function Header(props, { $, navigation }) {
  const styles = memoStyles()
  const { icon, name, fluctuation, bonus, rate, level } = $.chara
  let color = 'tinygrailPlain'
  if (fluctuation < 0) {
    color = 'ask'
  } else if (fluctuation > 0) {
    color = 'bid'
  }

  let fluctuationText = ''
  if (fluctuation > 0) {
    fluctuationText = `+${toFixed(fluctuation, 2)}%`
  } else if (fluctuation < 0) {
    fluctuationText = `${toFixed(fluctuation, 2)}%`
  }

  return (
    <View>
      {_.isPad && (
        <IconBack
          style={styles.backIsPad}
          navigation={navigation}
          color={_.colorTinygrailPlain}
        />
      )}
      <Flex style={styles.container}>
        <Flex.Item>
          <Flex>
            {!_.isPad && (
              <IconBack
                style={styles.back}
                navigation={navigation}
                color={_.colorTinygrailPlain}
              />
            )}
            <Avatar
              style={styles.avatar}
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
                <Text type='tinygrailPlain' numberOfLines={1}>
                  {name}
                  {!!bonus && (
                    <Text type='warning' size={12} lineHeight={14}>
                      {' '}
                      x{bonus}
                    </Text>
                  )}
                  <Text type='ask' size={12} lineHeight={14}>
                    {' '}
                    lv{level}
                  </Text>
                </Text>
                <Text style={_.ml.sm} type={color} align='center'>
                  {fluctuationText}
                </Text>
              </Flex>
              <Text type='tinygrailText' size={12} lineHeight={13}>
                #{$.monoId} / +{toFixed(rate, 2)} / +
                {toFixed(rate * (level + 1) * 0.3, 2)}
              </Text>
            </Flex.Item>
          </Flex>
        </Flex.Item>
        <Text
          style={styles.sacrifice}
          type='tinygrailText'
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
          style={styles.trade}
          type='tinygrailText'
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
    </View>
  )
}

Header.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Header)

const memoStyles = _.memoStyles(_ => ({
  container: {
    paddingVertical: _.space,
    paddingLeft: _.wind,
    paddingRight: _.isPad ? _.wind - _._wind : 8
  },
  back: {
    marginLeft: -8
  },
  backIsPad: {
    position: 'absolute',
    zIndex: 1,
    top: 24,
    left: _._wind
  },
  avatar: {
    backgroundColor: _.tSelect(_._colorDarkModeLevel2, _.colorTinygrailBg)
  },
  sacrifice: {
    paddingVertical: _.sm
  },
  trade: {
    paddingVertical: _.sm,
    marginHorizontal: _.sm
  }
}))
