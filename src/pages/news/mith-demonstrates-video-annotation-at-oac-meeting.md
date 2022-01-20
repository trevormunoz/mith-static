---
author:
  - James Smith
date: "2012-08-01T17:56:00.000Z"
layout: ../../layouts/PostLayout.astro
slug: mith-demonstrates-video-annotation-at-oac-meeting
title: MITH Demonstrates Video Annotation at OAC Meeting
---

MITH has been involved in the [Open Annotation Collaboration](http://www.openannotation.org/ "Open Annotation Collaboration") for a couple of years now, helping develop a standard way to express annotations on the web using [linked data](http://en.wikipedia.org/wiki/Linked_data "Linked Data") principles. Last week, several in the OAC community met in Chicago to show a series of experiments testing the annotation data model and to discuss the next steps we need to take.

In one of the experiments, MITH worked with [Alexander Street Press](http://alexanderstreet.com/ "Alexander Street Press") to create a developer’s toolkit that lets you add video annotation to your web pages with only a little JavaScript coding, styling, and some kind of server side storage to keep the annotations around for later.

The toolkit allows you to address time spans as well as areas within a frame as targets for annotation. It comes with code to provide rectangular and elliptical areas, but it’s easy to add new shapes with only a little code. The demonstration shows how to add controls and visualization of the annotation body as well as import and export annotations using RDF/JSON.

The experiment pointed out a few areas where the Open Annotation data model needed some extra work when expressing annotations of parts of videos, namely, being able to specify the size of the video play surface on which the annotation target was drawn. MITH will be working with others in the community over the next month to find some options that the W3C community group can discuss at their next meeting in September.

The Open Annotation Collaboration is ending most of its standards development efforts, folding them into [a new W3C community group](http://www.w3.org/community/openannotation/ "Open Annotation Community Group") that brings together the OAC community and the Annotation Ontology community. As mentioned above, the W3C community will be meeting in September to discuss several open problems that came up at the meeting in Chicago.

OAC is continuing to develop several of the experiments into open source projects that can serve as examples of Open Annotation use. For example, MITH will be developing a [Drupal](http://drupal.org/ "Drupal Content Management System") plugin that will add video annotation capabilities to any Drupal site. The community will also be developing services for storing and searching annotations.

If you are interested in the emerging Open Annotation standard, we encourage you to follow [the W3C community group](http://www.w3.org/community/openannotation/ "Open Annotation community group") since OAC has passed the standards development work to the W3C group.

The video annotation developer’s toolkit is available on Github at [http://umd-mith.github.com/OACVideoAnnotator/](http://umd-mith.github.com/OACVideoAnnotator/ "video annotation developer's toolkit").
