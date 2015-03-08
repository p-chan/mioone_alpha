$(function () {

var hash = location.hash;

if (!hash) {
  // ハッシュがない場合
  getJson();
} else {
  // ハッシュがある場合
  setAccessToken();
};

function setAccessToken () {
  var getAccessToken = hash.split("&")[0].split("=")[1];
  document.cookie = 'token=' + getAccessToken + ';' + 'max-age=7776000;';
  location.href = "/";
}

function getJson () {

  var token = document.cookie.split("=")[1];

  $.ajax({
    url: 'https://api.iijmio.jp/mobile/d/v1/coupon/',
    type: 'GET',
    headers: {
      'X-IIJmio-Developer': 'OVWN6AuIOoyBpOXklMA',
      'X-IIJmio-Authorization': token
    },
    dataType: 'json',
    success: function(json) {
      var coupon = [];
      console.log(json);
      json.couponInfo.forEach(function (elem, index) {
        var num = elem.hdoInfo[0].number;
        var zan = elem.coupon[0].volume + elem.coupon[1].volume + elem.hdoInfo[0].coupon[0].volume;
        var obj = {
          'num': num,
          'zan': zan
        }
        coupon.push(obj);
      });
      // console.table(json.couponInfo.hdoInfo);
      writeChart(coupon);
    }
  });

}

function writeChart (coupon) {
  // var option = {
  //   labels : ["January","February","March","April","May","June","July"],
  //   datasets : [
  //     {
  //       fillColor : "rgba(220,220,220,0.5)",
  //       strokeColor : "rgba(220,220,220,1)",
  //       pointColor : "rgba(220,220,220,1)",
  //       pointStrokeColor : "#fff",
  //       data : [65,59,90,81,56,55,40]
  //     }
  //   ]
  // }
  // var myLine = new Chart(document.getElementById("iijChart").getContext("2d")).Line(option);
  var vm = new Vue({
    el: '#app',
    data: {
      coupon: coupon
    }
  });
  console.log(coupon);
}

});