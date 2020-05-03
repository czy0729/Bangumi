/*
 * @Author: czy0729
 * @Date: 2019-09-20 22:05:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-04 01:41:16
 */
import React from 'react'
import { View, Alert } from 'react-native'
import PropTypes from 'prop-types'
import {
  Flex,
  Input,
  Text,
  Button,
  Slider as CompSlider,
  Switch,
  Touchable
} from '@components'
import { _ } from '@stores'
import { formatNumber } from '@utils'
import { observer } from '@utils/decorators'

function Slider({ style }, { $ }) {
  const styles = memoStyles()
  const { loading, amount, isSale } = $.state
  const { amount: userAmount } = $.userLogs
  const { sacrifices = 0 } = $.myTemple
  return (
    <View style={[styles.container, style]}>
      <Flex>
        <Flex.Item>
          <Text type='tinygrailPlain'>
            {isSale
              ? '资产重组，股份出售给英灵殿获得现金'
              : '股权融资，股份转化为固定资产获得现金和道具'}
          </Text>
        </Flex.Item>
        <Switch style={_.ml.sm} checked={isSale} onChange={$.switchIsSale} />
      </Flex>
      <Flex style={_.mt.md}>
        <Flex.Item>
          <View style={styles.inputWrap}>
            <Input
              style={styles.input}
              keyboardType='numeric'
              value={String(parseInt(amount))}
              clearButtonMode='never'
              onChangeText={$.changeAmount}
            />
            {!!sacrifices && (
              <Text
                style={styles.sacrifices}
                type='ask'
                size={12}
                pointerEvent='none'
              >
                已献祭{sacrifices}股
              </Text>
            )}
          </View>
        </Flex.Item>
        <View style={[styles.btnSubmit, _.ml.sm]}>
          <Button
            style={{
              height: 36
            }}
            type='ask'
            radius={false}
            loading={loading}
            onPress={() => {
              if (loading) {
                return
              }

              Alert.alert('小圣杯助手', `确定献祭 ${amount}股?`, [
                {
                  text: '取消',
                  style: 'cancel'
                },
                {
                  text: '确定',
                  onPress: () => $.doSacrifice()
                }
              ])
            }}
          >
            确定
          </Button>
        </View>
      </Flex>
      <Flex style={[styles.slider, _.mt.sm]}>
        <Flex.Item>
          <View style={{ width: '100%' }}>
            <CompSlider
              value={amount}
              step={1}
              min={0}
              max={parseInt(userAmount)}
              minimumTrackTintColor={_.colorAsk}
              maximumTrackTintColor={_.colorTinygrailBorder}
              onChange={value => $.changeAmount(value)}
            />
          </View>
        </Flex.Item>
        <Touchable style={_.ml.sm} onPress={() => $.changeAmount(userAmount)}>
          <Text
            style={{
              paddingVertical: _.sm
            }}
            type='tinygrailText'
            size={13}
          >
            [最大]
          </Text>
        </Touchable>
      </Flex>
      <Flex>
        <Flex.Item>
          <Text type='tinygrailText' size={12}>
            可用 0
          </Text>
        </Flex.Item>
        <Text type='tinygrailText' size={12}>
          {formatNumber(userAmount, 0)}股
        </Text>
      </Flex>
    </View>
  )
}

Slider.contextTypes = {
  $: PropTypes.object
}

export default observer(Slider)

const memoStyles = _.memoStyles(_ => ({
  container: {
    paddingVertical: _.space,
    paddingHorizontal: _.wind,
    backgroundColor: _.colorTinygrailBg
  },
  inputWrap: {
    paddingLeft: 4,
    borderColor: _.colorTinygrailBorder,
    borderWidth: 1
  },
  input: {
    height: 34,
    color: _.colorTinygrailPlain,
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderRadius: 0
  },
  sacrifices: {
    position: 'absolute',
    zIndex: 1,
    top: 8,
    right: 12
  },
  balance: {
    marginTop: 16
  },
  slider: {
    height: 40,
    opacity: 0.8
  },
  btnSubmit: {
    width: 96
  }
}))
