/*
 * @Author: czy0729
 * @Date: 2019-09-10 20:58:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-18 00:39:09
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Flex, Text } from '@components'
import { Avatar, IconHeader } from '@screens/_'
import { observer } from '@utils/decorators'
import _ from '@styles'
import { colorBid, colorAsk } from '../../styles'

function Header(props, { $, navigation }) {
  const { icon, name, fluctuation, bonus } = $.chara
  let color = _.colorPlain
  if (fluctuation < 0) {
    color = colorAsk
  } else if (fluctuation > 0) {
    color = colorBid
  }

  let fluctuationText = '- %'
  if (fluctuation > 0) {
    fluctuationText = `+${fluctuation.toFixed(2)}%`
  } else if (fluctuation < 0) {
    fluctuationText = `${fluctuation.toFixed(2)}%`
  }

  return (
    <Flex style={styles.container}>
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
          <Text
            style={[
              _.ml.sm,
              {
                color: _.colorPlain
              }
            ]}
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
      </Flex.Item>
      <IconHeader
        name='k-line'
        color={_.colorIcon}
        onPress={() => {
          const { form, monoId } = $.params
          if (form === 'item') {
            navigation.goBack()
            setTimeout(() => {
              navigation.push('TinygrailTrade', {
                monoId
              })
            }, 300)
          }

          navigation.goBack()
        }}
      />
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
