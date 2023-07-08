/*
 * @Author: czy0729
 * @Date: 2021-01-16 17:22:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-07-08 09:33:33
 */
import React from 'react'
import { Flex, Iconfont } from '@components'
import { Popover } from '@_'
import { _ } from '@stores'
import { stl } from '@utils'
import { obc } from '@utils/decorators'
import { STORYBOOK } from '@constants'
import { Ctx } from '../types'
import { HIT_SLOP, ORIGINS_MANAGE, ACTIONS_MANAGE } from './ds'
import { IconProps } from './types'

function IconSearch({ style, children }: IconProps, { $, navigation }: Ctx) {
  const data = [
    ...$.onlineComicOrigins.map(item => (typeof item === 'object' ? item.name : item)),
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

        $.onlineComicSelected(title)
      }}
    >
      {children || (
        <Flex style={styles.btn} justify='center'>
          <Iconfont name='md-airplay' size={18} />
        </Flex>
      )}
    </Popover>
  )
}

export default obc(IconSearch)

const styles = _.create({
  touch: {
    borderRadius: 20,
    overflow: 'hidden'
  },
  btn: {
    paddingVertical: 2,
    paddingHorizontal: 4
  }
})
