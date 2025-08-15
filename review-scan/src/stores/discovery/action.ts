/*
 * @Author: czy0729
 * @Date: 2023-04-23 15:53:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-13 18:08:26
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
import { Fn, Id, SubjectId } from '@types'
import Fetch from './fetch'

export default class Action extends Fetch {
  /** 更新日志查看历史 */
  updateBlogReaded = (blogId: Id) => {
    const { blogReaded } = this.state
    this.setState({
      blogReaded: {
        ...blogReaded,
        [blogId]: true
      }
    })
  }

  // -------------------- action --------------------
  /** 新建目录 */
  doCatalogCreate = (
    args: {
      formhash: string
      title: string
      desc: string
    },
    success?: (response?: any, request?: any) => any
  ) => {
    const { formhash, title, desc } = args || {}
    xhr(
      {
        url: HTML_ACTION_CATALOG_CREATE(),
        data: {
          formhash,
          title,
          desc,
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
    success?: () => any
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
    },
    success?: () => any
  ) => {
    const { catalogId, formhash, title, desc } = args || {}
    xhr(
      {
        url: HTML_ACTION_CATALOG_EDIT(catalogId),
        data: {
          formhash,
          title,
          desc,
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
    success?: () => any
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
      success
    )
  }

  /** 目录移除条目 */
  doCatalogDeleteRelate = (
    args: {
      erase: string
    },
    success?: () => any
  ) => {
    const { erase } = args || {}
    xhr(
      {
        url: `${HOST}${erase}&ajax=1`
      },
      success
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
    success?: () => any
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
    success?: Fn,
    fail?: Fn
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
