/*
 * @Author: czy0729
 * @Date: 2019-04-10 15:28:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-11 23:25:54
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Component, Flex, flexStyle, Iconfont, Popover, Text, Touchable } from '@components'
import { _ } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { getSplitStyles } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Props as SectionTitleProps } from './types'
export type { SectionTitleProps }

/** 块 (章节) 标题 */
export const SectionTitle = observer(
  ({
    style,
    icon = '',
    left,
    right,
    splitStyles,
    children,
    onPress,
    popover
  }: SectionTitleProps) => {
    r(COMPONENT)

    const styles = memoStyles()
    const { splitStylesTitle, splitStylesUnderline } = getSplitStyles(splitStyles)

    const title = (
      <Text type='title' size={20} bold shadow={!!splitStylesUnderline}>
        {children}
      </Text>
    )
    const titleText = (
      <>
        {title}
        {!!icon && <Iconfont name={icon} color={_.colorIcon} />}
      </>
    )

    const titleEl = popover ? (
      <Popover data={popover.data} onSelect={popover.onSelect}>
        <Flex style={styles.touch}>{titleText}</Flex>
      </Popover>
    ) : onPress ? (
      <Touchable style={stl(flexStyle(), styles.touch)} onPress={onPress}>
        {titleText}
      </Touchable>
    ) : (
      title
    )

    return (
      <Component id='base-section-title'>
        <Flex style={style}>
          <Flex.Item style={_.mr.sm}>
            <Flex>
              {splitStylesTitle}
              {splitStylesUnderline ? (
                <View>
                  {splitStylesUnderline}
                  {titleEl}
                </View>
              ) : (
                titleEl
              )}
              {left}
            </Flex>
          </Flex.Item>
          {right}
        </Flex>
      </Component>
    )
  }
)

export default SectionTitle
