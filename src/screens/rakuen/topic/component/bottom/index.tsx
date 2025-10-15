/*
 * @Author: czy0729
 * @Date: 2022-03-14 22:47:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-15 04:29:46
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import { FixedTextarea, Flex, SafeAreaBottom, Text } from '@components'
import { _, userStore, useStore } from '@stores'
import { appNavigate } from '@utils'
import Extra from './extra'
import { COMPONENT, MARKS } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'
import type { Props } from './types'

function Bottom({ fixedTextareaRef, onDirect }: Props) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    if (!userStore.isWebLogin || userStore.isLimit) return null

    const styles = memoStyles()
    const { tip = '' } = $.topic
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

    const { close } = $.topic
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

    const { placeholder, value } = $.state
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
  })
}

export default Bottom
