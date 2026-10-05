---
title: "Strict JSON Mode Cost Us 9 Accuracy Points"
date: 2026-10-04
summary: "You turn on strict JSON mode for a ticket classifier. Every answer now parses, and accuracy falls 9 points the same day. This video finds who took the points, and what to change."
tags: [structured-outputs, json-mode, strict-mode, constrained-decoding, json-schema, finish-reason]
playlist: inference-internals
order: 6
part: "#6"
youtube: ""
duration: "7:16"
thumbnail: "/videos/inference-internals-06.webp"
chapters:
  - "0:00 Strict mode on, 9 points gone"
  - "0:38 What does strict mode guarantee?"
  - "3:01 Who took the 9 points?"
  - "5:39 Where the 9 points went"
  - "6:30 Recap"
draft: false
---

Your ticket classifier sorts support tickets into 12 types, and it answers in JSON with a category and a priority. You turn on strict JSON mode, a setting that forces every answer to follow your schema, the shape your code expects. Every answer now parses, but on the same day the classifier's accuracy falls by 9 points. So who took the 9 points, and what should you change to get them back?

Two questions follow: what strict mode guarantees, and who took the 9 points.

## 1. What does strict mode guarantee?

**Start with the first suspect, strict mode, because it guarantees legal tokens at each step and never a complete answer.**

### The situation

On the first day every answer parses, so a teammate proposes to delete your finish_reason check as dead code. finish_reason is the response field that says why generation stopped, stop for a natural end and length for the budget.

### The picture

Before each token, the model gives every token in its vocabulary a score, called a logit. Strict mode builds a state machine from your schema, and the state machine knows which tokens are legal right now. The grammar mask sets every illegal token's score to negative infinity, so the model can pick only a legal token. At the start of the object only the opening brace is legal, so it wins at 3.8 although Sure scored 4.1.

### Think it through

Here is the question, about the check your teammate wants to delete. Is that check dead code under strict mode?

A first thought is yes, because strict mode forces every answer to follow the schema.

That is reasonable, but the mask has no input for how many output tokens are left.

So the real question is what happens when the output budget ends before the closing brace.

### The mechanism, step by step

<img src="/videos/inference-internals-06/c1-mechanism.webp" alt="The mechanism, as drawn in the video for: What does strict mode guarantee?" width="1280" height="616" loading="lazy" decoding="async" />

1. The mask checks each token only for legality, and an open string is a legal state.
2. So every token inside a long value passes, and the answer keeps growing.
3. The server stops at max_tokens, the output limit you set, even when the grammar has not reached its end.
4. Your client gets schema-shaped text with no closing braces, and finish_reason says length.

### The number

Strict mode adds correct keys and legal values to plain JSON mode, but an answer can be cut at every level. The Format Tax paper writes the mask as the model's probability times a validity check, with no term for completeness.

<img src="/videos/inference-internals-06/c1-number.webp" alt="The number and its source, as shown in the video for: What does strict mode guarantee?" width="1280" height="616" loading="lazy" decoding="async" />

### Key points

- **Remember.** The mask guarantees legal tokens, and only finish_reason says the answer reached its end.
- **The trap.** Deleting the finish_reason check when strict mode goes on, which hides every cut answer.
- **Try this.** Log finish_reason next to every parse failure for a week.

So you keep the check, and you now know that the mask is a filter that only removes illegal tokens. Such a filter should not change what the model knows, but that day the prompt changed too, from free answers to a format.

## 2. Who took the 9 points?

**Most of a format's accuracy cost is paid at the prompt, before the mask runs, so let the model reason first.**

### The situation

Your JSON is always valid now, but accuracy is 9 points lower than on the day before strict mode. One colleague wants to turn the constraints off, and another wants a reasoning field, so you need the cause first.

### The picture

There are two suspects, because the same switch changed both the prompt and the decoder. The first suspect is the prompt, because your schema makes the model commit to a label before it writes any reasoning. The second suspect is the grammar mask in the decoder, which removes illegal tokens at each step.

### Think it through

Accuracy fell 9 points on the day strict mode went on. Which experiment tells the two suspects apart in one afternoon?

A first thought is to blame the mask, because the drop started on the day the constraint was switched on.

That is reasonable, but the same switch changed the prompt, and the two costs can be measured apart.

So the real question is how much of the drop appears before any constraint runs.

### The mechanism, step by step

<img src="/videos/inference-internals-06/c2-mechanism.webp" alt="The mechanism, as drawn in the video for: Who took the 9 points?" width="1280" height="616" loading="lazy" decoding="async" />

1. Run your tickets as free-form answers, so you have a baseline score.
2. Ask for the format in the prompt with constraints off, so the gap from the baseline is the prompt's cost.
3. Turn the mask on, so any further drop is the decoder's share. If the prompt-only run already lost most of the points, turning the constraints off will not bring them back.

### The number

The Format Tax paper ran this split on 6 open-weight models, 3 reasoning tasks and 4 format settings. Asking for the format in the prompt cost 3.9 points on average, and the mask on top cost 1.6 more. Of 39 cells with a significant effect, each one model on one task and format, 36 already dropped with the prompt alone. In the same paper, constraints raised format validity from 55.7 to 92.2%, while accuracy moved from 57.3 to 55.7%. So validity rose by 36.5 points while accuracy did not improve, and stayed below free-form's 61.5%. A parse-failure metric sees only the first change, so it misses the gap to free-form.

<img src="/videos/inference-internals-06/c2-number.webp" alt="The number and its source, as shown in the video for: Who took the 9 points?" width="1280" height="616" loading="lazy" decoding="async" />

### Key points

- **Remember.** Most of the format cost is paid at the prompt, so the reasoning field goes before the labels.
- **The trap.** Turning constraints off buys back only the decoder's share, 1.6 of the paper's average points.
- **Try this.** Rerun one failed ticket as free text, then with the format requested and constraints off.

## Where the 9 points went

Back at your classifier, the schema made the model pick a category before it had written any reasoning. That cost sits at the prompt, the larger share on the paper's averages, so most of your 9 points likely went there. The fix is the order of the fields, because decoding runs left to right, so a field affects only the fields after it. Put a reasoning field first in the schema, so the model writes its working before the mask locks the category. A reasoning field placed last reads the answer, but it cannot change it, because the label is already written. The reasoning text also makes each answer longer, so it reaches max_tokens more often, and the finish_reason check you kept matters more. If the field is not enough, a second call that reformats a free answer gained 6.8 points on the paper's average.

## Recap

- Strict mode guarantees legal tokens and never a complete answer, so keep the finish_reason check.
- Most of the format cost is paid at the prompt, 3.9 points against 1.6 at the decoder on the paper's averages.
- Put the reasoning field first, so the model reasons before the schema makes it commit to a label.

## Sources

- [The Format Tax (2026 preprint): the mask equation, the 3.9 versus 1.6 point split, the mitigations](https://ar5iv.labs.arxiv.org/html/2604.03616)
- [OpenAI structured outputs guide: strictness levels and key order](https://developers.openai.com/api/docs/guides/structured-outputs)
