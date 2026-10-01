import { GoogleGenAI } from '@google/genai'

export async function onRequestPost(context) {
  try {
    const body = await context.request.json()

    const {
      type,
      language,
      style,
      description,
      excludeNames = [],
    } = body

    if (
      !type ||
      !language ||
      !style ||
      !description?.trim()
    ) {
      return new Response(
        JSON.stringify({
          error:
            'Please provide all naming preferences.',
        }),
        {
          status: 400,
          headers: {
            'Content-Type':
              'application/json',
          },
        },
      )
    }

    if (!context.env.GEMINI_API_KEY) {
      return new Response(
        JSON.stringify({
          error:
            'Gemini API key is not configured.',
        }),
        {
          status: 500,
          headers: {
            'Content-Type':
              'application/json',
          },
        },
      )
    }

    const ai = new GoogleGenAI({
      apiKey: context.env.GEMINI_API_KEY,
    })

    const excluded = Array.isArray(
      excludeNames,
    )
      ? excludeNames
          .filter(Boolean)
          .map((name) =>
            String(name).trim(),
          )
          .filter(Boolean)
      : []

    const excludedSection =
      excluded.length > 0
        ? `
==================================================
NAMES ALREADY SHOWN
==================================================

These names have already been shown to the user:

${excluded
  .map((name) => `- ${name}`)
  .join('\n')}

DO NOT return any of these names.

DO NOT return:

- spelling variations
- singular/plural variations
- hyphenated versions
- rearranged versions
- shortened versions
- expanded versions
- the same core name with another category word
- obvious near-duplicates

All 10 new suggestions must be genuinely different from
the names already shown.
`
        : ''

    const prompt = `
You are the naming intelligence behind MyNameLab.

MyNameLab helps people discover names that feel like names
a real person could actually choose and use.

The goal is NOT to generate random combinations of words.

The goal is to generate names that are:

- meaningful
- natural
- memorable
- pronounceable
- relevant
- culturally respectful
- appropriate for the requested category
- appropriate for the requested style
- appropriate for the user's description
- useful in the real world

==================================================
USER REQUEST
==================================================

CATEGORY:
${type}

LANGUAGE / CULTURAL CONTEXT:
${language}

STYLE:
${style}

DESCRIPTION:
${description}

${excludedSection}

==================================================
MOST IMPORTANT RULE: MEANING
==================================================

Every name must have a clear reason for existing.

A name should communicate something through:

- its actual meaning
- the meaning of its component words
- a recognizable name or word
- a clear metaphor
- a meaningful association
- a natural combination of meaningful words
- a culturally appropriate naming tradition

DO NOT generate random words simply because they sound
brandable.

BAD examples:

"Zovira"
"Veluno"
"Qantra"
"Xelora"

These are weak if they have no established meaning,
linguistic basis, or clear naming purpose.

If an invented name is genuinely appropriate, it may be used,
but it must be clearly marked as:

"Invented"

and its explanation must honestly explain that it is invented.

Do NOT invent a fake dictionary meaning for an invented name.

==================================================
TRUTHFUL MEANING AND ORIGIN
==================================================

This is extremely important.

Never hallucinate:

- word meanings
- translations
- etymologies
- cultural origins
- historical associations
- religious meanings
- indigenous meanings
- language origins
- pronunciation facts

If you are not confident about a meaning or origin, write:

"Meaning/origin not confidently established."

Do NOT make up an explanation simply to make a name
look intelligent.

For names based on real words, explain their actual
meaning accurately.

For combinations of real words, explain the meaning of
the combination naturally.

For established personal names, provide the meaning only
when reasonably reliable.

==================================================
LANGUAGE AND CULTURAL RESPECT
==================================================

The requested language/cultural context is:

${language}

Respect it.

If the user requests Yoruba, use genuine Yoruba vocabulary
or naming patterns when appropriate.

If the user requests Igbo, use genuine Igbo vocabulary
or naming patterns when appropriate.

If the user requests Hausa, use genuine Hausa vocabulary
or naming patterns when appropriate.

The same applies to Spanish, French, Italian, German,
Portuguese, Japanese, Korean, Arabic, Chinese, Hindi,
English, and other requested contexts.

Never claim that a word belongs to a language when you are
not confident.

Never invent a translation.

Never combine unrelated languages merely to make something
sound exotic.

If the user selects "Other / mixed", use the description to
determine what linguistic or cultural direction makes sense.

==================================================
PRONUNCIATION
==================================================

Every result MUST include both:

1. "pronunciation"
2. "pronunciationAudioText"

These two fields have different purposes.

--------------------------------------------------
PRONUNCIATION
--------------------------------------------------

"pronunciation" is the learner-facing pronunciation guide
that will be displayed underneath the name.

It should help a human understand how to say the name.

Do not simply repeat the spelling of the name.

For example:

Name:
Golden Hour

Pronunciation:
GOHL-den OW-er

Name:
Milo Makes

Pronunciation:
MY-loh MAYKS

For names from languages with established pronunciation
systems, use a useful learner-friendly pronunciation.

For Japanese, Korean, Mandarin, Arabic, Yoruba, Igbo,
Hausa, Hindi, etc., do not invent pronunciation.

If a reliable pronunciation cannot be established, say:

"Pronunciation not confidently established."

--------------------------------------------------
PRONUNCIATION AUDIOTEXT
--------------------------------------------------

"pronunciationAudioText" is NOT the displayed pronunciation
guide.

It is the text that will be sent directly to a text-to-speech
engine.

Its purpose is to make the browser say the name naturally.

IMPORTANT:

- Normally use the actual name itself.
- Do NOT include pronunciation instructions.
- Do NOT include IPA.
- Do NOT include hyphens used only to explain pronunciation.
- Do NOT include parentheses.
- Do NOT write "pronounced as..."
- Do NOT write "say..."
- Do NOT write explanations.
- Do NOT put syllable instructions in this field.
- Do NOT make the speech engine read the learner pronunciation.
- Keep this field short.
- The field should contain only the natural text that should
  be spoken.

For example:

Name:
Kalea

pronunciation:
kuh-LAY-uh

pronunciationAudioText:
Kalea

Another example:

Name:
Golden Hour

pronunciation:
GOHL-den OW-er

pronunciationAudioText:
Golden Hour

Another example:

Name:
Milo Makes

pronunciation:
MY-loh MAYKS

pronunciationAudioText:
Milo Makes

For established words and names, the actual name should
normally be used as pronunciationAudioText.

For invented names, choose a spelling that a normal
text-to-speech engine is likely to pronounce naturally.

Do not try to force an invented pronunciation by writing
a strange phonetic spelling into pronunciationAudioText.

If pronunciation cannot be confidently established, still
provide the most natural spoken form possible without
inventing unsupported linguistic claims.

==================================================
EXACTLY 10 RESULTS
==================================================

Return exactly 10 suggestions.

Never return fewer.

Never return more.

Every result must be a separate naming direction.

Do not generate ten versions of the same idea.

==================================================
NAME LENGTH
==================================================

Names do NOT need to be one word.

Use whatever structure naturally fits the request.

Possible structures include:

- One word
- Two words
- Three words
- Short natural phrases
- A person's name
- A name + descriptor
- A natural business structure
- A meaningful compound

Examples of natural structures:

Sunny Go
Sunny Go Cafe
Golden Hour
Golden Hour Coffee
The Daily Brew
North & Co.
North & Co. Studio
The Student Edit
Focus Flow
PocketPlan
Milo Makes
Northside Stories

These are examples of structure only.

Do NOT copy them unless they genuinely fit the user's
request.

Do NOT force all results to be one word.

Do NOT force all results to be two words.

Variety is important.

==================================================
NATURAL NAMING
==================================================

Names should feel intentional.

Before returning a name, internally ask:

Would a real person actually choose this?

Would a real person understand why it was chosen?

Can someone say it easily?

Can someone remember it?

Does it fit the category?

Does it fit the style?

Does it fit the description?

Does it sound natural?

Does it have a meaningful idea behind it?

If the answer is no, do not use the name.

==================================================
CATEGORY-SPECIFIC GUIDANCE
==================================================

YOUTUBE / CHANNELS

Consider:

- Creator-style names
- Topic + identity
- "The ___"
- Short memorable phrases
- Editorial names
- Community names
- Personal-name structures
- Meaningful concepts

Do not automatically use:

TV
Channel
Official
YouTube

Only use them when they genuinely improve the name.

--------------------------------------------------

APPS

Consider:

- Short product names
- Meaningful one-word names
- Two-word names
- Functional names
- Memorable combinations

The name should feel like something that could actually
appear on an app icon.

--------------------------------------------------

WEBSITES

Consider:

- Brand names
- Editorial names
- Descriptive names
- Two-word combinations
- Short phrases
- Platform names

Do not automatically add:

.com
.net
.org
Online
Website

--------------------------------------------------

BUSINESSES

Names should sound like real businesses.

Depending on the business, natural structures can include:

The ___
___ & Co.
___ House
___ Studio
___ Works
___ Collective
___ Market
___ Kitchen
___ Supply

Only use these when appropriate.

--------------------------------------------------

CAFES / RESTAURANTS

Natural words can include:

Cafe
Coffee
Kitchen
House
Table
Bakery
Bistro
Grill
Eatery

But do NOT mechanically append these words.

A good set might contain:

Sunny Go
Sunny Go Cafe
Golden Hour Coffee
Corner Bloom
Morning House
The Daily Brew

A bad set would be ten names that all end in "Cafe".

--------------------------------------------------

BRANDS

Think like a real brand strategist.

Depending on the description:

- One word
- Two words
- Three words
- "& Co."
- House names
- Studio names
- Editorial names
- Product-inspired names
- Founder-inspired names

Do not automatically add:

Brand
Clothing
Fashion

--------------------------------------------------

TEAMS

Consider:

- Strong nouns
- Locations
- Symbols
- Animals
- Concepts
- Community identity

Do not make every team name an animal.

--------------------------------------------------

USERNAMES / GAMER TAGS

Prefer:

- Memorable names
- Compact combinations
- Distinctive identities
- Easy-to-type structures
- Appropriate invented names when necessary

Avoid random strings.

--------------------------------------------------

CHARACTERS

Character names should feel believable.

Use:

- Real names
- Appropriate cultural names
- Surnames
- Nicknames
- Fantasy names only when appropriate

Do not fabricate cultural meanings.

==================================================
CATEGORY WORDS
==================================================

Words such as:

Cafe
Coffee
Studio
House
Co.
Works
Collective
Kitchen
Market
Supply
Lab
Press
Club

can be useful.

But they must NOT be mechanically appended.

The category word must serve a purpose.

==================================================
VARIETY
==================================================

The ten results should represent different creative
directions.

Vary:

- Word count
- Rhythm
- Structure
- Vocabulary
- Naming angle
- Literal vs evocative
- Descriptive vs conceptual
- Traditional vs modern
- Personal vs abstract
- Compact vs phrase-based

Do not produce:

Name A
Name A Studio
Name A House
Name A Works
Name A Co.
Name A Lab

That is not genuine variety.

==================================================
REAL-WORLD QUALITY CHECK
==================================================

Before returning each name, evaluate:

1. Meaning
2. Relevance
3. Naturalness
4. Pronunciation
5. Memorability
6. Category fit
7. Style fit
8. Cultural appropriateness
9. Distinctiveness
10. Practical usefulness

Reject weak names.

==================================================
OUTPUT FORMAT
==================================================

Return ONLY valid JSON.

No markdown.

No explanation outside JSON.

The JSON must have this exact structure:

{
  "names": [
    {
      "name": "...",
      "type": "...",
      "meaning": "...",
      "origin": "...",
      "pronunciation": "...",
      "pronunciationAudioText": "...",
      "explanation": "...",
      "whyItWorks": "..."
    }
  ]
}

Exactly 10 objects.

Every object MUST contain:

name
type
meaning
origin
pronunciation
pronunciationAudioText
explanation
whyItWorks

The pronunciation field must be useful for speaking
the name aloud.

The pronunciationAudioText field must contain only the
natural text that should be spoken by a text-to-speech engine.

Keep explanations concise.
`

    const requestConfig = {
      responseMimeType:
        'application/json',

      responseSchema: {
        type: 'object',

        properties: {
          names: {
            type: 'array',

            minItems: 10,
            maxItems: 10,

            items: {
              type: 'object',

              properties: {
                name: {
                  type: 'string',
                },

                type: {
                  type: 'string',
                },

                meaning: {
                  type: 'string',
                },

                origin: {
                  type: 'string',
                },

                pronunciation: {
                  type: 'string',
                },

                pronunciationAudioText: {
                  type: 'string',
                },

                explanation: {
                  type: 'string',
                },

                whyItWorks: {
                  type: 'string',
                },
              },

              required: [
                'name',
                'type',
                'meaning',
                'origin',
                'pronunciation',
                'pronunciationAudioText',
                'explanation',
                'whyItWorks',
              ],
            },
          },
        },

        required: ['names'],
      },
    }

    let response = null
    let lastError = null

    for (
      let attempt = 1;
      attempt <= 3;
      attempt++
    ) {
      try {
        response =
          await ai.models.generateContent({
            model:
              'gemini-3.5-flash-lite',
            contents: prompt,
            config: requestConfig,
          })

        break
      } catch (error) {
        lastError = error

        console.error(
          `MyNameLab Gemini attempt ${attempt} failed:`,
          error,
        )

        const status =
          error?.status

        const retryable =
          status === 503 ||
          status === 429

        if (!retryable) {
          throw error
        }

        if (attempt < 3) {
          await new Promise(
            (resolve) =>
              setTimeout(
                resolve,
                attempt * 2500,
              ),
          )
        }
      }
    }

    if (!response) {
      throw (
        lastError ||
        new Error(
          'Gemini did not return a response.',
        )
      )
    }

    const result = JSON.parse(
      response.text,
    )

    if (
      !result.names ||
      result.names.length !== 10
    ) {
      throw new Error(
        'Gemini did not return exactly 10 names.',
      )
    }

    const normalizedNames =
      result.names.map((item) =>
        String(item.name || '')
          .trim()
          .toLowerCase(),
      )

    const uniqueNames = new Set(
      normalizedNames,
    )

    if (uniqueNames.size !== 10) {
      throw new Error(
        'Gemini returned duplicate names.',
      )
    }

    const excludedSet = new Set(
      excluded.map((name) =>
        name.toLowerCase(),
      ),
    )

    const repeatedName =
      normalizedNames.some(
        (name) =>
          excludedSet.has(name),
      )

    if (repeatedName) {
      throw new Error(
        'Gemini returned a previously shown name.',
      )
    }

    return new Response(
      JSON.stringify({
        success: true,
        names: result.names,
      }),
      {
        status: 200,

        headers: {
          'Content-Type':
            'application/json',
        },
      },
    )
  } catch (error) {
    console.error(
      'MyNameLab Gemini error:',
      error,
    )

    let message =
      'Something went wrong while generating names. Please try again.'

    if (
      error?.status === 503 ||
      error?.status === 429
    ) {
      message =
        'Gemini is temporarily busy. Please wait a moment and try again.'
    }

    return new Response(
      JSON.stringify({
        error: message,
      }),
      {
        status:
          error?.status === 429 ||
          error?.status === 503
            ? error.status
            : 500,

        headers: {
          'Content-Type':
            'application/json',
        },
      },
    )
  }
}