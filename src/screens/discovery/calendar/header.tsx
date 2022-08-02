/*
 * @Author: czy0729
 * @Date: 2022-03-11 01:55:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-26 04:40:24
 */
import React from 'react'
import { Header as CompHeader } from '@components'
import { obc } from '@utils/decorators'
import Extra from './extra'
import { Ctx } from './types'

function Header(props, { $ }: Ctx) {
  const { type, _loaded } = $.state
  return (
    <CompHeader
      title='每日放送'
      hm={['calendar', 'Calendar']}
      headerRight={() => (
        <Extra
          type={type}
          isList={$.isList}
          loaded={_loaded}
          onChange={$.onToggleType}
          onPress={$.onSwitchLayout}
        />
      )}
    />
  )
}

export default obc(Header)
