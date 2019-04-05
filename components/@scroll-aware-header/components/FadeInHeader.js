/* eslint-disable */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Animated, StatusBar, Text } from 'react-native'

import { Platform } from '../services'
import {
  BackIcon as DefaultBackIcon,
  CloseIcon as DefaultCloseIcon
} from './icon'

const defaultStatusBarHeight = Platform.getStatusBarHeight()
const defaultTitleBarHeight = Platform.getTitleBarHeight()
const defaultHeaderHeight = defaultStatusBarHeight + defaultTitleBarHeight

const StylePropType = PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.object,
  PropTypes.array
])

export default class FadeInHeader extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    title: PropTypes.string,
    useCloseIcon: PropTypes.bool,
    hideLeftComponent: PropTypes.bool,
    scrollOffsetNative: PropTypes.object,
    scrollOffsetNonNative: PropTypes.object,
    transition: PropTypes.object,
    statusBarHeight: PropTypes.number,
    titleBarHeight: PropTypes.number,
    headerHeight: PropTypes.number,
    screenIndex: PropTypes.number,
    titleBarContainerStyle: StylePropType,
    titleContainerStyle: StylePropType,
    titleStyle: StylePropType,
    headerContainerStyle: StylePropType,
    leftComponent: PropTypes.element,
    centerComponent: PropTypes.element,
    rightComponent: PropTypes.element,
    BackIcon: PropTypes.elementType,
    CloseIcon: PropTypes.elementType,
    renderTitle: PropTypes.func,
    statusBarProps: PropTypes.object,
    startBackgroundColor: PropTypes.string,
    endBackroundColor: PropTypes.string
  }

  static defaultProps = {
    scrollOffsetNative: new Animated.Value(0),
    scrollOffsetNonNative: new Animated.Value(0),
    headerHeight: defaultHeaderHeight,
    statusBarHeight: defaultStatusBarHeight,
    titleBarHeight: defaultTitleBarHeight,
    startBackgroundColor: 'rgba(255, 255, 255, 0)',
    endBackroundColor: 'white'
  }

  static defaultHeight = defaultHeaderHeight

  constructor(props) {
    super(props)

    const {
      scrollOffsetNonNative,
      transition,
      headerHeight,
      startBackgroundColor,
      endBackroundColor
    } = props

    this.headerContainerOpacity = transition.interpolate({
      inputRange: [-0.8, 0, 0.8],
      outputRange: [0, 1, 0],
      extrapolate: 'clamp'
    })

    this.titleOpacity = scrollOffsetNonNative.interpolate({
      inputRange: [headerHeight * 0.2, headerHeight * 0.85],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    })

    this.headerBackgroundColor = scrollOffsetNonNative.interpolate({
      inputRange: [0, headerHeight * 0.5],
      outputRange: [startBackgroundColor, endBackroundColor],
      extrapolate: 'clamp'
    })
    this.shadowRadius = scrollOffsetNonNative.interpolate({
      inputRange: [0, headerHeight],
      outputRange: [0, 8],
      extrapolate: 'clamp'
    })
    this.elevation = scrollOffsetNonNative.interpolate({
      inputRange: [0, headerHeight],
      outputRange: [0, 6],
      extrapolate: 'clamp'
    })
    this.shadowOpacity = scrollOffsetNonNative.interpolate({
      inputRange: [0, headerHeight / 5],
      outputRange: [0, 0.12],
      extrapolate: 'clamp'
    })
  }

  handleBackPress = () => {
    const { navigation } = this.props
    navigation.goBack()
  }

  HeaderContainer = ownProps => {
    const { headerContainerStyle, headerHeight } = this.props
    const { headerContainerOpacity } = this

    return (
      <Animated.View
        style={[
          styles.headerContainer,
          { height: headerHeight, opacity: headerContainerOpacity },
          headerContainerStyle
        ]}
        {...ownProps}
      />
    )
  }

  TitleBarContainer = ownProps => {
    const {
      statusBarHeight,
      titleBarHeight,
      titleBarContainerStyle
    } = this.props

    const {
      headerBackgroundColor,
      shadowRadius,
      elevation,
      shadowOpacity
    } = this

    return (
      <Animated.View
        style={[
          styles.titleBarContainer,
          {
            backgroundColor: headerBackgroundColor,
            paddingTop: statusBarHeight,
            height: statusBarHeight + titleBarHeight,
            ...Platform.ifIOS({
              shadowRadius,
              shadowOpacity
            }),
            ...Platform.ifAndroid({
              elevation
            })
          },
          titleBarContainerStyle
        ]}
        {...ownProps}
      />
    )
  }

  LeftComponent = () => {
    const {
      leftComponent,
      hideLeftComponent,
      screenIndex,
      useCloseIcon,
      BackIcon,
      CloseIcon
    } = this.props

    if (leftComponent) {
      return leftComponent
    }

    const shouldHideBackButton = hideLeftComponent || screenIndex === 0

    if (shouldHideBackButton) {
      return null
    }

    const Icon = useCloseIcon
      ? CloseIcon || DefaultCloseIcon
      : BackIcon || DefaultBackIcon
    return <Icon onPress={this.handleBackPress} style={styles.icon} />
  }

  Title = () => {
    const {
      title,
      titleContainerStyle,
      titleStyle,
      renderTitle,
      centerComponent,

      leftComponent,
      hideLeftComponent,
      screenIndex,
      rightComponent
    } = this.props

    const hasLeftNeighbor =
      leftComponent || (!hideLeftComponent && screenIndex !== 0)
    const hasRightNeighbor = !!rightComponent

    if (!title) {
      return null
    }
    return (
      <Animated.View
        style={[
          {
            flex: 1,
            opacity: this.titleOpacity
          },
          titleContainerStyle
        ]}
      >
        {(renderTitle &&
          renderTitle(title, hasLeftNeighbor, hasRightNeighbor)) ||
          centerComponent || (
            <Text style={[styles.title, titleStyle]} numberOfLines={1}>
              {title}
            </Text>
          )}
      </Animated.View>
    )
  }

  RightComponent = () => {
    const { rightComponent } = this.props
    return rightComponent || null
  }

  render() {
    const { statusBarProps } = this.props

    return (
      <this.HeaderContainer>
        <this.TitleBarContainer>
          <StatusBar
            animated
            translucent
            barStyle='dark-content'
            backgroundColor='transparent'
            {...statusBarProps}
          />
          <this.LeftComponent />
          <this.Title />
          <this.RightComponent />
        </this.TitleBarContainer>
      </this.HeaderContainer>
    )
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    top: 0,
    flexDirection: 'row',
    width: '100%'
  },
  titleBarContainer: {
    position: 'absolute',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.12,
    zIndex: 100
  },
  title: {
    color: 'black',
    fontSize: 17,
    fontWeight: 'bold'
  },
  icon: {
    paddingLeft: 20,
    paddingRight: 20
  }
})
