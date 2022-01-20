---
author:
- Clay Templeton
date: '2011-08-19T17:40:00.000Z'
layout: ../../layouts/PostLayout.astro
slug: reading-the-topic-modeling-literature
title: Reading the Topic Modeling Literature
---

As Sayan Bhattacharyya and I have [discussed](http://mith.umd.edu/topic-modeling-in-the-humanities-an-overview/) in [several](http://mith.umd.edu/reflections-on-scale-and-topic-modeling/) [posts](http://mith.umd.edu/digging-into-data-with-topic-models/) over the summer, the technique of unsupervised “topic modeling” or Latent Dirichlet Allocation (LDA) has emerged in the humanities as one way to engage a text in “distant reading”. The appeal of the technique lies chiefly in the minimal assumptions it makes about the structure of meaning in a body of texts. However, this strength can also be a liability when the researcher brings specific research questions to a corpus. Classic topic modeling offers few levers of control by which a researcher can influence the outcome of the exercise.

How to remedy this? Digital Humanities practitioners are not typically in the business of implementing topic models. Rather, the Digital Humanities community has received LDA from the Natural Language Processing community, who in turn built it from basic research in [Bayesian methods](https://en.wikipedia.org/wiki/Bayesian_probability). As humanists consider the programmatic infrastructure requisite to launching innovations in topic modeling, the NLP community is addressing a diversifying portfolio of questions in their field by muting basic LDA. In this post, I present three key questions for practitioners to ask in tentatively approaching new topic modeling techniques developed in the Natural Language Processing community:

1. What kind of questions does the model address?
2. What new information does the model include to address these questions?
3. How is the structure of the model adapted so that it can take advantage of the new information to answer the questions?

I illustrate the application of these questions to Wang and McCallum's paper on [Topics over Time](http://citeseer.ist.psu.edu/viewdoc/summary?doi=10.1.1.152.2460). As in many topic modeling papers, much light can be shed simply from reading the introduction.

What kind of questions does the model address?

In the opening section of their paper, Wang and McCallum explain that their approach is motivated by unexploited temporal information. In their more technical language, “the large data sets to which these topic models are applied do not have static co-occurrence patterns; the data are often collected over time, and generally patterns present in the early part of the collection are not in effect later.” We might like to see the Mexican-American War and World War I, for example, emerge as distinct topics in a historical analysis of U.S. State-of-the-Union addresses. The Topics over Time technique is designed to encourage topics to “rise and fall in prominence” as a function of time (1).

What new information does the model include?

As I pointed out in my [previous post](http://mith.umd.edu/topic-modeling-in-the-humanities-an-overview/), topical characterization of a time window is achievable using classic LDA. Simply average a topic's prominence over each document inside the window. However, the topics thus distributed over time have already, at that point, conflated aspects of things like wars waged decades apart. Thus, for example, a topic including airplanes as a prominent word might be well represented in 1893. This is fine if we’re looking for transhistorical themes, but not if we’d rather find historical trends in the use of language. Topics over Time uses the date-stamp associated with each document, taking this as input data alongside information about the co-occurrence of words.

How is the structure of the model adapted?

Topics over Time uses date-stamps to encourage topics to cluster around a point in time. As the inferential machinery behind the model develops topics, it also estimates where the central point in time lies for each topic and how far the topic tends to disperse around that point. In Wang and McCallum's language, 'TOT parameterizes a continuous distribution over time associated with each topic, and topics are responsible for generating both observed timestamps as well as words. Parameter estimation is thus driven to discover topics that simultaneously capture word co-occurrences and locality of those patterns in time’(Section 1). This leads to more topics that reveal historically specific themes.

Topics over Time is one of a number of topic model adaptations that hold promise for the digital humanities. [Dynamic Topic Modeling](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.62.2783&rep=rep1&type=pdf) allows topics to evolve from year to year, capturing the intuition that scientific fields, for example, endure despite changing terminology. Using [Supervised LDA](http://www.cs.princeton.edu/~blei/papers/BleiMcAuliffe2007.pdf) (SLDA), another innovation, a modeler can encourage topics to form so that the proportions of topics making up a document are effective predictors of some target variable. This allows the modeler to exert influence on the kind of structure topic modeling explicates. Finally, Dirichlet Forests allow the modeler to engender affinities or aversions between words based on prior knowledge of the content domain.

For all of these techniques, an additional key question is where to find the code to implement them. Code implementing Dirichlet Forest Priors can be found [here](http://pages.cs.wisc.edu/~andrzeje/research/df_lda.html). An implementation of SLDA can be found [here](http://web.archive.org/web/20120825213639/http://www.cs.princeton.edu:80/~chongw/slda/). Another option is always to contact the researchers on a paper and ask them if their code is sharable, or to consult your local topic modeling expert (if you’re fortunate enough to have one!).