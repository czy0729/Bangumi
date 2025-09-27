/*
 * 仅保留可能需要到的字段的类型
 * @Author: czy0729
 * @Date: 2024-09-09 16:28:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-11 13:25:44
 */
import { CollectionStatusValue, SubjectTypeValue } from '@constants/model/types'
import { Images, SubjectId } from './bangumi'

/** https://api.github.com/repos/czy0729/Bangumi/releases/latest */
export type ResponseGHReleases = {
  url: string
  target_commitish: 'master'

  /** 8.13.1 */
  name: string
  draft: boolean
  prerelease: boolean
  created_at: string

  /** 2024-09-02T11:48:57Z */
  published_at: string
  assets: {
    /** https://github.com/czy0729/Bangumi/releases/download/8.13.1/bangumi_v8.13.1_arm64-v8a.apk */
    browser_download_url: string
  }[]
  body: string
}

export type ResponseKVAdvance = Record<string, string>

/** `${API_HOST}/v0/episodes?subject_id=${subjectId}&type=0&limit=100&offset=1000` */
export type ResponseV0Episodes = {
  data: {
    airdate: any
    comment: any
    duration: any
    id: any
    name: any
    name_cn: any
    sort: any
    type: any
  }[]
}

/** `${API_HOST}/v0/users/${userId}/collections?subject_type=1&type=3&limit=100` */
export type ResponseV0UserCollections = {
  data: {
    comment: string
    ep_status: number
    private: boolean
    rate: number
    subject: {
      collection_total: number
      date: string
      eps: number
      id: SubjectId
      images: Images
      name: string
      name_cn: string
      rank: number
      score: number
      short_summary: string
      tags: {
        count: number
        name: string
      }[]
      type: SubjectTypeValue
      volumes: number
    }
    subject_id: SubjectId
    subject_type: SubjectTypeValue
    tags: string[]
    type: CollectionStatusValue
    updated_at: string
    vol_status: number
  }
  limit: number
  offset: number
  total: number
}
