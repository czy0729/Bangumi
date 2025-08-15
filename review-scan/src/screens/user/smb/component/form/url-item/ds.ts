import { URL_DDPLAY, URL_MPV, URL_POTPLAYRER, URL_VLC } from '../ds'
/*
 * @Author: czy0729
 * @Date: 2023-11-22 06:46:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-22 14:14:13
 */
import { ACTION_COPY_LINK, ACTION_LINKING } from '../../item/folder-ep/ds'

export const TITLE = '自定义跳转'

export const CONTENT_SMB = `自定义第三方跳转规则。点击文件复制地址，长按跳转。
\n[IP] = 主机:端口\n[USERNAME] = 用户\n[PASSWORD] = 密码\n[PATH] = 文件夹路径\n[FILE] = 文件路径
\n若使用 SMB 务必使用 smb:// 开头，webDAV 务必使用 http | https:// 开头
\n推荐播放安装 VLC，直接使用 smb:// 能播；其次推荐 nPlayer，支持 nplayer-smb:// 前缀的直接跳转。\n目前已知只有 smb 1.0 协议可以直接播放，2.0会被强制关闭连接，待解决。`

export const CONTENT_DIRECTORY = `自定义第三方跳转规则，点击文件复制地址，长按跳转。\n[PATH] = 文件夹路径\n[FILE] = 文件路径
\n内置外部跳转播放协议：\n弹弹Play：${URL_DDPLAY}\nPotPlayer：${URL_POTPLAYRER}\nVLC：${URL_VLC}\nMPV：${URL_MPV}
\n当此处有值时，菜单中才会显示 [${ACTION_LINKING}] 和 [${ACTION_COPY_LINK}]。`
