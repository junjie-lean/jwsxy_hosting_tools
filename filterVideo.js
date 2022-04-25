/*
 * @Author: junjie.lean
 * @Date: 2022-04-25 17:41:30
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2022-04-25 18:59:01
 */

/**
 * 找到需要播放的页面
 */

setInterval(() => {
  console.log('filterVideo js is active');
}, 10000);

class FilterVideo {
  constructor() {
    this.videoPage =
      'http://jwsxy.jwell56.com/kng/knowledgecatalogsearch.htm?t=VideoKnowledge&h=menu&sf=RecommendLevel&s=dc&st=null';

    this.getAllVideo();
  }

  getAllVideo() {
    //当前页的所有视频
    //二维数组,一维是视频item,第二维是内容,需要从内容里过滤出是否已完成的
    const currentPageLis = [...document.querySelectorAll('.el-kng-img-list  li')]
      .map((item) => [...item.childNodes])
      .filter((item) => item.length === 5);
  }
}

let filter = new FilterVideo();
