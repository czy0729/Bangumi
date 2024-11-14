/*
 * @Author: czy0729
 * @Date: 2021-01-17 00:56:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 01:54:33
 */
import React from 'react'
import { Flex, Heatmap, Iconfont } from '@components'
import { Popover } from '@_'
import { systemStore, useStore } from '@stores'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import IconActions from './actions'
import { ACTIONS_MANAGE, HIT_SLOP, ICS_MANAGE, ORIGINS_MANAGE } from './ds'
import { styles } from './styles'
import { IconProps } from './types'

function IconOnline({ style, children }: IconProps) {
  const { $, navigation } = useStore<Ctx>()
  const data = [...$.onlineOrigins, ORIGINS_MANAGE]
  if (!$.actions.length) data.push(ACTIONS_MANAGE)
  if (systemStore.setting.exportICS) data.push(ICS_MANAGE)

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
            <Flex style={styles.btn2} justify='center'>
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

export default ob(IconOnline)
