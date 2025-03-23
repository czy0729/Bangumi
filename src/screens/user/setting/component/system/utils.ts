/*
 * @Author: czy0729
 * @Date: 2024-01-28 11:47:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-23 23:09:51
 */
import { calendarStore, rakuenStore, systemStore, userStore } from '@stores'
import { confirm, feedback, info, loading } from '@utils'
import { t } from '@utils/fetch'
import i18n from '@constants/i18n'

/** 是否下载设置 */
export function handleDownload() {
  if (!userStore.isLogin || !userStore.userInfo.id) {
    info(`下载需先${i18n.login()}`)
    return
  }

  setTimeout(() => {
    confirm('确定恢复到云端的设置?', confirmDownloadSetting)
  }, 160)
}

/** 下载设置 */
export async function confirmDownloadSetting() {
  t('设置.恢复默认设置', {
    label: '下载'
  })

  let hide = loading('下载设置(1/3)...')
  const flag = await systemStore.downloadSetting()
  hide()

  hide = loading('超展开设置(2/3)...')
  await rakuenStore.downloadSetting()
  hide()

  hide = loading('自定义放送数据(3/3)')
  await calendarStore.downloadSetting()
  hide()

  feedback(true)
  info(flag ? '已下载设置' : '下载设置失败')
}

/** 上传设置 */
export function handleUpload() {
  if (!userStore.isLogin || !userStore.userInfo.id) {
    info(`上传需先${i18n.login()}`)
    return
  }

  setTimeout(() => {
    confirm('确定上传当前设置到云端?', async () => {
      t('设置.恢复默认设置', {
        label: '上传'
      })

      let hide = loading('上传设置(1/3)...')
      const flag = await systemStore.uploadSetting()
      hide()

      hide = loading('超展开设置(2/3)...')
      await rakuenStore.uploadSetting()
      hide()

      hide = loading('自定义放送数据(3/3)')
      await calendarStore.uploadSetting()
      hide()

      feedback()
      info(flag ? '已上传' : '上传失败，云服务异常，请待作者修复')
    })
  }, 160)
}

/** 恢复默认设置 */
export function handleRestore() {
  setTimeout(() => {
    confirm(`仅会恢复${i18n.initial()}设置，不包含超展开设置和自定义放送数据，确定?`, () => {
      t('设置.恢复默认设置', {
        label: '恢复默认'
      })

      systemStore.resetSetting()
      setTimeout(() => {
        info('已恢复')
      }, 160)
    })
  }, 160)
}
