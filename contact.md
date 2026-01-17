---
layout: page
title: Contact
date: 2015-08-28 11:00:00
permalink: /contact/
---
I'm currently <i>unavailable</i> for new projects.

<form action="http://formspree.io/{{ site.email }}" method="POST" class="contact-form">
    <div class="form-group">
        <input type="text" class="form-control" name="name" placeholder="Name" required>
    </div>
    <div class="form-group">
        <input type="email" class="form-control" name="_replyto" placeholder="Email" required>
    </div>
    <div class="form-group">
        <textarea rows="7" class="form-control" name="message" placeholder="Message" required></textarea>
    </div>
    <input type="hidden" name="_subject" value="New contact form message!">
    <input type="text" name="_gotcha" style="display:none">
    <input type="hidden" name="_next" value="{{ "/sent.html" | prepend: site.baseurl | prepend: site.url }}">
    <button type="submit" class="btn btn-default">Send Message</button>
</form>
