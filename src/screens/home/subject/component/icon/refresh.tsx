/*
 * @Author: czy0729
 * @Date: 2026-09-17 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-17 10:00:00
 */
import { observer } from 'mobx-react'
import { CircularProgress } from '@components'
import { IconTouchable } from '@_'
import { _, systemStore, useStore } from '@stores'
import { feedback, info } from '@utils'
import { WEB } from '@constants'
import { COMPONENT_THUMBS_REFRESH, HIT_SLOP } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'

/** 手动刷新预览截图 (绕过自动流程的缓存与节流, Web 端抓取链路不可用) */
function IconThumbsRefresh() {
  const { $ } = useStore<Ctx>(COMPONENT_THUMBS_REFRESH)

  if (WEB || !systemStore.setting.showThumbs) return null

  const loading = $.state.thumbsRefreshing

  return (
    <IconTouchable
      style={styles.refresh}
      name={loading ? undefined : 'md-refresh'}
      size={14}
      color={_.colorIcon}
      hitSlop={HIT_SLOP}
      withoutFeedback={loading}
      onPress={async () => {
        if (loading) return

        feedback(true)
        const result = await $.refreshThumbs()
        feedback(true)
        if (result === 'updated') {
          info('截图已更新')
        } else if (result === 'timeout') {
          /** 已放弃等待, 后台仍在跑, 拿到数据会自行更新 */
          info('抓取超时, 稍后可能自动更新')
        } else {
          info('暂无新的截图')
        }
      }}
    >
      {/* 不传 percent 即不确定态: 空环匀速旋转, 与图标同尺寸不撑高行 */}
      {loading && <CircularProgress size={14} strokeWidth={2} color={_.colorIcon} />}
    </IconTouchable>
  )
}

export default observer(IconThumbsRefresh)
