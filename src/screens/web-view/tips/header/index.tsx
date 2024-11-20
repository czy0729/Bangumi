/*
 * @Author: czy0729
 * @Date: 2024-02-08 19:26:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 05:44:29
 */
import React from 'react'
import { Flex, Header as HeaderComp } from '@components'
import { IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { open } from '@utils'
import { ob } from '@utils/decorators'
import { HTML_SINGLE_DOC } from '@constants'
import { TABS } from '../ds'
import { Ctx } from '../types'
import { COMPONENT } from './ds'

function Header() {
  const { $ } = useStore<Ctx>()
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

export default ob(Header, COMPONENT)
