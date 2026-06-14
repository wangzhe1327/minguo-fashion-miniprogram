# 锦衣旧梦小程序

民国风服装图鉴微信小程序，包含首页推荐、分类浏览、服装详情、摄影取片、选款清单、个人收藏和咨询文案复制。

## 功能说明

- 首页支持搜索、分类筛选、推荐轮播和快速加入清单。
- 分类页按旗袍、童装、汉服等类目浏览服装。
- 详情页支持收藏、加入清单、查看搭配建议、复制单款咨询文案。
- 摄影取片页支持输入取片码、预览云端成片、单张保存和批量保存到手机相册。
- 精修特效页支持从取片相册选图，选择套餐、风格、强度、交付时效并提交修图订单。
- 清单页可汇总已选服装，填写用途、日期、人数和备注，并复制完整咨询单。
- 我的页显示收藏数、清单数、浏览次数和最近浏览记录。

## 资源说明

商品图片不打包进小程序主包，统一存放在微信云存储：

```text
cloud://cloud1-d5grlm249e99949fd.636c-cloud1-d5grlm249e99949fd-1442266836/clothes/
```

本地 `clothes/` 目录仅用于备份和调试，已在 `project.config.json` 与 `.gitignore` 中排除，避免触发代码包图片和音频资源总量 200KB 限制。

## 云函数

项目包含云函数：

```text
cloudfunctions/resolveImageUrls
cloudfunctions/getPhotoAlbum
cloudfunctions/createRetouchOrder
cloudfunctions/listRetouchOrders
cloudfunctions/processRetouchOrder
```

`resolveImageUrls` 用于通过服务端权限把服装图片 `fileID` 转为临时 HTTPS 图片地址。

`getPhotoAlbum` 用于根据用户输入的取片码查询云数据库 `photoAlbums`，并返回可预览和保存的照片临时地址。

`createRetouchOrder` 用于创建精修特效订单。

`listRetouchOrders` 用于查询用户自己的精修订单和交付结果。

`processRetouchOrder` 用于由管理员触发 AI 后端处理订单：读取订单、调用 AI Worker、上传交付成片并回写订单状态。

部署环境：

```text
cloud1-d5grlm249e99949fd
```

如更换云环境，请同步更新 `utils/cloudAssets.js` 中的云环境 ID 和云存储根路径。

## 摄影取片配置

摄影师完成修图后，将照片上传到微信云存储，例如：

```text
albums/20260611-A001/photo_01.jpg
albums/20260611-A001/photo_02.jpg
```

然后在云数据库中新建集合 `photoAlbums`，每个客户相册创建一条记录：

```json
{
  "pickupCode": "A0012026",
  "status": "published",
  "title": "王女士民国风写真",
  "customerName": "王女士",
  "photographer": "摄影师小林",
  "shootDate": "2026-06-11",
  "expireAt": "2026-12-31",
  "notice": "请在有效期内保存原片。",
  "photos": [
    {
      "id": "photo_01",
      "name": "精修 01",
      "fileID": "cloud://cloud1-d5grlm249e99949fd.636c-cloud1-d5grlm249e99949fd-1442266836/albums/20260611-A001/photo_01.jpg",
      "retouched": true
    }
  ]
}
```

用户输入 `pickupCode` 后即可查看并保存照片。开发调试时可手动输入 `DEMO2026` 查看演示相册。

## 精修特效配置

小程序端的套餐、风格和交付时效配置在：

```text
utils/retouchConfig.js
```

用户提交后，云数据库会写入集合 `retouchOrders`。订单核心字段如下：

```json
{
  "orderNo": "RT20260611ABCDE",
  "status": "submitted",
  "pickupCode": "A0012026",
  "albumTitle": "王女士民国风写真",
  "packageId": "portrait",
  "effectId": "minguo-film",
  "deliveryId": "standard",
  "intensity": 60,
  "amount": 156,
  "photos": [
    {
      "id": "photo_01",
      "name": "精修 01",
      "fileID": "cloud://..."
    }
  ],
  "resultPhotos": []
}
```

