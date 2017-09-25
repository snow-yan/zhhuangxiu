// sejishow.js
var util = require('../../utils/util.js');
Page({ 
  data: {
    tel:util.telphone
  }, 
  onLoad: function (options) {
    console.log(options)
    var uid=options.id;
    // console.log(uid)
    this.setData({
      uid: uid
    })
    this.showList();    
  },
  onReady:function(){
    this.people()    
  },
  showList:function(){
    // 经典设计详情获取
    var self = this;    
    wx.request({
      url: util.search + "index.php?s=/design/designinfo&&id=" + this.data.uid,
      success: function (res) {
        console.log(res)
        var showList = res.data.info[0];
        self.setData({
          showList: showList
        })

      },
      fail: function () {
        // console.log('=====')
      }

    })
  },
  people:function(){
    // 预约人数
    var self = this;    
    wx.request({
      url: util.search + 'index.php?s=/builprice/index',
      data: { "name": "", "tel": "", "buildname": "", "area": "" },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var count = res.data.info.count
        self.setData({
          count: count
        })

      },
      fail: function () {
        console.log('==========')
      }

    })
  },
  // 弹窗出现消失
  clickAlert: function () {
    this.setData({
      s: 5
    })
  },
  closeAlert: function () {
    this.setData({
      s: 4
    })
  },
  // 表单提交
  formSubmit: function (e) {
    var self=this;
    // console.log(e.detail.value)
    var val = e.detail.value;
    // console.log(val.name)
    if (val.name.length == 0 || val.telPhone.length == 0 || val.loupan.length == 0 || val.mianji.length == 0) {
      wx.showModal({     
        content: '表单不能为空！',
      })
    } else if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(val.telPhone))) {
      wx.showToast({
        title: '请输入正确的电话号码！！',
        icon: 'success',
        duration: 2000
      })

    } else {
      wx.request({
        url: util.search + 'index.php?s=/builprice/index',
        data: { "name": val.name, "tel": val.telPhone, "buildname": val.loupan, area: val.mianji },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          // console.log(res)
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000
          })
          self.closeAlert()
        },
        fail: function () {
          // console.log('==========')
        }

      })

    }
  },  
 
  telPhone: function () {
    wx.makePhoneCall({
      phoneNumber: String(this.data.tel) //仅为示例，并非真实的电话号码
    })
  },


})