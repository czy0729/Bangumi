/*
 * @Author: czy0729
 * @Date: 2021-05-27 14:20:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-20 16:14:27
 */
import React from 'react'
import { BackHandler, ScrollView, View } from 'react-native'
import { Collapsible, Component, Divider, Empty, Modal } from '@components'
import { _, collectionStore, discoveryStore, usersStore, userStore } from '@stores'
import { CatalogsItem } from '@stores/users/types'
import {
  asc,
  confirm,
  desc,
  feedback,
  getStorage,
  getTimestamp,
  HTMLDecode,
  info,
  setStorage
} from '@utils'
import { ob } from '@utils/decorators'
import { r } from '@utils/dev'
import { queue, t } from '@utils/fetch'
import { FROZEN_FN, SCROLL_VIEW_RESET_PROPS } from '@constants'
import i18n from '@constants/i18n'
import { AnyObject, Id } from '@types'
import { IconTouchable } from '../../icon/touchable'
import Catalog from './catalog'
import Create from './create'
import Subjects from './subjects'
import ToolBar from './tool-bar'
import { fixedOrder } from './utils'
import {
  COMPONENT,
  ORDER_DS,
  SORT_DS,
  STORAGE_KEY_EXPAND,
  STORAGE_KEY_ORDER,
  STORAGE_KEY_SORT
} from './ds'
import { memoStyles } from './styles'
import {
  CatalogDetail,
  CatalogDetailItem,
  HandleChange,
  HandleControl,
  HandleCreate,
  HandleExpand,
  HandleForwardRef,
  HandleOrder,
  HandleSort,
  HandleSortType,
  HandleSubjectControl,
  HandleSubjectEdit,
  HandleSubmit,
  HandleSubmitCatalog,
  HandleToggle,
  Props as FolderManageModalProps,
  SortOrder,
  SortType,
  State
} from './types'

export { FolderManageModalProps }

let loaded = false

