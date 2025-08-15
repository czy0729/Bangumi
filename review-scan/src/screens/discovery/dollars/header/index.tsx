/*
 * @Author: czy0729
 * @Date: 2023-04-27 16:45:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-13 22:52:50
 */
import React from 'react'
import { Flex, HeaderV2, Text } from '@components'
import { IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../types'
import { COMPONENT, HM } from './ds'

function Header() {
  const { $ } = useStore<Ctx>()
  const { show, autoRefresh } = $.state
  return (
    <HeaderV2
      title={$.dollars.online ? `ONLINE：${$.dollars.online}` : 'DOLLARS'}
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
}

export default ob(Header, COMPONENT)
