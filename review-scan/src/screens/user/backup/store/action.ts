/*
 * @Author: czy0729
 * @Date: 2024-09-14 07:14:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-14 07:15:45
 */
import csv2json from 'csvjson-csv2json'
import { date, feedback, getTimestamp, info, open } from '@utils'
import { t } from '@utils/fetch'
import { request } from '@utils/fetch.v0'
import { download, temp } from '@utils/kv'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectId, SubjectTypeValue } from '@types'
import { HOST_API } from '../ds'
import { Item } from '../types'
import Fetch from './fetch'

export default class Action extends Fetch {
  /** 切换 CSV 导出设置 */
  onSetting = (key: 'includeUrl' | 'includeImage') => {
    this.setState({
      [key]: !this.state[key]
    })
    this.save()
  }

  /** 导出 CSV */
  onExport = async () => {
    if (!this.csv.length) {
      info('没有获取到收藏信息，请检查登录状态')
      return false
    }

    const { data } = await temp(
      `${this.userId}_${date('Y-m-d_H-i-s', getTimestamp())}.csv`,
      `\uFEFF${this.csv}`
    )
    if (!data?.downloadKey) {
      info('未知错误，下载失败，重试或联系作者')
      return false
    }

    t('本地备份.导出', {
      data: `${this.userId}|${this.csv.length}`
    })
    open(download(data.downloadKey))
  }

  /** 置底 (导入模式) */
  onBottom = (subjectId: SubjectId) => {
    const { bottom } = this.state
    const current = bottom.current + 1
    this.setState({
      bottom: {
        current,
        [subjectId]: current
      }
    })
    this.save()

    t('本地备份.置底')
  }

  /** 同步 (导入模式) */
  onSubmit = async (subjectId: SubjectId, collectionData, epData) => {
    if (!subjectId) return false

    if (Object.keys(collectionData).length) {
      await request(`${HOST_API}/collection/${subjectId}/update`, {
        ...collectionData,
        privacy: collectionData.privacy ? 1 : 0
      })
    }

    if (Object.keys(epData).length) {
      await request(`${HOST_API}/subject/${subjectId}/update/watched_eps`, {
        watched_eps: epData.ep || 0
      })
    }

    await this.fetchCollection(subjectId)
    feedback()

    t('本地备份.同步')
  }

  /** 切换显示导入 CSV 模态框 */
  onToggleUpload = () => {
    this.setState({
      modal: !this.state.modal
    })
  }

  /** 导入CSV (导入模式) */
  onMessage = (text: string) => {
    try {
      const data = csv2json(text)
      if (data.length) {
        const upload: Record<SubjectId, Item> = {}
        data.map((item: any) => {
          if (item.ID) {
            let type = item['状态']
            if (type.includes('在')) type = '3'
            else if (type.includes('想')) type = '1'
            else if (type.includes('过')) type = '2'
            else if (type.includes('搁置')) type = '4'
            else if (type.includes('抛弃')) type = '5'

            upload[item.ID] = {
              type,
              rate: item['我的评价'] || '',
              ep_status: item['看到'] || '',
              vol_status: '',
              comment: item['我的简评'] || '',
              tags: (item['标签'] || '').split(' '),
              private: item['私密'] === '是',
              updated_at: item['更新时间'] || '',
              subject: {
                id: item.ID,
                date: item['放送'] || '',
                eps: item['话数'] || '',
                image: item['封面'] || '',
                jp: item['日文'] || '',
                cn: item['中文'] || '',
                rank: item['排名'] || '',
                score: item['评分'] || '',
                type: MODEL_SUBJECT_TYPE.getValue<SubjectTypeValue>(item['类型']) || '2'
              }
            }
          }
        })
        this.setState({
          upload
        })
        this.save()
        this.onToggleUpload()
        t('本地备份.导入', {
          data: `${this.userId}|${data.length}`
        })
      }
    } catch (error) {
      info('解析CSV出错，请重新导入')
    }
  }
}
