/*
 * @Author: czy0729
 * @Date: 2019-09-10 20:58:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-08 21:01:08
 */
import React from 'react'
import { View } from 'react-native'
import { Avatar, Flex, Text } from '@components'
import { IconBack, IconTouchable, StatusBarPlaceholder } from '@_'
import { _, useStore } from '@stores'
import { tinygrailOSS, toFixed } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import Rank from '@tinygrail/_/rank'
import { calculateRate } from '@tinygrail/_/utils'
import { ViewStyle } from '@types'
import { Ctx } from '../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Header() {
  const { $, navigation } = useStore<Ctx>()
  const styles = memoStyles()

  const { icon, name = '', fluctuation, rate, level, rank, stars } = $.chara
  let fluctuationText = ''
  if (fluctuation > 0) {
    fluctuationText = `+${toFixed(fluctuation, 2)}%`
  } else if (fluctuation < 0) {
    fluctuationText = `${toFixed(fluctuation, 2)}%`
  } else {
    fluctuationText = '0.00%'
  }

  const fluctuationStyle: ViewStyle[] = [styles.fluctuation, _.ml.sm]
  if (fluctuation < 0) {
    fluctuationStyle.push(styles.danger)
  } else if (fluctuation > 0) {
    fluctuationStyle.push(styles.success)
  } else {
    fluctuationStyle.push(styles.plain)
  }

  const { subject, r } = $.relation
  return (
    <>
      <StatusBarPlaceholder style={styles.dark} />
      <Flex style={styles.container}>
        <Flex.Item>
          <Flex>
            <IconBack style={styles.back} navigation={navigation} color={_.colorTinygrailPlain} />
            {!!icon && (
              <View style={styles.avatar}>
                <Avatar
                  src={tinygrailOSS(icon)}
                  size={36}
                  name={name}
                  borderColor='transparent'
                  skeletonType='tinygrail'
                  radius={_.radiusXs}
                  onPress={() => {
                    navigation.push('Mono', {
                      monoId: `character/${$.monoId}`,
                      _name: name
                    })

                    t('交易.跳转', {
                      to: 'Mono',
                      monoId: $.monoId
                    })
                  }}
                />
              </View>
            )}
            <Flex.Item style={_.ml.sm}>
              <Flex>
                <Rank value={rank} />
                <Text
                  type='tinygrailPlain'
                  size={name.length > 12 ? 11 : name.length > 8 ? 12 : 13}
                  numberOfLines={1}
                  lineHeight={13}
                  bold
                  shrink
                >
                  {name}
                </Text>
                <Text style={_.ml.xs} type='ask' size={11} bold lineHeight={13}>
                  lv{level}
                </Text>
                <Text
                  style={[
                    {
                      color: _.__colorPlain__
                    },
                    fluctuationStyle
                  ]}
                  size={10}
                  lineHeight={14}
                  align='center'
                  bold
                >
                  {fluctuationText}
                </Text>
              </Flex>
              <Text style={_.mt.xs} type='tinygrailText' size={10} bold>
                #{$.monoId} / +{toFixed(rate, 1)} (
                {Number(toFixed(calculateRate(rate, rank, stars), 1))})
              </Text>
            </Flex.Item>
          </Flex>
        </Flex.Item>
        <Flex style={_.mr._sm}>
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
    </>
  )
}

export default ob(Header, COMPONENT)
