/*
 * @Author: czy0729
 * @Date: 2019-09-20 20:24:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-11 20:11:28
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { Flex, Text, Image, Iconfont, Touchable, CountDown } from '@components'
import { _ } from '@stores'
import { formatNumber, getTimestamp } from '@utils'
import { observer } from '@utils/decorators'
import { tinygrailOSS, getCoverLarge, caculateICO } from '@utils/app'
import Bar from './bar'

const maxSize = _.window.width / 2

function Info(props, { $, navigation }) {
  const { icon, id, name, total, end } = $.chara
  const { next, level, price, amount } = caculateICO($.chara)
  const endTime = getTimestamp(end.replace('T', ' '))
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
          </Text>
          <Iconfont
            style={_.ml.sm}
            name='right'
            size={16}
            color={_.colorTinygrailText}
          />
        </Flex>
      </Touchable>
      <Flex style={_.mt.md} justify='center'>
        <Text
          style={{
            color: _.colorTinygrailText
          }}
          size={16}
        >
          剩余时间:{' '}
        </Text>
        <CountDown
          style={{
            color: _.colorTinygrailText
          }}
          size={16}
          end={endTime}
        />
      </Flex>
      <Text
        style={[
          _.mt.md,
          {
            color: _.colorTinygrailPlain
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
            color: _.colorTinygrailPlain
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
