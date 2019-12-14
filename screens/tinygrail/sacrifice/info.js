/*
 * @Author: czy0729
 * @Date: 2019-11-17 12:10:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-14 11:55:52
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { Flex, Text, Image, Iconfont, Touchable } from '@components'
import { _ } from '@stores'
import { formatNumber } from '@utils'
import { observer } from '@utils/decorators'
import { tinygrailOSS, getCoverLarge } from '@utils/app'

const maxSize = _.window.width / 3

function Info(props, { $, navigation }) {
  const {
    icon,
    id,
    name,
    bonus,
    marketValue,
    current,
    total,
    fluctuation
  } = $.chara
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
      {!!icon && (
        <Flex justify='center'>
          <Image
            src={tinygrailOSS(getCoverLarge(icon))}
            autoSize={maxSize}
            shadow
            placholder={false}
            imageViewer
            imageViewerSrc={tinygrailOSS(getCoverLarge(icon), 480)}
          />
        </Flex>
      )}
      <Touchable
        style={_.mt.md}
        onPress={() =>
          navigation.push('Mono', {
            monoId: `character/${id}`
          })
        }
      >
        <Flex justify='center'>
          <Text
            style={{
              color: _.colorTinygrailPlain
            }}
            size={16}
          >
            #{id} - {name}
            {!!bonus && (
              <Text size={12} lineHeight={16} type='warning'>
                {' '}
                X{bonus}
              </Text>
            )}
          </Text>
          <Iconfont
            style={_.ml.sm}
            name='right'
            size={16}
            color={_.colorTinygrailText}
          />
        </Flex>
      </Touchable>
      <Flex style={_.mt.md} justify='center' align='baseline'>
        <Text
          style={{
            color: _.colorTinygrailText
          }}
        >
          市值{formatNumber(marketValue, 0)} / 量{formatNumber(total, 0)} /
          发行价 ₵{$.issuePrice.toFixed(1)} / ₵{current && current.toFixed(2)}
        </Text>
        <Text
          style={[
            _.ml.sm,
            {
              color
            }
          ]}
          align='center'
        >
          {fluctuationText}
        </Text>
      </Flex>
    </View>
  )
}

Info.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Info)

const styles = StyleSheet.create({
  container: {
    padding: _.wind
  }
})
