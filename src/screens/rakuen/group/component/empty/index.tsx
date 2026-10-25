/*
 * @Author: czy0729
 * @Date: 2026-10-25 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-25 00:00:00
 *
 * 空状态
 */
import { observer } from 'mobx-react'
import { Flex, Mesume, Text } from '@components'
import { _, useStore } from '@stores'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'

function Empty() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { list, _loaded } = $.group
  if (!_loaded || list.length) return null

  return (
    <Flex style={styles.empty} direction='column' justify='center'>
      <Mesume />
      <Text style={_.mt.sm} type='sub'>
        好像什么都没有
      </Text>
    </Flex>
  )
}

export default observer(Empty)
