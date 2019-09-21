/*
 * @Author: czy0729
 * @Date: 2019-09-01 22:34:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-22 01:26:09
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from '@utils/decorators'
import { Flex, Text } from '@components'
import { Avatar } from '@screens/_'
import _ from '@styles'
import { colorBid, colorAsk } from '../../styles'
import Today from './today'

function Header(props, { $, navigation }) {
  const { icon, name, current, fluctuation, bonus } = $.chara

  let color = _.colorPlain
  if (fluctuation < 0) {
    color = colorAsk
  } else if (fluctuation > 0) {
    color = colorBid
  }

  let fluctuationText = '-%'
  if (fluctuation > 0) {
    fluctuationText = `+${fluctuation.toFixed(2)}%`
  } else if (fluctuation < 0) {
    fluctuationText = `${fluctuation.toFixed(2)}%`
  }

  return (
    <View style={styles.container}>
      <Flex align='end'>
        <Flex.Item>
          <Flex>
            <Avatar
              src={icon}
              size={32}
              borderColor='transparent'
              onPress={() =>
                navigation.push('Mono', {
                  monoId: `character/${$.monoId}`
                })
              }
            />
            <Text style={_.ml.sm} size={16} type='plain' numberOfLines={1}>
              {name}
              {!!bonus && (
                <Text size={12} lineHeight={16} type='warning'>
                  {' '}
                  X{bonus}
                </Text>
              )}
            </Text>
          </Flex>
          <Flex style={_.mt.md}>
            <Text size={24} type='plain'>
              {current && current.toFixed(2)}
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

Header.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Header)

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    paddingTop: _.wind,
    paddingHorizontal: _.wind,
    paddingBottom: _.sm
  }
})
