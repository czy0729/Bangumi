/*
 * @Author: czy0729
 * @Date: 2026-08-08 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-08 00:00:00
 */
import { observer } from 'mobx-react'
import { Flex, Text } from '@components'
import { r } from '@utils/dev'
import { DEV } from '@constants'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Props } from './types'

/** InView 开发调试信息覆盖层 */
function Log({ hasY, y, currentY, index }: Props) {
  r(COMPONENT)

  const logText: string[] = []
  if (DEV) {
    if (hasY) {
      logText.push(`y:${Math.floor(y)}`)
    } else {
      logText.push(`cy:${Math.floor(currentY)}`)
    }
    if (index) logText.push(`i:${index}`)
  }

  return (
    <Flex style={styles.dev}>
      <Text style={styles.devText} type='__plain__' size={8} bold shadow>
        {logText.join(', ')}
      </Text>
    </Flex>
  )
}

export default observer(Log)
