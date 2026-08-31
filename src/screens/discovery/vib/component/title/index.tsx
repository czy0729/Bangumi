/*
 * @Author: czy0729
 * @Date: 2024-05-04 05:23:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-31 20:14:37
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Text } from '@components'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Props } from './types'

/** 分块标题 */
function Title({ text, size }: Props) {
  r(COMPONENT)

  const styles = memoStyles()
  const primary = size === 'primary'

  return (
    <Flex>
      <View style={stl(styles.title, primary && styles.primary)}>
        <Text size={primary ? 16 : 26} lineHeight={primary ? 26 : 36} bold>
          {text}
        </Text>
      </View>
    </Flex>
  )
}

export default observer(Title)
