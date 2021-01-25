/*
 * @Author: czy0729
 * @Date: 2019-05-18 00:32:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-25 11:22:11
 */
import React from 'react'
import {
  StatusBarEvents,
  Flex,
  Popover,
  Menu,
  Iconfont,
  UM,
  Heatmap
} from '@components'
import { _ } from '@stores'
import { hm as utilsHM } from '@utils/fetch'
import { IOS, BARE } from '@constants'
import { IconBack } from '@screens/_'
import ob from './observer-props'

const defaultHeaderStyle = {}
if (!IOS && BARE) {
  defaultHeaderStyle.height = _.statusBarHeight + 52
  defaultHeaderStyle.paddingTop = _.statusBarHeight
}

const withHeader = ({
  screen,
  alias,
  headerStyle,
  headerTitleStyle,
  iconBackColor,
  statusBarEvents = true,
  hm,
  withHeaderParams // function
} = {}) => ComposedComponent =>
  ob(
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
        const heatmap = navigation.getParam('heatmap')
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
                {!!heatmap && <Heatmap id={heatmap} />}
              </Popover>
            </Flex>
          )
        } else {
          headerRight = <Flex>{extra}</Flex>
        }

        // withHeaderParams动态生成的params优先级最高
        let _params = {}
        if (withHeaderParams) {
          _params = withHeaderParams()
        }
        const params = {
          headerLeft: (
            <IconBack
              navigation={navigation}
              color={_params.iconBackColor || iconBackColor || _.colorTitle}
            />
          ),
          headerRight,
          headerRightContainerStyle: {
            marginRight: _._wind
          },
          headerStyle: IOS
            ? {
                backgroundColor: _.colorPlain,
                borderBottomColor: _.colorBorder,
                borderBottomWidth: _.flat ? 0 : _.select(_.hairlineWidth, 0),
                ...(_params.headerStyle || headerStyle)
              }
            : {
                // backgroundColor: _.select(_.colorPlain, _._colorDarkModeLevel1),
                backgroundColor: _.colorPlain,
                borderBottomColor: _.colorBorder,
                borderBottomWidth: _.flat ? 0 : _.select(_.hairlineWidth, 0),
                elevation: 0,
                ...defaultHeaderStyle,
                ...(_params.headerStyle || headerStyle)
              },
          headerTitleStyle: {
            width: '100%',
            color: _.colorTitle,
            fontSize: 16 + _.fontSizeAdjust,
            fontWeight: 'normal',
            ...(_params.headerTitleStyle || headerTitleStyle)
          },
          ...(typeof ComposedComponent.navigationOptions === 'function'
            ? ComposedComponent.navigationOptions({
                navigation
              })
            : ComposedComponent.navigationOptions)
        }
        const title = navigation.getParam('title')
        if (title) {
          params.title = title
        }
        return params
      }

      componentDidMount() {
        if (Array.isArray(hm)) {
          utilsHM(...hm)
        }
      }

      render() {
        const { navigation } = this.props
        let backgroundColor
        if (!IOS && _.isDark) {
          backgroundColor = _._colorPlainHex
        }

        // withHeaderParams动态生成的params优先级最高
        let _params = {}
        if (withHeaderParams) {
          _params = withHeaderParams()
        }
        const _statusBarEvents =
          _params.statusBarEvents === undefined
            ? statusBarEvents
            : _params.statusBarEvents
        return (
          <>
            <UM screen={screen} />
            {_statusBarEvents && (
              <StatusBarEvents backgroundColor={backgroundColor} />
            )}
            <ComposedComponent navigation={navigation} />
            {!!hm?.[1] && (
              <Heatmap
                bottom={_.bottom + _.sm}
                id={alias || screen}
                screen={hm[1]}
              />
            )}
          </>
        )
      }
    }
  )

export default withHeader
