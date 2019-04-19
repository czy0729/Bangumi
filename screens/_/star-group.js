/*
 * @Author: czy0729
 * @Date: 2019-03-18 13:33:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-14 21:07:01
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import { Text, Touchable, Icon, Flex } from '@components'
import { getRating } from '@utils/app'
import _, { colorWarning, colorIcon } from '@styles'

export default class StarGroup extends React.Component {
  static defaultProps = {
    value: 0,
    onChange: () => {}
  }

  state = {
    value: this.props.value || 0
  }

  componentWillReceiveProps({ value }) {
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
              type = 'ios-star'
            } else if (value / 2 >= item - 0.5) {
              type = 'ios-star-half'
            } else {
              type = 'ios-star-outline'
            }
            return (
              <Touchable
                key={item}
                style={item > 1 && _.ml.sm}
                onPress={() => this.change(item)}
              >
                <Icon
                  name={type}
                  size={40}
                  color={type === 'ios-star-outline' ? colorIcon : colorWarning}
                />
              </Touchable>
            )
          })}
        </Flex>
      </>
    )
  }
}

const styles = StyleSheet.create({
  desc: {
    height: 22
  }
})
