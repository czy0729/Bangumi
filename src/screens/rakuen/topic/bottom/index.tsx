/*
 * @Author: czy0729
 * @Date: 2022-03-14 22:47:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-05-17 21:21:40
 */
import React from 'react'
import { FixedTextarea, Flex, Text } from '@components'
import { appNavigate } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import Extra from './extra'
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

  return (
    <FixedTextarea
      ref={fixedTextareaRef}
      placeholder={placeholder ? placeholder : undefined}
      value={value}
      source
      marks={MARKS}
      extraComponent={<Extra onDirect={onDirect} />}
      onChange={$.onChange}
      onClose={$.closeFixedTextarea}
      onSubmit={$.doSubmit}
    />
  )
}

export default obc(Bottom)
