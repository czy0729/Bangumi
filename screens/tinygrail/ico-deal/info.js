/*
 * @Author: czy0729
 * @Date: 2019-09-20 20:24:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-20 22:21:17
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { Flex, Text, Image } from '@components'
import { formatNumber } from '@utils'
import { observer } from '@utils/decorators'
import { getCoverLarge, caculateICO } from '@utils/app'
import _ from '@styles'
import Bar from './bar'
import { colorPlain } from '../styles'

const maxSize = _.window.width / 2

function Info(props, { $ }) {
  const { icon, id, name, total } = $.chara
  const { next, level, price, amount } = caculateICO($.chara)
  return (
    <View style={styles.container}>
      {!!icon && (
        <Flex justify='center'>
          <Image
            src={getCoverLarge(icon)}
            autoSize={maxSize}
            shadow
            placholder={false}
            imageViewer
          />
        </Flex>
      )}
      <Text style={_.mt.md} size={16} type='plain' align='center'>
        #{id} - {name}
      </Text>
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
  $: PropTypes.object
}

export default observer(Info)

const styles = StyleSheet.create({
  container: {
    padding: _.wind
  }
})
