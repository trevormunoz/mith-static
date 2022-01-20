---
author:
- Hayim Lapin
date: '2012-05-25T13:00:00.000Z'
layout: ../../layouts/PostLayout.astro
slug: almost-ready-for-prime-time
title: Almost Ready for Prime Time
---

We now have two versions of a demos up and ready to run. Both allow a user to pull data from the witness files, containing manuscript transcriptions, select texts to compare, run the texts through a version of CollateX, then present the results as an alignment table (a “synopsis” in or “partitur” in some text-critical dialects), and as a text with apparatus.

The second of these is still buggy (and the cause of both a couple of late nights night and the lateness of this post (for which I apologize heartily to the nice people at MITH)), but it does a couple of additional things:

- Prioritization. While the ability to generate all sorts of different apparatus is a desideratum, at present what we can do is choose the order in which results are presented, and, in the case of presenting a text with apparatus, the first text chosen becomes the base text for comparison.
- Tokenizing. I am now able to tokenize in two steps. First with “rich” tokens that retain data about the individual words (e.g., abbreviations, which should be compared based on their expanded text rather than on the abbreviation as written), as well as other data in the text (page breaks, etc). From there we can create “regularized” tokens. For now I have regularized the tokens by removing all yods and waws. Additional candidates might include dealing with prepositions that are sometimes but not always attached in medieval Mishnah manuscripts (shel, e.g.), final aleph/heh, and final nun/mem. “Simple” tokens are passed to Collatex (or, we allow Collatex to process “rich” tokens) and the resulting collation output is merged with the rich tokens.
- Presentation. Because the “rich” tokens retain information about the witness, it is possible to generate a “text-with-apparatus” in which the base text can be presented with formatting and contextual information that may be useful to the reader. (Disclaimer: Here is a big bug: The XSLT that joins the two lists of tokens inserts the non-words (page breaks etc.) in a position that is offset by one location. Any suggestions?)

Next up: modifying the demo to present multi-column synopses, and linking in Talmudic and Commentary citations.

_Hayim Lapin is Robert H. Smith Professor of Jewish Studies and Professor in the Department of History at the University of Maryland. He currently is completing a faculty fellowship at MITH. This post originally appeared at[ Digital Mishnah](http://www.digitalmishnah.org/uncategorized/housekeeping/) on May 24th, 2012._