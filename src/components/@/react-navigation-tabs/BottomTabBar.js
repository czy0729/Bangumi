/* eslint-disable import/no-extraneous-dependencies */
/*
 * @Author: czy0729
 * @Date: 2021-01-15 09:55:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-13 17:41:55
 */
import React from 'react'
import { Animated, TouchableWithoutFeedback, StyleSheet, View, Platform } from 'react-native'
import { observer } from 'mobx-react'
import { SafeAreaView } from '@react-navigation/native'
import { _, systemStore } from '@stores'
import { stl } from '@utils'
import { s2t } from '@utils/thirdParty/open-cc'
import { PAD } from '@constants'
import CrossFadeIcon from './CrossFadeIcon'
import withDimensions from './utils/withDimensions'

const padIncrease = PAD === 2 ? 4 : 2
const majorVersion = parseInt(Platform.Version, 10)
const isIos = Platform.OS === 'ios'
const isIOS11 = majorVersion >= 11 && isIos

const DEFAULT_MAX_TAB_ITEM_WIDTH = 125
const hitSlop = {
  left: 16,
  right: 16,
  top: 6,
  bottom: 6
}

function TouchableWithoutFeedbackWrapper({
  onPress,
  onLongPress,
  testID,
  accessibilityLabel,
  ...props
}) {
  /**
   * @modify 使用 onPressIn 替代 onPress 加速点击反馈
   *
   * onPress={onPress}
   */
  return (
    <TouchableWithoutFeedback
      delayPressIn={16}
      onPressIn={onPress}
      onLongPress={onLongPress}
      testID={testID}
      hitSlop={hitSlop}
      accessibilityLabel={accessibilityLabel}
    >
      <View {...props} />
    </TouchableWithoutFeedback>
  )
}

class TabBarBottom extends React.Component {
  static defaultProps = {
    activeTintColor: '#007AFF',
    activeBackgroundColor: 'transparent',
    inactiveTintColor: '#8E8E93',
    inactiveBackgroundColor: 'transparent',
    showLabel: true,
    showIcon: true,
    allowFontScaling: true,
    adaptive: isIOS11,
    safeAreaInset: {
      bottom: 'always',
      top: 'never'
    }
  }

  _renderLabel = ({ route, focused }) => {
    const {
      // activeTintColor,
      // inactiveTintColor,
      // labelStyle,
      showLabel,
      showIcon,
      allowFontScaling
    } = this.props
    if (showLabel === false) {
      return null
    }

    /**
     * @add active then not show label
     */
    if (!focused) {
      return null
    }

    /**
     * @modify theme mode
     *
     * const tintColor = focused ? activeTintColor : inactiveTintColor
     */
    const tintColor = focused ? _.colorMain : _.colorDesc
    const label = this.props.getLabelText({ route })
    const { s2t: _s2t } = systemStore.setting
    if (typeof label === 'string') {
      return (
        <Animated.Text
          numberOfLines={1}
          style={[
            styles.label,
            showIcon && this._shouldUseHorizontalLabels()
              ? styles.labelBeside
              : styles.labelBeneath,
            {
              color: tintColor,
              fontSize: 11 + _.fontSizeAdjust + padIncrease
            }
          ]}
          allowFontScaling={allowFontScaling}
        >
          {_s2t ? s2t(label) : label}
        </Animated.Text>
      )
    }

    if (typeof label === 'function') {
      return label({ route, focused, tintColor })
    }

    return label
  }

  _renderIcon = ({ route, focused }) => {
    const {
      navigation,
      // activeTintColor,
      // inactiveTintColor,
      renderIcon,
      showIcon,
      showLabel
    } = this.props
    if (showIcon === false) {
      return null
    }

    const horizontal = this._shouldUseHorizontalLabels()
    const activeOpacity = focused ? 1 : 0
    const inactiveOpacity = focused ? 0 : 1

    /**
     * @modify theme mode
     *
     * activeTintColor={activeTintColor}
     * inactiveTintColor={inactiveTintColor}
     */
    return (
      <CrossFadeIcon
        route={route}
        horizontal={horizontal}
        navigation={navigation}
        activeOpacity={activeOpacity}
        inactiveOpacity={inactiveOpacity}
        activeTintColor={_.colorMain}
        inactiveTintColor={_.colorDesc}
        renderIcon={renderIcon}
        style={stl(
          styles.iconWithExplicitHeight,
          showLabel === false && !horizontal && styles.iconWithoutLabel,
          showLabel !== false && !horizontal && styles.iconWithLabel
        )}
      />
    )
  }

