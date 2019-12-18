/*
 * @Author: czy0729
 * @Date: 2019-09-10 20:58:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-19 01:21:42
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Flex, Text } from '@components'
import { Avatar, IconHeader, IconBack } from '@screens/_'
import { _ } from '@stores'
import { toFixed } from '@utils'
import { tinygrailOSS } from '@utils/app'
import { observer } from '@utils/decorators'

function Header(props, { $, navigation }) {
  const { icon, name, fluctuation, bonus } = $.chara
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
                color: _.colorTinygrailPlain
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
        name='licheng'
        size={22}
        color={_.colorIcon}
        onPress={() => {
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
      <IconHeader
        name='k-line'
        color={_.colorIcon}
        onPress={() => {
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
