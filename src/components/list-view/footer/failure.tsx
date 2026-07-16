/*
 * @Author: czy0729
 * @Date: 2026-06-08 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 22:35:13
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Text } from '../../text'
import { memoStyles } from './styles'

import type { FooterFailureProps } from './types'

/** 列表加载失败 footer */
function FooterFailure({ text, textType = 'sub' }: FooterFailureProps) {
  const styles = memoStyles()

  return (
    <View style={styles.container}>
      <Text style={styles.text} type={textType} size={12} lineHeight={16} align='center'>
        {text}
      </Text>
    </View>
  )
}

export default observer(FooterFailure)
