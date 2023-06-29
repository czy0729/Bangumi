/*
 * @Author: czy0729
 * @Date: 2021-08-31 18:58:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-29 17:14:03
 */
import React from 'react'
import { Flex, Iconfont } from '@components'
import { Popover } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { STORYBOOK } from '@constants'
import { Ctx } from '../types'

const ORIGINS_MANAGE = '源头管理'
const ACTIONS_MANAGE = '跳转管理'

function IconSearchDisc({ children = null }, { $, navigation }: Ctx) {
  const data = [
    ...$.onlineDiscOrigins.map(item => (typeof item === 'object' ? item.name : item)),
    ORIGINS_MANAGE
  ]
  if (!$.actions.length && !STORYBOOK) data.push(ACTIONS_MANAGE)

  return (
    <Popover
      style={!children && styles.touch}
      data={data}
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
    paddingHorizontal: 4
  }
})
