/*
 * @Author: czy0729
 * @Date: 2024-11-22 07:43:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-09 01:30:00
 */
import { observer } from 'mobx-react'
import { Component } from '../component'
import { Track } from '../track'
import Header from './header'
import HeaderMode from './header-mode'
import { useHeaderV2 } from './hooks'
import HeaderV2Popover from './popover'

export { HeaderV2Popover }

import type { ModeProps, Props as HeaderV2Props, StaticProps } from './types'
export type { HeaderV2Props }

/** 静态自绘头 (无 mode) */
function StaticView({
  transparent,
  backgroundStyle,
  title,
  domTitle,
  hm,
  alias,
  color,
  onBackPress,
  headerTitleAlign,
  headerTitleStyle,
  headerTitleSize,
  headerTitleAppend,
  headerTitleTextStyle,
  headerRight
}: StaticProps) {
  const { headerTitleAlignValue, headerTitleStyleValue } = useHeaderV2({
    headerRight,
    headerTitleAlign,
    headerTitleStyle
  })

  return (
    <Component id='component-header-v2'>
      <Header
        style={backgroundStyle}
        transparent={transparent}
        title={title}
        color={color}
        onBackPress={onBackPress}
        headerTitleAlign={headerTitleAlignValue}
        headerTitleStyle={headerTitleStyleValue}
        headerTitleSize={headerTitleSize}
        headerTitleAppend={headerTitleAppend}
        headerTitleTextStyle={headerTitleTextStyle}
        headerRight={headerRight}
      />
      <Track title={title} domTitle={domTitle} hm={hm} alias={alias} />
    </Component>
  )
}

/** 模式头 (transition / float) */
function ModeView({
  mode,
  fixed,
  title,
  domTitle,
  hm,
  alias,
  color,
  statusBarEventsType,
  onBackPress,
  headerLeft,
  headerTitle,
  headerRight
}: ModeProps) {
  /** 自绘头部在树内渲染, 此处仅为隐藏原生头部 */
  useHeaderV2({ headerRight })

  return (
    <Component id='component-header-v2'>
      <HeaderMode
        mode={mode}
        /** @fixed float 语义为常驻可见, 恒以 fixed=true 渲染; transition 由页面滚动驱动 */
        fixed={mode === 'transition' ? fixed : true}
        title={title}
        statusBarEventsType={statusBarEventsType}
        onBackPress={onBackPress}
        headerLeft={headerLeft}
        headerTitle={headerTitle}
        color={color}
        headerRight={headerRight}
      />
      <Track title={title} domTitle={domTitle} hm={hm} alias={alias} />
    </Component>
  )
}

/** 判别 mode 是否为空, 用于收窄静态头与模式头属性 */
function isModeProps(props: HeaderV2Props): props is ModeProps {
  return !!props.mode
}

export const HeaderV2 = observer((props: HeaderV2Props) => {
  if (isModeProps(props)) return <ModeView {...props} />

  return <StaticView {...props} />
})

export default HeaderV2
