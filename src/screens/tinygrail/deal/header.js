/*
 * @Author: czy0729
 * @Date: 2019-09-10 20:58:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-20 10:03:18
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text } from '@components'
import { Avatar, IconBack, IconTouchable } from '@screens/_'
import { _ } from '@stores'
import { toFixed } from '@utils'
import { tinygrailOSS } from '@utils/app'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import Rank from '@tinygrail/_/rank'
import { calculateRate } from '@tinygrail/_/utils'

function Header(props, { $, navigation }) {
  const styles = memoStyles()
  const { icon, name, fluctuation, rate, level, rank, stars } = $.chara
  let color = 'tinygrailPlain'
  let fluctuationText = ''
  if (fluctuation > 0) {
    color = 'bid'
    fluctuationText = `+${toFixed(fluctuation, 2)}%`
  } else if (fluctuation < 0) {
    color = 'ask'
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
                size={40}
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
                <Rank value={rank} />
                <Text
                  type='tinygrailPlain'
                  size={name.length > 12 ? 11 : name.length > 8 ? 13 : 14}
                  numberOfLines={1}
                  lineHeight={13}
                  bold
                >
                  {name}
                </Text>
                <Text style={_.ml.xs} type='ask' size={11} bold lineHeight={13}>
                  lv{level}
                </Text>
                <Text
                  style={_.ml.xs}
                  type={color}
                  size={12}
                  lineHeight={13}
                  align='center'
                  bold
                >
                  {fluctuationText}
                </Text>
              </Flex>
              <Text style={_.mt.xs} type='tinygrailText' size={12}>
                #{$.monoId} / +{toFixed(rate, 1)} (
                {Number(toFixed(calculateRate(rate, rank, stars), 1))})
              </Text>
            </Flex.Item>
          </Flex>
        </Flex.Item>
        <Flex>
          <IconTouchable
            name='md-workspaces-outline'
            color={_.colorTinygrailPlain}
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
          />
          <IconTouchable
            style={_.ml._xs}
            name='md-waterfall-chart'
            color={_.colorTinygrailPlain}
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
          />
          {!!subject && (
            <IconTouchable
              style={_.ml._xs}
              name='md-compare-arrows'
              color={_.colorTinygrailPlain}
              onPress={() => {
                navigation.push('TinygrailRelation', {
                  ids: r,
                  name: `${subject} (${r.length})`
                })
              }}
            />
          )}
        </Flex>
      </Flex>
    </View>
  )
}

export default obc(Header)

const memoStyles = _.memoStyles(_ => ({
  container: {
    paddingVertical: _.sm,
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
  }
}))
