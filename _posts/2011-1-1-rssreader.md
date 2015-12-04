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
		$('#ticker1').rssfeed('http://feed.cnblogs.com/blog/sitehome/rss',{}, function(e) {
			$(e).find('div.rssBody').vTicker();
		});
	});
</script>

<div id="ticker1"></div>