  _shouldUseHorizontalLabels = () => {
    const { routes } = this.props.navigation.state
    const { isLandscape, dimensions, adaptive, tabStyle } = this.props
    if (!adaptive) {
      return false
    }

    if (Platform.isPad) {
      let maxTabItemWidth = DEFAULT_MAX_TAB_ITEM_WIDTH
      const flattenedStyle = StyleSheet.flatten(tabStyle)
      if (flattenedStyle) {
        if (typeof flattenedStyle.width === 'number') {
          maxTabItemWidth = flattenedStyle.width
        } else if (typeof flattenedStyle.maxWidth === 'number') {
          maxTabItemWidth = flattenedStyle.maxWidth
        }
      }
      return routes.length * maxTabItemWidth <= dimensions.width
    }
    return isLandscape
  }

  render() {
    const {
      navigation,
      activeBackgroundColor,
      inactiveBackgroundColor,
      onTabPress,
      onTabLongPress,
      safeAreaInset,
      style,
      tabStyle
    } = this.props
    const { routes } = navigation.state
    const tabBarStyle = [
      styles.tabBar,
      this._shouldUseHorizontalLabels() && !Platform.isPad
        ? styles.tabBarCompact
        : styles.tabBarRegular,
      style,
      { backgroundColor: 'transparent' }
    ]
    return (
      <SafeAreaView style={tabBarStyle} forceInset={safeAreaInset}>
        {routes.map((route, index) => {
          const focused = index === navigation.state.index
          const scene = { route, focused }
          const accessibilityLabel = this.props.getAccessibilityLabel({
            route
          })
          const testID = this.props.getTestID({ route })
          const backgroundColor = focused ? activeBackgroundColor : inactiveBackgroundColor
          const ButtonComponent =
            this.props.getButtonComponent({ route }) || TouchableWithoutFeedbackWrapper
          return (
            <ButtonComponent
              key={route.key}
              onPress={() => onTabPress({ route })}
              onLongPress={() => onTabLongPress({ route })}
              testID={testID}
              accessibilityLabel={accessibilityLabel}
              style={[
                styles.tab,
                { backgroundColor },
                this._shouldUseHorizontalLabels() ? styles.tabLandscape : styles.tabPortrait,
                tabStyle,
                { backgroundColor: 'transparent' }
              ]}
            >
              {this._renderIcon(scene)}
              {this._renderLabel(scene)}
            </ButtonComponent>
          )
        })}
      </SafeAreaView>
    )
  }
}

const DEFAULT_HEIGHT = 49
const COMPACT_HEIGHT = 29

const styles = StyleSheet.create({
  tabBar: {
    // backgroundColor: '#fff',
    borderTopWidth: 0,
    // borderTopColor: 'rgba(0, 0, 0, .3)',
    flexDirection: 'row'
  },
  tabBarCompact: {
    height: COMPACT_HEIGHT
  },
  tabBarRegular: {
    height: DEFAULT_HEIGHT
  },
  tab: {
    flex: 1,
    alignItems: isIos ? 'center' : 'stretch'
  },
  tabPortrait: {
    justifyContent: 'flex-end',
    flexDirection: 'column'
  },
  tabLandscape: {
    justifyContent: 'center',
    flexDirection: 'row'
  },
  iconWithoutLabel: {
    flex: 1
  },
  iconWithLabel: {
    flex: 1
  },
  iconWithExplicitHeight: {
    height: Platform.isPad ? DEFAULT_HEIGHT : COMPACT_HEIGHT
  },
  label: {
    textAlign: 'center',
    backgroundColor: 'transparent'
  },
  labelBeneath: {
    marginBottom: 4,
    fontSize: 11
  },
  labelBeside: {
    fontSize: 12,
    marginLeft: 15
  }
})

export default withDimensions(observer(TabBarBottom))
