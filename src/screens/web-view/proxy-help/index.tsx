/*
 * @Author: czy0729
 * @Date: 2026-06-02 06:25:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-21 05:12:03
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Component, HeaderPlaceholder, HeaderV2, Page, ScrollView, Text } from '@components'
import { RecommendTopic } from '@_'
import { _ } from '@stores'
import { stl } from '@utils'
import Collapse from './components/collapse'
import Paragraph from './components/paragraph'
import SubTitle from './components/sub-title'
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
          <Text style={stl(_.mt.md, _.mb.sm)} size={24} lineHeight={28} bold>
            网络连接说明
          </Text>
          <Text style={_.mt.md} size={16} lineHeight={20}>
            本客户端支持自定义网络连接方式，保护你的隐私并优化访问体验。
          </Text>
          <Text style={_.mt.md} size={16} lineHeight={20}>
            如果你已有其他解决方案，建议不要启用此功能，避免产生冲突。
          </Text>
          <Text style={_.mt.md} size={16} lineHeight={20}>
            填写地址后会立即生效，请确保地址正确，否则会导致客户端无法正常使用。
          </Text>
          <Text style={_.mt.md} size={16} lineHeight={20}>
            首次设置后，可能需要重新登录或重启应用才能生效。
          </Text>

          <Collapse title='连接模式说明'>
            <SubTitle>直连</SubTitle>
            <Paragraph>所有请求直连默认服务器，不做任何处理，跟客户端以往一致。</Paragraph>

            <SubTitle style={_.mt.md}>镜像 / 反代</SubTitle>
            <Paragraph>
              通过自建或社区提供的服务访问 Bangumi。需要填写地址，推荐到超展开社区寻找可用服务。
            </Paragraph>

            <SubTitle style={_.mt.md}>自建 Worker 转发</SubTitle>
            <Paragraph>关闭「直接转发」：由节点自行处理转发（如 Nginx 直接覆写域名）。</Paragraph>
            <Paragraph>开启「直接转发」：由 Worker 帮你处理 cookie、重定向等转发细节。</Paragraph>
            <Paragraph>推荐保持关闭，直接使用社区提供的服务即可。</Paragraph>

            <SubTitle style={_.mt.md}>ECH 模式 (Android)</SubTitle>
            <Paragraph>自动接管 Bangumi 域名请求，无需配置。</Paragraph>
            <Paragraph>通过加密 SNI 和 DNS 保护你的隐私，防止连接被识别和干扰。</Paragraph>
            <Paragraph>
              实验性功能，不一定有效。此模式开启后接管网址的 WebView 依然会受限。
            </Paragraph>
          </Collapse>

          <Collapse title='什么是镜像 / 反代？'>
            <Paragraph>
              反向代理（Reverse
              Proxy）是一种服务器技术，它位于用户和目标服务器之间，代替用户向目标服务器发起请求，再将结果返回给用户。
            </Paragraph>
            <Paragraph>
              简单来说：你的请求先到中转服务器，再由中转服务器转发到目标地址，从而优化网络连接并保护你的隐私。
            </Paragraph>
            <Paragraph>
              ⚠️ 使用第三方服务意味着你的请求会经过第三方服务器，敏感操作请谨慎。
            </Paragraph>
          </Collapse>

          <Collapse title='Cloudflare Workers'>
            <Paragraph>
              Cloudflare Workers 是一个免费的边缘计算平台，可以用来搭建中转服务。它的优点是：
            </Paragraph>
            <Paragraph>• 免费额度充足，个人使用完全够用</Paragraph>
            <Paragraph>• 全球节点多，速度快</Paragraph>
            <Paragraph>• 配置简单，只需一个脚本</Paragraph>
            <Paragraph>
              常见的搭建方式是使用开源项目，部署后会得到一个类似 your-name.workers.dev 的地址。
            </Paragraph>
          </Collapse>

          <Collapse title='自建 Worker 需知'>
            <Paragraph>
              在请求层层转发后，例如 cookie、授权后的 code、重定向地址等会丢失。
            </Paragraph>
            <Paragraph>
              如果是正常访问普通页面可能不需要，但是登录等复杂操作就必须要自行在 Worker
              里捕获并转为例如 x-redirect-url、location、set-cookie
              之类的头，透传返回给客户端提取使用。
            </Paragraph>
            <Paragraph>
              如需自建，请到 GitHub 项目目录复制作者提供的 Worker 文件部署到 Cloudflare Worker /
              Deno Deploy。
            </Paragraph>
          </Collapse>

          <Collapse title='SNI / ECH / DoH 是什么？'>
            <SubTitle>SNI</SubTitle>
            <Paragraph>
              SNI（Server Name Indication）是 TLS 握手时客户端告诉服务器「我要访问哪个域名」的机制。
            </Paragraph>
            <Paragraph>
              网络运营商或防火墙可以通过读取 SNI 来识别并拦截特定域名的连接，即使流量已加密。
            </Paragraph>

            <SubTitle style={_.mt.md}>ECH</SubTitle>
            <Paragraph>
              ECH（Encrypted Client Hello）是对 SNI 的加密扩展，将域名信息在 TLS
              握手阶段就加密传输，保护你的隐私，使中间人无法获知你访问的真实域名。
            </Paragraph>
            <Paragraph>
              简单说：ECH 保护你的浏览隐私，让网络运营商看不到你在访问什么网站。
            </Paragraph>

            <SubTitle style={_.mt.md}>DoH</SubTitle>
            <Paragraph>DoH（DNS over HTTPS）是通过 HTTPS 协议进行 DNS 查询的技术。</Paragraph>
            <Paragraph>
              传统 DNS 查询是明文的，容易被劫持或污染（返回错误的 IP 地址）。DoH 加密了 DNS
              查询内容，保护你的隐私，防止被中间人篡改。
            </Paragraph>
            <Paragraph>
              简单说：DoH 保护你的 DNS 查询隐私，防止被污染，确保你访问的是真实地址。
            </Paragraph>
          </Collapse>

          <Text style={_.mt.md} size={16} lineHeight={20}>
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
