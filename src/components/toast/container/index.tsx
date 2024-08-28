/*
 * @Author: czy0729
 * @Date: 2020-09-28 18:30:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-28 21:10:13
 */
import React from 'react'
import { ActivityIndicator, Animated, TouchableOpacity, View } from 'react-native'
import { WithTheme } from '@ant-design/react-native/lib/style'
import ToastStyles from '@ant-design/react-native/lib/toast/style/index'
import { syncThemeStore } from '@utils/async'
import { USE_NATIVE_DRIVER } from '@constants/constants'
import BlurView from '../blur-view'
import Desc from '../desc'
import { ToastProps } from './type'
import { styles as overrideStyles } from './styles'

export default class Container extends React.Component<ToastProps, any> {
  static defaultProps = {
    duration: 3,
    mask: true,
    onClose() {}
  }

  state = {
    fadeAnim: new Animated.Value(0),
    showClose: false
  }

  anim: Animated.CompositeAnimation | null

  timeoutId: any

  componentDidMount() {
    const { type, onClose, onAnimationEnd } = this.props
    const duration = this.props.duration as number

    const timing = Animated.timing
    if (this.anim) this.anim = null

    const animArr = [
      timing(this.state.fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: USE_NATIVE_DRIVER
      }),
      Animated.delay(duration * 1000)
    ]

    if (duration > 0) {
      animArr.push(
        timing(this.state.fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: USE_NATIVE_DRIVER
        })
      )
    }

    this.anim = Animated.sequence(animArr)
    this.anim.start(() => {
      if (duration > 0) {
        this.anim = null
        if (onClose) onClose()
        if (onAnimationEnd) onAnimationEnd()
      }
    })

    if (type === 'loading') {
      this.timeoutId = setTimeout(() => {
        this.timeoutId = null
        this.setState({
          showClose: true
        })
      }, 5600)
    }
  }

  componentWillUnmount() {
    try {
      if (this.timeoutId) clearTimeout(this.timeoutId)

      if (this.anim) {
        this.anim.stop()
        this.anim = null
      }
    } catch (error) {}
  }

  render() {
    const { type = '', content, mask, onAnimationEnd } = this.props
    const { showClose } = this.state
    return (
      <WithTheme styles={this.props.styles} themeStyles={ToastStyles}>
        {styles => {
          const _ = syncThemeStore()
          let iconDom: React.ReactElement<any> | null = null
          if (type === 'loading') {
            iconDom = (
              <ActivityIndicator
                style={styles.centering}
                animating
                color={_.isDark ? 'white' : 'gray'}
              />
            )
          } else if (type === 'info') {
            iconDom = null
          }

          return (
            <View
              style={overrideStyles.container}
              pointerEvents={mask && !showClose ? undefined : 'box-none'}
            >
              <TouchableOpacity
                style={styles.innerContainer}
                activeOpacity={1}
                onPress={onAnimationEnd}
              >
                <Animated.View
                  style={{
                    opacity: this.state.fadeAnim
                  }}
                >
                  <BlurView
                    style={[styles.innerWrap, iconDom ? styles.iconToast : styles.textToast]}
                  >
                    <View style={overrideStyles.body}>
                      {iconDom}
                      <Desc style={styles.content} showClose={showClose}>
                        {content}
                      </Desc>
                    </View>
                  </BlurView>
                </Animated.View>
              </TouchableOpacity>
            </View>
          )
        }}
      </WithTheme>
    )
  }
}
