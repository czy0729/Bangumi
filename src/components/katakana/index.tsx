/*
 *  <Katakana> 片假名上方显示英文
 *  - 可匹配嵌套<Text>内的片假名
 *  - 百度翻译得到英文
 *  - 容器<Provider>统一管理英文需要插入的具体位置
 *  - 本地缓存片假名=>英文的结果
 *  - 短时间合并多个翻译请求
 *  #todo 富文本内文字支持 (没有思路, 暂不支持)
 *
 * @Author: czy0729
 * @Date: 2020-06-16 13:53:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-30 06:18:52
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { systemStore } from '@stores'
import { Text, Props as TextProps } from '../text'
import { KatakanaProvider } from './provider'
import { getCache, matchKatakanas, translate } from './utils'

let inited: boolean
;(async () => {
  await getCache()
  inited = true
})()

const Katakana = observer(
  class KatakanaComponent extends React.Component<TextProps> {
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
      if (!children || !(typeof children === 'string' || Array.isArray(children)))
        return

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
      return <Text {...this.props} />
    }
  }
)

Katakana.Provider = KatakanaProvider

export { Katakana }
