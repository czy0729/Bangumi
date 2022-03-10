/*
 * 适配 react-navigation@5
 * 完全替代 @utils/decorators/withHeader.js
 *
 * @Author: czy0729
 * @Date: 2022-03-10 17:27:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-10 21:45:45
 */
import React, { useLayoutEffect } from 'react'
import { observer } from 'mobx-react'
import { useNavigation } from '@react-navigation/native'
import { _, systemStore } from '@stores'
import { useMount, useObserver } from '@utils/hooks'
import { hm as utilsHM } from '@utils/fetch'
import { s2t } from '@utils/thirdParty/cn-char'
import { IOS } from '@constants'
import { Touchable } from './touchable'
import { Flex } from './flex'
import { Iconfont } from './iconfont'
import { Popover as CompPopover } from './popover'
import { Menu } from './menu'
import { StatusBarEvents } from './status-bar-events'
import { UM } from './um'
import { Heatmap } from './heatmap'

const Header = ({
  /* 标题 */
  title,

  /* 统计参数 [url地址, 对应页面key] */
  hm,

  /* 统计别名 */
  alias,

  /*
   * 右侧element
   * https://reactnavigation.org/docs/5.x/stack-navigator#headerright
   */
  headerRight = null,

  /* 是否变动状态栏主题 */
  statusBarEvents = true
}) => {
  const navigation = useNavigation()

  useLayoutEffect(() => {
    const options = {
      // header
      headerShown: true,
      headerStyle: {
        backgroundColor: _.colorPlain,
        borderBottomWidth: 0,
        elevation: 0
      },

      // headerTitle
      headerTitle: systemStore.setting.s2t ? s2t(title) : title,
      headerTintColor: _.colorTitle,
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontSize: 15,
        fontWeight: 'normal'
      },

      // headerBack
      headerBackTitleVisible: false,
      headerLeft: () => <Back navigation={navigation} />,

      // headerRight
      headerRight
    }

    // platform fixed
    if (IOS) {
    } else {
      options.headerTitleStyle.fontFamily = ''
    }

    navigation.setOptions(options)
  }, [navigation, title, headerRight])

  useMount(() => {
    if (Array.isArray(hm)) utilsHM(...hm)
  })

  return useObserver(() => {
    let backgroundColor
    if (!IOS && _.isDark) backgroundColor = _._colorPlainHex
    return (
      <>
        {statusBarEvents && <StatusBarEvents backgroundColor={backgroundColor} />}
        <UM screen={title} />
        {!!hm?.[1] && (
          <Heatmap id={alias || title} screen={hm[1]} bottom={_.bottom + _.sm} />
        )}
      </>
    )
  })
}

const Back = observer(({ navigation }) => (
  <Touchable style={styles.touch} onPress={navigation.goBack}>
    <Flex style={styles.icon} justify='center'>
      <Iconfont name='md-arrow-back' color={_.colorTitle} />
    </Flex>
  </Touchable>
))

const Popover = observer(
  ({
    name = 'md-more-horiz',
    color,
    data = [],
    menuStyle,
    onSelect = Function.prototype,
    children,
    ...other
  }) => {
    const popoverProps = IOS
      ? {
          overlay: (
            <Menu
              style={menuStyle}
              data={data}
              onSelect={title => setTimeout(() => onSelect(title), 0)}
            />
          )
        }
      : {
          data,
          onSelect
        }

    return (
      <CompPopover style={styles.touch} placement='bottom' {...popoverProps} {...other}>
        {!!name && (
          <Flex style={styles.icon} justify='center'>
            <Iconfont name={name} color={color || _.colorTitle} />
          </Flex>
        )}
        {children}
      </CompPopover>
    )
  }
)

Header.Popover = Popover

export { Header }

const styles = _.create({
  touch: {
    marginHorizontal: _.xs,
    borderRadius: 20,
    overflow: 'hidden'
  },
  icon: {
    width: 36,
    height: 36
  }
})
