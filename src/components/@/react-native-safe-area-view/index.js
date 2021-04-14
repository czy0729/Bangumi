import React, { Component } from 'react'
import {
  Dimensions,
  InteractionManager,
  Platform,
  StyleSheet,
  Animated
} from 'react-native'
import hoistStatics from 'hoist-non-react-statics'

import withOrientation from './withOrientation'

// See https://mydevice.io/devices/ for device dimensions
const X_WIDTH = 375
const X_HEIGHT = 812
const XSMAX_WIDTH = 414
const XSMAX_HEIGHT = 896
const PAD_WIDTH = 768
const PAD_HEIGHT = 1024
const IPADPRO11_WIDTH = 834
const IPADPRO11_HEIGHT = 1194
const IPADPRO129_HEIGHT = 1024
const IPADPRO129_WIDTH = 1366

const IPHONE12_H = 844
const IPHONE12_Max = 926
const IPHONE12_Mini = 780

const getResolvedDimensions = () => {
  const { width, height } = Dimensions.get('window')
  if (width === 0 && height === 0) return Dimensions.get('screen')
  return { width, height }
}

const { height: D_HEIGHT, width: D_WIDTH } = getResolvedDimensions()

const PlatformConstants = Platform.constants || {}
const { minor = 0 } = PlatformConstants.reactNativeVersion || {}

const isIPhoneX = (() => {
  if (Platform.OS === 'web') return false

  return (
    (Platform.OS === 'ios' &&
      ((D_HEIGHT === X_HEIGHT && D_WIDTH === X_WIDTH) ||
        (D_HEIGHT === X_WIDTH && D_WIDTH === X_HEIGHT))) ||
    (D_HEIGHT === XSMAX_HEIGHT && D_WIDTH === XSMAX_WIDTH) ||
    (D_HEIGHT === XSMAX_WIDTH && D_WIDTH === XSMAX_HEIGHT) ||
    D_HEIGHT === IPHONE12_H ||
    D_HEIGHT === IPHONE12_Max ||
    D_HEIGHT === IPHONE12_Mini
  )
})()

const isNewIPadPro = (() => {
  if (Platform.OS !== 'ios') return false

  return (
    (D_HEIGHT === IPADPRO11_HEIGHT && D_WIDTH === IPADPRO11_WIDTH) ||
    (D_HEIGHT === IPADPRO11_WIDTH && D_WIDTH === IPADPRO11_HEIGHT) ||
    (D_HEIGHT === IPADPRO129_HEIGHT && D_WIDTH === IPADPRO129_WIDTH) ||
    (D_HEIGHT === IPADPRO129_WIDTH && D_WIDTH === IPADPRO129_HEIGHT)
  )
})()

const isIPad = (() => {
  if (Platform.OS !== 'ios' || isIPhoneX) return false

  // if portrait and width is smaller than iPad width
  if (D_HEIGHT > D_WIDTH && D_WIDTH < PAD_WIDTH) {
    return false
  }

  // if landscape and height is smaller that iPad height
  if (D_WIDTH > D_HEIGHT && D_HEIGHT < PAD_WIDTH) {
    return false
  }

  return true
})()

let _customStatusBarHeight = null
let _customStatusBarHidden = null
const statusBarHeight = isLandscape => {
  if (_customStatusBarHeight !== null) {
    return _customStatusBarHeight
  }

  /**
   * This is a temporary workaround because we don't have a way to detect
   * if the status bar is translucent or opaque. If opaque, we don't need to
   * factor in the height here; if translucent (content renders under it) then
   * we do.
   */
  if (Platform.OS === 'android') {
    if (global.Expo) {
      return global.Expo.Constants.statusBarHeight
    } else {
      return 0
    }
  }

  if (isIPhoneX) {
    return isLandscape ? 0 : 44
  }

  if (isNewIPadPro) {
    return 24
  }

  if (isIPad) {
    return _customStatusBarHidden ? 0 : 20
  }

  return isLandscape || _customStatusBarHidden ? 0 : 20
}

const doubleFromPercentString = percent => {
  if (!percent.includes('%')) {
    return 0
  }

  const dbl = parseFloat(percent) / 100

  if (isNaN(dbl)) return 0

  return dbl
}

class SafeView extends Component {
  static setStatusBarHeight = height => {
    _customStatusBarHeight = height
  }

  static setStatusBarHidden = hidden => {
    _customStatusBarHidden = hidden
  }

  state = {
    touchesTop: true,
    touchesBottom: true,
    touchesLeft: true,
    touchesRight: true,
    orientation: null,
    viewWidth: 0,
    viewHeight: 0
  }

