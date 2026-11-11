/*
 * @Author: czy0729
 * @Date: 2022-05-05 19:38:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-12 05:20:19
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { stl } from '@utils'
import { memoStyles } from '../styles'
import { Flex } from '../../flex'
import { Heatmap } from '../../heatmap'
import { Iconfont } from '../../iconfont'
import { Loading } from '../../loading'
import { Popover } from '../../popover'
import { Text } from '../../text'
import { styles as localStyles } from './styles'

import type { PopoverData } from '../../popover'
import type { Props } from './types'

function ToolBarPopover<Data extends PopoverData>({
  style,
  itemStyle,
  data,
  value,
  icon,
  iconColor,
  iconSize = 18,
  type = 'sub',
  text,
  loading,
  disabled,
  heatmap,
  transparent,
  onSelect
}: Props<Data>) {
  const styles = memoStyles()

  const elContent = (
    <Flex style={stl(styles.item, transparent && localStyles.opacity, itemStyle)} justify='center'>
      {loading ? (
        <View style={stl(localStyles.loading, { width: iconSize, height: iconSize })}>
          <Loading.Normal style={localStyles.loadingIcon} />
        </View>
      ) : (
        !!icon && <Iconfont name={icon} size={iconSize} color={iconColor} />
      )}
      {!!text && (
        <Text
          style={stl((icon || loading) && _.ml.xs)}
          type={type}
          size={12}
          bold
          noWrap
          selectable={false}
        >
          {text}
        </Text>
      )}
    </Flex>
  )

  if (disabled) {
    return (
      <View style={stl(styles.touch, style)}>
        {elContent}
        {!!heatmap && <Heatmap id={heatmap} />}
      </View>
    )
  }

  return (
    <Popover style={stl(styles.touch, style)} data={data} value={value} onSelect={onSelect}>
      {elContent}
      {!!heatmap && <Heatmap id={heatmap} />}
    </Popover>
  )
}

export default observer(ToolBarPopover)
