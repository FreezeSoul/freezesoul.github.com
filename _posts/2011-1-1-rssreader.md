---
layout: post
title: "JavaScript Rss Reader"
description: "一个前端的RSS Reader"
category: 演示
tags: [javascript]
---

<script type="text/javascript" src="/media/js/jquery.zrssfeed.js"></script>
<script type="text/javascript" src="/media/js/jquery.vticker.js"></script>
<script type="text/javascript">
	$(document).ready(function () {
		var rssFees = [
			"http://feed.cnblogs.com/blog/sitehome/rss",
			"http://blog.csdn.net/rss.html?type=Home",
			"http://blog.51cto.com/rss_recommend.php",
			"http://blogs.msdn.com/b/mainfeed.aspx?Type=BlogsOnly",
			"http://feed.cnblogs.com/news/rss",
			"http://www.csdn.net/article/rss_lastnews"
		];

		$.each(rssFees,function(i,n){
			$("<div id='ticker" + i + "'></div>").rssfeed(n,{}, function(e) {
				$(e).find('div.rssBody').vTicker();
			}).appendTo("#rssContainer");
		});
	});
</script>
<style type="text/css">
	.rssHeader a{
		color: #FF0000 !important;
		font-size: 24px !important;
		line-height: 30px !important;
		font-weight: bold !important;
	}
</style>

<div id="rssContainer"></div>


