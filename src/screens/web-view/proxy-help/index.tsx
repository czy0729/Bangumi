/*
 * @Author: czy0729
 * @Date: 2026-06-02 06:25:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-08 12:00:00
 *
 * 代理补充说明: 静态文案 + 社区反代帖子入口
 */
import { observer } from 'mobx-react'
import { Component, HeaderPlaceholder, HeaderV2, Page, ScrollView } from '@components'
import { RecommendTopic } from '@_'
import { _ } from '@stores'
import Content from './components/content'
import { useProxyHelpPage } from './hooks'
import { COMPONENT, HM } from './ds'

/** 代理补充说明 */
function ProxyHelp() {
  const { visible, loading, data, handleHide, handleShow, handleLoadMore } = useProxyHelpPage()

  return (
    <Component id={COMPONENT}>
      <Page>
        <HeaderPlaceholder />
        <ScrollView style={_.container.wind} contentContainerStyle={_.container.bottom}>
          <Content />

          <RecommendTopic
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
