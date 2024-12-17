/*
 * @Author: czy0729
 * @Date: 2020-11-30 15:39:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-17 05:37:45
 */
import React from 'react'
import { Component, Flex, HeaderV2, Page } from '@components'
import { IconHeader } from '@_'
import { _, StoreContext } from '@stores'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import Btn from './btn'
import { useTinygrailClipboardPage } from './hooks'
import List from './list'
import { HM } from './ds'

/** 粘贴板 */
const TinygrailClipboard = (props: NavigationProps) => {
  const { id, $ } = useTinygrailClipboardPage(props)

  return useObserver(() => (
    <Component id='screen-tinygrail-clipboard'>
      <StoreContext.Provider value={id}>
        <Page style={_.container.tinygrail}>
          <List />
          <Btn />
        </Page>
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
                  t('粘贴板.刷新')
                  $.init()
                }}
              />
              <IconHeader
                name='md-ios-share'
                color={_.colorTinygrailPlain}
                onPress={() => {
                  t('粘贴板.分享')
                  $.onShare()
                }}
              />
            </Flex>
          )}
        />
      </StoreContext.Provider>
    </Component>
  ))
}

export default TinygrailClipboard
