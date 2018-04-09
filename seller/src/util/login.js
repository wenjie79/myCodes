exports.radomColor = () => { // 生成随机颜色
  var a=parseInt(Math.random()*256);
  var b=parseInt(Math.random()*256);
  var c=parseInt(Math.random()*256);
  var rgb="rgb("+a+","+b+","+c+")";
  return rgb;
};
exports.codeFactory = () => { //验证码
  var identity = '';
  var randoms = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R', 'S','T','U','V','W','X','Y','Z',
    'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r', 's','t','u','v','w','x','y','z');
  var index = Math.floor((Math.random() * 62));
  identity = randoms[index];
  var color = this.radomColor();
  return {identity,color};
};
exports.setCookie = (c_name,c_pwd,exdays) => {
  var exdate=new Date();//获取时间
  exdate.setTime(exdate.getTime() + 24*60*60*1000*exdays);//保存的天数
  //字符串拼接cookie
  document.cookie="seller_name"+ "=" +c_name+";path=/;expires="+exdate.toGMTString();
  document.cookie="seller_password"+"="+c_pwd+";path=/;expires="+exdate.toGMTString();
};
exports.getCookie = () => {
  if (document.cookie.length>0) {
    var arr=document.cookie.split('; ');// cookie用‘;'隔开
    console.log(arr);
    for(var i=0;i<arr.length;i++){
      var arr2=arr[i].split('=');//再次切割
      //判断查找相对应的值
      if(arr2[0]=='seller_name'){
        var name = arr2[1];//保存到保存数据的地方
      }else if(arr2[0]=='seller_password'){
        var password =arr2[1];
      }
    }
  }
  return {name,password};
};
exports.compare = (identitying,identifies) => {
    if(identitying.length != 4) {
      return false;
    } else {
      var upperIn = '';
      var upperId = '';
      for(var i = 0; i < 4; i++) {
        if ((identitying[i] > 'a' && identitying[i] < 'z') || (identitying[i] > 'A' && identitying[i] < 'Z')) {
          upperIn = upperIn +identitying[i].toUpperCase();
        }
        if((identifies[i] > 'a' && identifies[i] < 'z') || (identifies[i] > 'A' && identifies[i] < 'Z')) {
          upperId = upperId +identifies[i].toUpperCase();
        }
      }
      if(upperIn == upperId) {
        return true;
      }
    }
    return false;
};


