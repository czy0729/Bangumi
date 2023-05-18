/*
 * @Author: czy0729
 * @Date: 2022-03-14 22:47:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-05-17 21:21:40
 */
import React from 'react'
import { View } from 'react-native'
import { FixedTextarea, Touchable, Flex, Text, Iconfont } from '@components'
import { _, rakuenStore } from '@stores'
import { appNavigate } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import { memoStyles } from './styles'

const MARKS = ['+1', 'mark', '(bgm38)'] as const

function Bottom({ fixedTextareaRef, onDirect }, { $, navigation }: Ctx) {
  const styles = memoStyles()
  const { placeholder, value } = $.state
  const { tip = '', close } = $.topic
  if (tip.includes('半公开')) {
    return (
      <Flex style={styles.fixedBottom}>
        <Text>半公开小组只有成员才能发言, </Text>
        <Text type='main' onPress={() => appNavigate($.groupHref, navigation)}>
          点击加入
        </Text>
      </Flex>
    )
  }

  if (close) {
    return (
      <Flex style={styles.fixedBottom}>
        <Text>主题已被关闭: </Text>
        <Text type='sub'>{close}</Text>
      </Flex>
    )
  }

  if (!$.isWebLogin || $.isLimit) return null

  const { switchSlider } = rakuenStore.setting
  return (
    <>
      <FixedTextarea
        ref={fixedTextareaRef}
        placeholder={placeholder ? placeholder : undefined}
        value={value}
        source
        marks={MARKS}
        onChange={$.onChange}
        onClose={$.closeFixedTextarea}
        onSubmit={$.doSubmit}
      />
      <View style={styles.fixedLeft}>
        <Touchable
          onPress={() => onDirect(switchSlider ? true : false)}
          onLongPress={() => onDirect(switchSlider ? true : false, 20)}
        >
          <Flex style={styles.btn} justify='center'>
            <Iconfont
              style={_.mr.md}
              name={switchSlider ? 'md-navigate-next' : 'md-navigate-before'}
              size={24}
            />
          </Flex>
        </Touchable>
      </View>
      <View style={styles.fixedCenter} pointerEvents='none'>
        <Flex style={styles.btn} justify='center'>
          <Iconfont name='md-edit' size={15} />
        </Flex>
      </View>
      <View style={styles.fixedRight}>
        <Touchable
          onPress={() => onDirect(switchSlider ? false : true)}
          onLongPress={() => onDirect(switchSlider ? false : true, 20)}
        >
          <Flex style={styles.btn} justify='center'>
            <Iconfont
              style={_.ml.md}
              name={switchSlider ? 'md-navigate-before' : 'md-navigate-next'}
              size={24}
            />
          </Flex>
        </Touchable>
      </View>
    </>
  )
}

export default obc(Bottom)
