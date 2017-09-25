// designer.js
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
      chance:['案例作品','他的简介'],
      sortindex:0,
      tel: util.telphone

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self=this;
    var id=options.id;
    // console.log(id)
    wx.request({
      url: util.search+'index.php?s=/designer/info&&id='+id,
      success:function(res){
        console.log(res)        
        var info = res.data.anli;        
        var design=res.data.info[0];     
        console.log(design)           
        console.log(info)           
        self.setData({
          anli:info,
          design:design
        })      
      }
    })
    this.people()
  },
  people: function () {
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
        },
        fail: function () {
          // console.log('==========')
        }

      })

    }
  },
  click_tab:function(e){
    var i=e.currentTarget.dataset.id;
    this.setData({
      sortindex:i
    })
  },
  telPhone: function () {
    wx.makePhoneCall({
      phoneNumber: String(this.data.tel),
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
    
  }

})