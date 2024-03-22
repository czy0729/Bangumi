/*
 * @Author: czy0729
 * @Date: 2022-11-22 20:40:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-07-08 09:34:27
 */
import React from 'react'
import { Flex, Iconfont } from '@components'
import { Popover } from '@_'
import { _ } from '@stores'
import { stl } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { ACTIONS_MANAGE, HIT_SLOP } from './ds'
import { IconProps } from './types'

function IconActions({ style, children }: IconProps, { $, navigation }: Ctx) {
  const data = [...$.actions.map(item => item.name), ACTIONS_MANAGE] as const
  return (
    <Popover
      style={stl(!children && styles.touch, style)}
      data={data}
      hitSlop={HIT_SLOP}
      onSelect={title => $.onActionsPress(title, navigation)}
    >
      {children || (
        <Flex style={styles.btn} justify='center'>
          <Iconfont name='md-read-more' color={_.colorIcon} size={25} />
        </Flex>
      )}
    </Popover>
  )
}

export default obc(IconActions)

const styles = _.create({
  touch: {
    marginRight: 4,
    borderRadius: 20,
    overflow: 'hidden'
  },
  btn: {
    width: 38,
    height: 38
  }
})
