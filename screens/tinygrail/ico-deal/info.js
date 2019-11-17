/*
 * @Author: czy0729
 * @Date: 2019-09-20 20:24:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-11-17 21:00:05
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { Flex, Text, Image, Iconfont, Touchable } from '@components'
import { formatNumber } from '@utils'
import { observer } from '@utils/decorators'
import { tinygrailOSS, getCoverLarge, caculateICO } from '@utils/app'
import _ from '@styles'
import Bar from './bar'
import { colorPlain, colorText } from '../styles'

const maxSize = _.window.width / 2

function Info(props, { $, navigation }) {
  const { icon, id, name, total } = $.chara
  const { next, level, price, amount } = caculateICO($.chara)
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
          <Text size={16} type='plain'>
            #{id} - {name}
          </Text>
          <Iconfont style={_.ml.sm} name='right' size={16} color={colorText} />
        </Flex>
      </Touchable>
      <Text
        style={[
          _.mt.md,
          {
            color: colorPlain
          }
        ]}
        align='center'
      >
        <Text type='warning'>已筹集 {formatNumber(total, 0)}</Text> /
        下一等级需要 {formatNumber(next, 0)}
      </Text>
      <Text
        style={[
          _.mt.sm,
          {
            color: colorPlain
          }
        ]}
        align='center'
      >
        预计发行量 约{formatNumber(amount, 0)}股 / 发行价 {formatNumber(price)}
      </Text>
      <Bar style={_.mt.md} total={total} level={level} next={next} />
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
