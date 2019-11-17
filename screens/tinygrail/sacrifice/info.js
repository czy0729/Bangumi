/*
 * @Author: czy0729
 * @Date: 2019-11-17 12:10:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-11-17 20:11:27
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { Flex, Text, Image } from '@components'
import { formatNumber } from '@utils'
import { observer } from '@utils/decorators'
import { tinygrailOSS, getCoverLarge } from '@utils/app'
import _ from '@styles'
import { colorText, colorBid, colorAsk } from '../styles'

const maxSize = _.window.width / 2

function Info(props, { $ }) {
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
      <Text style={_.mt.md} size={16} type='plain' align='center'>
        #{id} - {name}
        {!!bonus && (
          <Text size={12} lineHeight={16} type='warning'>
            {' '}
            X{bonus}
          </Text>
        )}
      </Text>
      <Flex style={_.mt.md} justify='center' align='baseline'>
        <Text
          style={{
            color: colorText
          }}
        >
          市值{formatNumber(marketValue, 0)} / 量{formatNumber(total, 0)} / ₵
          {current && current.toFixed(2)}
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
  $: PropTypes.object
}

export default observer(Info)

const styles = StyleSheet.create({
  container: {
    padding: _.wind
  }
})
