/*
 * @Author: czy0729
 * @Date: 2024-01-10 04:19:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 10:05:18
 *
 * 板块右侧更多入口
 */
import { observer } from 'mobx-react'
import { Flex, Iconfont, Text, Touchable } from '@components'
import { useStore } from '@stores'
import { t } from '@utils/fetch'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'
import type { Props } from './types'

function SectionRight({ event, text, to }: Props) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  return (
    <Touchable
      style={styles.touch}
      onPress={() => {
        t(event.id, {
          ...event.data,
          to,
          monoId: $.monoId
        })

        // Works / Voices 路由参数一致, 收窄到其中之一以通过类型检查
        navigation.push(to as 'Works', {
          monoId: $.monoId,
          name: $.cn || $.jp
        })
      }}
    >
      <Flex>
        <Text type='sub'>{text}</Text>
        <Iconfont name='md-navigate-next' />
      </Flex>
    </Touchable>
  )
}

export default observer(SectionRight)
