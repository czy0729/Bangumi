/*
 * @Author: czy0729
 * @Date: 2026-11-17 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-17 00:00:00
 *
 * 嵌入式列表空态: Mesume + 固定高度提示 (全页级空态用 @components 的 Empty)
 */
import { observer } from 'mobx-react'
import { Flex, Mesume, Text } from '@components'
import { _ } from '@stores'
import { styles } from './styles'

import type { Props } from './types'

export const EmptyCompact = observer(({ text = '好像什么都没有' }: Props) => {
  return (
    <Flex style={styles.empty} direction='column' justify='center'>
      <Mesume />
      <Text style={_.mt.sm} type='sub'>
        {text}
      </Text>
    </Flex>
  )
})

export default EmptyCompact
