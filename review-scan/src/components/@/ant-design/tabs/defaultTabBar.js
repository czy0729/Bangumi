/* eslint-disable react-native/no-inline-styles */
import React, { isValidElement } from 'react'
import {
  Animated,
  Dimensions,
  LayoutChangeEvent,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import _, { androidTextFixedStyle } from '@styles'
import { IOS, SCROLL_VIEW_RESET_PROPS } from '@constants/constants'
import { Flex } from '../../../flex'
import { WithTheme } from '../style'
import TabBarStyles from './style'

const WINDOW_WIDTH = Dimensions.get('window').width

export class DefaultTabBar extends React.PureComponent {
  static defaultProps = {
    animated: true,
    tabs: [],
    goToTab: () => {},
    activeTab: 0,
    page: 5,
    tabBarUnderlineStyle: {},
    tabBarBackgroundColor: 'transparent',
    tabBarActiveTextColor: _.colorDesc,
    tabBarInactiveTextColor: _.colorDesc,
    tabBarTextStyle: {},
    dynamicTabUnderlineWidth: false
  }

  _tabsMeasurements = []
  _tabContainerMeasurements
  _containerMeasurements
  _scrollView: ScrollView

  constructor(props) {
    super(props)
    this.state = {
      _leftTabUnderline: new Animated.Value(0),
      _widthTabUnderline: new Animated.Value(0),
      _containerWidth: WINDOW_WIDTH,
      _tabContainerWidth: WINDOW_WIDTH
    }
  }

  componentDidMount() {
    this.props.scrollValue.addListener(this.updateView)
  }

  updateView = offset => {
    const position = Math.floor(offset.value)
    const pageOffset = offset.value % 1
    const tabCount = this.props.tabs.length
    const lastTabPosition = tabCount - 1

    if (tabCount === 0 || offset.value < 0 || offset.value > lastTabPosition) {
      return
    }

    if (this.necessarilyMeasurementsCompleted(position, position === lastTabPosition)) {
      this.updateTabPanel(position, pageOffset)
      this.updateTabUnderline(position, pageOffset, tabCount)
    }
  }

  necessarilyMeasurementsCompleted(position, isLastTab) {
    return (
      this._tabsMeasurements[position] &&
      (isLastTab || this._tabsMeasurements[position + 1]) &&
      this._tabContainerMeasurements &&
      this._containerMeasurements
    )
  }

  updateTabPanel(position, pageOffset) {
    const containerWidth = this._containerMeasurements.width
    const tabWidth = this._tabsMeasurements[position].width
    const nextTabMeasurements = this._tabsMeasurements[position + 1]
    const nextTabWidth = (nextTabMeasurements && nextTabMeasurements.width) || 0
    const tabOffset = this._tabsMeasurements[position].left
    const absolutePageOffset = pageOffset * tabWidth
    let newScrollX = tabOffset + absolutePageOffset

    newScrollX -=
      (containerWidth - (1 - pageOffset) * tabWidth - pageOffset * nextTabWidth) / 2
    newScrollX = newScrollX >= 0 ? newScrollX : 0

    if (Platform.OS === 'android') {
      this._scrollView &&
        this._scrollView.scrollTo({ x: newScrollX, y: 0, animated: false })
    } else {
      const rightBoundScroll =
        this._tabContainerMeasurements.width - this._containerMeasurements.width
      newScrollX = newScrollX > rightBoundScroll ? rightBoundScroll : newScrollX
      this._scrollView &&
        this._scrollView.scrollTo({ x: newScrollX, y: 0, animated: false })
    }
  }

  updateTabUnderline(position, pageOffset, tabCount) {
    const { dynamicTabUnderlineWidth } = this.props
    if (position >= 0 && position <= tabCount - 1) {
      if (dynamicTabUnderlineWidth) {
        const nowLeft = this._tabsMeasurements[position].left
        const nowRight = this._tabsMeasurements[position].right
        const nextTabLeft = this._tabsMeasurements[position + 1].left
        const nextTabRight = this._tabsMeasurements[position + 1].right

        const newLineLeft = pageOffset * nextTabLeft + (1 - pageOffset) * nowLeft
        const newLineRight = pageOffset * nextTabRight + (1 - pageOffset) * nowRight

        this.state._leftTabUnderline.setValue(newLineLeft)
        this.state._widthTabUnderline.setValue(newLineRight - newLineLeft)
      } else {
        const nowLeft = (position * this.state._tabContainerWidth) / tabCount
        const nextTabLeft = ((position + 1) * this.state._tabContainerWidth) / tabCount
        const newLineLeft = pageOffset * nextTabLeft + (1 - pageOffset) * nowLeft
        this.state._leftTabUnderline.setValue(newLineLeft)
      }
    }
  }

  onPress = index => {
    const { goToTab, onTabClick, tabs } = this.props
    // tslint:disable-next-line:no-unused-expression
    onTabClick && onTabClick(tabs[index], index)
    // tslint:disable-next-line:no-unused-expression
    goToTab && goToTab(index)
  }

  renderTab = (tab, index, width, onLayoutHandler, styles, theme) => {
    const {
      tabBarActiveTextColor: activeTextColor,
      tabBarInactiveTextColor: inactiveTextColor,
      tabBarTextStyle: textStyle,
      activeTab,
      renderTab
    } = this.props
    const isTabActive = activeTab === index
    const textColor = isTabActive
      ? activeTextColor || theme.activeTextColor
      : inactiveTextColor || theme.inactiveTextColor

    return (
      <TouchableOpacity
        activeOpacity={1}
        key={`${tab.title}_${index}`}
        accessible
        accessibilityTraits='button'
        onPress={() => this.onPress(index)}
        onLayout={onLayoutHandler}
      >
        <View
          style={{
            ...StyleSheet.flatten(styles.tab),
            ...this.props.tabStyle,
            width
          }}
        >
          {renderTab ? (
            renderTab(tab)
          ) : isValidElement(tab.title) ? (
            tab.title
          ) : (
            <Text
              style={[
                !IOS && androidTextFixedStyle,
                {
                  color: textColor,
                  ...StyleSheet.flatten(styles.textStyle)
                },
                textStyle
              ]}
              allowFontScaling={false}
              textBreakStrategy='simple'
              numberOfLines={0}
            >
              {tab.title}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    )
  }

  measureTab = (page, event) => {
    const { x, width, height } = event.nativeEvent.layout
    this._tabsMeasurements[page] = { left: x, right: x + width, width, height }
    this.updateView({ value: this.props.scrollValue._value })
  }

  render() {
    const {
      tabs,
      page = 0,
      tabBarUnderlineStyle,
      tabBarBackgroundColor,
      tabsContainerStyle,
      renderUnderline,
      keyboardShouldPersistTaps
    } = this.props
    return (
      <WithTheme styles={this.props.styles} themeStyles={TabBarStyles}>
        {(styles, theme) => {
          const tabUnderlineStyle = {
            position: 'absolute',
            bottom: 0,
            ...StyleSheet.flatten(styles.underline),
            ...StyleSheet.flatten(tabBarUnderlineStyle),
            backgroundColor: 'transparent'
          }

          const dynamicTabUnderline = {
            left: this.state._leftTabUnderline,
            width: this.state._widthTabUnderline
          }

          const tabWidth = this.state._containerWidth / Math.min(page, tabs.length)
          const underlineProps = {
            style: {
              ...dynamicTabUnderline,
              ...tabUnderlineStyle
            }
          }

          return (
            <View
              style={[
                styles.container,
                {
                  backgroundColor: tabBarBackgroundColor
                }
              ]}
              onLayout={this.onContainerLayout}
            >
              <ScrollView
                ref={scrollView => {
                  this._scrollView = scrollView
                }}
                horizontal
                directionalLockEnabled
                bounces={false}
                scrollsToTop={false}
                scrollEnabled={tabs.length > page}
                keyboardShouldPersistTaps={keyboardShouldPersistTaps}
                {...SCROLL_VIEW_RESET_PROPS}
                // renderToHardwareTextureAndroid
              >
                <View
                  style={[
                    styles.tabs,
                    {
                      ...tabsContainerStyle,
                      backgroundColor: tabBarBackgroundColor
                    }
                  ]}
                  onLayout={this.onTabContainerLayout}
                >
                  {tabs.map((name, index) => {
                    let tab = { title: name }
                    if (tabs.length - 1 >= index) {
                      tab = tabs[index]
                    }
                    return this.renderTab(
                      tab,
                      index,
                      tabWidth,
                      this.measureTab.bind(this, index),
                      styles,
                      theme
                    )
                  })}
                  {renderUnderline ? (
                    renderUnderline(underlineProps.style)
                  ) : (
                    <Animated.View {...underlineProps}>
                      <Flex style={StyleSheet.absoluteFill} justify='center'>
                        <View
                          style={[
                            tabBarUnderlineStyle,
                            {
                              width: 16,
                              borderRadius: 4
                            }
                          ]}
                        />
                      </Flex>
                    </Animated.View>
                  )}
                </View>
              </ScrollView>
            </View>
          )
        }}
      </WithTheme>
    )
  }

  onTabContainerLayout = (e: LayoutChangeEvent) => {
    this._tabContainerMeasurements = e.nativeEvent.layout
    const width = this._tabContainerMeasurements.width
    // fix: https://github.com/ant-design/ant-design-mobile-rn/issues/162
    // if (width < WINDOW_WIDTH) {
    // width = WINDOW_WIDTH;
    // }
    this.setState({ _tabContainerWidth: width })
    if (!this.props.dynamicTabUnderlineWidth) {
      this.state._widthTabUnderline.setValue(width / this.props.tabs.length)
    }
    this.updateView({ value: this.props.scrollValue._value })
  }

  onContainerLayout = (e: LayoutChangeEvent) => {
    this._containerMeasurements = e.nativeEvent.layout
    this.setState({ _containerWidth: this._containerMeasurements.width })
    this.updateView({ value: this.props.scrollValue._value })
  }
}