  componentDidMount() {
    this._isMounted = true
    InteractionManager.runAfterInteractions(() => {
      this._updateMeasurements()
    })
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  componentDidUpdate() {
    this._updateMeasurements()
  }

  render() {
    const { forceInset = false, isLandscape, style, ...props } = this.props

    const safeAreaStyle = this._getSafeAreaStyle()

    return (
      <Animated.View
        ref={c => (this.view = c)}
        pointerEvents='box-none'
        {...props}
        onLayout={this._handleLayout}
        style={safeAreaStyle}
      />
    )
  }

  _handleLayout = e => {
    if (this.props.onLayout) this.props.onLayout(e)

    this._updateMeasurements()
  }

  _updateMeasurements = () => {
    if (!this._isMounted) return
    if (!this.view) return

    const { isLandscape } = this.props
    const { orientation } = this.state
    const newOrientation = isLandscape ? 'landscape' : 'portrait'
    if (orientation && orientation === newOrientation) {
      return
    }

    const { width: WIDTH, height: HEIGHT } = getResolvedDimensions()

    this.view.getNode().measureInWindow((winX, winY, winWidth, winHeight) => {
      if (!this.view) {
        return
      }
      let realY = winY
      let realX = winX

      if (realY >= HEIGHT) {
        realY = realY % HEIGHT
      } else if (realY < 0) {
        realY = (realY % HEIGHT) + HEIGHT
      }

      if (realX >= WIDTH) {
        realX = realX % WIDTH
      } else if (realX < 0) {
        realX = (realX % WIDTH) + WIDTH
      }

      const touchesTop = realY === 0
      const touchesBottom = realY + winHeight >= HEIGHT
      const touchesLeft = realX === 0
      const touchesRight = realX + winWidth >= WIDTH

      this.setState({
        touchesTop,
        touchesBottom,
        touchesLeft,
        touchesRight,
        orientation: newOrientation,
        viewWidth: winWidth,
        viewHeight: winHeight
      })
    })
  }

  _getSafeAreaStyle = () => {
    const { touchesTop, touchesBottom, touchesLeft, touchesRight } = this.state
    const { forceInset, isLandscape } = this.props

    const {
      paddingTop,
      paddingBottom,
      paddingLeft,
      paddingRight,
      viewStyle
    } = this._getViewStyles()

    const style = {
      ...viewStyle,
      paddingTop: touchesTop ? this._getInset('top') : 0,
      paddingBottom: touchesBottom ? this._getInset('bottom') : 0,
      paddingLeft: touchesLeft ? this._getInset('left') : 0,
      paddingRight: touchesRight ? this._getInset('right') : 0
    }

    if (forceInset) {
      Object.keys(forceInset).forEach(key => {
        let inset = forceInset[key]

        if (inset === 'always') {
          inset = this._getInset(key)
        }

        if (inset === 'never') {
          inset = 0
        }

        switch (key) {
          case 'horizontal': {
            style.paddingLeft = inset
            style.paddingRight = inset
            break
          }
          case 'vertical': {
            style.paddingTop = inset
            style.paddingBottom = inset
            break
          }
          case 'left':
          case 'right':
          case 'top':
          case 'bottom': {
            const padding = `padding${key[0].toUpperCase()}${key.slice(1)}`
            style[padding] = inset
            break
          }
        }
      })
    }

    // new height/width should only include padding from insets
    // height/width should not be affected by padding from style obj
    if (style.height && typeof style.height === 'number') {
      style.height += style.paddingTop + style.paddingBottom
    }

    if (style.width && typeof style.width === 'number') {
      style.width += style.paddingLeft + style.paddingRight
    }

    style.paddingTop = Math.max(style.paddingTop, paddingTop)
    style.paddingBottom = Math.max(style.paddingBottom, paddingBottom)
    style.paddingLeft = Math.max(style.paddingLeft, paddingLeft)
    style.paddingRight = Math.max(style.paddingRight, paddingRight)

    return style
  }

  _getViewStyles = () => {
    const { viewWidth } = this.state
    // get padding values from style to add back in after insets are determined
    // default precedence: padding[Side] -> vertical | horizontal -> padding -> 0
    let {
      padding = 0,
      paddingVertical = padding,
      paddingHorizontal = padding,
      paddingTop = paddingVertical,
      paddingBottom = paddingVertical,
      paddingLeft = paddingHorizontal,
      paddingRight = paddingHorizontal,
      ...viewStyle
    } = StyleSheet.flatten(this.props.style || {})

    if (typeof paddingTop !== 'number') {
      paddingTop = doubleFromPercentString(paddingTop) * viewWidth
    }

    if (typeof paddingBottom !== 'number') {
      paddingBottom = doubleFromPercentString(paddingBottom) * viewWidth
    }

    if (typeof paddingLeft !== 'number') {
      paddingLeft = doubleFromPercentString(paddingLeft) * viewWidth
    }

    if (typeof paddingRight !== 'number') {
      paddingRight = doubleFromPercentString(paddingRight) * viewWidth
    }

    return {
      paddingTop,
      paddingBottom,
      paddingLeft,
      paddingRight,
      viewStyle
    }
  }

  _getInset = key => {
    const { isLandscape } = this.props
    return getInset(key, isLandscape)
  }
}

export function getInset(key, isLandscape) {
  switch (key) {
    case 'horizontal':
    case 'right':
    case 'left': {
      return isLandscape ? (isIPhoneX ? 44 : 0) : 0
    }
    case 'vertical':
    case 'top': {
      return statusBarHeight(isLandscape)
    }
    case 'bottom': {
      if (isIPhoneX) {
        return isLandscape ? 24 : 34
      }

      if (isNewIPadPro) {
        return 20
      }

      return 0
    }
  }
}

export function getStatusBarHeight(isLandscape) {
  return statusBarHeight(isLandscape)
}

const SafeAreaView = withOrientation(SafeView)

export default SafeAreaView

export const withSafeArea = function (forceInset = {}) {
  return WrappedComponent => {
    class withSafeArea extends Component {
      render() {
        return (
          <SafeAreaView style={{ flex: 1 }} forceInset={forceInset}>
            <WrappedComponent {...this.props} />
          </SafeAreaView>
        )
      }
    }

    return hoistStatics(withSafeArea, WrappedComponent)
  }
}
