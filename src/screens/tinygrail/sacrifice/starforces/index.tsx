/*
 * @Author: czy0729
 * @Date: 2021-03-07 02:43:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-11 10:04:00
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Input, Text, Button, Slider as CompSlider, Touchable } from '@components'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { formatNumber, confirm } from '@utils'
import { obc } from '@utils/decorators'
import Rank from '@tinygrail/_/rank'
import { Ctx } from '../types'
import { memoStyles } from './styles'

function StarForces({ style }, { $ }: Ctx) {
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
          name={showStarForces ? 'md-keyboard-arrow-up' : 'md-keyboard-arrow-down'}
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
                  value={String(Math.floor(starForcesValue))}
                  clearButtonMode='never'
                  onChangeText={$.changeStarForces}
                />
                <Text
                  style={styles.sacrifices}
                  type='ask'
                  size={12}
                  // @ts-expect-error
                  pointerEvent='none'
                >
                  {formatNumber(starForces, 0)}星之力
                </Text>
              </View>
            </Flex.Item>
            <View style={[styles.btnSubmit, _.ml.md]}>
              <Button
                style={styles.btnAsk}
                type='ask'
                radius={false}
                loading={loading}
                onPress={() => {
                  if (loading) return

                  confirm(
                    `消耗固定资产 ${formatNumber(
                      starForcesValue,
                      0
                    )} 灌注星之力, 确定?`,
                    () => $.doStarForces(),
                    '小圣杯助手'
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
