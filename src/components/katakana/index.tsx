/*
 * @Author: czy0729
 * @Date: 2020-06-16 13:53:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-15 07:45:41
 */
import React, { useContext, useMemo } from 'react'
import { observer } from 'mobx-react'
import { systemStore } from '@stores'
import { r } from '@utils/dev'
import { Text } from '../text'
import { KatakanaContext } from './context'
import { useKatakanaTranslate } from './hooks'
import KatakanaProvider from './provider'
import { getKatakanaText } from './utils'
import { COMPONENT } from './ds'

import type { KatakanaProviderProps } from './provider'
import type { Props as KatakanaProps } from './types'
export type { KatakanaProviderProps, KatakanaProps }

/**
 * [实验性] 片假名终结者在片 (假名上方显示罗马音)
 *  - 可匹配嵌套 Text 内的片假名
 *  - 百度翻译得到英文
 *  - 容器 Provider 统一管理英文需要插入的具体位置
 *  - 本地缓存片假名 => 英文的结果
 *  - 短时间合并多个翻译请求
 *  - 富文本内文字支持
 */
function KatakanaComponent({ children, ...props }: KatakanaProps) {
  const { enabled, onKatakana } = useContext(KatakanaContext)
  const isOn = enabled || systemStore.setting.katakana
  const text = useMemo(() => (isOn ? getKatakanaText(children) : ''), [isOn, children])

  useKatakanaTranslate(isOn, text, onKatakana)

  r(COMPONENT)

  return <Text {...props}>{children}</Text>
}

const Katakana = Object.assign(observer(KatakanaComponent), {
  Provider: KatakanaProvider
})

export { Katakana }

export default Katakana
