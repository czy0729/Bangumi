/*
 * @Author: czy0729
 * @Date: 2019-03-18 13:33:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-02 16:58:06
 */
import React from 'react'
import { Component, Flex, Iconfont, Text, Touchable } from '@components'
import { _ } from '@stores'
import { getRating, stl } from '@utils'
import { ob } from '@utils/decorators'
import { FROZEN_FN } from '@constants'
import { COMPONENT } from './ds'
import { styles } from './styles'
import { Props as StarGroupProps } from './types'

export { StarGroupProps }

/** 评分按钮组 */
export const StarGroup = ob(
  class StarGroupComponent extends React.Component<StarGroupProps> {
    static defaultProps = {
      value: 0,
      onChange: FROZEN_FN
    }

    state = {
      value: this.props.value || 0,
      text: getRating(this.props.value || 0)
    }

    UNSAFE_componentWillReceiveProps({ value }) {
      if (value !== this.state.value) {
        this.setState({
          value,
          text: getRating(value)
        })
      }
    }

    clear = () => {
      const { onChange } = this.props
      this.setState({
        value: 0,
        text: getRating(0)
      })
      onChange(0)
    }

    change = (item: number) => {
      const { onChange } = this.props
      const { value } = this.state
      let _value: number
      if (value / 2 >= item) {
        _value = item * 2 - 1
      } else {
        _value = item * 2
      }

      let j = 0
      for (let i = 0; i <= Math.abs(value - _value); i += 1) {
        // 避免不可预测的死循环
        j += 1
        if (j > 12) return

        const nextValue = value + (_value > value ? 1 : -1) * i
        setTimeout(() => {
          const state: {
            value: number
            text?: any
          } = {
            value: nextValue
          }
          if (nextValue === _value) {
            state.text = getRating(_value)
            onChange(_value)
          }
          this.setState(state)
        }, 20 * i)
      }
    }

    render() {
      const { style } = this.props
      const { value, text } = this.state
      return (
        <Component id='base-star-group'>
          <Flex style={stl(styles.desc, style)}>
            {value !== 0 && (
              <>
                <Text type='warning' size={16}>
                  {text}
                </Text>
                <Text style={_.ml.sm} type='sub' size={16}>
                  /
                </Text>
                <Touchable style={styles.touchClear} onPress={this.clear}>
                  <Text type='sub' size={16}>
                    清除
                  </Text>
                </Touchable>
              </>
            )}
          </Flex>
          <Flex style={_.mt.xs}>
            {[1, 2, 3, 4, 5].map(item => {
              let type: 'md-star' | 'md-star-half' | 'md-star-outline'
              if (value / 2 >= item) {
                type = 'md-star'
              } else if (value / 2 >= item - 0.5) {
                type = 'md-star-half'
              } else {
                type = 'md-star-outline'
              }
              return (
                <Touchable
                  key={item}
                  style={item > 1 ? [styles.touchStar, _.ml.sm] : styles.touchStar}
                  animate
                  scale={0.9}
                  onPress={() => this.change(item)}
                >
                  <Iconfont
                    name={type}
                    size={36}
                    color={type === 'md-star-outline' ? _.colorIcon : _.colorWarning}
                  />
                </Touchable>
              )
            })}
          </Flex>
        </Component>
      )
    }
  },
  COMPONENT
)

export default StarGroup
