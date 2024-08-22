/*
 * @Author: czy0729
 * @Date: 2021-08-31 18:58:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-22 17:10:49
 */
import React from 'react'
import { Flex, Iconfont } from '@components'
import { Popover } from '@_'
import { _ } from '@stores'
import { stl } from '@utils'
import { obc } from '@utils/decorators'
import { WEB } from '@constants'
import { Ctx } from '../../types'
import { ACTIONS_MANAGE, HIT_SLOP, ORIGINS_MANAGE } from './ds'
import { IconProps } from './types'

function IconSearchDisc({ style, children }: IconProps, { $, navigation }: Ctx) {
  const data = [
    ...$.onlineDiscOrigins.map(item => (typeof item === 'object' ? item.name : item)),
    ORIGINS_MANAGE
  ]
  if (!$.actions.length && !WEB) data.push(ACTIONS_MANAGE)

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

        $.onlineDiscSelected(title)
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

export default obc(IconSearchDisc)

const styles = _.create({
  touch: {
    borderRadius: 20,
    overflow: 'hidden'
  },
  btn: {
    paddingVertical: 2,
    paddingHorizontal: 8
  }
})
