---
author:
  - Avery Dame
date: "2016-12-09T18:11:00.000Z"
layout: ../../layouts/PostLayout.astro
slug: listening-for-the-static
title: Listening for the Static
---

_This is the third in [series of blog posts](http://mith.umd.edu/tag/transgender-usenet-archive/) by 2016-17 Winnemore Digital Dissertation Fellow Avery Dame on the progress of his dissertation, “[Talk Amongst Yourselves: Community Formation in Transgender Counterpublic Discourse Online](http://mith.umd.edu/?p=18022),” which explores the affective and structural meanings assigned to “community” in English-language transgender discourse online._

As you can guess from [my last post](http://mith.umd.edu/visualizing-poster-activity-usenet/), I’ve been relying heavily on the Python [email](https://docs.python.org/2/library/email.html) and [mailbox](https://docs.python.org/2/library/mailbox.html) modules (which inherits many functions from email) to process and analyse the Usenet collections. Instead of having to manually sift through each message, the parser identifies key information, logs it in a dictionary, and can spit it back out when called. At a practical level, using this method has saved me a considerable amount of “processing time,” so to speak. Early on, however, I noticed multiple “Nones” appearing in my results, which indicated that an attempt to access the message headers had failed. I didn’t think much of it at the time, given the size of these collections.1 Just some static I could ignore in favor of the much more sizable noise. Then I started work on the cisgender network, and I discovered that static was actually noise as well. I just hadn’t been prepared to listen for it.

First, here’s what a raw usenet post from the collection looks like (to maintain anonymity, I’ve removed to the name/email in the “From:” line):

> \---- From -8946248053963491671 X-Google-Language: ENGLISH,ASCII-7-bit X-Google-Thread: 10857f,b3db99cd0296b805 X-Google-Attributes: gid10857f,public From: Email-Address (Name) Subject: Re: New Member Date: 1997/11/17 Message-ID: &lt;3470d5d4.1323094@news.lineone.net>#1/1 X-Deja-AN: 290289518 References: &lt;01bcf387$c1ae6e60$0202010a@hp-customer> &lt;64q94t\$aj4@mtinsc03.worldnet.att.net> Organization: British Telecom Newsgroups: alt.support.crossdressing
>
> Hello April----------enjoy the ride!!-------------Joanne x ----

As you can see, each post includes a header with a variety of associated metadata and then the text of the message itself. The collected Usenet postings, by and large, follow the conventions of email formatting at the time, with From, Subject, Date, and Message ID headers, along with a variety of Usenet specific or non-standard headers added by news clients or servers (designated by the “X-” prefix). Because these collections were scraped from the Google Groups format, every message header begins with “From” and the unique message ID assigned by Google, followed by a set of proprietary, non-standard headers.

As part of building my network, I collected the content of all messages indexed as part of the network in a .txt file. Some of these messages, however, began at seemingly random points in the body of a message, even though the original messages in the collection had all of the necessary information, including headers. Yet when I tried to find a cause, there were no immediately apparent similarities in the messages which came up, nor any less “visible” options like invisible characters.

As I found (with the excellent help of Ed Summers), these message were the empty “Nones.” As noted earlier, I’ve been relying on the pre-built Python parser to successfully identify the start of each message. The parser determines the start of a message using headers defined by [RFC (Request for Comments) 2822](https://www.irt.org/rfc/rfc2822.htm), or searches for “a single envelope header, also known as the Unix-From header or the From\_ header.” In the mailbox format, the envelope header functions as a separator to indicate the start of a new message. In practice, though, the parser flags all new lines that begin with “From ” as the start of a new message and searches for the defined headers. In most instances, however, developers follow the advice outlined in the documentation on the mbox format, [RFC 4155](https://tools.ietf.org/html/rfc4155): “Many implementations are also known to escape message body lines that begin with the character sequence of "From ", so as to prevent confusion with overly-liberal parsers that do not search for full separator lines.”

The Python parser, it turns out, is an overly liberal parser. Because it was matching any instance of newline + “From ”, it read all sentences beginning with “From ” as the start of a new message—which, of course, lacked any recognizable headers. When outputting the message content to my “collector” file, the “From” line was skipped and each message began on the next line down, resulting the apparent randomness of the message’s beginning.

Solving this problem, however, was somewhat more complex. I had two options: write a module that adapts the existing parser for my purposes or create a module that made a duplicate of the mailbox edited to prevent inappropriate flagging. Given my current schedule, I opted for the latter approach. However, for both there was a combination of factors made this task particularly thorny.2

A) Because of overly-liberal parser design, the mailbox has (at least initially) to be read line by line.

B) I didn’t want a solution that unnecessarily “cleans” the data by removing the proprietary Google headers. Also, removing the headers a) doesn’t change core problem with the parser and b) necessitates the creation of a replacement envelope header.

C) The Google header being read as the envelope header doesn’t match the RFC standard for mailbox separator lines (IE: From foobar@gmaill.com Wed Jan 25 21:37:37 2017), so existing email-based solutions weren’t immediately helpful.

D) Lastly, whatever I wrote had to be able to differentiate between Google’s proprietary header, whose content was consistent in format (“From ”, sometimes a -, and a series of digits), and sentences beginning with “From ”, which were entirely inconsistent.

My current solution, while not technically elegant, uses this consistency to its advantage. Because the Google-specific message ID is always numerical, I know the seventh character (index location 6) will always be a number. In contrast, this combination occurs very rarely in the message text itself. Instead, all instances of “From ” that don’t have a digit at index 6 are changed to “xFrom ” in the new file. The module then does a pass of the new file, checking the end of “From ” lines for a digit. Any lines that don’t have a digit are printed in a separate log, so they can be manually checked and edited if necessary.

At a later point, I would like to sit down and write a Usenet-specific parser, adapted to account for this issue and Usenet-specific headers. After all, this process is by no means foolproof—as illustrated by the necessity of doing a manual check afterwards. Nevertheless, for me performing the manual check has served as a small, subtle reminder to “listen” to all of the information I received, not just that which seemed to sound “right.”

1Part of this assumption was also based in the formatting of “spam” messages in the collection. In order to avoid being auto-cancelled (blocked from posting), contemporary mass-mailed Usenet spam often uses non-standard emails or other methods to avoid being flagged by cancel bots. I initially assumed their non-standard formatting was being misread by the parser, but this was not the case.

2Some of these issues are, no doubt, [why institutional archives like the Smithsonian use MBOX as a stepping-stone before converting the files to XML](http://www.digitalpreservation.gov/formats/fdd/fdd000383.shtml#sustainability).