/*
 * @Author: czy0729
 * @Date: 2024-02-08 19:26:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-12 10:36:33
 */
import React from 'react'
import { Flex, Header as HeaderComp } from '@components'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { open } from '@utils'
import { obc } from '@utils/decorators'
import { HTML_SINGLE_DOC } from '@constants'
import { TABS } from '../ds'
import { Ctx } from '../types'
import { COMPONENT } from './ds'

function Header(_props, { $ }: Ctx) {
  const { uri } = $.state
  return (
    <HeaderComp
      title='特色功能'
      hm={['tips', 'Tips']}
      headerRight={() => (
        <Flex>
          <HeaderComp.Popover
            name='md-menu'
            data={TABS.map(item => item.title)}
            onSelect={$.onSelect}
          />
          <IconTouchable
            style={_.ml.xs}
            name='md-open-in-new'
            color={_.colorTitle}
            size={18}
            onPress={() => {
              open(HTML_SINGLE_DOC(uri))
            }}
          />
        </Flex>
      )}
    />
  )
}

export default obc(Header, COMPONENT)
