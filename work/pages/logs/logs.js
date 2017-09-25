//logs.js
var util = require('../../utils/util.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    head:[     
      "品牌",
      "风格",
      "户型",
      "面积"
    ],
    num: 0,
    showHid:false,
    showfilter:false,
    showfilterindex:null,
    sortindex: null,
    // 筛选
    sortsx: 0,
    sortsx1: 0,
    sortsx2: 0,
    sortsx3: 0,

  },
  
  // 获取列表
  designList:function(){   
    var self = this;
    wx.request({
      url: util.search + 'index.php?s=/design/index',  
      success: function (res) {
        console.log(res)
        self.setData({
          list:res.data.info
        })
      }
    })
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
          huxing: res.data[2],
          area: res.data[3]
        })
      }
    })
  },
  
  // 筛选区域
  click_sx:function(e){
    var keys=e.currentTarget.dataset.key;
    var name = e.currentTarget.dataset.name;
    this.data.head[0] = name;
    // console.log(keys);       
    this.setData({
      head: this.data.head,
      sortsx:keys
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
  // 筛选户型
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
  // 筛选面积
  click_sx3: function (e) {
    var keys = e.currentTarget.dataset.key;
    var name = e.currentTarget.dataset.name;
    this.data.head[3] = name;   
    this.setData({
      head: this.data.head,
      sortsx3: keys
    })
    
    this.click_req()    
  },
  // 筛选请求
  click_req:function(){
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
    if (this.data.sortsx3 == 0) {
      this.data.sortsx3 = "";
    }
    console.log(this.data.sortsx)
    console.log(this.data.sortsx1)
    console.log(this.data.sortsx2)   
    console.log(this.data.sortsx3)   
    wx.request({
      url: util.search + 'index.php?s=/design/index&city=' + this.data.sortsx + '&style=' + this.data.sortsx1 + '&door=' + this.data.sortsx2 + '&area=' + this.data.sortsx3 ,
      success: function (res) {
        console.log(res)
        if (res.data.info==undefined){ 
          self.setData({
            list: [],
            showfilter:false
          })
        }else{           
          self.setData({
            list: res.data.info,
            showfilter: false
            
          })
        }
        
      }, fail: function () {
        // console.log('======')
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.city()
    this.designList()
  },  
  setTab:function(e){
    var d=this.data;
    var i=e.currentTarget.dataset.id;  
    this.setData({
      sortindex:i,      
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
    
  }
})
