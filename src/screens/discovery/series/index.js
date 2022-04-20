/*
 * @Author: czy0729
 * @Date: 2022-04-15 09:17:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-04-20 19:23:52
 */
import React from 'react'
import { Alert } from 'react-native'
import { Page, Header, Flex } from '@components'
import { PaginationList, IconTouchable } from '@_'
import { _ } from '@stores'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import { confirm } from '@utils/ui'
import ToolBar from './tool-bar'
import Item from './item'
import Tips from './tips'
import Store from './store'

const Series = (props, { $, navigation }) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <>
      <Header
        title='关联系列'
        hm={['series', 'Series']}
        headerRight={() => (
          <Flex>
            <IconTouchable
              style={_.mr.xs}
              name='md-refresh'
              color={_.colorDesc}
              onPress={() =>
                confirm(
                  '刷新涉及大量请求与计算，若非必要请勿重复刷新，确定?',
                  $.fetchSeries
                )
              }
            />
            <IconTouchable
              name='md-info-outline'
              color={_.colorDesc}
              size={19}
              onPress={() =>
                Alert.alert(
                  '关联系列',
                  `此功能目前为实验性质。\n目的为便捷查找是否存在未收藏的关联番剧。\n使用了你「在看」和「看过」的收藏数据，通过条目的关联数据计算出结果。\n为了控制请求数，所以并没有一次性循环请求关联到底。\n举例说当一部有四季的番剧，你只收藏过第一季，那就最多只能索引到第三季，所以你收藏的条目越多，关联范围越广。\n请至少手动滚动到底一次，条目信息才会补全。
                \n为了防止滥用，目前此功能非高级会员仅会对「在看」和「看过」的前100条数据进行关联计算，高级会员支持500条。`,
                  [
                    {
                      text: '关于会员',
                      onPress: () => navigation.push('Qiafan')
                    },
                    {
                      text: '确定',
                      onPress: () => {}
                    }
                  ]
                )
              }
            />
          </Flex>
        )}
      />
      <Page loaded={$.state._loaded}>
        <PaginationList
          key={$.state.sort}
          contentContainerStyle={_.container.bottom}
          data={$.data}
          ListHeaderComponent={<ToolBar />}
          renderItem={({ item }) => <Item item={item} />}
          onPage={$.onPage}
        />
        <Tips />
      </Page>
    </>
  ))
}

export default ic(Store, Series)
