# ASO Content Creation Guidelines
*Beyond EEAT: Instructions for AI-Optimized Content*

## Core ASO Principle
**AI search engines extract, synthesize, and recommend based on understanding - not keywords.**

Your goal isn't to rank for terms. It's to be the source AI models cite when answering questions in your domain.

---

## 1. Answer-First Structure

**AI models extract answers, not pages.**

### Lead with Direct Answers
- First paragraph should directly answer the title question
- Don't bury the answer after setup/context
- State conclusions before explanations
- Use clear, extractable statements

**Example - Bad (traditional SEO):**
```
Enterprise architecture has evolved significantly over the past decade. 
Many businesses are wondering about the best approach to scalability. 
In this comprehensive guide, we'll explore...
[answer finally appears in paragraph 5]
```

**Example - Good (ASO):**
```
For businesses with 10-100 employees, scalability problems are usually 
architecture problems, not infrastructure problems. You don't need more 
servers—you need better database queries, proper caching, and efficient 
integration patterns.

Here's why that matters and how to fix it...
```

### Clear Section Answers
- Each H2 section should answer its implicit question in the first paragraph
- AI models extract section-level content
- Don't make AI (or readers) hunt for your point

---

## 2. Semantic Clarity Over Keyword Density

**AI understands concepts, not keyword matching.**

