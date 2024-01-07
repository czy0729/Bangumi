/*
 * @Author: czy0729
 * @Date: 2024-01-07 16:58:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-07 17:13:23
 */
import { t } from '@utils/fetch'
import { Navigation } from '@types'

export function handleToQiafan(navigation: Navigation) {
  t('空间.跳转', {
    from: '高级会员',
    to: 'Qiafan'
  })

  navigation.push('Qiafan')
}
