/*
 * @Author: czy0729
 * @Date: 2020-06-12 15:48:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-11-15 20:45:03
 */
import React, { Component } from 'react'
import { Animated } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'

export const FadeIn = observer(
  class extends Component {
    static defaultProps = {
      show: false
    }

    state = {
      opacity: new Animated.Value(0)
    }

    UNSAFE_componentWillReceiveProps({ show }) {
      if (show) {
        this.show()
      } else {
        this.hide()
      }
    }

    show = () => {
      const { opacity } = this.state
      Animated.timing(opacity, {
        toValue: 1,
        duration: 160,
        useNativeDriver: false
      }).start()
    }

    hide = () => {
      const { opacity } = this.state
      Animated.timing(opacity, {
        toValue: 0,
        duration: 80,
        useNativeDriver: false
      }).start()
    }

    render() {
      const { style, children } = this.props
      const { opacity } = this.state
      return (
        <Animated.View
          style={[
            _.container.block,
            {
              opacity,
              marginTop: opacity.interpolate({
                inputRange: [0, 1],
                outputRange: [16, 0]
              })
            },
            style
          ]}
        >
          {children}
        </Animated.View>
      )
    }
  }
)
