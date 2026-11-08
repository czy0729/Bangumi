/*
 * @Author: czy0729
 * @Date: 2025-08-06 16:55:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-09 18:00:00
 *
 * 说明条: 首次进入时的地址说明, 可关闭
 */
import { observer } from 'mobx-react'
import { Flex, Text } from '@components'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Props } from './types'

/** 说明条 */
function Notice({ value, onClose }: Props) {
  r(COMPONENT)

  if (!value) return null

  return (
    <Flex style={stl(_.container.wind, _.mb.sm)}>
      <Flex.Item>
        <Text size={12} lineHeight={13} bold>
          {value}
        </Text>
      </Flex.Item>
      <IconTouchable
        style={styles.close}
        name='md-close'
        size={19}
        color={_.colorDesc}
        onPress={onClose}
      />
    </Flex>
  )
}

export default observer(Notice)
