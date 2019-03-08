# crawler
自己倒腾的爬取BOSS直聘职位的基本信息
==> index.js 入口文件
==> list_crawler.js 获取查询页面上的各个职位的网页链接，并返回为数组，数组中储存的是对象，内容为{职位名：URL}
==> detail_crawler.js 通过list_crawler.js获取URL，再使用每个URL发送请求，取得每个职位的信息，并进行解析，封装，最后返回数据
==> notify.js 使用nodemailer发送邮件通知
==> safeToDatabase.js 将数据储存到数据库
==> config.js 各种配置文件
