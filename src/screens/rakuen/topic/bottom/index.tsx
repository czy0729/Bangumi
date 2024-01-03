/*
 * @Author: czy0729
 * @Date: 2022-03-14 22:47:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-04 00:38:45
 */
import React from 'react'
import { FixedTextarea, Flex, SafeAreaBottom, Text } from '@components'
import { _ } from '@stores'
import { appNavigate } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import Extra from './extra'
import { COMPONENT, MARKS } from './ds'
import { memoStyles } from './styles'

function Bottom({ fixedTextareaRef, onDirect }, { $, navigation }: Ctx) {
  if (!$.isWebLogin || $.isLimit) return null

  const styles = memoStyles()
  const { placeholder, value } = $.state
  const { tip = '', close } = $.topic
  if (tip.includes('半公开')) {
    return (
      <SafeAreaBottom style={styles.fixedBottom} type={_.ios('height', 'bottom')}>
        <Flex>
          <Text>半公开小组只有成员才能发言, </Text>
          <Text type='main' onPress={() => appNavigate($.groupHref, navigation)}>
            点击加入
          </Text>
        </Flex>
      </SafeAreaBottom>
    )
  }

  if (close) {
    return (
      <SafeAreaBottom style={styles.fixedBottom} type={_.ios('height', 'bottom')}>
        <Flex>
          <Text>主题已被关闭</Text>
          {!!close && <Text type='sub'>: {close}</Text>}
        </Flex>
      </SafeAreaBottom>
    )
  }

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

export default obc(Bottom, COMPONENT)
