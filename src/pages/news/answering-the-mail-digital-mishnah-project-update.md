---
author:
- Hayim Lapin
date: '2012-11-15T13:30:00.000Z'
layout: ../../layouts/PostLayout.astro
slug: answering-the-mail-digital-mishnah-project-update
title: 'Answering the Mail: Digital Mishnah Project Update'
---

I had promised to respond to comments on the [Digital Mishnah](http://digitalmishnah.org) demo, so, at long last, here goes.

1. Request for greater highlighting of collation options (Tim Finney). In fact, CollateX has several alignment methods built into libraries that can be utilized. This is outside of what I feel comfortable talking about (I don’t really read Java … yet) but there is no reason we can’t allow users to select methods and see what yields the best results.
2. Don’t build unnecessary mechanisms (Desmond Schmidt). Well taken. As a non-programmer, I’m not always the best judge of what is difficult or simple to build. The point though was to allow manual error-correction of the alignment by adding or deleting cells in a table row. As for the order of witnesses, my own sense is that it is extremely useful for visually examining groupings of manuscripts.
3. Apparatus unnecessary (Desmond Schmidt), or unwieldy (Daniel Stoekl, Naftali Cohn). Well, Stoekl, a potential user, suggests that the print-type apparatus is useful. It is a way of compactly summarizing data. My include-everything model is in fact unwieldy, and the suggestion to leave out readings that are identical with the base text would simplify the situation. Just how text families can be generated and then used in the apparatus is a discussion for a later day, but it is definitely a desideratum.
4. Additional textual detail; handling absence of evidence (Daniel Stoekl, Naftali Cohn). These are important points. For collation, I made the decision to present a simplified text, but obviously this will have to be made more complex. I don’t think additional tagging is necessary in most cases; different processing is. For additions, corrections in second hand, we effectively generate an additional witness, but ignore the readings of that secondary witness except when they differ from the primary witness. For dealing with highly lacunose texts, the method will be: to have a reference text that includes individual addressing for each word in the Mishnah. The tagging in the lacunose text aligns the text and lacunae with the reference text. At a minimum, this allows us to identify “gaps” to be ignored and “gaps” to be processed. A reference text of the Bavot exists, and I am working on extending it further, but we are still working on the pointing mechanism.
5. Search functionality (Naftali Cohn). Yes, but what? Ironically, I can envision complex searches (a particular abbreviation in texts in Sephardic hands) more easily than simple searches. What should a search for “Rabbi Meir” or “Prohibited” return?
6. Other matters (Naftali Cohn). My December and January task is to start working on page by page and chapter by chapter view, especially that now my text sample includes extended runs of text. I’d also like to be able to generate apparatus or alignments for a whole chapter.

_Hayim Lapin is Robert H. Smith Professor of Jewish Studies and Professor in the Department of History at the University of Maryland. He currently is completing a faculty fellowship at MITH. This post originally appeared at [Digital Mishnah](http://www.digitalmishnah.org/uncategorized/live-demo/) on November 13th, 2012._