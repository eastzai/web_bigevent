$(function () {
  //在发起 ajax网络请求的时候 都会先调用这个函数
  //然后options 参数中包含了所有配置项
  //所以 可以在这里将url进行拼接 这样的话 只写一遍跟路径
  //方便后续代码的修改
  $.ajaxPrefilter(function (options) {
    options.url = 'http://www.liulongbin.top:3007' + options.url
    console.log(options.url)

    //统一为有权限的接口设置请求头
    //加判断 如果url中有 /my/ 才设置请求头
    if (options.url.indexOf('/my/') !== -1) {
      options.headers = {
        Authorization: localStorage.getItem('token') || ''
      }
    }

    //全局统一挂载complete回调函数
    options.complete = function (res) {
      console.log(res)
      console.log('complete')
      console.log(res.responseJSON)
      //这里要做两件事 
      //1.清除token
      //2.强制跳转到login.html
      if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        localStorage.removeItem('token')
        location.href = './login.html'
      }
    }
  })
})