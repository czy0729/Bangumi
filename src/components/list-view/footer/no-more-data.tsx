/*
 * @Author: czy0729
 * @Date: 2026-06-08 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-08 00:00:00
 */
import React from 'react'
import { observer } from 'mobx-react'
import { systemStore } from '@stores'
import { Flex } from '../../flex'
import { Mesume } from '../../mesume'
import RandomText from './random-text'
import { styles } from './styles'

import type { TextProps } from '../../text'

/** 列表没有更多数据 footer */
function FooterNoMoreData({
  filterText,
  showMesume = true,
  textType = 'sub'
}: {
  filterText?: string
  showMesume?: boolean
  textType?: TextProps['type']
}) {
  if (!showMesume) return null

  return (
    <Flex style={styles.noMore} justify='center' direction='column'>
      <Mesume size={64} />
      {systemStore.setting.speech && <RandomText type={textType} text={filterText} />}
    </Flex>
  )
}

export default observer(FooterNoMoreData)
