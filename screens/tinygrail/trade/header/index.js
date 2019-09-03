/*
 * @Author: czy0729
 * @Date: 2019-09-01 22:34:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-03 21:49:30
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from '@utils/decorators'
import { Flex, Text } from '@components'
import { Avatar } from '@screens/_'
import _ from '@styles'
import { m15, h1, h4, h12, d1, w1, month1 } from '../store'
import Today from './today'
import BtnChange from './btn-change'

function Header(props, { $, navigation }) {
  const { icon, name, current, fluctuation, bonus } = $.chara

  let color = 'rgb(255, 255, 255)'
  if (fluctuation < 0) {
    color = 'rgb(209, 77, 100)'
  } else if (fluctuation > 0) {
    color = 'rgb(0, 173, 146)'
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
          <Flex style={_.mt.md} align='baseline'>
            <Text size={24} type='plain'>
              {current.toFixed(2)}
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
      <Flex style={[styles.bar, _.mt.md]} justify='between'>
        <BtnChange value={m15} text='15分钟' />
        <BtnChange value={h1} text='1小时' />
        <BtnChange value={h4} text='4小时' />
        <BtnChange value={h12} text='12小时' />
        <BtnChange value={d1} text='1日' />
        <BtnChange value={w1} text='1周' />
        <BtnChange value={month1} text='1月' />
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
    paddingBottom: _.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(25, 36, 53)'
  },
  bar: {
    paddingLeft: 2
  }
})
