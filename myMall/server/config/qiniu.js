let qn = require('qiniu');
let path = require('path');
// 本地文件路径
let filePaths = ['./public/images/33.jpg', './public/images/1.jpg'];

let client = qn.create({
    accessKey: 'ZfEZGc8IWw_WvLNYa8-J6LCHRifl8Y0Tmz1FOyg3',
    secretKey: 'Y1sMVB-xUbyyrBfCdg1aH0zXY6p2ADTkz7OFLoCk',
    bucket: 'fayinme',  // 在七牛云创建的空间名字
    origin: 'opo2yekqx.bkt.clouddn.com',    // 使用测试域名
});

let qiniuUpload = (filePaths) => {
    // map()方法返回新的 promise对象数组，
    // 若使用forEach()，报错：Cannot read property 'Symbol(Symbol.iterator)' of undefined
    // 因为没有返回值，运行到 return Promise.all(qiniuPromise) 时会返回 undefinded

    let qiniuPromise = filePaths.map(filePath => {

        // key 为上传到七牛云后自定义图片的名称
        return new Promise((resolve, reject) => {
            let fileName = path.win32.basename(filePath);
            client.uploadFile(filePath, {key: fileName}, function (err, result) {
                if(err) {
                    reject(err);
                }else {
                    resolve(result);
                }
            });
        });
    });

    return Promise.all(qiniuPromise);

};

// 调用函数
qiniuUpload(filePaths).then(res => console.log(res));