/*
 * @Author: czy0729
 * @Date: 2019-05-18 00:32:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-03 11:49:11
 */
import React from 'react'
import { Flex, Heatmap, Iconfont, Menu, Popover } from '@components'
import { _, systemStore } from '@stores'
import { s2t } from '@utils/thirdParty/open-cc'
import { hm as utilsHM } from '@utils/fetch'
import { s2tAsync } from '@utils/async'
import { IOS } from '@constants/constants'
import IconBack from './cycles/back'
import ob from './ob'

const defaultHeaderStyle = {}
const withHeader =
  ({
    title = undefined,
    screen = undefined,
    alias = undefined,
    headerStyle = undefined,
    headerTitleStyle = undefined,
    iconBackColor = undefined,
    defaultExtra = undefined,
    // statusBarEvents = true,
    hm = undefined,
    withHeaderParams = undefined
  } = {}) =>
  ComposedComponent =>
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
            <Iconfont name='md-more-horiz' color={_.colorTitle} />
          )
          const heatmap = navigation.getParam('heatmap')
          const extra = navigation.getParam('extra')
          if (popover.data.length) {
            const popoverProps = IOS
              ? {
                  overlay: (
                    <Menu title={popover.title} data={popover.data} onSelect={popover.onSelect} />
                  )
                }
              : {
                  data: popover.data,
                  onSelect: popover.onSelect
                }
            headerRight = (
              <Flex>
                {extra}
                <Popover style={styles.popover} placement='bottom' {...popoverProps}>
                  {element}
                  {!!heatmap && <Heatmap id={heatmap} />}
                </Popover>
              </Flex>
            )
          } else {
            headerRight = <Flex>{extra || defaultExtra}</Flex>
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
                  fontSize: 15,
                  backgroundColor: _.colorPlain,
                  borderBottomWidth: 0,
                  ...(_params.headerStyle || headerStyle)
                }
              : {
                  fontSize: 15,
                  backgroundColor: _.colorPlain,
                  borderBottomWidth: 0,
                  elevation: 0,
                  ...defaultHeaderStyle,
                  ...(_params.headerStyle || headerStyle)
                },
            headerTitleStyle: {
              width: '100%',
              color: _.colorTitle,
              fontSize: 15,
              fontWeight: 'normal',
              ...(_params.headerTitleStyle || headerTitleStyle)
            },
            ...(typeof ComposedComponent.navigationOptions === 'function'
              ? ComposedComponent.navigationOptions({
                  navigation
                })
              : ComposedComponent.navigationOptions)
          }

          const _title = navigation.getParam('title')
          if (_title || screen || typeof title === 'function') {
            const { s2t: _s2t } = systemStore.setting
            const str =
              _title || (typeof title === 'function' && title(navigation.state.params)) || screen
            params.title = _s2t ? s2t(str) : str
          }

          return params
        }

        componentDidMount() {
          if (Array.isArray(hm)) utilsHM(...hm)
        }

        render() {
          const { navigation } = this.props
          return (
            <>
              <ComposedComponent navigation={navigation} />
              {!!hm?.[1] && (
                <Heatmap bottom={_.bottom + _.sm} id={alias || screen} screen={hm[1]} />
              )}
            </>
          )
        }
      }
    )

withHeader.s2t = s2tAsync

export default withHeader

const styles = _.create({
  popover: {
    padding: _.sm,
    marginRight: -_.sm,
    borderRadius: 20,
    overflow: 'hidden'
  }
})
