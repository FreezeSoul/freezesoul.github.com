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
			"http://blogs.msdn.com/b/mainfeed.aspx?Type=BlogsOnly",
			"http://blog.51cto.com/rss_recommend.php",
			"http://www.csdn.net/article/rss_lastnews",
			"http://www.infoq.com/cn/feed?token=7XcC3W3VEePsRMnPrkPQ9q2XNxYfXSuJ",
			"http://www.v2ex.com/index.xml"
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
		font-size: 24px;
		line-height: 30px;
		font-weight: bold;
	}
</style>

<div id="rssContainer"></div>


