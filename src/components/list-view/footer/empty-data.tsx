/*
 * @Author: czy0729
 * @Date: 2026-06-08 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-08 00:00:00
 */
import React from 'react'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { stl } from '@utils'
import { Flex } from '../../flex'
import { Mesume } from '../../mesume'
import { Text } from '../../text'
import { styles } from './styles'

import type { TextProps } from '../../text'

/** 列表空数据 footer */
function FooterEmptyData({
  text,
  showMesume = true,
  textType = 'sub'
}: {
  text?: string
  showMesume?: boolean
  textType?: TextProps['type']
}) {
  return (
    <Flex style={stl(_.container.plain, styles.empty)} direction='column' justify='center'>
      {showMesume && <Mesume size={64} />}
      <Text style={styles.textMt} type={textType} size={12} lineHeight={16} align='center'>
        {text}
      </Text>
    </Flex>
  )
}

export default observer(FooterEmptyData)
