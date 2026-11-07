/*
 * @Author: czy0729
 * @Date: 2022-04-27 06:53:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-07 19:05:02
 *
 * 页面头部: 登录框展开 / 收起与说明入口
 */
import { useCallback } from 'react'
import { observer } from 'mobx-react'
import { Flex, HeaderV2, Iconfont, Text, Touchable } from '@components'
import { IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { t } from '@utils/fetch'
import i18n from '@constants/i18n'
import { COMPONENT, HM } from './ds'

import type { Ctx } from '../types'

function Header() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const { hide, isLogin } = $.state

  // 无数据时由列表空态提供登录按钮, 头部不再重复
  const showToggle = !hide || !!$.data.length

  // 已登录时入口的语义是展开登录框, 未登录才是登录
  const toggleIcon = hide
    ? isLogin
      ? 'md-keyboard-arrow-down'
      : 'md-person-outline'
    : 'md-keyboard-arrow-up'
  const toggleLabel = hide ? (isLogin ? '展开' : '登录') : '收起'

  const handleHeaderRight = useCallback(
    () => (
      <>
        {showToggle && (
          <Touchable style={_.mr.sm} onPress={$.onToggleHide}>
            <Flex>
              <Iconfont name={toggleIcon} size={19} color={_.colorDesc} />
              <Text style={_.ml.xs} size={13} type='desc'>
                {toggleLabel}
              </Text>
            </Flex>
          </Touchable>
        )}
        <IconTouchable
          name='md-info-outline'
          color={_.colorDesc}
          size={19}
          onPress={() => {
            navigation.push('Information', {
              title: 'bilibili 同步',
              message: [
                `此功能涉及到第三方平台${i18n.login()}，作者保证不会窃取任何个人数据，若有异议请勿使用。`,
                '因自动对比的数据存在较大的出错可能，目前不打算做一键提交功能，请手动核实后自行提交。',
                '部分(僅限港澳台地區)的番剧做了最低限度的模糊匹配，若连翻译名称都不一样的基本没可能匹配成功。',
                '网页版不存在此功能，所以此为高级会员功能。此功能开发不易，目前暂时对所有用户开放，觉得有用可支持一下。'
              ],
              advance: true
            })

            t('bili同步.关于')
          }}
        />
      </>
    ),
    [toggleIcon, toggleLabel, showToggle, $, navigation]
  )

  return <HeaderV2 title='bilibili 同步' hm={HM} headerRight={handleHeaderRight} />
}

export default observer(Header)
