---
author:
- James Smith
date: '2012-11-08T13:30:00.000Z'
layout: ../../layouts/PostLayout.astro
slug: webdeveloperstoolkitforannotation
title: '"A Web Developer''s Toolkit for Annotation of Streaming Video"'
---

If you haven't heard of [Open Annotation,](http://www.w3.org/community/openannotation/ "http://www.w3.org/community/openannotation/") then you’re missing out on the greatest thing since virtual sliced bread. Something as simple as saying, “this should be associated with that,” is powerful. The simple things often are.

We’re used to blogs with comments. Each comment is a piece of text associated with the blog entry or another comment. Systems like [Wordpress](http://wordpress.org/ "http://wordpress.org/") or [Movable Type](http://www.movabletype.org/ "http://www.movabletype.org/") own the comments. They store the comments in the same database as the other content. Comment providers such as [Disqus](http://disqus.com/ "http://disqus.com/") manage all of the comments in their own database and associate them with the appropriate blog page.

Open Annotation goes one step further. With Open Annotation, the comments could be stored anywhere and still be associated with the blog entry.

Open Annotation frees commentary by allowing anyone to own the commentary, anyone else to own the object under discussion, and yet another person to make the associations between the comments and the object. In fact, Open Annotation could be one of the enabling technologies for Alan Liu's [vision of opt-in communities for information authority (a.k.a. censorship and peer review).](http://liu.english.ucsb.edu/peopling-the-police-a-social-computing-approach-to-information-authority-in-the-age-of-web-20-dhsi-u-victoria/ "http://liu.english.ucsb.edu/peopling-the-police-a-social-computing-approach-to-information-authority-in-the-age-of-web-20-dhsi-u-victoria/") You get to decide whose annotations you want to use.

MITH has been part of the Open Annotation Collaboration for a few years now. Over the last year, we worked with [Alexander Street Press](http://alexanderstreet.com/ "http://alexanderstreet.com/") to develop a [JavaScript library](http://umd-mith.github.com/OACVideoAnnotator/ "http://umd-mith.github.com/OACVideoAnnotator/") that lets you add video annotation capabilities to your website.

It's a bit raw still, but it provides the basic framework. With a little effort and comfort with JavaScript (especially closures and anonymous functions), you can make it work with your application. If you want to use a video player other than HTML5, you need to [write a driver](http://umd-mith.github.com/OACVideoAnnotator/docs/drivers/ "http://umd-mith.github.com/OACVideoAnnotator/docs/drivers/") that lets the library control the player. If you want to allow annotations other than text, you need to write some JavaScript that lets the library know how you want the annotation body rendered. If you want to be able to pick out parts of images that aren’t rectangles or ellipses, again, you can write a bit of JavaScript and you’ll be good to go.

In the spirit of Open Annotation, our library doesn't demand any particular integration into your website. You get to decide how you want people to interact with the video annotation capabilities. You get to decide how annotations are stored or discovered. The [source code](http://umd-mith.github.com/OACVideoAnnotator/javascripts/docs/demo.html "http://umd-mith.github.com/OACVideoAnnotator/javascripts/docs/demo.html") of our [demo](http://umd-mith.github.com/OACVideoAnnotator/demo.html "http://umd-mith.github.com/OACVideoAnnotator/demo.html") is a good place to start to see how you can use the library.

Of course, this flexibility means that you have to do a little work to use it. If the prospect of annotating video intrigues you but you don't have time to incorporate it into a platform such as Wordpress or Drupal, hang on for a year. We’re going to be developing a Drupal plugin that will let you add video annotation to almost any HTML5 video on your Drupal site. We’ll also add more documentation and tutorials.

_James Smith is MITH's Software Architect. His research interests focus on narrative and enabling humanities research through computation; he works on a wide range of projects, from statistical models of prose to MUDs to web application frameworks._