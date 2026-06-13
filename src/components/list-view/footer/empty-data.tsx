/*
 * @Author: czy0729
 * @Date: 2026-06-08 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-11 15:08:02
 */
import React from 'react'
import { observer } from 'mobx-react'
import { stl } from '@utils'
import { TEXT_EMPTY } from '@constants'
import { Flex } from '../../flex'
import { Mesume } from '../../mesume'
import { Text } from '../../text'
import { styles } from './styles'

import type { FooterEmptyDataProps } from './types'

/** 列表空数据 footer */
function FooterEmptyData({
  style,
  text = TEXT_EMPTY,
  showMesume = true,
  textType = 'sub'
}: FooterEmptyDataProps) {
  return (
    <Flex style={stl(styles.empty, style)} direction='column' justify='center'>
      {showMesume && <Mesume size={64} />}
      <Text style={styles.textMt} type={textType} size={12} lineHeight={16} align='center'>
        {text}
      </Text>
    </Flex>
  )
}

export default observer(FooterEmptyData)
