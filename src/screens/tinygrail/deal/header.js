/*
 * @Author: czy0729
 * @Date: 2019-09-10 20:58:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-27 10:12:49
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text } from '@components'
import { Avatar, IconBack } from '@screens/_'
import { _ } from '@stores'
import { toFixed } from '@utils'
import { tinygrailOSS } from '@utils/app'
import { obc } from '@utils/decorators'
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

  const { subject, r } = $.relation
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
            {!!icon && (
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
                    monoId: `character/${$.monoId}`,
                    _name: name
                  })
                }}
              />
            )}
            <Flex.Item style={_.ml.sm}>
              <Flex>
                <Text type='tinygrailPlain' size={13} numberOfLines={1} bold>
                  {name}
                  {!!bonus && (
                    <Text type='warning' size={12} lineHeight={13}>
                      {' '}
                      x{bonus}
                    </Text>
                  )}
                  <Text type='ask' size={12} lineHeight={13}>
                    {' '}
                    lv{level}
                  </Text>
                </Text>
                <Text
                  style={_.ml.xs}
                  type={color}
                  size={12}
                  lineHeight={13}
                  align='center'
                >
                  {fluctuationText}
                </Text>
              </Flex>
              <Text type='tinygrailText' size={11} lineHeight={13}>
                #{$.monoId} / +{toFixed(rate, 2)} / +
                {toFixed(rate * (level + 1) * 0.3, 2)}
                {!!subject && (
                  <Text
                    type='tinygrailText'
                    size={11}
                    onPress={() => {
                      navigation.push('TinygrailRelation', {
                        ids: r,
                        name: `${subject} (${r.length})`
                      })
                    }}
                  >
                    {' '}
                    [关联]
                  </Text>
                )}
              </Text>
            </Flex.Item>
          </Flex>
        </Flex.Item>
        <Text
          style={styles.sacrifice}
          type='tinygrailText'
          size={13}
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
          size={13}
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

export default obc(Header)

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
    marginLeft: -_.sm,
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
