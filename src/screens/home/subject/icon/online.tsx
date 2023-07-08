/*
 * @Author: czy0729
 * @Date: 2021-01-17 00:56:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-07-08 09:32:36
 */
import React from 'react'
import { Flex, Heatmap, Iconfont } from '@components'
import { Popover } from '@_'
import { _, systemStore } from '@stores'
import { stl } from '@utils'
import { obc } from '@utils/decorators'
import { STORYBOOK } from '@constants'
import { Ctx } from '../types'
import IconActions from './actions'
import { HIT_SLOP, ORIGINS_MANAGE, ACTIONS_MANAGE, ICS_MANAGE } from './ds'
import { IconProps } from './types'

function IconOnline({ style, children }: IconProps, { $, navigation }: Ctx) {
  const data = [...$.onlineOrigins, ORIGINS_MANAGE]
  if (!$.actions.length && !STORYBOOK) data.push(ACTIONS_MANAGE)

  const { exportICS } = systemStore.setting
  if (exportICS) data.push(ICS_MANAGE)

  return (
    <>
      <Popover
        style={stl(!children && styles.touch, style)}
        data={data.map(item => (typeof item === 'object' ? item.name : item))}
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

          if (title === ICS_MANAGE) {
            $.doExportCalenderEventICS()
            return
          }

          $.onlinePlaySelected(title)
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
      {!children && !!$.actions.length && <IconActions style={styles.actions} />}
    </>
  )
}

export default obc(IconOnline)

const styles = _.create({
  touch: {
    borderRadius: 20,
    overflow: 'hidden'
  },
  btn: {
    width: 38,
    height: 38
  },
  actions: {
    marginRight: 4,
    marginLeft: 2
  }
})
