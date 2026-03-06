/*
 * @Author: czy0729
 * @Date: 2023-04-27 16:45:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-05 14:35:09
 */
import React from 'react'
import { Flex, HeaderV2, Text } from '@components'
import { IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { COMPONENT, HM } from './ds'

import type { Ctx } from '../types'

function Header() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const { show, autoRefresh } = $.state
    const { online } = $.dollars

    return (
      <HeaderV2
        title={online ? `ONLINE：${online}` : 'DOLLARS'}
        hm={HM}
        headerTitleAlign='left'
        headerRight={() => (
          <>
            {!show && $.state.visibleBottom >= _.window.height * 2 && (
              <IconTouchable
                style={_.mr.xs}
                name='md-keyboard-arrow-up'
                size={28}
                color={_.colorTitle}
                onPress={$.scrollToTop}
              />
            )}
            <Flex style={_.mr.sm} align='end'>
              <IconTouchable
                name='md-refresh'
                size={20}
                color={_.colorTitle}
                onPress={() => $.onToggleAutoRefresh()}
              />
              <Text
                style={{
                  marginBottom: 8,
                  marginLeft: -4
                }}
                size={8}
                bold
              >
                {autoRefresh ? 'AUTO' : 'OFF'}
              </Text>
            </Flex>
            <IconTouchable
              style={_.mr.xs}
              name={show ? 'md-close' : 'md-edit'}
              size={show ? 20 : 16}
              color={_.colorTitle}
              onPress={() => $.onToggleShow()}
            />
          </>
        )}
      />
    )
  })
}

export default Header
