/*
 * @Author: czy0729
 * @Date: 2026-11-01 04:03:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-01 04:03:41
 *
 * 导出入口按钮
 */
import { observer } from 'mobx-react'
import { Flex, Text, Touchable } from '@components'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Props } from './types'

function Btn({ title, info, onPress }: Props) {
  r(COMPONENT)

  const styles = memoStyles()

  return (
    <Touchable style={styles.btn} onPress={onPress}>
      <Flex direction='column' align='start'>
        <Text size={12} bold>
          {title}
        </Text>
        <Text style={_.mt.xs} type='sub' size={10}>
          {info}
        </Text>
      </Flex>
    </Touchable>
  )
}

export default observer(Btn)
