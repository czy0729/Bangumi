/*
 * @Author: czy0729
 * @Date: 2020-06-16 13:53:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-03 03:40:23
 */
import React from 'react'
import PropTypes from 'prop-types'
import { systemStore } from '@stores'
import { r } from '@utils/dev'
import { Text } from '../text'
import { KatakanaProvider, KatakanaProviderProps } from './provider'
import { getCache, matchKatakanas, translate } from './utils'
import { COMPONENT } from './ds'
import { Context, Props as KatakanaProps } from './types'

export { KatakanaProviderProps, KatakanaProps }

let inited: boolean
;(async () => {
  await getCache()
  inited = true
})()

/**
 * [实验性] 片假名终结者在片 (假名上方显示罗马音)
 *  - 可匹配嵌套 Text 内的片假名
 *  - 百度翻译得到英文
 *  - 容器 Provider 统一管理英文需要插入的具体位置
 *  - 本地缓存片假名 => 英文的结果
 *  - 短时间合并多个翻译请求
 *  - 富文本内文字支持
 */
const Katakana = class KatakanaComponent extends React.Component<KatakanaProps> {
  /** 片假名终结者包裹容器 */
  static Provider: typeof KatakanaProvider

  static contextTypes = {
    active: PropTypes.bool,
    lineHeightIncrease: PropTypes.number,
    onKatakana: PropTypes.func
  }

  componentDidMount() {
    this.init()
  }

  UNSAFE_componentWillReceiveProps() {
    this.init()
  }

  init = () => {
    if (!this.isOn) return

    if (inited) {
      this.translate()
    } else {
      setTimeout(() => {
        this.init()
      }, 200)
    }
  }

  translate = async () => {
    const { children } = this.props
    if (!children || !(typeof children === 'string' || Array.isArray(children))) return

    const match = matchKatakanas(this.text)
    if (!match) return

    match.forEach((jp, index: number) =>
      translate(jp, (cache: { [x: string]: any }) => {
        const en = cache[jp]
        if (en) {
          const { onKatakana } = this.context as Context
          if (onKatakana) {
            setTimeout(() => {
              onKatakana({
                jp,
                en
              })
            }, 40 * (index + 1))
          }
        }
      })
    )
  }

  get text() {
    const { children } = this.props
    if (typeof children === 'string') return children

    if (Array.isArray(children)) return children.map((item: any) => item || '').join('')

    return ''
  }

  get isOn() {
    return (this.context as Context).active || systemStore.setting.katakana
  }

  render() {
    r(COMPONENT)

    return (
      <Text {...this.props} lineHeightIncrease={(this.context as Context).lineHeightIncrease} />
    )
  }
}

Katakana.Provider = KatakanaProvider

export { Katakana }

export default Katakana
