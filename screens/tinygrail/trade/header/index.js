/*
 * @Author: czy0729
 * @Date: 2019-09-01 22:34:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-09 22:04:38
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from '@utils/decorators'
import { Flex, Text } from '@components'
import { Avatar, IconHeader } from '@screens/_'
import { _ } from '@stores'
import { tinygrailOSS } from '@utils/app'
import Today from './today'

function Header({ goBack }, { $, navigation }) {
  const { icon, name, current, fluctuation, bonus } = $.chara
  let color = _.colorTinygrailPlain
  if (fluctuation < 0) {
    color = _.colorAsk
  } else if (fluctuation > 0) {
    color = _.colorBid
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
            <IconHeader
              style={{
                marginLeft: -8
              }}
              name='left'
              color={_.colorTinygrailPlain}
              onPress={goBack}
            />
            <Avatar
              src={tinygrailOSS(icon)}
              size={32}
              borderColor='transparent'
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
            <IconHeader
              style={_.ml.sm}
              name='licheng'
              color={_.colorIcon}
              onPress={() => {
                const { form, monoId } = $.params
                if (form === 'sacrifice') {
                  navigation.goBack()
                  return
                }

                navigation.push('TinygrailSacrifice', {
                  monoId,
                  form: 'kline'
                })
              }}
            />
          </Flex>
          <Flex style={_.mt.md}>
            <Text
              style={{
                color: _.colorTinygrailPlain
              }}
              size={24}
            >
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

Header.defaultProps = {
  goBack: Function.prototype
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
