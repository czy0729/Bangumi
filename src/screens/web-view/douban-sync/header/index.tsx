/*
 * @Author: czy0729
 * @Date: 2022-10-16 16:48:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-07 19:30:00
 *
 * 页面头部: 窗口展开 / 收起与说明入口
 */
import { useCallback } from 'react'
import { observer } from 'mobx-react'
import { Flex, HeaderV2, Iconfont, Text, Touchable } from '@components'
import { IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { t } from '@utils/fetch'
import { COMPONENT, HM } from './ds'

import type { Ctx } from '../types'

function Header() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const { hide } = $.state

  const handleHeaderRight = useCallback(
    () => (
      <>
        <Touchable style={_.mr.sm} onPress={$.onToggleHide}>
          <Flex>
            <Iconfont
              name={hide ? 'md-keyboard-arrow-down' : 'md-keyboard-arrow-up'}
              size={19}
              color={_.colorDesc}
            />
            <Text style={_.ml.xs} size={13} type='desc'>
              {hide ? '展开' : '收起'}
            </Text>
          </Flex>
        </Touchable>
        <IconTouchable
          name='md-info-outline'
          color={_.colorDesc}
          size={19}
          onPress={() => {
            navigation.push('Information', {
              title: '豆瓣同步',
              message: [
                '此功能目前为实验性质。',
                '请展开右侧窗口并填写豆瓣用户地址，完成后开始同步数据。',
                '因自动对比的数据存在较大的出错可能，目前不打算做一键提交功能，请手动核实后自行提交。',
                '网页版不存在此功能，所以此为高级会员功能。此功能开发不易，目前暂时对所有用户开放，觉得有用可支持一下。'
              ],
              advance: true
            })

            t('豆瓣同步.关于')
          }}
        />
      </>
    ),
    [hide, $, navigation]
  )

  return <HeaderV2 title='豆瓣同步' hm={HM} headerRight={handleHeaderRight} />
}

export default observer(Header)
