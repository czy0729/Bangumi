# Passkey食用教程
本系列文档为czy0729/Bangumi使用passkey登录的教程。

本系列文档面向第一次使用密码管理器或第一次通过密码管理器使用Passkey编写。

> [!IMPORTANT]
>
> 此项目需要支持自定义特权应用的密码管理器：
> - Bitwarden
> - KeePassDX

> [!NOTE]
>
> 如果你已经在使用：
> - **Bitwarden**，点击查看[注册Passkey](Bitwarden.md#注册passkey)，[使用Passkey](Bitwarden.md#使用Passkey)。
> - **KeePassDX**，点击查看[注册Passkey](KeePassDX.md#注册Passkey)，[使用Passkey](KeePassDX.md#使用Passkey)。
## 为何选用Passkey登录

1. 更安全：基于公钥加密技术，私钥不会上传到服务器，降低账号被盗风险。
2. 防钓鱼：Passkey 与网站域名绑定，不容易被假冒网站窃取。
3. 无需记密码：不必记忆或输入复杂密码。
4. 登录更快速：通过指纹、脸部识别或设备 PIN 即可完成验证。
5. 降低密码泄露风险：没有传统密码可供撞库或重复使用

## 软件选择

| 对比项目    | Bitwarden                           | KeePassDX                |
| ------- | ----------------------------------- | ------------------------ |
| 类型      | 云端密码管理器                             | 本地密码管理器                  |
| 数据存储    | 官方云端或自托管服务器                         | 本地 KeePass 数据库文件         |
| 加密      | 端到端加密                               | 数据库本地加密                  |
| 多设备同步   | 自动同步                                | 通过网盘、NAS、Syncthing 等同步文件 |
| 多平台支持   | Windows、Linux、macOS、Android、iOS、浏览器 | 数据库文件为通用标准，其他平台可选用其他应用             |
| 开源      | 是                                   | 是                        |
| 服务器依赖   | 使用官方云服务时依赖服务器                       | 不需要官方服务器                 |
| 备份      | 云端同步，也可导出                           | 自己备份数据库文件                |


**选择 Bitwarden，如果你：**

- 希望密码自动同步。
- 不想自己维护数据库和同步机制。
- 点击[此处](Bitwarden.md)查看食用教程

> [!NOTE]
> 由于官方服务器位于美国和欧盟地区，如果你愿意折腾，笔者建议自建后端[Vaultwarden](https://github.com/dani-garcia/vaultwarden)。

**选择 KeePassDX，如果你：**

- 不希望依赖密码管理服务商。
- 已经有 NAS、Syncthing 或私有网盘。
- 能接受手动管理数据库备份和同步。
- 点击[此处](KeePassDX.md)查看食用教程

## Q&A