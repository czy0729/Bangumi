/*
 * @Author: czy0729
 * @Date: 2026-06-02 06:25:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-19 06:35:14
 */
import React, { useState } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Component, HeaderPlaceholder, HeaderV2, Page, ScrollView, Text } from '@components'
import { RecommendTopic } from '@_'
import { _ } from '@stores'
import { useProxyHelpPage } from './hooks'
import { COMPONENT, HM } from './ds'
import { memoStyles } from './styles'

import type { NavigationProps } from '@types'

/** 代理补充说明 */
function ProxyHelp({ navigation }: NavigationProps) {
  const { visible, loading, data, handleHide, handleShow, handleLoadMore } = useProxyHelpPage()
  const [expanded1, setExpanded1] = useState(false)
  const [expanded2, setExpanded2] = useState(false)

  const styles = memoStyles()

  return (
    <Component id={COMPONENT}>
      <Page>
        <HeaderPlaceholder />
        <ScrollView style={_.container.wind} contentContainerStyle={_.container.bottom}>
          <Text style={[_.mt.md, _.mb.sm]} size={24} lineHeight={28} bold>
            代理补充说明
          </Text>
          <Text style={_.mt.md} size={16} lineHeight={20}>
            本客户端支持通过代理访问 Bangumi 域名、API 和静态资源，以解决网络连接问题。
          </Text>

          <Text style={_.mt.md} size={16} lineHeight={20}>
            如果你已有科学上网工具，建议不要启用此功能，代理可能导致一些未知问题。
          </Text>
          <Text style={_.mt.md} size={16} lineHeight={20}>
            填写代理地址后会立即生效，请确保地址正确，否则会导致客户端无法正常使用。
          </Text>
          <Text style={_.mt.md} size={16} lineHeight={20}>
            首次设置后，可能需要重新登录或重启应用才能生效。
          </Text>

          <Text
            style={[_.mt.lg, _.mb.sm]}
            type='sub'
            size={16}
            lineHeight={20}
            bold
            onPress={() => setExpanded1(!expanded1)}
          >
            {expanded1 ? '▼' : '▶'} 什么是镜像站、反向代理？
          </Text>
          {expanded1 && (
            <View style={styles.content}>
              <Text size={14} lineHeight={18}>
                反向代理（Reverse
                Proxy）是一种服务器技术，它位于用户和目标服务器之间，代替用户向目标服务器发起请求，再将结果返回给用户。
              </Text>
              <Text style={_.mt.sm} size={14} lineHeight={18}>
                简单来说：你的请求先到代理服务器，再由代理服务器转发到 Bangumi，从而绕过网络限制。
              </Text>
            </View>
          )}

          <Text
            style={[_.mt.md, _.mb.sm]}
            type='sub'
            size={16}
            lineHeight={20}
            bold
            onPress={() => setExpanded2(!expanded2)}
          >
            {expanded2 ? '▼' : '▶'} Cloudflare Workers 反代
          </Text>
          {expanded2 && (
            <View style={styles.content}>
              <Text size={14} lineHeight={18}>
                Cloudflare Workers 是一个免费的边缘计算平台，可以用来搭建反向代理。它的优点是：
              </Text>
              <Text style={_.mt.sm} size={14} lineHeight={18}>
                • 免费额度充足，个人使用完全够用
              </Text>
              <Text style={_.mt.sm} size={14} lineHeight={18}>
                • 全球节点多，速度快
              </Text>
              <Text style={_.mt.sm} size={14} lineHeight={18}>
                • 配置简单，只需一个脚本
              </Text>
              <Text style={_.mt.sm} size={14} lineHeight={18}>
                常见的搭建方式是使用开源项目如 bangumi-cloudflare-worker，部署后会得到一个类似
                your-name.workers.dev 的地址。
              </Text>
            </View>
          )}

          <Text style={_.mt.md} type='sub' size={16} lineHeight={20}>
            点击下方图标搜索社区中关于「反代」的讨论
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