/** 目录管理弹窗 */
export const FolderManageModal = ob(
  class FolderManageModalComponent extends React.Component<FolderManageModalProps, State> {
    static defaultProps: FolderManageModalProps = {
      id: 0,
      defaultExpand: 0,
      defaultEditItem: null,
      visible: false,
      title: '目录',
      onClose: FROZEN_FN
    }

    state: State = {
      visible: false,
      expand: [],
      create: false,
      title: '',
      desc: '',
      edit: 0,
      content: '',
      order: '0',
      list: [],
      sortType: SORT_DS[0].value,
      sortOrder: ORDER_DS[0].value
    }

    formhash: string

    textareaRef: any

    forwardRef: HandleForwardRef = (ref: any) => {
      this.textareaRef = ref
    }

    async componentDidMount() {
      this.getLocalData()
      if (this.props.defaultExpand) {
        this.fetchCollectStatusQueue(this.props.defaultExpand)
      }
      BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
    }

    async UNSAFE_componentWillReceiveProps(nextProps: FolderManageModalProps) {
      const { visible } = nextProps
      this.setState({
        visible
      })

      if (!this.props.visible && nextProps.visible) {
        this.fetchCatalogs()

        setTimeout(() => {
          const { defaultExpand, defaultEditItem } = nextProps
          if (defaultExpand) {
            this.setState({
              expand: [String(defaultExpand)],
              edit: 0,
              content: '',
              order: '0'
            })
          }

          if (defaultEditItem) this.onSubjectEdit(defaultEditItem)
        }, 80)
      }
    }

    componentWillUnmount() {
      try {
        this.setState({
          visible: false
        })

        BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
      } catch (error) {}
    }

    /** 读取本地化设置 */
    getLocalData = async () => {
      const expand: string[] = await getStorage(STORAGE_KEY_EXPAND)
      if (Array.isArray(expand)) {
        this.setState({
          expand
        })
      }

      const sortType: SortType = (await getStorage(STORAGE_KEY_SORT)) || SORT_DS[0].value
      const sortOrder: SortOrder = (await getStorage(STORAGE_KEY_ORDER)) || ORDER_DS[0].value
      this.setState({
        sortType,
        sortOrder
      })
    }

    /** 监听安卓返回键 */
    onBackAndroid = () => {
      const { visible, onClose } = this.props
      if (visible) {
        onClose()
        return true
      }

      return false
    }

    /** 请求目录列表 */
    fetchCatalogs = async () => {
      const { pagination } = await usersStore.fetchCatalogs(
        {
          isCollect: false
        },
        true
      )

      // 目录是有分页的比较麻烦, 暂时只判断是否存在第二页, 后面忽略
      if (pagination.pageTotal > 1) {
        await usersStore.fetchCatalogs({
          isCollect: false
        })
      }
      this.updateList()

      const { list } = usersStore.catalogs()
      queue(list.map(item => () => this.fetchCatalogDetail(item.id as string, !loaded)))
      loaded = true

      return true
    }

    /** 缓存列表 */
    updateList = () => {
      const { sortType, sortOrder } = this.state
      let list = usersStore.catalogs().list.slice()
      if (sortType === 'date') {
        list = list.sort((a, b) => {
          const dateA = Date.parse(a.time.replace('创建于:', ''))
          const dateB = Date.parse(b.time.replace('创建于:', ''))
          return sortOrder === 'desc' ? dateB - dateA : dateA - dateB
        })
      } else if (sortType === 'name') {
        list = list.sort((a, b) => {
          return sortOrder === 'desc'
            ? b.title.localeCompare(a.title)
            : a.title.localeCompare(b.title)
        })
      } else if (sortType === 'count') {
        list = list.sort((a, b) => {
          return sortOrder === 'desc'
            ? Number(b.num) - Number(a.num)
            : Number(a.num) - Number(b.num)
        })
      }

      this.setState({
        list
      })
    }

    /** 请求目录详情 */
    fetchCatalogDetail = async (id: Id, refresh: boolean) => {
      if (!refresh) {
        const data = discoveryStore.catalogDetail(id)
        const { _loaded } = data
        if (_loaded && getTimestamp() - Number(_loaded) <= 300) return true
      }

      await discoveryStore.fetchCatalogDetail({
        id
      })

      // 缓存最新 formhash
      const { list } = this.catalogDetail(id)
      if (list?.length) {
        const { erase } = list[0]
        const formhash = erase?.split('?gh=')[1]
        if (formhash) this.formhash = formhash
      }

      return true
    }

    /** 批量获取目录中已收藏条目的最新状态 */
    fetchCollectStatusQueue = (id: Id) => {
      const { list } = this.catalogDetail(id)
      if (list.length) {
        const subjectIds = list.filter(item => item.isCollect).map(item => item.id)
        if (subjectIds.length) collectionStore.fetchCollectionStatusQueue(subjectIds)
      }
    }

    /** track */
    t(value: string, other: AnyObject = {}) {
      t('其他.管理目录', {
        subjectId: this.props.id,
        value,
        ...other
      })
    }

    /** 目录展开 */
    onExpand: HandleExpand = item => {
      const { expand } = this.state
      this.setState(
        {
          expand: expand.includes(item.id)
            ? expand.filter(i => !(i == item.id))
            : [...expand, item.id],
          edit: 0,
          content: '',
          order: '0'
        },
        () => {
          setStorage(STORAGE_KEY_EXPAND, this.state.expand)
          this.fetchCollectStatusQueue(item.id)
        }
      )
    }

    /** 添加 / 移出 */
    onToggle: HandleToggle = (item, detail, isIn) => {
      if (!isIn) {
        discoveryStore.doCatalogAddRelate(
          {
            catalogId: item.id,
            subjectId: this.props.id,
            formhash: this.formhash || userStore.formhash
          },
          () => {
            info('已添加到此目录')
            feedback()
            this.fetchCatalogDetail(item.id, true)
            this.t('onToggle:in')
          }
        )
        return
      }

      const { id } = this.props
      const find = detail.list.find(i => i.id == id)
      if (!find || !find.erase) {
        info('目录信息有误, 暂不能把该条目移出目录, 请重新进入页面')
        return
      }

      confirm('移出会同时删除目录评价, 确定?', () => {
        discoveryStore.doCatalogDeleteRelate(
          {
            erase: find.erase
          },
          () => {
            info('已移出此目录')
            feedback()
            this.fetchCatalogDetail(item.id, true)
            this.t('onToggle:out')
          }
        )
      })
    }

    /** 更多菜单 */
    onControl: HandleControl = (title, item) => {
      const detail = this.catalogDetail(item.id)
      switch (title) {
        case '修改':
          this.setState({
            create: item.id,
            title: item.title || '',
            desc: HTMLDecode(detail.content || '').replace(/<br>/g, '')
          })
          break

        case '删除':
          if (!(this.formhash || userStore.formhash)) {
            info(`授权信息有误, 无法操作, 请尝试重新${i18n.login()}`)
            return
          }

          confirm(
            `删除目录[${item.title}], 操作将抹掉所有关联数据以及用户留言, 是否要继续?`,
            () => {
              discoveryStore.doCatalogDelete(
                {
                  catalogId: item.id,
                  formhash: this.formhash || userStore.formhash
                },
                () => {
                  info('已删除此目录')
                  feedback()
                  this.fetchCatalogs()
                  this.t('onControl:delete')
                }
              )
            }
          )
          break

        default:
          break
      }
    }

    /** 创建目录 */
    onCreate: HandleCreate = isNew => {
      if (isNew) {
        if (!(this.formhash || userStore.formhash)) {
          info(`授权信息有误, 无法操作, 请尝试重新${i18n.login()}`)
          return
        }

        this.setState({
          create: true
        })
        return
      }

      this.setState({
        create: false,
        title: '',
        desc: ''
      })
    }

    /** 提交创建 / 修改目录 */
    onSubmitCatalog: HandleSubmitCatalog = () => {
      if (!(this.formhash || userStore.formhash)) {
        info(`授权信息有误, 无法操作, 请尝试重新${i18n.login()}`)
        return
      }

      const { create, title, desc } = this.state
      if (!title.length) {
        info('请填写目录标题')
        return
      }

      if (!desc.length) {
        info('请填写目录介绍')
        return
      }

      if (create === true) {
        discoveryStore.doCatalogCreate(
          {
            formhash: this.formhash || userStore.formhash,
            title: title || '',
            desc: desc || ''
          },
          () => {
            info('已创建目录')
            this.fetchCatalogs()
            this.onCreate(false)
            feedback()
            this.t('onSubmitCatalog:create')
          }
        )
        return
      }

      discoveryStore.doCatalogEdit(
        {
          catalogId: create as string,
          formhash: this.formhash || userStore.formhash,
          title: title || '',
          desc: desc || ''
        },
        () => {
          this.fetchCatalogDetail(create as string, true)
          this.onCreate(false)
          feedback()
          this.t('onSubmitCatalog:edit')
        }
      )
    }

    /** 条目更多菜单 */
    onSubjectControl: HandleSubjectControl = (title, item, pItem) => {
      const detail = this.catalogDetail(pItem.id)
      const current = fixedOrder(item.order)
      let order = 0
      let temp: CatalogDetailItem | number[]
      let flag: boolean

      switch (title) {
        case '置顶':
          temp = detail.list.slice().sort((a, b) => asc(a, b, item => Number(item.sort)))[0]
          order = Number(temp.order)
          if (Number.isNaN(order)) {
            order = 0
          } else {
            order -= 10
          }

          this.onSort(item, order, pItem)
          this.t('onSubjectControl:top')
          break

        case '上移':
          if (current == 0) {
            order = -10
          } else {
            temp = detail.list.map(i => fixedOrder(i.order)).sort((a, b) => desc(a, b))
            temp.forEach(i => {
              if (!flag && current > i) {
                order = i - 10
                flag = true
              }
            })

            if (!flag) {
              order = (temp[temp.length - 1] || 0) - 10
            }
          }

          this.onSort(item, order, pItem)
          this.t('onSubjectControl:up')
          break

        case '下移':
          detail.list
            .map(i => fixedOrder(i.order))
            .sort((a, b) => asc(a, b))
            .forEach(i => {
              if (!flag && current < i) {
                order = i + 10
                flag = true
              }
            })
          if (!flag) {
            order = current + 10
          }

          this.onSort(item, order, pItem)
          this.t('onSubjectControl:down')
          break

        case '置底':
          temp = detail.list.slice().sort((a, b) => desc(a, b, item => Number(item.sort)))[0]
          order = Number(temp.order)
          if (Number.isNaN(order)) {
            order = 10
          } else {
            order += 10
          }

          this.onSort(item, order, pItem)
          this.t('onSubjectControl:bottom')
          break

        case '修改':
          this.onSubjectEdit(item)
          this.t('onSubjectControl:edit')
          break

        case '移出':
          confirm('确定移出目录?', () => {
            discoveryStore.doCatalogDeleteRelate(
              {
                erase: item.erase
              },
              () => {
                info('已移出此目录')
                feedback()
                this.fetchCatalogDetail(pItem.id, true)
                this.t('onSubjectControl:remove')
              }
            )
          })
          break

        default:
          break
      }
    }

    /** 编辑项 */
    onSubjectEdit: HandleSubjectEdit = (item?: CatalogDetailItem) => {
      if (item) {
        this.setState({
          edit: item.id,
          content: HTMLDecode(item.comment || '').replace(/<br>/g, ''),
          order: item.order || '0'
        })

        setTimeout(() => {
          try {
            if (typeof this?.textareaRef?.textAreaRef?.focus === 'function') {
              this.textareaRef.textAreaRef.focus()
            }
          } catch (error) {}
        }, 160)
        return
      }

      this.setState({
        edit: 0,
        content: '',
        order: '0'
      })
    }

    /** 改变文字 */
    onChange: HandleChange = (value, key = 'content') => {
      this.setState({
        [key]: value
      } as Pick<State, Parameters<HandleChange>[1]>)
    }

    /** 改变排序 */
    onOrder: HandleOrder = order => {
      if (!order) {
        this.setState({
          order: ''
        })
        return
      }

      const _order = Number(order)
      if (Number.isNaN(_order)) return

      this.setState({
        order: _order == 0 ? '' : _order
      })
    }

    /** 直接提交顺序 */
    onSort: HandleSort = (item, order, pItem) => {
      const formhash = item.erase?.split('?gh=')[1]
      if (!formhash) {
        info('目录信息有误, 暂不能修改条目, 请重新进入页面')
        return
      }

      discoveryStore.doCatalogModifySubject(
        {
          modify: item.modify,
          formhash,
          content: HTMLDecode(item.comment || '').replace(/<br>/g, ''),
          order: order || '0'
        },
        () => {
          feedback()
          this.fetchCatalogDetail(pItem.id, true)
        }
      )
    }

    /** 提交 */
    onSubmit: HandleSubmit = (item, pItem) => {
      const formhash = item.erase?.split('?gh=')[1]
      if (!formhash) {
        info('目录信息有误, 暂不能修改条目, 请重新进入页面')
        return
      }

      const { content, order } = this.state
      discoveryStore.doCatalogModifySubject(
        {
          modify: item.modify,
          formhash,
          content: content || '',
          order: String(order || '0')
        },
        () => {
          feedback()
          this.fetchCatalogDetail(pItem.id, true)
          this.onSubjectEdit()
          this.t('onSubmit:subject')
        }
      )
    }

    /** 工具栏排序切换 */
    onSortType: HandleSortType = sortType => {
      if (sortType !== this.state.sortType) {
        this.setState(
          {
            sortType
          },
          () => {
            setStorage(STORAGE_KEY_SORT, this.state.sortType)
            this.updateList()
          }
        )
      } else {
        this.setState(
          {
            sortOrder: this.state.sortOrder === 'asc' ? 'desc' : 'asc'
          },
          () => {
            setStorage(STORAGE_KEY_ORDER, this.state.sortOrder)
            this.updateList()
          }
        )
      }

      feedback(true)
    }

    /** 目录详情 */
    catalogDetail(id: Id) {
      return {
        ...discoveryStore.catalogDetail(id),
        id
      }
    }

    renderBtnCreate() {
      if (this.state.edit || this.state.create) return null

      return (
        <View style={this.styles.create}>
          <IconTouchable
            name='md-add'
            size={24}
            color={_.colorSub}
            onPress={() => this.onCreate(true)}
          />
        </View>
      )
    }

    renderCreate() {
      if (this.state.create !== true) return null

      return (
        <Create
          title={this.state.title}
          desc={this.state.desc}
          onChange={this.onChange}
          onCreate={this.onCreate}
          onSubmitCatalog={this.onSubmitCatalog}
        />
      )
    }

    renderToolBar() {
      const { sortType, sortOrder } = this.state
      return <ToolBar sortType={sortType} sortOrder={sortOrder} onSortType={this.onSortType} />
    }

    renderList() {
      const { create, expand, list } = this.state
      if (create === true) {
        return (
          <ScrollView style={this.styles.scrollView} {...SCROLL_VIEW_RESET_PROPS}>
            {this.renderCreate()}
          </ScrollView>
        )
      }

      return (
        <>
          {this.renderToolBar()}
          <ScrollView
            style={this.styles.scrollView}
            contentContainerStyle={this.styles.list}
            {...SCROLL_VIEW_RESET_PROPS}
          >
            {list.map(item => {
              const detail = this.catalogDetail(item.id)
              const showDivider = expand.includes(item.id)
              return (
                <View key={item.id}>
                  {this.renderCatalog(item, detail)}
                  {this.renderSubjects(item, detail)}
                  {showDivider && <Divider style={this.styles.divider} />}
                </View>
              )
            })}
            {!create && !list.length && <Empty text='还没有创建过目录' />}
          </ScrollView>
        </>
      )
    }

    renderCatalog(item: CatalogsItem, detail: CatalogDetail) {
      const { expand, create, edit, desc } = this.state
      return (
        <Catalog
          id={this.props.id}
          expand={expand}
          create={create}
          edit={edit}
          desc={desc}
          item={item}
          detail={detail}
          onChange={this.onChange}
          onExpand={this.onExpand}
          onToggle={this.onToggle}
          onControl={this.onControl}
          onCreate={this.onCreate}
          onSubmitCatalog={this.onSubmitCatalog}
        />
      )
    }

    renderSubjects(item: CatalogsItem, detail: CatalogDetail) {
      const { create, expand, edit, content, order } = this.state
      const collapsed = !(expand.includes(item.id) || create == item.id)
      return (
        <Collapsible collapsed={collapsed}>
          <Subjects
            id={this.props.id}
            create={create}
            edit={edit}
            content={content}
            order={order}
            item={item}
            detail={detail}
            forwardRef={this.forwardRef}
            onChange={this.onChange}
            onOrder={this.onOrder}
            onSubjectEdit={this.onSubjectEdit}
            onSubjectControl={this.onSubjectControl}
            onSubmit={this.onSubmit}
          />
        </Collapsible>
      )
    }

    render() {
      r(COMPONENT)

      return (
        <Component id='base-folder-manage-modal'>
          <Modal
            style={this.styles.modal}
            visible={this.state.visible}
            title={this.props.title}
            onClose={this.props.onClose}
          >
            {this.renderBtnCreate()}
            {this.renderList()}
          </Modal>
        </Component>
      )
    }

    get styles() {
      return memoStyles()
    }
  }
)

export default FolderManageModal
