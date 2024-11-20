/*
 * @Author: czy0729
 * @Date: 2019-09-10 20:58:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 11:00:26
 */
import React from 'react'
import { View } from 'react-native'
import { Avatar, Flex, Text, TextType } from '@components'
import { IconBack, IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { tinygrailOSS, toFixed } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import Rank from '@tinygrail/_/rank'
import { calculateRate } from '@tinygrail/_/utils'
import { Ctx } from '../types'
import { memoStyles } from './styles'

function Header() {
  const { $, navigation } = useStore<Ctx>()
  const styles = memoStyles()
  const { icon, name = '', fluctuation, rate, level, rank, stars } = $.chara
  let color: TextType = 'tinygrailPlain'
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
    <Flex style={styles.container}>
      <Flex.Item>
        <Flex>
          <IconBack style={styles.back} navigation={navigation} color={_.colorTinygrailPlain} />
          {!!icon && (
            <View style={styles.avatar}>
              <Avatar
                src={tinygrailOSS(icon)}
                size={40}
                borderColor='transparent'
                skeletonType='tinygrail'
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
            </View>
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
              <Text style={_.ml.xs} type={color} size={12} lineHeight={13} align='center' bold>
                {fluctuationText}
              </Text>
            </Flex>
            <Text style={_.mt.xxs} type='tinygrailText' size={12}>
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
  )
}

export default ob(Header)
