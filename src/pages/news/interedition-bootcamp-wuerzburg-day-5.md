---
author:
  - Grant Dickie
date: "2011-10-11T21:39:00.000Z"
layout: ../../layouts/PostLayout.astro
slug: interedition-bootcamp-wuerzburg-day-5
title: "Interedition Bootcamp Wuerzburg: Day 5"
---

At the University of Wuerzburg Seminar building, the same place that the TEI Conference Workshops are occurring, the Interedition group is hard at work finishing up prototypes and proofs of concept for our individual projects. Today is the last day for the Bootcamp, although a lot of the members are talking about continuing to hack tomorrow, since the seminar room we reserved remains reserved tomorrow. Some of the group are particularly tired, as there was a late-night hacking session until 1:30am for the third night in a row. To say these people are committed is only putting it lightly.

However tired we might be, the effort has paid off. Nick Laiacona has published his work on an SVG text editing application called HumEdit (Github is [here](https://github.com/NickLaiacona/HumEdit)). Patrick Cuba (TPEN project) and Bram Buitendijk ([eLaborate](http://www.e-laborate.nl/en/)) have done a lot of additional work on top of Nick's HumEdit application, building wrappers and a fancy user interface. The tools uses sample annotation data from Gregor Middel ([Faust Edition](https://faustedition.uni-wuerzburg.de/dev/project/about)) and draws overlapping hierarchies of annotations on text. The letters, words, and sentences are compiled individually through SVG on an HTML canvas, and the annotation data is color-coded and layered as underlining shapes that can be dragged. Changing text and dragging annotation markers affects metadata on a remote server storing the annotations. Clearly, this is a very exciting project.

The Annotation team on which I am on has been no less ambitious. Asaf Bartov has been querying and testing the service implemented by Moritz Wissenbach and Marcos Petris that serves up OAC annotation constraint URLs. The intention for this service is to create valid OAC constraint expressions, as outlined in the OAC Beta Specifications ([www.openannotation.org](http://www.openannotation.org/spec/beta/#DM_Constraint)). I myself have been developing a working prototype for a user interface that registers OAC annotations using the services coded by the team (See last post). For those of you who enjoy UML charts, Asaf has made one describing the interaction between OAC server, validation services, and the client-side application (which I'm still working on):

[![White board concept for our Annotation service](/assets/images/web-20111121204849-http--www.grantdickie.com-2011-10-annotationflow-300x167.jpg)](http://www.grantdickie.com/wp-content/uploads/2011/10/annotationflow.jpg)

A not very well documented group in these blog posts has been Tara Andrews, Joris Van Zundert, and Troy Griffitts working on developing interoperable microservices through [Open Social](https://web.archive.org/web/20120313072603/http://code.google.com/apis/opensocial/). Tara and Joris have programmed several Humanities tools together and were able, over the Interedition Bootcamp, to fuse them together through the use of Open Social. Troy was able to provide expert consultation on the subject, since he is currently on contract with the University of Muenster Institute for New Testament Text Studies ([INTF](http://egora.uni-muenster.de/intf/index_en.shtml)) to assist in developing Open Social Humanities gadgets. So far, the Open Social team at Interedition have been able to publish something online that resembles an interoperable suite of Digital Humanities tools: http://interedition-tools.appspot.com/ . Very cool.

Doug Reside joined us to assist with coding and has made an encampment over with the people working on HumEdit. Doug is here for the TEI Members Conference and promises to start some serious discussions on the future of TEI at the conference. Professor Fotis Jannidis ([Faust Edition](https://faustedition.uni-wuerzburg.de/dev/project/about)), one of the organizers for the TEI conference and member of the Interedition board, also joined us to see about our progress on various projects. Also at the conference tomorrow will be a Think Tank on the ideas of interoperability as defined by Interedition. I myself plan to attend one of the workshops offered by the TEI conference, a "Introduction to TextGridLab" that looks to be very thorough.

Today in pictures, I have what I think may be the best shot of the the Maine Castle, or Marineberg, as it is called in German. This was shot from the Mainebruecke, or Maine Bridge, which is one of the oldest bridges in the city that crosses the Maine river.

![](/assets/images/web-20111121204850-http--www.grantdickie.com-2011-10-marineberg-300x210.jpg)

\- Grant
