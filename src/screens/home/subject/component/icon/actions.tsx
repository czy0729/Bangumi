/*
 * @Author: czy0729
 * @Date: 2022-11-22 20:40:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 01:48:31
 */
import React from 'react'
import { Flex, Iconfont } from '@components'
import { Popover } from '@_'
import { _, useStore } from '@stores'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import { ACTIONS_MANAGE, HIT_SLOP } from './ds'
import { styles } from './styles'
import { IconProps } from './types'

function IconActions({ style, children }: IconProps) {
  const { $, navigation } = useStore<Ctx>()
  const data = [...$.actions.map(item => item.name), ACTIONS_MANAGE] as const
  return (
    <Popover
      style={stl(!children && styles.action, style)}
      data={data}
      hitSlop={HIT_SLOP}
      onSelect={title => $.onActionsPress(title, navigation)}
    >
      {children || (
        <Flex style={styles.actionBtn} justify='center'>
          <Iconfont name='md-read-more' color={_.colorIcon} size={25} />
        </Flex>
      )}
    </Popover>
  )
}

export default ob(IconActions)
