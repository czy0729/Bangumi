/*
 * @Author: czy0729
 * @Date: 2019-04-10 15:28:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-13 21:39:23
 */
import React from 'react'
import { View } from 'react-native'
import { Component, Flex, Iconfont, Text, Touchable } from '@components'
import { _, systemStore } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { ReactNode } from '@types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'
import { Props as SectionTitleProps } from './types'

export { SectionTitleProps }

/** 块(章节) 标题 */
export const SectionTitle = ({
  style,
  icon = '',
  left,
  right,
  splitStyles,
  children,
  onPress
}: SectionTitleProps) => {
  r(COMPONENT)

  return useObserver(() => {
    const styles = memoStyles()

    let splitStylesTitle: ReactNode = null
    if (splitStyles) {
      const { subjectSplitStyles } = systemStore.setting
      if (String(subjectSplitStyles || '').startsWith('title-')) {
        const styleMap = {
          main: styles.titleMain,
          warning: styles.titleWarning,
          primary: styles.titlePrimary,
          success: styles.titleSuccess
        }
        const styleKey = subjectSplitStyles.split('-')?.[1] || 'main'
        const selectedStyle = styleMap[styleKey] || styles.titleMain
        splitStylesTitle = <View style={stl(styles.title, selectedStyle)} />
      }
    }

    return (
      <Component id='base-section-title'>
        <Flex style={style}>
          <Flex.Item style={_.mr.sm}>
            <Flex>
              {splitStylesTitle}
              {onPress ? (
                <Touchable style={styles.touch} onPress={onPress}>
                  <Flex>
                    <Text type='title' size={20} bold>
                      {children}
                    </Text>
                    {!!icon && <Iconfont name={icon} color={_.colorIcon} />}
                  </Flex>
                </Touchable>
              ) : (
                <Text type='title' size={20} bold>
                  {children}
                </Text>
              )}
              {left}
            </Flex>
          </Flex.Item>
          {right}
        </Flex>
      </Component>
    )
  })
}

export default SectionTitle
