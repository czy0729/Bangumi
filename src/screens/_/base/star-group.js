/*
 * @Author: czy0729
 * @Date: 2019-03-18 13:33:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-08 18:28:14
 */
import React from 'react'
import { Text, Touchable, Iconfont, Flex } from '@components'
import { _ } from '@stores'
import { getRating } from '@utils/app'
import { ob } from '@utils/decorators'

export const StarGroup = ob(
  class extends React.Component {
    static defaultProps = {
      value: 0,
      onChange: Function.prototype
    }

    state = {
      value: this.props.value || 0
    }

    UNSAFE_componentWillReceiveProps({ value }) {
      if (value !== this.state.value) {
        this.setState({
          value
        })
      }
    }

    clear = () => {
      const { onChange } = this.props
      this.setState({
        value: 0
      })
      onChange(0)
    }

    change = item => {
      const { onChange } = this.props
      const { value } = this.state
      let _value
      if (value / 2 >= item) {
        _value = item * 2 - 1
      } else {
        _value = item * 2
      }

      this.setState({
        value: _value
      })
      onChange(_value)
    }

    render() {
      const { style } = this.props
      const { value } = this.state
      return (
        <>
          <Flex style={[styles.desc, style]}>
            {value !== 0 && (
              <>
                <Text type='warning' size={16}>
                  {getRating(value)}
                </Text>
                <Text style={_.ml.sm} type='sub' size={16}>
                  /
                </Text>
                <Touchable style={_.ml.sm} onPress={this.clear}>
                  <Text type='sub' size={16}>
                    清除
                  </Text>
                </Touchable>
              </>
            )}
          </Flex>
          <Flex style={_.mt.xs}>
            {[1, 2, 3, 4, 5].map(item => {
              let type
              if (value / 2 >= item) {
                type = 'star-full'
              } else if (value / 2 >= item - 0.5) {
                type = 'star-half'
              } else {
                type = 'star'
              }
              return (
                <Touchable
                  key={item}
                  style={item > 1 && _.ml.sm}
                  onPress={() => this.change(item)}
                >
                  <Iconfont
                    name={type}
                    size={36}
                    color={type === 'star' ? _.colorIcon : _.colorWarning}
                  />
                </Touchable>
              )
            })}
          </Flex>
        </>
      )
    }
  }
)

const styles = _.create({
  desc: {
    height: 22
  }
})
