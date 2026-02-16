/*
 * @Author: czy0729
 * @Date: 2022-04-27 06:50:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-30 23:08:27
 */
import React from 'react'
import { HeaderV2, HeaderV2Popover } from '@components'
import { IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { confirm } from '@utils'
import { ob } from '@utils/decorators'
import { TEXT_MENU_SPLIT } from '@constants'
import { Ctx } from '../types'
import { COMPONENT, HM } from './ds'

function Header() {
  const { $, navigation } = useStore<Ctx>()
  return (
    <HeaderV2
      title='关联系列'
      hm={HM}
      headerRight={() => (
        <>
          <IconTouchable
            style={_.mr.xs}
            name='md-refresh'
            color={_.colorDesc}
            onPress={() => {
              confirm('刷新涉及大量请求与计算，若非必要请勿重复刷新，确定?', $.fetchSeries)
            }}
          />
          <HeaderV2Popover
            data={['说明', TEXT_MENU_SPLIT, ...$.toolBar]}
            onSelect={title => {
              if (title === '说明') {
                navigation.push('Information', {
                  title: '关联系列',
                  message: [
                    '目的为查漏补缺，便捷查找是否存在未收藏的关联番剧。',
                    '使用了你「在看」和「看过」的收藏数据，通过关联条目计算出结果。',
                    '为了控制请求数，所以并没有一次性循环请求关联到底。',
                    '举例说当一部有四季的番剧，你只收藏过第一季，那就最多只能索引到第三季，所以你收藏的条目越多，关联范围越广。',
                    '为什么排序不符合预期? 因可能关联到上千个条目，条目的上映日期和评分需要请求，当条目项看见才会请求，所以请至少手动滚动到底一次，条目信息才会补全。',
                    '为了防止滥用，目前此功能非高级会员仅会对「在看」和「看过」的前 100 条数据进行关联计算，高级会员支持 500 条。'
                  ],
                  advance: true
                })
              } else {
                $.onToolBar(title)
              }
            }}
          />
        </>
      )}
    />
  )
}

export default ob(Header, COMPONENT)
