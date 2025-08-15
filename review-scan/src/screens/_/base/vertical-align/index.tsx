/*
 * @Author: czy0729
 * @Date: 2024-06-13 22:34:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-02 02:50:55
 */
import { Text } from '@components'
import { Props as VerticalAlignProps } from './types'

export { VerticalAlignProps }

/**
 * 对于安卓端某些特殊字符, 存在超过行高的高度会看不全,
 * 自动改变行高然后垂直居中尽量显示, 仅安卓需要
 * */
export const VerticalAlign = ({ text, onHit, children, ...other }: VerticalAlignProps) => {
  return <Text {...other}>{children}</Text>
}

export default VerticalAlign
