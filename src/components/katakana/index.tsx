/*
 * @Author: czy0729
 * @Date: 2020-06-16 13:53:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-14 16:42:38
 */
import React from 'react'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { systemStore } from '@stores'
import { r } from '@utils/dev'
import { Text } from '../text'
import { KatakanaProvider } from './provider'
import { getCache, matchKatakanas, translate } from './utils'
import { COMPONENT } from './ds'
import { KatakanaProps, KatakanaProviderProps } from './types'

export { KatakanaProviderProps, KatakanaProps }

let inited: boolean
;(async () => {
  await getCache()
  inited = true
})()

/**
 * [实验性] 在片假名上方显示英文
 *  - 可匹配嵌套 Text 内的片假名
 *  - 百度翻译得到英文
 *  - 容器 Provider 统一管理英文需要插入的具体位置
 *  - 本地缓存片假名 => 英文的结果
 *  - 短时间合并多个翻译请求
 *  - 富文本内文字支持
 */
const Katakana = observer(
  class KatakanaComponent extends React.Component<KatakanaProps> {
    static contextTypes = {
      active: PropTypes.bool,
      onKatakana: PropTypes.func
    }

    static Provider: any

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
      if (!children || !(typeof children === 'string' || Array.isArray(children))) {
        return
      }

      const match = matchKatakanas(this.text)
      if (!match) return

      match.forEach(jp =>
        translate(jp, cache => {
          const en = cache[jp]
          if (en) {
            const { onKatakana } = this.context
            if (onKatakana) {
              onKatakana({
                jp,
                en
              })
            }
          }
        })
      )
    }

    get text() {
      const { children } = this.props
      if (typeof children === 'string') return children
      if (Array.isArray(children)) return children.map(item => item || '').join('')
      return ''
    }

    get isOn() {
      const { katakana } = systemStore.setting
      const { active } = this.context
      return katakana || active
    }

    render() {
      r(COMPONENT)

      return <Text {...this.props} />
    }
  }
)

Katakana.Provider = KatakanaProvider

export { Katakana }
