$(function () {
  //在发起 ajax网络请求的时候 都会先调用这个函数
  //然后options 参数中包含了所有配置项
  //所以 可以在这里将url进行拼接 这样的话 只写一遍跟路径
  //方便后续代码的修改
  $.ajaxPrefilter(function (options) {
    options.url = 'http://www.liulongbin.top:3007' + options.url
    console.log(options.url)
  })
})