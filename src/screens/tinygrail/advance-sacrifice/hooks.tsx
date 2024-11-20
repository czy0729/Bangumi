import { IconHeader } from '@_'
/*
 * @Author: czy0729
 * @Date: 2024-11-19 07:30:50
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-11-19 07:30:50
 */
import { _, useInitStore } from '@stores'
import { alert } from '@utils'
import { t } from '@utils/fetch'
import { useRunAfter } from '@utils/hooks'
import { NavigationProps } from '@types'
import store from './store'
import { Ctx } from './types'

/** 献祭推荐页面逻辑 */
export function useTinygrailAdvanceSacrificePage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { $, navigation } = context

  useRunAfter(() => {
    $.init()

    navigation.setParams({
      extra: (
        <IconHeader
          style={_.mr._right}
          name='md-info-outline'
          color={_.colorTinygrailPlain}
          onPress={() => {
            t('献祭推荐.提示')

            alert('从持仓列表里面查找\n圣殿股息 - 流动股息 = 分数', '当前计算方式')
          }}
        />
      )
    })
  })

  return context
}
