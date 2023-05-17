/*
 * 目录管理弹窗
 * @Author: czy0729
 * @Date: 2021-05-27 14:20:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-05-16 16:28:44
 */
import React from 'react'
import { BackHandler, ScrollView, View } from 'react-native'
import { Modal, Divider, Empty } from '@components'
import { _, userStore, usersStore, discoveryStore } from '@stores'
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
import { queue, t } from '@utils/fetch'
import { SCROLL_VIEW_RESET_PROPS } from '@constants'
import i18n from '@constants/i18n'
import { Id } from '@types'
import { IconTouchable } from '../../icon/touchable'
import { STORAGE_KEY } from './ds'
import { memoStyles } from './styles'
import { Props as FolderManageModalProps, State } from './types'
import Catalog from './catalog'
import Subjects from './subjects'
import Create from './create'

export { FolderManageModalProps }

let loaded = false

export const FolderManageModal = ob(
  class FolderManageModalComponent extends React.Component<
    FolderManageModalProps,
    State
  > {
    static defaultProps = {
      id: 0,
      defaultExpand: 0,
      defaultEditItem: null,
      visible: false,
      title: '目录',
      onSubmit: Function.prototype,
      onClose: Function.prototype
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
      list: []
    }

    formhash: string

    textareaRef: any

    forwardRef = ref => (this.textareaRef = ref)

    async componentDidMount() {
      const expand: string[] = await getStorage(STORAGE_KEY)
      if (Array.isArray(expand)) {
        this.setState({
          expand
        })
      }

      BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
    }

    async UNSAFE_componentWillReceiveProps(nextProps) {
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

          if (defaultEditItem) {
            this.onSubjectEdit(defaultEditItem)
          }
        }, 80)
      }
    }

    componentWillUnmount() {
      this.setState({
        visible: false
      })
      BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
    }

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
      const data = await usersStore.fetchCatalogs(
        {
          isCollect: false
        },
        true
      )

      // 目录是有分页的比较麻烦, 暂时只判断是否存在第二页, 后面忽略
      if (data.pagination.pageTotal > 1) {
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
      const { id, defaultExpand } = this.props
      const { list } = usersStore.catalogs()
      this.setState({
        list: list.slice().sort((a, b) => {
          if (defaultExpand == a.id) return -1

          const detailA = this.catalogDetail(a.id)
          const detailB = this.catalogDetail(b.id)
          const isInA = detailA?.list?.some(i => i.id == id)
          const isInB = detailB?.list?.some(i => i.id == id)
          if (isInA && isInB) return desc(String(b.time || ''), String(a.time || ''))
          if (isInA && !isInB) return -1
          return 1
        })
      })
    }

    /** 请求目录详情 */
    fetchCatalogDetail = async (id: string, refresh: boolean) => {
      if (!refresh) {
        const data = discoveryStore.catalogDetail(id)
        const { _loaded } = data
        if (_loaded && getTimestamp() - Number(_loaded) <= 300) return true
      }

      await discoveryStore.fetchCatalogDetail({
        id
      })

      // 缓存最新formhash
      const { list } = this.catalogDetail(id)
      if (list && list.length) {
        const { erase } = list[0]
        const formhash = erase?.split('?gh=')[1]
        if (formhash) this.formhash = formhash
      }

      return true
    }

    /** track */
    t(value: string, other = {}) {
      const { id } = this.props
      t('其他.管理目录', {
        subjectId: id,
        value,
        ...other
      })
    }

    /** 目录展开 */
    onExpand = (item: { id: Id }) => {
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
          setStorage(STORAGE_KEY, this.state.expand)
        }
      )
    }

    /** 添加/移出 */
    onToggle = (item: { id: any }, detail: { list: any[] }, isIn: boolean) => {
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
    onControl = (title: string, item: { id: any; title: any }) => {
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
    onCreate = (isNew: boolean) => {
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

    /** 提交创建/修改目录 */
    onSubmitCatalog = () => {
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
    onSubjectControl = (title, item, pItem) => {
      const detail = this.catalogDetail(pItem.id)
      const current = fixedOrder(item.order)
      let order = 0
      let temp
      let flag

      switch (title) {
        case '置顶':
          temp = detail.list
            .slice()
            .sort((a, b) => asc(a, b, item => Number(item.sort)))[0]
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
          temp = detail.list
            .slice()
            .sort((a, b) => desc(a, b, item => Number(item.sort)))[0]
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
    onSubjectEdit = (item?) => {
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
    onChange = (value: string, key = 'content') => {
      // @ts-expect-error
      this.setState({
        [key]: value
      })
    }

    /** 改变排序 */
    onOrder = order => {
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
    onSort = (item, order, pItem) => {
      const { modify, erase } = item
      const formhash = erase?.split('?gh=')[1]
      if (!formhash) {
        info('目录信息有误, 暂不能修改条目, 请重新进入页面')
        return
      }

      discoveryStore.doCatalogModifySubject(
        {
          modify,
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
    onSubmit = (item, pItem) => {
      const { modify, erase } = item
      const { content, order } = this.state
      const formhash = erase?.split('?gh=')[1]
      if (!formhash) {
        info('目录信息有误, 暂不能修改条目, 请重新进入页面')
        return
      }

      discoveryStore.doCatalogModifySubject(
        {
          modify,
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

    catalogDetail(id) {
      return {
        ...discoveryStore.catalogDetail(id),
        id
      }
    }

    renderBtnCreate() {
      const { edit, create } = this.state
      if (edit || create) return null

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
      const { create, title, desc } = this.state
      if (create !== true) return null

      return (
        <Create
          title={title}
          desc={desc}
          onChange={this.onChange}
          onCreate={this.onCreate}
          onSubmitCatalog={this.onSubmitCatalog}
        />
      )
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
        <ScrollView
          style={this.styles.scrollView}
          contentContainerStyle={this.styles.list}
          {...SCROLL_VIEW_RESET_PROPS}
          // scrollEnabled={!expand.length}
        >
          {list.map(item => {
            const detail = this.catalogDetail(item.id)
            const showDivider = expand.includes(item.id)
            return (
              <View key={item.id}>
                {this.renderCatalog(item, detail)}
                {this.renderSubjects(item, detail)}
                {showDivider && <Divider style={_.mb.md} />}
              </View>
            )
          })}
          {!create && !list.length && <Empty text='还没有创建过目录' />}
        </ScrollView>
      )
    }

    renderCatalog(item, detail) {
      const { id } = this.props
      const { expand, create, edit, desc } = this.state
      return (
        <Catalog
          id={id}
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

    renderSubjects(item, detail) {
      const { id } = this.props
      const { expand, create, edit, content, order } = this.state
      if (!(expand.includes(item.id) || create == item.id)) {
        return null
      }

      return (
        <Subjects
          id={id}
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
      )
    }

    render() {
      const { title, onClose } = this.props
      const { visible } = this.state
      return (
        <Modal
          style={this.styles.modal}
          visible={visible}
          title={title}
          onClose={onClose}
        >
          {this.renderBtnCreate()}
          {this.renderList()}
        </Modal>
      )
    }

    get styles() {
      return memoStyles()
    }
  }
)

function fixedOrder(order) {
  const _order = Number(order)
  return Number.isNaN(_order) ? 10 : _order
}
