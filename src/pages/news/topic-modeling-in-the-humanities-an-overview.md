---
author:
- Clay Templeton
date: '2011-08-01T13:16:00.000Z'
layout: ../../layouts/PostLayout.astro
slug: topic-modeling-in-the-humanities-an-overview
title: 'Topic Modeling in the Humanities: An Overview'
---

In a [recent post](http://mith.umd.edu/digging-into-data-with-topic-models/) to this blog, Sayan Bhattacharyya described his contributions to the [Woodchipper](http://mith.umd.edu/corporacamp/tool.php) project in the context of a broader discussion about corpus-based approaches to humanities research. Topic modeling, the statistical technology undergirding Woodchipper, has garnered increasing attention as a tool of hermeneutic empowerment, a method for drawing structure out of a corpus on the basis of minimal critical presuppositions. In this post I map out a basic genealogy of topic modeling in the humanities, from the highly cited paper that first articulated Latent Dirichlet Allocation (LDA) to recent work at MITH.

**The Story of Topic Modeling**

The [original LDA topic modeling paper](http://www.google.com/url?sa=t&source=web&cd=2&ved=0CCcQFjAB&url=http%3A%2F%2Fwww.cs.princeton.edu%2F~blei%2Fpapers%2FBleiNgJordan2003.pdf&rct=j&q=blei%20ng%202003%20topic%20modeling&ei=Jrs2TtuGG-S50AHG_cj3Cw&usg=AFQjCNEGsYCPJ8IZk9Y4xKeIS6WCKUeO-A&sig2=Daec-QOPp6uZnxCp841icg&cad=rja), the one that defined the field, was published by Blei, Ng, and Jordan in 2003. The basic story is one of assumptions, and it goes like this: First, assume that each document is made up of a random mixture of categories, or topics. Now, suppose each category is defined by its preference for some words over others. Finally, let's pretend we're going to generate each word in each document from scratch. Over and over again, we randomly choose a category, then we randomly choose a word based on the preferences of that category.

Obviously the corpus wasn't actually generated this way. Barring cyborg intervention, it was probably written down by a person or group of people. However, topic modeling calls on us to suspend our disbelief. Let's just suppose the corpus was generated entirely through this process. Then, given that the corpus is what it is, what are the most likely underlying affinities between words and between categories? Topic modeling infers a plausible answer under the assumption that the “generative story” I told a paragraph ago is true.

Skepticism is warranted, but the proof of the pudding is that it can be quite nice. As an aside to [his work modeling Martha Ballard's diary](http://historying.org/2010/04/01/topic-modeling-martha-ballards-diary/), Cameron Blevins (Ph.D. candidate in American History, Stanford University) offers frank acknowledgment that a newcomer can benefit from topic modeling by using a standard toolkit like [MALLET](http://mallet.cs.umass.edu/) (developed by University of Massachusetts-Amherst): "I don’t pretend to have a firm grasp on the inner statistical/computational plumbing of how MALLET produces these topics, but in the case of Martha Ballard’s diary, it worked. Beautifully."

A tool like MALLET gives a sense of the relative importance of topics in the composition of each document, as well as a list of the most prominent words in each topic. The word lists define the topics – it's up to practitioners to discern meaning in the topics and to give them names. For example, Blevins identifies the theme of “housework” in two topics, and then shows that the prevalence of these topics in the corpus increases over the life-span of Martha Ballard's diary. Although a correlation between housework and age might seem counterintuitive, it turns out to corroborate the definitive critical commentary on the diary.

In this or similar fashion, the “topic proportions” assigned to each document are often used, in conjunction with topic word lists, to draw comparative insights about a corpus. Boundary lines are drawn around document subsets and topic proportions are aggregated within each piece of territory. In chronological applications like Blevins' study of the diary, it is often advantageous to draw boundary lines in time. [Griffiths and Steyvers (2004)](http://web.archive.org/web/20120417131033/http://www.pnas.org:80/content/101/suppl.1/5228.full.pdf) illustrate how to register temporal changes in topic composition using the output from basic LDA. [Newman and Block (2006)](http://www.ics.uci.edu/~newman/pubs/JASIST_Newman.pdf)'s work with the 18th century _Pennsylvania Gazette_ corpus was perhaps the first diachronic application of topic modeling in the humanities.

**Into a DH Frame: Graphs, Maps, and Trees**

Applications of topic modeling in the digital humanities are sometimes framed within a “distant reading” paradigm, for which Franco Moretti's Graphs, Maps, Trees (2005) is the key text. Robert K. Nelson, director of the Digital Scholarship Lab and author of the [Mining the Dispatch](http://dsl.richmond.edu/dispatch/pages/intro) project, explains that “the real potential of topic modeling . . . isn't at the level of the individual document. Topic modeling, instead, allows us to step back from individual documents and look at larger patterns among all the documents, to practice not close but distant reading, to borrow memorable phrase.” In his [recent post](http://mith.umd.edu/digging-into-data-with-topic-models/) on this blog, my fellow MITH intern Sayan Bhattacharyya motivates interface enhancements to the Woodchipper project by appealing to the interplay of distant and close reading. In general, the Woodchipper project aims to facilitate a seamless interpretive experience that toggles between multiple levels of engagement with a corpus of texts.

**Five Elements of Topic Modeling Projects**

In [one of the earliest impulses](http://web.archive.org/web/20111211124523/http://www.stanford.edu:80/~mjockers/cgi-bin/drupal/node/39) in the current wave of humanities topic modeling, Matthew Jockers (Stanford University) modeled a corpus of blogs generated during the “Day of DH”, a “community publication project that \[brought] together digital humanists from around the world to document what they do on one day.” In Jockers' methodology, I identify five elements needed to communicate the story of a topic modeling project:

Corpus Technique Unit of Analysis Post Processing Visualization

For Jockers' project, these elements (potentially, descriptive metadata elements in a future registry or repository of Bayesian DH projects) are populated as follows:

**Corpus**: Day of DH Blog posts **Technique**: vanilla LDA using MALLET **Unit of analysis**: Blog (all the posts on a single blog) **Post Processing**: "With a little massaging in R, I read in the matrix and then use some simple distance and clustering functions to group the bloggers into 10 (again an arbitrary number) groups; groups based on shared themes." **Visualization**: "I then output a matrix showing which authors have the most in common."

**A Catalogue of DH Topic Modeling Projects**

As I hinted before, a distinction between diachronic and synchronic units of analysis seems feasible. It also turns out to be an efficacious organizer for a directory of DH projects. Jockers' “Day of DH” project, based on the blog as unit of analysis, happens to be synchronic; earlier, Newman and Block's time-bound approach to colonial newspapers was diachronic. The distinction structures this open list of DH topic modeling projects:

**Synchronic approaches** (Unit of analysis is not time bound) [Matthew Jockers' work](http://web.archive.org/web/20111211124523/http://www.stanford.edu:80/~mjockers/cgi-bin/drupal/node/39) on the Day of DH blog posts (2010). [Elijah Meeks' work](https://dhs.stanford.edu/comprehending-the-digital-humanities/) on self-definitions of digital humanists (2011). [Jeff Druin's work](//dhs.stanford.edu/algorithmic-literacy/topic-networks-in-proust/) on Proust (2011). [Travis Brown's work](http://mith.umd.edu/corporacamp/tool.php) on Jane Austen's _Emma_ and and Byron's _Don Juan_ (2011).

**Diachronic Approaches** (Unit of analysis is a time slice) [Block and Newman's work](http://www.ics.uci.edu/~newman/pubs/JASIST_Newman.pdf) on the _Pennsylvania Gazette_ (2006). [Cameron Blevins' work](http://historying.org/2010/04/01/topic-modeling-martha-ballards-diary/) on Martha Ballard's diary (2010). [Robert K. Nelson's work](http://dsl.richmond.edu/dispatch/pages/intro) on the _Richmond Daily Dispatch_ corpus (2011). [Yang, Torget, and Mihalcea's work](http://www.aclweb.org/anthology/W/W11/W11-15.pdf#page=108) on Texas newspapers (2011).

One might expect this directory to expand rapidly as practitioners enter the field and new techniques are imported from Natural Language Processing (NLP) into the DH community.

In this post I have tried to draw out the unique value of LDA topic modeling as a text mining technique in the humanities, and to identify significant landmarks in the field. In future posts, I will begin incorporating topic modeling approaches that extend the LDA model into the conversation, and to document our exploratory movements at MITH. Follow me @purplewove on twitter.

##