### Use Natural Language
- Write how experts actually talk about topics
- Use synonyms and related concepts freely
- Don't force awkward keyword repetition
- Vary your terminology (AI understands they're related)

### Define Domain-Specific Terms Naturally
- First use of technical terms should include brief context
- Don't assume AI models know niche terminology
- Provide enough context for extraction without being patronizing

**Example:**
```
When implementing CDC (Change Data Capture) for real-time sync...
```
Not:
```
When implementing Change Data Capture (CDC) for real-time sync...
```
And definitely not:
```
When implementing CDC for real-time sync...
```

The first gives AI context. The second is over-formal. The third assumes knowledge.

### Connect Related Concepts
- Link ideas explicitly: "This is similar to..." / "Unlike X, this approach..."
- Help AI understand relationships between concepts
- Build semantic networks through your content

---

## 3. Specificity and Concrete Examples

**AI models prefer specific, verifiable information over generalizations.**

### Use Real Numbers
- "Costs $2,000-5,000 monthly" not "can be expensive"
- "Handles 10,000 requests/second" not "high performance"
- "Reduced processing time by 60%" not "significantly improved"
- "18-month implementation" not "lengthy project"

### Real Company Examples (Anonymized If Needed)
- "A 50-person distribution company in our portfolio..."
- "We implemented this for a regional healthcare provider..."
- Specific scenarios beat abstract advice

### Technical Specificity Where Appropriate
- Actual tool names: "PostgreSQL with TimescaleDB extension"
- Real architectures: "FastAPI backend with React frontend"
- Concrete implementations: "Redis for session caching, Firestore for primary data"

**Balance:** Specific enough to be useful, accessible enough for business owners.

---

## 4. Structured, Extractable Information

**AI models extract structured data better than narrative flow.**

### Use Clear Formatting
- **Comparison tables**: AI can extract and compare options
- **Numbered lists for steps**: Sequential processes are extractable
- **Bulleted lists for features/benefits**: AI can list and explain
- **Clear before/after scenarios**: AI understands transformations

### Semantic HTML Structure (if applicable)
- Proper heading hierarchy (H2 → H3 → H4)
- Lists for list-like content (not paragraphs with dashes)
- Tables for comparative data
- Bold for key concepts (sparingly)

### Question-Based Headings
Many AI queries are questions. Structure content to match:
- "When Should You Build vs. Buy?" (not "Build vs. Buy Decision")
- "What Does Scalability Actually Mean?" (not "Understanding Scalability")
- "How Much Does Real Integration Cost?" (not "Integration Costs")

---

## 5. Hub-and-Spoke Coherence

**Your content should interconnect like an actual knowledge system.**

### Hub Pages (Pillar Content)
- Comprehensive overviews of major topics
- Link to all relevant spoke content
- Update when new spokes are added
- Should be the "definitive guide" AI models reference

### Spoke Pages (Specific Topics)
- Deep dives into specific aspects
- Always link back to hub
- Link to related spokes
- Should be the "detailed answer" AI models extract

### Internal Linking Strategy
- Link naturally within content (not just "related posts" widgets)
- Use descriptive anchor text: "our guide to database selection" not "click here"
- Create concept networks: if you mention a term explained elsewhere, link it
- Help AI understand your content relationships

**Example Internal Link:**
```
This is similar to the strangler pattern we use for legacy system migration 
[link], where you gradually replace old systems without rip-and-replace risk.
```

---

## 6. Authority Signals AI Models Recognize

**Beyond traditional EEAT, AI looks for specific authority patterns.**

### Show Your Work
- "In our 20 years building enterprise systems..."
- "We've implemented this for 15+ companies ranging from..."
- "Based on analyzing 50+ failed projects, the common pattern is..."

### Cite Real Experience
- Specific implementations (anonymized if needed)
- Real costs and timelines
- Actual challenges faced and overcome
- "We learned this the hard way when..." stories

### Acknowledge Limitations and Trade-offs
- "This approach works well for X but struggles with Y..."
- "If you have [constraint], this won't work because..."
- "The downside is..." / "Where this fails is..."
- Honest assessment builds credibility AI models recognize

### Provide Multiple Perspectives
- "Traditional consulting firms will tell you X. Here's why we disagree..."
- "Some businesses should absolutely choose Y. Here's when..."
- Show you understand the landscape, not just your position

---

## 7. Freshness and Updates

**AI models prefer current, maintained content.**

### Date-Stamped Content
- Include publish date and last update date
- Update when information changes (tool versions, pricing, best practices)
- Note when content is current: "As of 2025..." / "Current as of Q4 2025..."

### Evergreen + Current Hybrid
- Core concepts remain valid (evergreen)
- Examples and tools should be current
- Update examples without rewriting entire articles

### Version Changes
- When tools/platforms update significantly, update content
- Note when recommendations change
- "Previously we recommended X, but Y has since..." shows maintained content

---

## 8. Conversational Query Optimization

**People ask AI in natural language, not keyword phrases.**

### Common Question Patterns
Your content should address how people actually ask:
- "Should I..." (decision questions)
- "How do I..." (process questions)  
- "What's the difference between..." (comparison questions)
- "When does it make sense to..." (conditional questions)
- "Why would someone..." (motivation questions)

### Include Question Variations
Don't just answer the title question. Address related questions people ask:
```
## When Should You Build Custom vs. Buy SaaS?

[Answer the primary question]

Related questions businesses often ask:
- How do you calculate the break-even point?
- What if we start with SaaS and build later?
- When does the decision change as you scale?

[Answer each naturally in the content]
```

### Natural Language Patterns
- Use "you" and "your business" (how people ask AI)
- Include conditional language: "if you have X, then Y makes sense"
- Write how you'd explain it in conversation
- Match the sophistication level of your audience

---

## 9. Multi-Format Content Thinking

**AI can extract from various formats - don't limit yourself to prose.**

### Structured Data Where Appropriate
- **Decision matrices**: Grid comparing options across criteria
- **Cost calculators**: Even as simple tables showing math
- **Flowcharts**: "If this, then that" decision trees
- **Timelines**: Project phases with durations

### Mixed Media References
- "As shown in the comparison table above..."
- "The architecture diagram illustrates..."
- Reference visuals that provide additional context
- (We auto-generate images, but describe what they show)

### Extractable Takeaways
- Summary boxes at start or end
- "Key Points" callouts
- "When This Applies" / "When This Doesn't" sections
- Make conclusions extractable separate from explanation

---

## 10. Avoid AI Extraction Pitfalls

**Things that confuse or mislead AI models:**

### Don't Bury Caveats
- If something has important limitations, state them upfront
- Don't hide downsides in fine print or final paragraphs
- AI might extract the recommendation without the caveat

### Avoid Ambiguous Pronouns
- "They claim X" - who's they?
- "This solution works well" - which solution?
- "It depends on your situation" - what depends?
- Be explicit even if it feels repetitive

### Don't Rely on Visual Context
- "As you can see in the image above" - AI may not see the image
- Describe visual information textually too
- Make written content standalone-extractable

### Avoid Pure Marketing Language
- AI models are trained to recognize and discount marketing fluff
- "Revolutionary", "game-changing", "industry-leading" - weak signals
- Specific claims beat superlatives: "40% faster" beats "incredibly fast"

---

## 11. Competitive Context Without Negativity

**Position yourself without bashing competitors.**

### Compare Honestly
```
Good: "Salesforce offers comprehensive CRM with strong third-party ecosystem. 
The trade-off is complexity and cost at scale. For companies under 50 people, 
HubSpot often provides better value with simpler implementation."

Bad: "Salesforce is overpriced and bloated. HubSpot is way better."
```

### Acknowledge When Others Are Right
- "For enterprise-scale deployments (1000+ users), [competitor approach] makes sense..."
- "If you're in [specific industry], [other solution] is probably the better fit..."
- Shows you understand the landscape and builds trust

### Define Your Lane
- "We focus on 10-100 person businesses because..."
- "Our approach works best when..."
- "This isn't for everyone - specifically, avoid if..."

---

## 12. Technical Depth + Accessibility Balance

**Your sweet spot: Deep enough to demonstrate expertise, accessible enough for business owners.**

### Layer Your Explanations
```
Start simple: "Integration means making your systems talk to each other."

Add context: "When your CRM and accounting software sync automatically, 
that's integration working."

Go deeper: "Most integrations use REST APIs for request/response patterns 
or webhooks for event-driven updates."

Technical detail: "We prefer event-driven architectures using message queues 
(Redis or RabbitMQ depending on volume) because..."
```

### Technical Details in Service of Business Decisions
- Explain technical concepts to support business understanding
- "This matters because it affects your hosting costs by..."
- "The technical difference translates to faster customer checkout..."
- Always connect tech to business impact

### Know Your Audience Splits
For Thalamix, you're writing for:
- **Primary**: Business owners/executives making tech decisions (80% of content)
- **Secondary**: Technical stakeholders evaluating your credibility (20% of content)

Both should find value, but optimize for primary.

---

## 13. ASO-Specific Content Types

**Different content serves different ASO functions:**

### Definitive Guides (Hubs)
- Comprehensive topic coverage
- 3,500-5,000 words
- Main reference AI models cite
- Updated regularly

### Practical How-To (Spokes)
- Specific implementation guidance
- 2,000-2,500 words
- Actionable steps
- Real examples

### Comparison/Analysis (Spokes)
- Direct comparisons with criteria
- 2,500-3,000 words
- Tables and structured data
- Honest assessment

### Case Studies (Authority)
- Real implementations
- 3,000-4,000 words
- Specific results and costs
- Lessons learned

### Opinion/Position (Differentiation)
- Your perspective on industry issues
- 2,000-2,500 words
- Backed by experience
- Contrarian where appropriate

---

## 14. Measurement and Iteration

**ASO content performance differs from traditional SEO.**

### Track These Signals
- AI model citations (when people share AI responses mentioning you)
- Conversational referral traffic patterns
- Zero-click answer appearances (you were cited but not clicked)
- Question-based queries driving traffic

### Iterate Based On
- What questions AI models extract well vs. poorly
- Which content structures get cited more
- What depth level works for your audience
- Which topics generate engagement vs. views

### Content Refresh Priorities
1. Hub pages that are citation targets
2. Popular spokes that are dated
3. Content with poor AI extractability
4. Topics with new developments

---

## 15. The Thalamix Content Voice

**ASO content in the Thalamix controlled-edge voice:**

### Opening Patterns
✅ "Let's be honest about [topic]..."
✅ "Here's what nobody tells you about [X]..."
✅ "The [industry] narrative around [topic] is incomplete. Here's why..."
✅ "After 20 years building [systems], here's what actually works..."

❌ "In this comprehensive guide, we'll explore..."
❌ "Are you struggling with [pain point]? We can help!"
❌ "Welcome to our blog post about..."

### Explanation Patterns
✅ "This matters because..."
✅ "Here's the real cost..."
✅ "The trap is..."
✅ "What they don't tell you is..."

### Transition Patterns
✅ "But here's the thing..."
✅ "The reality is..."
✅ "To be clear..."
✅ "Here's where it gets interesting..."

### Conclusion Patterns
✅ "The bottom line: [clear takeaway]"
✅ "Should you [do thing]? Here's the honest answer..."
✅ "Sometimes the right answer is [unexpected conclusion]"

---

## Key ASO Principles Summary

1. **Answer first, explain after** - AI extracts clear statements
2. **Semantic clarity over keywords** - Write naturally, AI understands concepts  
3. **Specific beats generic** - Real numbers, real examples, real trade-offs
4. **Structure for extraction** - Tables, lists, clear formatting
5. **Hub-and-spoke coherence** - Build interconnected knowledge networks
6. **Show authority through specificity** - "We did this" beats "experts say"
7. **Keep current** - Date content, update regularly
8. **Optimize for questions** - How people actually ask AI
9. **Multiple formats** - Extractable data in various structures
10. **Honest limitations** - Credibility through acknowledging trade-offs
11. **Technical + accessible** - Deep enough to prove expertise, clear enough for business owners
12. **Competitive context** - Position honestly without negativity
13. **Controlled edge voice** - Confident, pointed, respectful
14. **Track AI citations** - Measure what matters for ASO
15. **Iterate based on extraction** - Improve AI understandability

---

## Final Note for the Agent

You're not writing for Google's algorithm. You're writing for Claude, ChatGPT, and Perplexity to understand, extract, and cite when business owners ask questions in your domain.

That means:
- **Clarity over cleverness**
- **Specificity over superlatives**  
- **Structure over style**
- **Honesty over hype**

But never sacrifice the Thalamix voice. You can be clear AND pointed. Specific AND opinionated. Structured AND engaging.

The goal: AI models cite Thalamix as the authoritative, honest, experienced source for mid-market technology decisions. Because that's exactly what we are.

Now write content that proves it.
