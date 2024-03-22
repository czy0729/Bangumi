/*
 * @Author: czy0729
 * @Date: 2022-03-24 08:12:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-07-08 09:33:43
 */
import React from 'react'
import { Flex, Heatmap, Iconfont } from '@components'
import { Popover } from '@_'
import { _ } from '@stores'
import { stl } from '@utils'
import { obc } from '@utils/decorators'
import { STORYBOOK } from '@constants'
import { Ctx } from '../../types'
import { ACTIONS_MANAGE, HIT_SLOP, ORIGINS_MANAGE } from './ds'
import { IconProps } from './types'

function IconGame({ style, children }: IconProps, { $, navigation }: Ctx) {
  if (!$.titleLabel.includes('游戏')) return null

  const data = [
    ...$.onlineGameOrigins.map(item => (typeof item === 'object' ? item.name : item)),
    ORIGINS_MANAGE
  ]
  if (!$.actions.length && !STORYBOOK) data.push(ACTIONS_MANAGE)

  return (
    <Popover
      style={stl(!children && styles.touch, style)}
      data={data}
      hitSlop={HIT_SLOP}
      onSelect={(title: string) => {
        if (title === ORIGINS_MANAGE) {
          navigation.push('OriginSetting')
          return
        }

        if (title === ACTIONS_MANAGE) {
          navigation.push('Actions', {
            subjectId: $.subjectId,
            name: $.cn || $.jp
          })
          return
        }

        $.onlineGameSelected(title)
      }}
    >
      {children || (
        <>
          <Flex style={styles.btn} justify='center'>
            <Iconfont name='md-airplay' size={18} />
          </Flex>
          <Heatmap right={55} bottom={-7} id='条目.搜索源' />
        </>
      )}
    </Popover>
  )
}

export default obc(IconGame)

const styles = _.create({
  touch: {
    marginRight: -_.sm,
    borderRadius: 20,
    overflow: 'hidden'
  },
  btn: {
    width: 38,
    height: 38
  }
})
