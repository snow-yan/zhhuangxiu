var util = require('../../utils/util.js')
//获取应用实例
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    head: [
      "品牌",
      "风格",
      "性别",      
    ],
    tel: util.telphone,
    num: 0,
    showHid: false,
    showfilter: false,
    showfilterindex: null,
    sortindex: null,
    // 筛选
    sortsx: 0,
    sortsx1: 0,
    sortsx2: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self=this;
    // 获取团队列表
      wx.request({
        url: util.search+'index.php?s=/designer/index',
        success:function(res){
          console.log(res)
          self.setData({
            teamer:res.data.info
          })
        }
      })

      // 预约人数
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
  
  // 表单提交
  formSubmit: function (e) {
    // console.log(e.detail.value)
    var val = e.detail.value;
    console.log(val.name)
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
        },
        fail: function () {
          // console.log('==========')
        }

      })

    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.city()
  },  

  telPhone: function () {
    wx.makePhoneCall({
      phoneNumber: String(this.data.tel),
    })
  },
  alertbox: function () {
    this.setData({
      s: 5
    })
  },

  closeAlert:function () {
    this.setData({
      s: 4
    })
  },
  setTab: function (e) {
    var d = this.data;
    var i = e.currentTarget.dataset.id;
    this.setData({
      sortindex: i
    })
    if (d.showfilterindex == i) {
      this.setData({
        showfilter: false,
        showfilterindex: null,
        sortindex: null        
      })
    } else {
      this.setData({
        showfilter: true,
        showfilterindex: i,
      })
    }
  },
  city: function () {
    var self = this;
    wx.request({
      url: util.search + 'index.php?s=/config/config',
      success: function (res) {
        // console.log(res)
        self.setData({
          citys: res.data[0],
          styles: res.data[1],       
          sex: res.data[4]
        })
      }
    })
  },
  // 筛选区域
  click_sx: function (e) {
    var keys = e.currentTarget.dataset.key;
    var name = e.currentTarget.dataset.name;
    this.data.head[0] = name;
    // console.log(keys);       
    this.setData({
      head: this.data.head,
      sortsx: keys
    })
    this.click_req()
  },
  // 筛选风格
  click_sx1: function (e) {
    var keys = e.currentTarget.dataset.key;
    var name = e.currentTarget.dataset.name;
    this.data.head[1] = name;
    this.setData({
      head: this.data.head,
      sortsx1: keys
    })
    this.click_req()
  },
  // 筛选风格
  click_sx2: function (e) {
    var keys = e.currentTarget.dataset.key;
    var name = e.currentTarget.dataset.name;    
    this.data.head[2] = name;
    this.setData({
      head: this.data.head,
      sortsx2: keys
    })
    this.click_req()
  },

  // 筛选请求
  click_req: function () {
    var self = this;
    if (this.data.sortsx == 0) {
      this.data.sortsx = "";
    }
    if (this.data.sortsx1 == 0) {
      this.data.sortsx1 = "";
    }
    if (this.data.sortsx2 == 0) {
      this.data.sortsx2 = "";
    }    
    console.log(this.data.sortsx)
    console.log(this.data.sortsx1)
    console.log(this.data.sortsx2)
   
    wx.request({
      url: util.search + 'index.php?s=/designer/index&city=' + this.data.sortsx + '&style=' + this.data.sortsx1 + '&sex=' + this.data.sortsx2 ,
      success: function (res) {
        console.log(res)
        if (res.data.msg == '没有信息') {
          console.log(1)
          self.setData({
            teamer: [],
            showfilter: false
          })
        } else {
          self.setData({
            teamer: res.data.info,
            showfilter: false
          })
        }
      }, fail: function () {
        // console.log('======')
      }
    })
  },
})