运营处理流程：

1. 修图师或后台服务读取 `retouchOrders` 中 `status = submitted` 的订单。
2. 下载 `photos` 里的原片，按套餐和风格处理。
3. 把交付成片上传到云存储，例如 `retouch-results/RT20260611ABCDE/result_01.jpg`。
4. 更新该订单：

```json
{
  "status": "delivered",
  "resultPhotos": [
    {
      "id": "result_01",
      "name": "交付成片 01",
      "fileID": "cloud://cloud1-d5grlm249e99949fd.636c-cloud1-d5grlm249e99949fd-1442266836/retouch-results/RT20260611ABCDE/result_01.jpg"
    }
  ]
}
```

订单状态建议使用：`submitted`、`quoted`、`processing`、`delivered`、`rejected`、`canceled`。

## AI 修图后端

独立 AI Worker 位于：

```text
backend/retouch-worker
```

如果要把当前 Windows 电脑配置成本机服务器，按这份文档操作：

```text
backend/retouch-worker/LOCAL_WINDOWS_SERVER.md
```

默认使用 OpenCV + Pillow 完成白平衡、局部对比、自然磨皮、锐化、复古胶片、柔光、电影感、旧照颗粒等处理。部署 GPU 环境后，可启用：

- GFPGAN：人脸修复和面部细节增强，Apache-2.0。
- Real-ESRGAN：通用图像增强和超分，BSD-3-Clause。

启动方式：

```powershell
cd backend/retouch-worker
powershell -ExecutionPolicy Bypass -File scripts\setup-windows.ps1
powershell -ExecutionPolicy Bypass -File scripts\start-worker.ps1 -Background
```

Docker：

```bash
cd backend/retouch-worker
docker build -t minguo-retouch-worker .
docker run --rm -p 8080:8080 --env-file .env minguo-retouch-worker
```

AI Worker 部署到公网 HTTPS 后，在云函数 `processRetouchOrder` 中配置环境变量：

```text
RETOUCH_WORKER_URL=https://your-worker.example.com
RETOUCH_WORKER_TOKEN=与 Worker .env 中一致
RETOUCH_ADMIN_TOKEN=管理员触发口令
```

同时在微信云开发控制台把 `processRetouchOrder` 的超时时间调到 120 秒以上。微信 CLI 部署后默认可能仍是 3 秒，整单 AI 处理和结果上传不适合使用默认超时。

处理订单时调用 `processRetouchOrder`：

```json
{
  "orderId": "retouchOrders 文档 id",
  "adminToken": "管理员触发口令"
}
```

云函数会自动把结果上传到：

```text
retouch-results/<orderNo>/
```

并把订单更新为 `delivered`。如果处理失败，会写入 `errorMessage` 并把状态改为 `rejected`，方便人工复核。

## 开发

使用微信开发者工具打开项目根目录：

```text
C:\vmshare\minguo-fashion-miniprogram
```

重新部署云函数时，可在微信开发者工具中选择对应云函数上传并部署，或使用 CLI：

```bash
cli.bat cloud functions deploy --env cloud1-d5grlm249e99949fd --names resolveImageUrls --project <project-path> --remote-npm-install
cli.bat cloud functions deploy --env cloud1-d5grlm249e99949fd --names getPhotoAlbum --project <project-path> --remote-npm-install
cli.bat cloud functions deploy --env cloud1-d5grlm249e99949fd --names createRetouchOrder --project <project-path> --remote-npm-install
cli.bat cloud functions deploy --env cloud1-d5grlm249e99949fd --names listRetouchOrders --project <project-path> --remote-npm-install
cli.bat cloud functions deploy --env cloud1-d5grlm249e99949fd --names processRetouchOrder --project <project-path> --remote-npm-install
```
