/*
 * @Author: czy0729
 * @Date: 2025-04-04 07:28:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-04 07:30:03
 */
import React from 'react'
import { Flex, HeaderV2 } from '@components'
import { IconHeader } from '@_'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { HM } from '../ds'
import { Ctx } from '../types'
import { COMPONENT } from './ds'

function Header() {
  const { $ } = useStore<Ctx>()
  return (
    <HeaderV2
      backgroundStyle={_.container.tinygrail}
      title='粘贴板'
      hm={HM}
      headerRight={() => (
        <Flex>
          <IconHeader
            style={_.mr.xs}
            name='md-refresh'
            color={_.colorTinygrailPlain}
            size={22}
            onPress={() => {
              $.init()

              t('粘贴板.刷新')
            }}
          />
          <IconHeader
            name='md-ios-share'
            color={_.colorTinygrailPlain}
            onPress={() => {
              $.onShare()

              t('粘贴板.分享')
            }}
          />
        </Flex>
      )}
    />
  )
}

export default ob(Header, COMPONENT)
