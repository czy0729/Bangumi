/*
 * @Author: czy0729
 * @Date: 2019-05-18 00:32:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-08 22:20:41
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import { StatusBarEvents, Flex, Popover, Menu, Iconfont, UM } from '@components'
import { IconBack } from '@screens/_'
import { _ } from '@stores'
import { IOS, BARE } from '@constants'
import observer from './observer'

const defaultHeaderStyle = {}
if (!IOS && BARE) {
  defaultHeaderStyle.height = _.statusBarHeight + 52
  defaultHeaderStyle.paddingTop = _.statusBarHeight
}

const withHeader = ({
  screen,
  headerStyle,
  headerTitleStyle,
  iconBackColor,
  statusBarEvents = true
} = {}) => ComposedComponent =>
  observer(
    class withHeaderComponent extends React.Component {
      static navigationOptions = ({ navigation }) => {
        let headerRight
        const popover = navigation.getParam('popover', {
          data: [],
          onSelect: Function.prototype
        })
        const element = navigation.getParam(
          'element',
          <Iconfont size={24} name='more' color={_.colorTitle} />
        )
        const extra = navigation.getParam('extra')
        if (popover.data.length) {
          const popoverProps = IOS
            ? {
                overlay: (
                  <Menu
                    title={popover.title}
                    data={popover.data}
                    onSelect={popover.onSelect}
                  />
                )
              }
            : {
                data: popover.data,
                onSelect: popover.onSelect
              }
          headerRight = (
            <Flex>
              {extra}
              <Popover
                style={{
                  padding: _.sm,
                  marginRight: -_.sm
                }}
                placement='bottom'
                {...popoverProps}
              >
                {element}
              </Popover>
            </Flex>
          )
        } else {
          headerRight = <Flex>{extra}</Flex>
        }

        const params = {
          headerLeft: (
            <IconBack
              navigation={navigation}
              color={iconBackColor || _.colorTitle}
            />
          ),
          headerRight,
          headerStyle: IOS
            ? {
                backgroundColor: _.colorPlain,
                borderBottomColor: _.colorBorder,
                borderBottomWidth: StyleSheet.hairlineWidth,
                ...headerStyle
              }
            : {
                backgroundColor: _.colorPlain,
                borderBottomColor: _.colorBorder,
                borderBottomWidth: StyleSheet.hairlineWidth,
                elevation: 0,
                ...defaultHeaderStyle,
                ...headerStyle
              },
          headerTitleStyle: {
            color: _.colorTitle,
            fontSize: 16 + _.fontSizeAdjust,
            fontWeight: 'normal',
            ...headerTitleStyle
          },
          ...(typeof ComposedComponent.navigationOptions === 'function'
            ? ComposedComponent.navigationOptions({ navigation })
            : ComposedComponent.navigationOptions)
        }
        const title = navigation.getParam('title')
        if (title) {
          params.title = title
        }
        return params
      }

      render() {
        const { navigation } = this.props
        let backgroundColor
        if (!IOS && _.isDark) {
          // [dark-mode] Android rgb(42, 42, 44)
          backgroundColor = '#2A2A2C'
        }
        return (
          <>
            <UM screen={screen} />
            {statusBarEvents && (
              <StatusBarEvents backgroundColor={backgroundColor} />
            )}
            <ComposedComponent navigation={navigation} />
          </>
        )
      }
    }
  )

export default withHeader
