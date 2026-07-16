/*
 * @Author: czy0729
 * @Date: 2026-06-08 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 22:35:53
 */
import React from 'react'
import { observer } from 'mobx-react'
import ActivityIndicator from '@ant-design/react-native/lib/activity-indicator'
import { Flex } from '../../flex'
import { Text } from '../../text'
import { memoStyles } from './styles'

import type { FooterRefreshingProps } from './types'

/** 列表底部加载中 footer */
function FooterRefreshing({ text, page, pageTotal, textType = 'sub' }: FooterRefreshingProps) {
  const styles = memoStyles()

  return (
    <Flex style={styles.noMore} justify='center' direction='column'>
      <ActivityIndicator size='small' />
      <Text style={styles.textMt} type={textType} align='center' size={12} lineHeight={16}>
        {text}
        {page && pageTotal && pageTotal != 100 ? ` ${Number(page) + 1} / ${pageTotal}` : ''}
      </Text>
    </Flex>
  )
}

export default observer(FooterRefreshing)
