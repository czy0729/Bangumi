# packages 多环境管理

本项目通过 `yarn env [ios | android | ipa | web]` 在多个开发环境之间切换，脚本见 `packages/env.js`。提交代码前请切回 ios 环境。

## 目录结构

```
packages/
├── env.js          # 环境切换脚本
├── patches/        # ★ 统一补丁管理目录（唯一实体补丁文件）
├── ios/            # iOS 环境（提交基准）
├── android/        # Android 环境
├── ipa/            # IPA 构建环境（见 ipa/README.MD）
├── web/            # Web 环境
└── README.md       # 本文件
```

每个环境目录独立维护以下内容：

| 内容 | 说明 |
|---|---|
| `package.json` | 该环境专属依赖版本 |
| `node_modules/` | 该环境安装的完整依赖 |
| `patches/` | 指向 `packages/patches/` 的补丁**符号链接**（该环境的补丁子集） |

## 补丁统一管理

所有补丁的**实体文件**统一存放在 `packages/patches/`，各环境目录与根目录 `patches/` 里只有指向它的符号链接，按各环境需要的补丁子集决定包含哪些符号链接：

| 目录 | 补丁子集 |
|---|---|
| 根 `patches/` | 当前环境的补丁集合 |
| `packages/android/patches/` | 共享 3 + `pager-view`/`smb`/`cameraroll`/`android-widget` |
| `packages/ios/patches/` | 共享 3（`realtimeblurview`/`render-html`/`tab-view`） |
| `packages/ipa/patches/` | 共享 3 |
| `packages/web/patches/` | `realtimeblurview`/`render-html` + `@storybook/preview-web` |

> 补丁只维护一份，修改 `packages/patches/` 下文件即对所有环境生效，无需逐份复制。

## 切换机制

`yarn env <目标环境>` 执行三件事：

1. **备份当前环境**：将根目录的 `package.json`、`node_modules` 备份到 `packages/{当前环境}/`
2. **恢复目标环境**：将 `packages/{目标环境}/` 的 `package.json`、`node_modules` 恢复到根目录
3. **更新平台配置**：同步 `babel.config.js` 与 `app.json`

`patches/` 不做物理拷贝：切换时 `env.js` 的 `syncPatches` 会清空目标目录，并**按源目录的补丁子集重建指向 `packages/patches/` 的符号链接**，因此各环境的补丁子集得以保留、且统一指向同一份实体文件。

## 补丁管理约定

- 补丁文件命名遵循 patch-package 规范：`{包名}+{版本}.patch`
- **新增/修改补丁**：先在 `packages/patches/` 创建/修改实体文件，再在需要该补丁的环境 `patches/`（及根 `patches/`）下创建符号链接
- 各环境只保留该环境下实际安装且版本匹配的补丁，避免跨环境版本不匹配导致应用失败
- `npx patch-package <包名>` 会写入**当前环境根目录 `patches/` 的符号链接目标**（即 `packages/patches/`），自动归档到统一目录

## 注意事项

- 根目录 `patches/` 是指向 `packages/patches/` 的符号链接集合，不要复制成实体文件
- 新增某包补丁时，需先在 `packages/patches/` 建好实体文件再软链（`patch-package` 无法写入不存在的符号链接目标）
- 非 mac 环境切换前请关闭编辑器，避免 `node_modules` 被占用
- 提交 git 前务必切回 ios 环境