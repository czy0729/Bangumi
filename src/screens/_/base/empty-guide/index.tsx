/*
 * @Author: czy0729
 * @Date: 2026-11-08 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-08 10:00:00
 *
 * 同步类页面通用空态: 标题 + 步骤 / 说明 + 主按钮
 */
import { Flex, Iconfont, Text, Touchable } from '@components'
import { _ } from '@stores'
import { stl } from '@utils'
import { useInsets } from '@utils/hooks'
import { memoStyles } from './styles'

import type { Props } from './types'

export function EmptyGuide({ title, description, steps, buttonText, onPress }: Props) {
  const { headerHeight } = useInsets()

  const styles = memoStyles()

  return (
    // 空态区从头部下方开始, 补一个头部高度让内容在整屏视觉居中
    <Flex
      style={stl(styles.empty, {
        paddingBottom: headerHeight
      })}
      direction='column'
      justify='center'
    >
      <Iconfont name='md-person-outline' size={56} color={_.colorSub} />
      <Text style={_.mt.md} size={16} type='title' bold align='center'>
        {title}
      </Text>

      {!!steps?.length && (
        <Flex style={_.mt.sm} direction='column' align='start'>
          {steps.map((item, index) => (
            <Text key={item} style={index === 0 ? undefined : _.mt.xs} size={13} type='sub'>
              {item}
            </Text>
          ))}
        </Flex>
      )}

      {!steps?.length && !!description && (
        <Text style={_.mt.sm} size={12} type='sub' align='center'>
          {description}
        </Text>
      )}

      {!!buttonText && (
        <Touchable style={styles.button} onPress={onPress}>
          <Text size={13} bold>
            {buttonText}
          </Text>
        </Touchable>
      )}
    </Flex>
  )
}
