/*
 * @Author: czy0729
 * @Date: 2020-11-30 15:39:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-05 16:03:35
 */
import React from 'react'
import { Flex, Header, Page } from '@components'
import { IconHeader } from '@_'
import { _ } from '@stores'
import { inject, obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import Btn from './btn'
import List from './list'
import Store from './store'
import { Ctx } from './types'

/** 粘贴板 */
class TinygrailClipboard extends React.Component {
  async componentDidMount() {
    const { $, navigation } = this.context as Ctx
    $.init(navigation)
  }

  render() {
    const { $ } = this.context as Ctx
    return (
      <>
        <Header
          title='粘贴板'
          hm={['tinygrail/clipboard', 'TinygrailClipboard']}
          statusBarEvents={false}
          statusBarEventsType='Tinygrail'
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
        <Page style={_.container.tinygrail}>
          <List />
          <Btn />
        </Page>
      </>
    )
  }
}

export default inject(Store)(obc(TinygrailClipboard))
