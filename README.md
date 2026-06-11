# 锦衣旧梦小程序

民国风服装图鉴微信小程序，包含首页推荐、分类浏览、详情页、试穿页和个人收藏页。

## 资源说明

商品图片不打包进小程序主包，统一存放在微信云存储：

```text
cloud://cloud1-d5grlm249e99949fd.636c-cloud1-d5grlm249e99949fd-1442266836/clothes/
```

本地 `clothes/` 目录仅用于备份和调试，已在 `project.config.json` 与 `.gitignore` 中排除，避免触发代码包图片/音频资源总量 200KB 限制。

## 云函数

项目包含云函数：

```text
cloudfunctions/resolveImageUrls
```

该云函数用于通过服务端权限把云存储 fileID 转为临时 HTTPS 图片地址。部署环境：

```text
cloud1-d5grlm249e99949fd
```

如更换云环境，请同步更新 `utils/cloudAssets.js` 中的云环境 ID 和云存储根路径。

## 开发

使用微信开发者工具打开项目根目录：

```text
C:\vmshare\minguo-fashion-miniprogram
```

重新部署云函数时，在微信开发者工具中选择 `cloudfunctions/resolveImageUrls` 上传并部署，或使用 CLI：

```bash
cli.bat cloud functions deploy --env cloud1-d5grlm249e99949fd --names resolveImageUrls --project <project-path> --remote-npm-install
```
