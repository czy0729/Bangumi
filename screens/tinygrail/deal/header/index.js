/*
 * @Author: czy0729
 * @Date: 2019-09-10 20:58:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-13 01:17:51
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Flex, Text } from '@components'
import { Avatar } from '@screens/_'
import { observer } from '@utils/decorators'
import _ from '@styles'
import { colorBid, colorAsk, colorPlain } from '../../styles'

function Header(props, { $, navigation }) {
  const { icon, name, fluctuation, bonus } = $.chara
  let color = colorPlain
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
    <Flex style={styles.container}>
      <Avatar
        src={icon}
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
      <Text
        style={[
          _.ml.md,
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
    paddingHorizontal: _.wind
  }
})
