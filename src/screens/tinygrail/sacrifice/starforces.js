/*
 * @Author: czy0729
 * @Date: 2021-03-07 02:43:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-19 17:01:04
 */
import React from 'react'
import { Alert, View } from 'react-native'
import {
  Flex,
  Input,
  Text,
  Button,
  Slider as CompSlider,
  Touchable
} from '@components'
import { IconTouchable } from '@screens/_'
import { _ } from '@stores'
import { formatNumber } from '@utils'
import { obc } from '@utils/decorators'
import Rank from '@tinygrail/_/rank'

function StarForces({ style }, { $ }) {
  const styles = memoStyles()
  const { showStarForces = 0, loading, starForcesValue } = $.state
  const { rank = 0, starForces = 0 } = $.chara
  const { sacrifices = 0 } = $.userLogs
  const { assets = 0 } = $.myTemple
  const max = parseInt(assets || sacrifices)
  return (
    <View style={[styles.container, style]}>
      <Flex>
        <Flex.Item>
          <Text type='tinygrailPlain' size={13}>
            通天塔{showStarForces && '：将固定资产转化为星之力'}
          </Text>
        </Flex.Item>
        <IconTouchable
          style={[_.ml.sm, _.mr._sm]}
          name={
            showStarForces ? 'md-keyboard-arrow-down' : 'md-keyboard-arrow-up'
          }
          color={_.colorTinygrailText}
          onPress={$.toggleStarForces}
        />
      </Flex>
      {showStarForces && (
        <>
          <Flex style={_.mt.md}>
            <Flex.Item>
              <View style={styles.inputWrap}>
                <Input
                  style={styles.input}
                  keyboardType='numeric'
                  value={String(parseInt(starForcesValue))}
                  clearButtonMode='never'
                  onChangeText={$.changeStarForces}
                />
                <Text
                  style={styles.sacrifices}
                  type='ask'
                  size={12}
                  pointerEvent='none'
                >
                  {formatNumber(starForces, 0)}星之力
                </Text>
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

                  Alert.alert(
                    '小圣杯助手',
                    `消耗固定资产 ${formatNumber(
                      starForcesValue,
                      0
                    )} 灌注星之力, 确定?`,
                    [
                      {
                        text: '取消',
                        style: 'cancel'
                      },
                      {
                        text: '确定',
                        onPress: () => $.doStarForces()
                      }
                    ]
                  )
                }}
              >
                确定
              </Button>
            </View>
          </Flex>
          <View style={[_.mt.sm, _.mb.sm]}>
            {$.rankPercents.map(item => (
              <Touchable
                style={[
                  _.mt.xs,
                  {
                    marginLeft: item.left
                  }
                ]}
                onPress={() => $.changeStarForces(item.distance)}
              >
                <Flex>
                  <Rank
                    style={
                      item.rank !== rank && {
                        backgroundColor: _.colorTinygrailIcon
                      }
                    }
                    value={item.rank}
                  />
                  <Text size={10} type='tinygrailPlain'>
                    {item.text}
                  </Text>
                  <Text style={_.ml.xs} size={10} type='tinygrailText'>
                    +{item.rate}
                  </Text>
                  {item.rank !== rank && (
                    <Text style={_.ml.xs} size={10} type='tinygrailText'>
                      ({item.totalRate})
                    </Text>
                  )}
                </Flex>
              </Touchable>
            ))}
          </View>
          <CompSlider
            value={starForcesValue}
            step={1}
            min={0}
            max={max}
            minimumTrackTintColor={_.colorAsk}
            maximumTrackTintColor={_.colorTinygrailBorder}
            onChange={value => $.changeStarForces(value)}
          />
          <Flex>
            <Flex.Item>
              <Text type='tinygrailText' size={12}>
                可用 0
              </Text>
            </Flex.Item>
            <Text type='tinygrailText' size={12}>
              {formatNumber(max, 0)}塔
            </Text>
          </Flex>
        </>
      )}
    </View>
  )
}

export default obc(StarForces)

const memoStyles = _.memoStyles(_ => ({
  container: {
    paddingVertical: _.sm,
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
  btnSubmit: {
    width: 72
  }
}))
