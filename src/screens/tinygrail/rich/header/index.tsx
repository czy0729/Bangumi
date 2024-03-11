/*
 * @Author: czy0729
 * @Date: 2024-03-11 10:49:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-11 10:53:28
 */
import React from 'react'
import { Header as HeaderComp } from '@components'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../types'
import { COMPONENT } from './ds'

function Header(props, { navigation }: Ctx) {
  return (
    <HeaderComp
      title='番市首富'
      hm={['tinygrail/rich', 'TinygrailRich']}
      statusBarEvents={false}
      statusBarEventsType='Tinygrail'
      headerRight={() => (
        <IconTouchable
          style={_.mr.xs}
          name='md-insert-chart-outlined'
          color={_.colorTinygrailPlain}
          onPress={() => {
            t('番市首富.跳转', {
              to: 'TinygrailTreeRich'
            })

            navigation.push('TinygrailTreeRich')
          }}
        />
      )}
    />
  )
}

export default obc(Header, COMPONENT)
