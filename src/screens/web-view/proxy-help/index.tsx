/*
 * @Author: czy0729
 * @Date: 2026-06-02 06:25:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-02 10:30:00
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Component, HeaderPlaceholder, HeaderV2, Page, ScrollView, Text } from '@components'
import { RecommendTopic } from '@_'
import { _ } from '@stores'
import { useProxyHelpPage } from './hooks'
import { COMPONENT, HM } from './ds'

import type { NavigationProps } from '@types'

/** 代理补充说明 */
function ProxyHelp({ navigation }: NavigationProps) {
  const { visible, loading, data, handleHide, handleShow, handleLoadMore } = useProxyHelpPage()

  return (
    <Component id={COMPONENT}>
      <Page>
        <HeaderPlaceholder />
        <ScrollView style={_.container.wind} contentContainerStyle={_.container.bottom}>
          <Text style={[_.mt.md, _.mb.sm]} size={24} lineHeight={28} bold>
            代理补充说明
          </Text>
          <Text style={_.mt.md} size={16} lineHeight={20}>
            本客户端支持三种代理模式，用于解决网络连接问题。
          </Text>

          <Text style={[_.mt.md, _.mb.xs]} size={16} lineHeight={20} bold>
            ECH 代理 (Android)
          </Text>
          <Text size={14} lineHeight={18} type='sub'>
            通过本地 HTTPS CONNECT 代理绕过 SNI 封锁，使用 ECH 加密访问 Bangumi。无需配置地址，开启即用。
          </Text>

          <Text style={[_.mt.md, _.mb.xs]} size={16} lineHeight={20} bold>
            Worker 代理
          </Text>
          <Text size={14} lineHeight={18} type='sub'>
            通过自建反代服务器访问 Bangumi。需要填写代理地址，推荐到超展开社区寻找可用服务。
          </Text>

          <Text style={[_.mt.md, _.mb.xs]} size={16} lineHeight={20} bold>
            禁用代理
          </Text>
          <Text size={14} lineHeight={18} type='sub'>
            所有请求直连默认服务器，不做任何代理处理。
          </Text>

          <Text style={_.mt.md} size={16} lineHeight={20}>
            如果你已经有工具（如 VPN、Clash 等）建议不要折腾本功能。
          </Text>
          <Text style={_.mt.md} size={16} lineHeight={20}>
            Worker 模式下，一旦有值即生效，错误值会导致你无法正常使用客户端。
          </Text>
          <Text style={_.mt.md} size={16} lineHeight={20}>
            首次填写值，可能需要重新完整登录授权、冷启动才能正常表现。
          </Text>
          <Text style={_.mt.md} size={16} lineHeight={20} type='sub'>
            点击下方图标查看社区中关于代理的讨论帖子
          </Text>

          <RecommendTopic
            navigation={navigation}
            title='帖子搜索'
            visible={visible}
            loading={loading}
            data={data}
            iconSize={22}
            footerNoMoreText='- 以上为 26 年 5 月 28 日以来「反代」相关帖子 -'
            openWebBrowser
            onShow={handleShow}
            onHide={handleHide}
            onLoadMore={handleLoadMore}
          />
        </ScrollView>
      </Page>

      <HeaderV2 hm={HM} />
    </Component>
  )
}

export default observer(ProxyHelp)
