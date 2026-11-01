/*
 * @Author: czy0729
 * @Date: 2023-04-23 15:53:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-02 04:06:00
 */
import { xhr } from '@utils/fetch'
import {
  HOST,
  HTML_ACTION_CATALOG_ADD_RELATED,
  HTML_ACTION_CATALOG_CREATE,
  HTML_ACTION_CATALOG_DELETE,
  HTML_ACTION_CATALOG_EDIT,
  HTML_ACTION_CATALOG_MODIFY_SUBJECT,
  HTML_DOLLARS
} from '@constants'
import Fetch from './fetch'

import type { Id, SubjectId } from '@types'

export default class Action extends Fetch {
  /** 更新日志查看历史 */
  updateBlogReaded = (blogId: Id) => {
    const STATE_KEY = 'blogReaded'
    const ITEM_KEY = blogId

    this.setState({
      [STATE_KEY]: {
        [ITEM_KEY]: true
      }
    })
    this.save(STATE_KEY)
  }

  // -------------------- action --------------------
  /** 新建目录 */
  doCatalogCreate = (
    args: {
      formhash: string
      title: string
      desc: string
      privacy?: string | number
    },
    success?: (responseText?: string, request?: XMLHttpRequest) => void
  ) => {
    const { formhash, title, desc, privacy } = args || {}
    xhr(
      {
        url: HTML_ACTION_CATALOG_CREATE(),
        data: {
          formhash,
          title,
          desc,
          privacy: privacy || 0,
          submit: '创建目录'
        }
      },
      success
    )
  }

  /** 删除目录 */
  doCatalogDelete = (
    args: {
      catalogId: Id
      formhash: string
    },
    success?: () => void
  ) => {
    const { catalogId, formhash } = args || {}
    xhr(
      {
        url: HTML_ACTION_CATALOG_DELETE(catalogId),
        data: {
          formhash,
          submit: '我要删除这个目录'
        }
      },
      success
    )
  }

  /** 编辑目录 */
  doCatalogEdit = (
    args: {
      catalogId: Id
      formhash: string
      title: string
      desc: string
      privacy?: string | number
    },
    success?: () => void
  ) => {
    const { catalogId, formhash, title, desc, privacy } = args || {}
    xhr(
      {
        url: HTML_ACTION_CATALOG_EDIT(catalogId),
        data: {
          formhash,
          title,
          desc,
          privacy: privacy || 0,
          submit: '保存修改'
        }
      },
      success
    )
  }

  /** 目录添加条目 */
  doCatalogAddRelate = (
    args: {
      catalogId: Id
      subjectId: SubjectId
      formhash: string
      noConsole?: boolean
    },
    success?: () => void,
    fail?: () => void
  ) => {
    const { catalogId, subjectId, formhash, noConsole } = args || {}
    xhr(
      {
        url: HTML_ACTION_CATALOG_ADD_RELATED(catalogId),
        data: {
          formhash,
          cat: '0',
          add_related: subjectId,
          submit: '添加条目关联'
        },
        noConsole
      },
      success,
      fail
    )
  }

  /** 目录移除条目 */
  doCatalogDeleteRelate = (
    args: {
      erase: string
    },
    success?: () => void,
    fail?: () => void
  ) => {
    const { erase } = args || {}
    xhr(
      {
        url: `${HOST}${erase}&ajax=1`
      },
      success,
      fail
    )
  }

  /** 目录修改条目 */
  doCatalogModifySubject = (
    args: {
      modify: string
      formhash: string
      content: string
      order: string | number
    },
    success?: () => void
  ) => {
    const { modify, formhash, content, order } = args || {}
    xhr(
      {
        url: HTML_ACTION_CATALOG_MODIFY_SUBJECT(modify),
        data: {
          formhash,
          content,
          order,
          submit: '提交'
        }
      },
      success
    )
  }

  /** 发送 Dollars */
  doDollars = (
    args: {
      message: string
    },
    success?: (responseText?: string, request?: XMLHttpRequest) => unknown,
    fail?: () => void
  ) => {
    const { message } = args || {}
    xhr(
      {
        url: `${HTML_DOLLARS()}?ajax=1`,
        data: {
          message
        },
        noConsole: true
      },
      success,
      fail
    )
  }
}
