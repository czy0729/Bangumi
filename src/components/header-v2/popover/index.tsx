/*
 * @Author: czy0729
 * @Date: 2022-03-12 04:56:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-15 05:56:59
 */
import { useMemo } from 'react'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { stl } from '@utils'
import { FROZEN_FN, TEXT_MENU_SPA } from '@constants'
import { Flex } from '../../flex'
import { Iconfont } from '../../iconfont'
import { Popover as PopoverComp } from '../../popover'
import { styles } from './styles'

import type { PopoverData } from '../../popover'
import type { Props } from './types'

function Popover<Data extends PopoverData>({
  style,
  name = 'md-more-horiz',
  size,
  color,
  data,
  onSelect = FROZEN_FN,
  children,
  ...other
}: Props<Data>) {
  /** 隐藏「网页版查看」(跳转 URL_SPA 网页版) 菜单项; 各页面 ds.ts 与 onSelect 分支仍保留, 删掉此过滤即可恢复 */
  const memoData = useMemo(
    () => data?.filter(item => item !== TEXT_MENU_SPA) as unknown as Data | undefined,
    [data]
  )

  return (
    <PopoverComp
      style={stl(styles.touch, style)}
      placement='bottom'
      data={memoData}
      onSelect={onSelect}
      {...other}
    >
      {name ? (
        <Flex style={styles.icon} justify='center'>
          <Iconfont size={size} name={name} color={color || _.colorTitle} />
        </Flex>
      ) : null}
      {children}
    </PopoverComp>
  )
}

export default observer(Popover)
