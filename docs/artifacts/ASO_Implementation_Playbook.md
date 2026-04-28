# ASO Platform - Implementation Playbook
## Complete Guide for All Client Scenarios

**Document Version:** 1.0  
**Last Updated:** December 31, 2025  
**Owner:** ClearForge Technologies - ASO Product Team  
**Classification:** Internal Use - Customer Success & Engineering

---

## Table of Contents

1. [Introduction](#introduction)
2. [Scenario Classification Framework](#scenario-classification-framework)
3. [Scenario 1: Greenfield (No Website)](#scenario-1-greenfield-no-website)
4. [Scenario 2: Legacy Rebuild](#scenario-2-legacy-rebuild)
5. [Scenario 3: Modern CMS](#scenario-3-modern-cms)
6. [Scenario 4: Custom/Enterprise Sites](#scenario-4-customenterprise-sites)
7. [Scenario 5: E-commerce Platforms](#scenario-5-e-commerce-platforms)
8. [Universal Safety Protocols](#universal-safety-protocols)
9. [Troubleshooting Guide](#troubleshooting-guide)
10. [Success Metrics](#success-metrics)

---

## Introduction

### Purpose

This playbook provides step-by-step implementation guidance for onboarding clients into the ASO Platform across five distinct scenarios. Each scenario has unique challenges, risks, and optimization strategies.

### Core Philosophy

**"First, Do No Harm"**

Every implementation must follow this hierarchy:
1. **Protect existing rankings** (if applicable)
2. **Improve VVS scores** (our competitive advantage)
3. **Optimize for AI search** (future-proofing)
4. **Enhance user experience** (holistic improvement)

### Key Principles

- **Measure twice, optimize once** - Calculate VVS before and after every change
- **Stage, don't surge** - Gradual rollout with monitoring beats big bang launches
- **Reversibility is mandatory** - Every change must be revertable within 24 hours
- **Data over instinct** - Use VVS scores to guide decisions, not SEO folklore

---

## Scenario Classification Framework

### Decision Tree: Which Scenario?

```
Start Here
│
├─ Does client have a website?
│  │
│  ├─ NO → SCENARIO 1: Greenfield
│  │
│  └─ YES → How old is the website?
│     │
│     ├─ Built before 2020 + outdated design → SCENARIO 2: Legacy Rebuild
│     │
│     └─ Built 2020+ or modern → What platform?
│        │
│        ├─ WordPress/Webflow/Squarespace → SCENARIO 3: Modern CMS
│        │
│        ├─ Shopify/WooCommerce/BigCommerce → SCENARIO 5: E-commerce
│        │
│        └─ React/Next.js/Vue/Custom → SCENARIO 4: Custom/Enterprise
```

### Quick Reference Matrix

| Scenario | Timeline | Complexity | Risk Level | ASO Tier Recommendation |
|----------|----------|------------|------------|-------------------------|
| Greenfield | 4-6 weeks | Low | None | Tier 2+ (need full VVS) |
| Legacy Rebuild | 8-12 weeks | High | High | Tier 2+ (monitoring critical) |
| Modern CMS | 4-8 weeks | Medium | Low | Tier 1-2 (depends on page count) |
| Custom/Enterprise | Ongoing | High | Medium | Tier 3 (need API access) |
| E-commerce | 6-10 weeks | Medium | Medium | Tier 2-3 (scale dependent) |

---

## Scenario 1: Greenfield (No Website)

### Overview

**Best Case Scenario** - No legacy rankings to protect, no technical debt, full control over architecture.

### Pre-Implementation Checklist

```
□ Client has registered domain
□ Client has brand assets (logo, colors, messaging)
□ Client has identified 3-5 primary services/products
□ Client willing to wait 4-6 weeks before launch
□ Budget allocated for content creation ($2K-5K)
```

### Week-by-Week Implementation

#### **Week 1: Foundation & Research**

**Day 1-2: Kickoff & Discovery**
```
Activities:
- Stakeholder interview (30-60 min)
- Identify top 3 competitors
- Clarify business model and target audience
- Define success metrics

Deliverables:
- Competitor list
- Target audience persona
- Business model summary (B2B SaaS, Professional Services, etc.)
```

**Day 3-5: Keyword Research & VVS Baseline**
```
Activities:
1. Identify 20 head terms (primary keywords)
   - Tool: Google Keyword Planner + client input
   - Focus: Commercial intent, moderate volume (1K-10K/mo)
   
2. Run "Shadow VVS" on competitors
   - For each head term, calculate VVS of top 3 competitors
   - Identify average VVS score to beat (target: +5 points above average)
   
3. Semantic clustering
   - Group keywords by intent similarity
   - Identify content hub opportunities

Tools Used:
- ASO Platform: autocomplete tool (for category validation)
- ASO Platform: VVS calculator (competitor analysis)
- Spreadsheet: Keyword mapping

Deliverables:
- Keyword master list (20 head terms)
- Competitor VVS benchmark report
- Content hub map (3-5 primary hubs)
```

**Day 6-7: Content Architecture Planning**
```
Activities:
1. URL structure design
   Example (SaaS CRM):
   /
   ├─ /enterprise-crm-software          (Hub 1: Primary offering)
   │  ├─ /features
   │  │  ├─ /contact-management
   │  │  ├─ /sales-pipeline
   │  │  └─ /reporting-analytics
   │  ├─ /implementation
   │  │  ├─ /timeline-expectations
   │  │  └─ /training-support
   │  └─ /pricing
   ├─ /industries                        (Hub 2: Vertical solutions)
   │  ├─ /healthcare-crm
   │  ├─ /financial-services-crm
   │  └─ /manufacturing-crm
   └─ /resources                         (Hub 3: Thought leadership)
      ├─ /blog
      ├─ /case-studies
      └─ /roi-calculator

2. Internal linking strategy
   - Every page links to 3-5 "semantic neighbors"
   - Hub pages link to all child pages
   - All pages link back to hub

3. Schema markup planning
   - Organization schema (homepage)
   - Product schema (solution pages)
   - FAQ schema (where applicable)
   - BreadcrumbList schema (all pages)

Deliverables:
- Site map (visual diagram)
- URL structure spreadsheet
- Internal linking matrix
- Schema implementation checklist
```

#### **Week 2-3: Content Creation & VVS Optimization**

**Content Generation Workflow**

```python
# Pseudo-code for ASO content generation process

for page in site_map:
    # Step 1: Identify target keyword
    keyword = page.primary_keyword
    
    # Step 2: Analyze competitor VVS
    competitor_analysis = analyze_top_3_competitors(keyword)
    missing_clusters = competitor_analysis.gaps
    avg_vvs = competitor_analysis.avg_vvs
    
    # Step 3: Generate initial content
    content_brief = {
        "keyword": keyword,
        "target_vvs": avg_vvs + 5,  # Beat average by 5 points
        "missing_clusters": missing_clusters,
        "word_count": 1500,
        "tone": "professional, accessible",
        "include_sections": [
            "Problem statement",
            "Solution overview",
            "Key benefits",
            "Implementation details",  # Often missing in competitor content
            "FAQ"
        ]
    }
    
    # Step 4: AI generation (Claude Sonnet 4.5)
    draft_content = generate_content_with_ai(content_brief)
    
    # Step 5: VVS pre-validation
    vvs_score = calculate_vvs_pre_publish(draft_content, keyword)
    
    # Step 6: Iterate until VVS target met
    iteration = 0
    while vvs_score < content_brief.target_vvs and iteration < 3:
        feedback = analyze_vvs_gap(draft_content, keyword)
        draft_content = refine_content_with_ai(draft_content, feedback)
        vvs_score = calculate_vvs_pre_publish(draft_content, keyword)
        iteration += 1
    
    # Step 7: Human review (Tier 2+) or auto-publish (Tier 3)
    if client.tier >= 2:
        queue_for_review(page, draft_content, vvs_score)
    else:
        publish_to_staging(page, draft_content)
```

**Content Creation Timeline**

```
Day 8-10:  Homepage + 3 hub pages (4 pages)
Day 11-14: Top 10 child pages (10 pages)
Day 15-17: Remaining child pages (6-10 pages)
Day 18-21: Blog content (4-6 foundational posts)

Total: 24-30 pages
```

**VVS Quality Assurance**

```
For each page before publication:

✓ VVS score >70 (minimum)
✓ VVS score >competitor average (competitive)
✓ All missing clusters addressed
✓ Schema markup validated
✓ Internal links implemented
✓ Image alt text optimized
✓ Meta description written
```

#### **Week 4: Technical Implementation**

**Day 22-24: Website Build**
```
Platform Options:
1. Webflow (recommended for non-technical clients)
   - Visual editor
   - Built-in hosting
   - Easy client handoff
   
2. Next.js + Vercel (recommended for technical clients)
   - Superior performance
   - API integration ready
   - Developer-friendly
   
3. WordPress (if client insists)
   - Familiar interface
   - Plugin ecosystem
   - Requires more maintenance

Technical Requirements:
□ SSL certificate
□ Sitemap.xml generation
□ Robots.txt configuration
□ Google Search Console setup
□ Google Analytics 4 setup
□ Core Web Vitals optimization
   - LCP <2.5s
   - FID <100ms
   - CLS <0.1
```

**Day 25-26: Schema Markup Implementation**
```html
<!-- Example: Homepage Organization Schema -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Client Company Name",
  "url": "https://client.com",
  "logo": "https://client.com/logo.png",
  "description": "Enterprise CRM software for healthcare providers",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "San Francisco",
    "addressRegion": "CA",
    "postalCode": "94102",
    "addressCountry": "US"
  },
  "sameAs": [
    "https://linkedin.com/company/client",
    "https://twitter.com/client"
  ]
}
</script>

<!-- Example: Product Page Schema -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Client CRM",
  "applicationCategory": "BusinessApplication",
  "offers": {
    "@type": "Offer",
    "price": "349",
    "priceCurrency": "USD",
    "priceValidUntil": "2026-12-31"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.7",
    "reviewCount": "89"
  }
}
</script>
```

**Day 27-28: Quality Assurance**
```
Pre-Launch Checklist:

Technical SEO:
□ All pages indexed (GSC)
□ No 404 errors
□ No redirect chains
□ Sitemap submitted
□ Mobile-responsive (test on 3 devices)
□ Page speed >90 (PageSpeed Insights)

Content Quality:
□ All pages have VVS >70
□ No duplicate content
□ All images have alt text
□ All internal links working
□ All external links open in new tab

Schema & Structured Data:
□ Schema validated (schema.org validator)
□ No errors in Rich Results Test
□ Breadcrumbs display correctly

Analytics:
□ GA4 tracking on all pages
□ GSC property verified
□ Event tracking configured (form submissions, etc.)
```

#### **Week 5-6: Launch & Initial Optimization**

**Day 29: Soft Launch**
```
Activities:
- Set site to "public" (remove noindex)
- Submit sitemap to Google Search Console
- Request indexing for top 10 pages
- Set up monitoring alerts

Monitoring Setup:
- Daily rank tracking (ASO Platform)
- VVS tracking (ASO Platform)
- Traffic monitoring (GA4)
- Uptime monitoring (UptimeRobot or similar)
```

**Week 5-6: Post-Launch Monitoring**
```
Daily (First 14 days):
- Check Google Search Console for indexing
- Monitor for crawl errors
- Review Core Web Vitals

Weekly:
- VVS recalculation (all pages)
- Rank tracking (head terms)
- Traffic analysis (GA4)
- Backlink acquisition check

Actions:
- If VVS drops on any page → investigate and fix within 48 hours
- If page not indexed after 7 days → request indexing again
- If Core Web Vitals fail → optimize immediately
```

### Deliverables Summary

**Client Receives:**
1. Fully functional website (24-30 pages)
2. VVS Baseline Report (all pages >70 VVS)
3. Google Search Console access
4. Google Analytics 4 dashboard
5. ASO Platform account (Tier 2 recommended)
6. 90-day monitoring included

**ASO Platform Data:**
1. Initial Stage Assessment (typically Stage 1-2)
2. Keyword rankings baseline (will show "not ranking" initially)
3. VVS scores for all pages
4. Competitor benchmark data

### Success Metrics (First 90 Days)

```
Week 4:  Pages indexed: >80%
Week 8:  At least 3 keywords in top 100
Week 12: At least 1 keyword in top 50
         VVS maintained >70 on all pages
         Organic traffic >100 sessions/month
```

### Pricing Recommendation

**One-Time Setup:** $8,000-$15,000
- Keyword research & VVS analysis
- Content creation (24-30 pages)
- Website development
- Schema implementation
- 90-day monitoring

**Ongoing (Required):** ASO Platform Tier 2 ($349/mo)
- Continuous VVS monitoring
- Agent supervisor (weekly reports)
- Rank tracking (50 keywords)

---

## Scenario 2: Legacy Rebuild

### Overview

**Highest Risk Scenario** - Existing rankings to protect, outdated site, full rebuild required.

### Pre-Implementation Checklist

```
□ Client has existing website (>2 years old)
□ Client currently receives organic traffic (>500 sessions/mo)
□ Client has Google Search Console access (historical data)
□ Client willing to invest 8-12 weeks in migration
□ Budget for parallel hosting during transition ($500-1K)
□ Stakeholder buy-in for "no ranking drops" requirement
```

### Critical Success Factors

1. **Preservation-First Mindset** - Protect what's working before optimizing
2. **Parallel Build** - Never take old site down until new site is validated
3. **301 Mapping Perfection** - Every old URL must have a destination
4. **60-Day Monitoring** - Extended observation period post-launch

### Week-by-Week Implementation

#### **Week 1-2: Comprehensive Audit**

**Day 1-3: Current State Assessment**

```python
# Audit Script (Conceptual)

def audit_legacy_site(domain):
    """
    Comprehensive audit of existing site before rebuild
    """
    
    # Step 1: Crawl the site
    crawl_results = crawl_site(domain, depth=3)
    all_pages = crawl_results.pages
    
    # Step 2: Get Search Console data
    gsc_data = fetch_gsc_data(domain, days=365)
    
    # Step 3: Get current rankings
    rankings = fetch_rankings(domain, keywords="auto-discover")
    
    # Step 4: Calculate VVS for ranking pages
    vvs_scores = {}
    for page in rankings.top_pages:
        keyword = page.primary_keyword
        vvs = calculate_vvs(page.url, keyword)
        vvs_scores[page.url] = {
            "keyword": keyword,
            "rank": page.position,
            "vvs": vvs,
            "traffic": gsc_data.get_traffic(page.url),
            "clicks": gsc_data.get_clicks(page.url)
        }
    
    # Step 5: Identify preservation targets
    preservation_targets = []
    for url, data in vvs_scores.items():
        if data["rank"] <= 20 or data["clicks"] >= 10:  # Top 20 or getting clicks
            preservation_targets.append({
                "url": url,
                "keyword": data["keyword"],
                "rank": data["rank"],
                "vvs": data["vvs"],
                "traffic": data["traffic"],
                "strategy": determine_preservation_strategy(data)
            })
    
    return {
        "total_pages": len(all_pages),
        "ranking_pages": len(rankings.top_pages),
        "preservation_targets": preservation_targets,
        "avg_vvs": calculate_average_vvs(vvs_scores),
        "total_traffic": gsc_data.total_clicks,
        "total_impressions": gsc_data.total_impressions
    }

def determine_preservation_strategy(page_data):
    """
    Decide how to handle each page in migration
    """
    rank = page_data["rank"]
    vvs = page_data["vvs"]
    traffic = page_data["traffic"]
    
    if rank <= 10 and vvs >= 70:
        return "PRESERVE_AS_IS"  # Working well, don't touch
    elif rank <= 10 and vvs < 70:
        return "PRESERVE_URL_OPTIMIZE_CONTENT"  # Ranking despite low VVS (backlinks/age)
    elif rank <= 30 and traffic >= 50:
        return "PRESERVE_URL_ENHANCE"  # Getting traffic, can improve
    elif rank > 30 and traffic < 10:
        return "CONSOLIDATE_OR_301"  # Not performing, merge or redirect
    else:
        return "EVALUATE_CASE_BY_CASE"
```

**Audit Deliverables:**

```
1. Site Inventory Spreadsheet
   Columns:
   - URL
   - Primary Keyword
   - Current Rank
   - Current VVS
   - Monthly Traffic
   - Monthly Clicks
   - Preservation Strategy
   - Notes

2. Content Quality Report
   - Pages with VVS >70: [count]
   - Pages with VVS 50-70: [count]
   - Pages with VVS <50: [count]

3. Technical SEO Report
   - Crawl errors: [count]
   - Broken links: [count]
   - Duplicate content: [count]
   - Missing schema: [count]
   - Page speed issues: [count]

4. Backlink Profile
   - Total backlinks: [count]
   - Referring domains: [count]
   - High-authority links: [count]
   - Pages with most backlinks: [list]
```

**Day 4-7: Migration Planning**

```
For each page, create migration plan:

PRESERVE_AS_IS (Example: /about-us, Rank #3, VVS 78)
→ Keep URL identical: /about-us
→ Keep content 90% same, only add schema
→ Priority: Critical (top 10 ranking)

PRESERVE_URL_OPTIMIZE_CONTENT (Example: /pricing, Rank #8, VVS 62)
→ Keep URL: /pricing
→ Rewrite content to hit VVS >75
→ Maintain core messaging, enhance with missing clusters
→ Priority: High

PRESERVE_URL_ENHANCE (Example: /case-studies, Rank #18, VVS 68)
→ Keep URL: /case-studies
→ Add individual case study pages
→ Improve internal linking
→ Priority: Medium

CONSOLIDATE_OR_301 (Example: /old-blog-post-123, Rank #67, VVS 45)
→ Redirect to most relevant new page: /blog/relevant-topic
→ No content migration needed
→ Priority: Low
```

**Migration Plan Spreadsheet:**

```
| Old URL | Strategy | New URL | Content Action | Priority | VVS Target |
|---------|----------|---------|----------------|----------|------------|
| /about  | PRESERVE_AS_IS | /about | Minimal changes | Critical | 78 (maintain) |
| /pricing | PRESERVE_URL_OPTIMIZE | /pricing | Rewrite for VVS | High | 75 (from 62) |
| /services | CONSOLIDATE | /solutions | Merge into new page | Medium | 72 |
| /old-blog-1 | 301 | /blog/new-post | Redirect only | Low | N/A |
```

#### **Week 3-5: Parallel Site Build**

**Setup Staging Environment**
```
Subdomain: staging.client.com
- Password protected
- Noindex meta tag (critical!)
- Full SSL
- Same hosting specs as production
```

**Content Migration Workflow**

```
For each page in migration plan:

STEP 1: Content Extraction
- Copy content from old site
- Identify core messaging
- Extract any unique data (testimonials, stats, etc.)

STEP 2: VVS Baseline
- Calculate current VVS
- Identify missing semantic clusters
- Note competitor VVS scores

STEP 3: Content Optimization
if strategy == "PRESERVE_AS_IS":
    new_content = old_content + minimal_enhancements
    # Just add schema, fix typos, update dates
    
elif strategy == "PRESERVE_URL_OPTIMIZE":
    # Major rewrite for VVS improvement
    gaps = identify_semantic_gaps(old_content, keyword)
    new_sections = generate_gap_filling_content(gaps)
    new_content = restructure_content(old_content, new_sections)
    
elif strategy == "PRESERVE_URL_ENHANCE":
    # Add supplementary content
    new_content = old_content + additional_sections
    # FAQ, case studies, related resources, etc.

STEP 4: VVS Validation
new_vvs = calculate_vvs_staging(new_content, keyword)

if new_vvs < old_vvs:
    # RED FLAG: New content is worse
    iterate_content_improvement()
elif new_vvs < target_vvs:
    # Not hitting target, iterate
    iterate_content_improvement()
else:
    # Success! Ready to publish to staging
    publish_to_staging()

STEP 5: Staging QA
- Visual review
- Link checking
- Schema validation
- Mobile responsiveness
```

**Critical: VVS Comparison Table**

```
Track every page migration:

| Page | Old VVS | New VVS | Delta | Status | Action Needed |
|------|---------|---------|-------|--------|---------------|
| /pricing | 62 | 76 | +14 | ✓ Ready | None |
| /features | 68 | 71 | +3 | ✓ Ready | None |
| /about | 78 | 76 | -2 | ⚠ Review | Investigate drop |
| /contact | 55 | 72 | +17 | ✓ Ready | None |

Rules:
- If Delta negative → MUST investigate before launch
- If New VVS < 70 → Iterate before launch
- If New VVS < Old VVS → Red flag, requires approval
```

#### **Week 6-7: 301 Mapping & Pre-Launch Prep**

**301 Redirect Map Creation**

```csv
# redirect_map.csv (critical document)
old_url,new_url,redirect_type,priority,notes
/old-about-us,/about,301,critical,top 3 ranking page
/services/consulting,/solutions/consulting,301,high,consolidating services
/blog/2018/old-post,/blog/updated-post,301,medium,content merged
/outdated-page,,410,low,page removed - no replacement
```

**Redirect Implementation (Platform-Specific)**

```nginx
# Nginx example
location = /old-about-us {
    return 301 https://client.com/about;
}

location = /services/consulting {
    return 301 https://client.com/solutions/consulting;
}
```

```javascript
// Next.js example (next.config.js)
module.exports = {
  async redirects() {
    return [
      {
        source: '/old-about-us',
        destination: '/about',
        permanent: true, // 301
      },
      {
        source: '/services/consulting',
        destination: '/solutions/consulting',
        permanent: true,
      },
    ]
  },
}
```

**Pre-Launch Checklist**

```
CRITICAL ITEMS (Must be 100%):
□ All preservation targets have new URLs
□ All 301 redirects tested and working
□ New site VVS scores ≥ old site VVS scores
□ All pages indexed in staging (verify via GSC)
□ No broken links (0 errors)
□ Schema markup validated (0 errors)
□ Page speed >85 on all key pages
□ Mobile responsive (tested on 5 devices)
□ SSL certificate valid
□ Sitemap generated and tested
□ Robots.txt configured correctly
□ Old site backed up completely

HIGH PRIORITY (Should be 100%):
□ GA4 tracking implemented
□ GSC property ready for new site
□ Monitoring alerts configured
□ Team trained on rollback procedure
□ Client approval documented

NICE TO HAVE:
□ Blog content migrated
□ Images optimized
□ Social meta tags added
```

#### **Week 8: Launch (The Critical Week)**

**Launch Day Preparation**

```
T-48 hours:
□ Final VVS validation of all pages
□ Client sign-off on staging site
□ Rollback plan documented and tested
□ Team briefing (all hands on deck)
□ Monitoring dashboard setup

T-24 hours:
□ Old site full backup
□ DNS change plan reviewed
□ 301 redirects final test
□ Old site kept accessible (don't delete!)

Launch Day (choose Tuesday-Thursday, never Friday):
□ 6 AM: DNS change initiated
□ 7 AM: Verify new site live
□ 8 AM: Test 20 critical 301 redirects manually
□ 9 AM: Submit new sitemap to GSC
□ 10 AM: Request indexing for top 10 pages
□ 11 AM: Verify GA4 tracking working
□ 12 PM: First monitoring check
□ 3 PM: Second monitoring check
□ 6 PM: End of day review

Launch Day Monitoring:
- Check every 3 hours for first 24 hours
- Monitor for:
  - 404 errors (should be zero)
  - Server errors (should be zero)
  - Redirect loops (should be zero)
  - Traffic drop (expect 10-20% temporary dip)
```

**Post-Launch Monitoring Protocol**

```
DAILY (First 7 days):
□ Rank tracking (top 20 keywords)
□ VVS recalculation (all preservation targets)
□ Traffic analysis (GA4)
□ GSC crawl errors check
□ Backlink preservation check

WEEKLY (Weeks 2-8):
□ Comprehensive rank review
□ VVS trend analysis
□ Traffic comparison (new vs old)
□ Conversion rate tracking
□ User behavior analysis

ALERTS (Immediate action required):
⚠ Any page drops >5 positions → Investigate within 4 hours
⚠ VVS drops >10 points → Immediate content review
⚠ Traffic drops >30% → Emergency review
⚠ 404 spike → Fix redirects immediately
```

#### **Week 9-12: Stabilization & Optimization**

**Ranking Drop Protocol**

```
If page drops >5 positions:

STEP 1: Identify cause (within 4 hours)
Possible causes:
a) VVS drop (our fault)
b) Google algorithm update (not our fault)
c) Competitor improvement (market dynamics)
d) Technical issue (our fault)
e) Redirect problem (our fault)

STEP 2: Determine action
if cause == "VVS drop":
    # Compare old vs new content
    vvs_delta = new_vvs - old_vvs
    if vvs_delta < 0:
        # New content is worse - revert
        revert_to_old_content()
    else:
        # VVS improved but rank dropped - wait
        monitor_for_30_days()  # Google needs time

elif cause == "Google algorithm":
    # Check industry news, wait it out
    monitor_for_30_days()
    
elif cause == "Competitor improvement":
    # Analyze competitor, improve our VVS
    analyze_competitor_changes()
    improve_our_vvs()

elif cause == "Technical issue":
    # Fix immediately
    fix_technical_issue()
    request_reindex()

elif cause == "Redirect problem":
    # Fix redirect, monitor
    fix_redirect()
    monitor_for_7_days()

STEP 3: Document and learn
log_incident(page, cause, action, outcome)
update_playbook_if_needed()
```

**Success Criteria (Week 12)**

```
MUST ACHIEVE:
□ 95% of preservation targets maintain rank (±3 positions)
□ 0% of pages drop >10 positions
□ Average VVS improved by 5+ points
□ Traffic within 90-110% of pre-migration baseline
□ Zero 404 errors

SHOULD ACHIEVE:
□ 80% of preservation targets improve rank
□ Average VVS improved by 10+ points
□ Traffic increased by 10%+
□ At least 3 new keywords ranking top 50

NICE TO HAVE:
□ 50% of preservation targets improve rank by 5+ positions
□ Traffic increased by 25%+
□ Conversion rate improved
```

### Deliverables Summary

**Client Receives:**
1. Fully migrated website (VVS-optimized)
2. 301 Redirect map documentation
3. VVS Before/After comparison report
4. 12-week performance report
5. Ongoing ASO Platform monitoring (Tier 2+)

**ASO Platform Data:**
1. Migration success metrics
2. VVS improvement documentation
3. Ranking preservation rate
4. Traffic impact analysis

### Pricing Recommendation

**One-Time Migration:** $15,000-$35,000
- Comprehensive audit
- Content migration & optimization
- Website rebuild
- 301 mapping & implementation
- 12-week monitoring & support

**Ongoing (Required):** ASO Platform Tier 2+ ($349+/mo)
- Continuous VVS monitoring
- Rank tracking (50+ keywords)
- Weekly agent reports
- Priority support

---

## Scenario 3: Modern CMS

### Overview

**Most Common Scenario** - Client has WordPress, Webflow, or Squarespace site that's functional but not VVS-optimized. Can't do full rebuild.

### Pre-Implementation Checklist

```
□ Client has CMS access (admin credentials)
□ Site built within last 3 years
□ Current organic traffic >200 sessions/mo
□ Client willing to make incremental changes
□ No plans for full redesign in next 6 months
```

### Platform-Specific Considerations

**WordPress:**
- ✓ Full content control
- ✓ Plugin ecosystem (schema, optimization)
- ✗ Theme constraints
- ✗ Performance limitations

**Webflow:**
- ✓ Good performance
- ✓ Design flexibility
- ✗ No server-side code
- ✗ Limited plugin ecosystem

**Squarespace:**
- ✓ User-friendly
- ✓ Good templates
- ✗ Limited customization
- ✗ SEO plugin restrictions

### Week-by-Week Implementation

#### **Week 1: Baseline Assessment**

**Day 1-2: Platform Audit**

```
Activities:
1. Identify CMS platform and version
2. Document installed plugins/extensions
3. Check update status
4. Review current SEO configuration
5. Assess technical limitations

Deliverables:
- Platform capabilities matrix
- Current plugin inventory
- Limitation documentation
```

**Day 3-5: Content & VVS Audit**

```
For WordPress sites (example):

# Audit all pages and posts
pages = fetch_all_pages(wordpress_api)
posts = fetch_all_posts(wordpress_api)

for page in pages + posts:
    vvs = calculate_vvs(page.url, page.inferred_keyword)
    
    analysis = {
        "url": page.url,
        "title": page.title,
        "word_count": len(page.content.split()),
        "vvs": vvs,
        "current_rank": get_rank(page.url),
        "opportunity_score": calculate_opportunity(vvs, rank),
        "optimization_complexity": assess_complexity(page)
    }
    
Priority = High if:
- Ranking 11-30 (page 2-3) + VVS <70 (quick win potential)
- Getting clicks but low VVS (improve CTR + rank)

Priority = Medium if:
- Ranking 31-50 + VVS <65 (needs work but winnable)
- Not ranking but high search volume keyword

Priority = Low if:
- Not ranking + low search volume
- Already VVS >75
```

**Day 6-7: Optimization Planning**

```
Create prioritized optimization list:

PHASE 1 (Weeks 2-3): Quick Wins
- 5-10 pages ranking 11-30 with VVS <70
- Low effort, high impact
- Expected: 3-5 position improvements

PHASE 2 (Weeks 4-6): Medium Complexity
- 10-15 pages ranking 31-50 with VVS <65
- Moderate effort, moderate impact
- Expected: Enter top 30

PHASE 3 (Weeks 7-8): Long-term investments
- New content creation
- Structural improvements
- Expected: New keyword rankings
```

#### **Week 2-3: Quick Win Implementation**

**Non-Destructive Content Overlay Method**

```
For each priority page:

STEP 1: Calculate current VVS
current_vvs = 64
target_vvs = 75

STEP 2: Identify missing clusters
gaps = ["pricing transparency", "implementation timeline", "security features"]

STEP 3: Generate supplementary content blocks
# Don't rewrite existing content - ADD to it

new_h2_section_1 = generate_content_block(
    topic="Pricing Transparency",
    length=250,
    style="match existing tone"
)

new_h2_section_2 = generate_content_block(
    topic="Implementation Timeline",
    length=200,
    style="match existing tone"
)

new_faq_section = generate_faq_schema(
    questions=["What security features are included?", 
               "How long does implementation take?",
               "What's included in each pricing tier?"]
)

STEP 4: Insert content (non-destructively)
# Original content stays, new sections added

original_content = """
<h1>Enterprise CRM Software</h1>
<p>Our CRM helps businesses manage customers...</p>
<h2>Key Features</h2>
<p>Feature list here...</p>
"""

optimized_content = """
<h1>Enterprise CRM Software</h1>
<p>Our CRM helps businesses manage customers...</p>

<h2>Key Features</h2>
<p>Feature list here...</p>

<!-- NEW SECTIONS ADDED BELOW -->
<h2>Transparent Pricing for Every Business Size</h2>
{new_h2_section_1}

<h2>Your Implementation Timeline: What to Expect</h2>
{new_h2_section_2}

<h2>Frequently Asked Questions</h2>
{new_faq_section}
"""

STEP 5: VVS validation
new_vvs = calculate_vvs(optimized_content, keyword)
# new_vvs = 76 (target met!)

STEP 6: Publish
update_wordpress_page(page_id, optimized_content)
```

**WordPress Implementation Example**

```php
// WordPress plugin approach (for Tier 3 automation)

<?php
/**
 * ASO Content Optimizer
 * Adds VVS-optimized content blocks to existing pages
 */

function aso_add_optimized_content($content) {
    global $post;
    
    // Check if this page needs optimization
    $page_id = $post->ID;
    $optimization_data = get_post_meta($page_id, 'aso_optimization', true);
    
    if (empty($optimization_data)) {
        return $content; // No optimization needed
    }
    
    // Add optimized sections
    $optimized_content = $content;
    
    foreach ($optimization_data['sections'] as $section) {
        $optimized_content .= sprintf(
            '<h2>%s</h2><div class="aso-section">%s</div>',
            esc_html($section['title']),
            wp_kses_post($section['content'])
        );
    }
    
    // Add FAQ schema if included
    if (isset($optimization_data['faq'])) {
        $optimized_content .= aso_generate_faq_section($optimization_data['faq']);
    }
    
    return $optimized_content;
}
add_filter('the_content', 'aso_add_optimized_content');

function aso_generate_faq_section($faqs) {
    $html = '<div class="aso-faq" itemscope itemtype="https://schema.org/FAQPage">';
    
    foreach ($faqs as $faq) {
        $html .= sprintf(
            '<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
                <h3 itemprop="name">%s</h3>
                <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                    <div itemprop="text">%s</div>
                </div>
            </div>',
            esc_html($faq['question']),
            wp_kses_post($faq['answer'])
        );
    }
    
    $html .= '</div>';
    return $html;
}
?>
```

**Webflow Implementation (No-Code Approach)**

```
For Webflow (no server-side code access):

STEP 1: Manual content addition
- Client adds new sections via Webflow editor
- ASO provides exact content + formatting

STEP 2: Schema via embed code
- Add custom code embed at page level
- Paste schema markup provided by ASO

STEP 3: Publish and monitor
- Client publishes changes
- ASO recalculates VVS
- Monitor rankings for 7 days

Delivery Method:
- Email client with:
  □ Exact content to add
  □ Where to add it (section placement)
  □ Schema code to embed
  □ Screenshots for guidance
```

#### **Week 4-6: Medium Complexity Optimizations**

**Structural Improvements**

```
Internal Linking Enhancement:

BEFORE:
Page A (VVS 62) → No internal links
Page B (VVS 58) → Links to Page A (good)
Page C (VVS 71) → No internal links

AFTER (Semantic neighbor linking):
Page A → Links to B, C, D (semantic neighbors)
Page B → Links to A, C, E
Page C → Links to A, B, F

Implementation:
1. Calculate semantic similarity between all pages
2. For each page, identify top 3-5 semantic neighbors
3. Add contextual internal links
4. Monitor VVS improvement (typically +3-5 points)
```

**Schema Markup Addition**

```html
<!-- WordPress: Add via plugin or custom code -->

<!-- Article Schema (Blog Posts) -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "How to Choose Enterprise CRM Software",
  "author": {
    "@type": "Organization",
    "name": "Client Company"
  },
  "datePublished": "2025-12-01",
  "dateModified": "2025-12-15",
  "image": "https://client.com/article-image.jpg"
}
</script>

<!-- FAQ Schema (Service Pages) -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What's included in your implementation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Implementation includes data migration, training..."
      }
    }
  ]
}
</script>

<!-- Product Schema (Solution Pages) -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Enterprise CRM",
  "applicationCategory": "BusinessApplication",
  "offers": {
    "@type": "AggregateOffer",
    "lowPrice": "99",
    "highPrice": "499",
    "priceCurrency": "USD"
  }
}
</script>
```

**Image Optimization**

```
For all images on priority pages:

1. File size optimization
   - Target: <200KB per image
   - Tool: ImageOptim, TinyPNG, or WordPress plugin

2. Alt text optimization
   - Bad: alt="image1.jpg"
   - Good: alt="enterprise crm dashboard showing sales pipeline"
   - Include target keyword naturally

3. Lazy loading
   - Enable via plugin (WordPress)
   - Or add loading="lazy" attribute (HTML)

4. Next-gen formats
   - Convert to WebP where supported
   - Keep fallback to JPEG/PNG
```

#### **Week 7-8: Long-Term Improvements**

**New Content Creation**

```
Identify content gaps:

Gap Analysis Results:
- Competitor has "ROI Calculator" (VVS 82) → We don't
- Competitor has "Implementation Checklist" (VVS 79) → We don't
- Competitor has "Integration Guides" (VVS 75) → We don't

Action Plan:
Week 7:
□ Create ROI Calculator page
  - Interactive calculator (via plugin or custom code)
  - Target VVS: 85
  - Link from pricing page

Week 8:
□ Create Implementation Checklist
  - Downloadable PDF resource
  - Target VVS: 80
  - Link from solutions page
  
□ Create Integration Guide Hub
  - Individual guides for Slack, Salesforce, etc.
  - Target VVS: 75+ per guide
  - New site section
```

**Plugin Recommendations (WordPress-Specific)**

```
SEO Plugins:
□ Yoast SEO Premium OR Rank Math Pro
  - Meta description management
  - Schema markup
  - XML sitemap

Performance:
□ WP Rocket OR NitroPack
  - Caching
  - Minification
  - Image optimization

Schema:
□ Schema Pro OR WP Schema Pro
  - Advanced schema markup
  - Multiple schema types
  - Auto-generation

Internal Linking:
□ Link Whisper
  - Suggests internal links
  - Based on keyword relevance
```

### Monitoring & Iteration

**Weekly Check-ins**

```
Every Monday:
1. VVS recalculation (all optimized pages)
2. Rank tracking (all optimized keywords)
3. Traffic analysis (GA4)
4. Agent report review

Success Indicators:
□ VVS improving +2-3 points/week
□ Rankings improving +1-2 positions/week
□ Traffic increasing +5-10%/month
□ No ranking drops >3 positions

If not meeting targets:
- Review optimizations
- Increase content depth
- Add more internal links
- Consider competitor analysis
```

### Deliverables Summary

**Client Receives:**
1. Optimized content for 20-30 pages
2. Schema markup implementation
3. Internal linking improvements
4. Image optimization
5. Plugin recommendations (WordPress)
6. Ongoing monitoring via ASO Platform

**ASO Platform Data:**
1. VVS improvement tracking
2. Rank progression analysis
3. Traffic impact reports
4. Weekly agent recommendations

### Pricing Recommendation

**One-Time Setup:** $3,000-$8,000
- Comprehensive audit
- Content optimization (20-30 pages)
- Schema implementation
- Internal linking strategy
- 60-day monitoring

**Ongoing:** ASO Platform Tier 1-2 ($99-$349/mo)
- Continuous monitoring
- Monthly optimization recommendations
- VVS tracking

---

## Scenario 4: Custom/Enterprise Sites

### Overview

**Developer Partnership Required** - Client has engineering team, custom tech stack (React/Next.js/Vue), needs API-first approach.

### Pre-Implementation Checklist

```
□ Client has engineering team (in-house or agency)
□ Tech stack documented (React, Next.js, etc.)
□ Git repository access available
□ CI/CD pipeline in place
□ Client willing to review/merge PRs
□ API access for programmatic VVS tracking
```

### Week-by-Week Implementation

#### **Week 1: Technical Discovery**

**Day 1-2: Architecture Review**

```
Information to gather:

1. Tech Stack:
   - Framework: Next.js 14, React 18, Vue 3, etc.
   - CMS: Contentful, Sanity, Strapi, or headless?
   - Hosting: Vercel, Netlify, AWS, custom?
   - Build process: GitHub Actions, Jenkins, etc.?

2. Current SEO Implementation:
   - Meta tags: How are they managed?
   - Sitemap: Generated or static?
   - Schema: Implemented or not?
   - Rendering: SSR, SSG, or CSR?

3. Development Workflow:
   - Branch strategy: Git Flow, trunk-based, etc.?
   - PR review process: Who approves?
   - Deployment frequency: Daily, weekly, on-demand?
   - Testing: Unit tests, E2E tests, SEO tests?

4. Access & Permissions:
   - GitHub repo: Read or write access?
   - Staging environment: Available?
   - Production deployment: Who can trigger?
```

**Day 3-5: API Integration Setup**

```javascript
// ASO Platform API Integration (Next.js example)

// lib/aso-client.ts
import { ASOPlatformAPI } from '@aso-platform/sdk';

const aso = new ASOPlatformAPI({
  apiKey: process.env.ASO_API_KEY,
  tenantId: process.env.ASO_TENANT_ID,
});

export async function calculatePageVVS(url: string, keyword: string) {
  const vvs = await aso.vvs.calculate({
    url,
    keyword,
    waitForResult: true, // Block until calculation complete
  });
  
  return vvs;
}

export async function getVVSRecommendations(url: string) {
  const recommendations = await aso.recommendations.get({
    url,
    includeContentBlocks: true, // Get ready-to-use content
  });
  
  return recommendations;
}

// Optional: Real-time VVS tracking in dev environment
export async function trackVVSInDev(pagePath: string) {
  if (process.env.NODE_ENV === 'development') {
    const vvs = await calculatePageVVS(
      `http://localhost:3000${pagePath}`,
      inferKeywordFromPath(pagePath)
    );
    
    console.log(`[ASO] VVS for ${pagePath}: ${vvs.score}/100`);
    
    if (vvs.score < 70) {
      console.warn(`[ASO] VVS below target! Missing: ${vvs.missingClusters.join(', ')}`);
    }
  }
}
```

**Day 6-7: Baseline VVS Audit**

```javascript
// scripts/audit-vvs.ts
// Run this to establish baseline VVS scores

import { ASOPlatformAPI } from '@aso-platform/sdk';
import { getAllPages } from '../lib/sitemap';

async function auditSite() {
  const aso = new ASOPlatformAPI({
    apiKey: process.env.ASO_API_KEY,
    tenantId: process.env.ASO_TENANT_ID,
  });
  
  const pages = await getAllPages(); // Get all pages from sitemap
  const results = [];
  
  for (const page of pages) {
    try {
      const vvs = await aso.vvs.calculate({
        url: page.url,
        keyword: page.primaryKeyword,
      });
      
      results.push({
        url: page.url,
        keyword: page.primaryKeyword,
        vvs: vvs.score,
        missingClusters: vvs.missingClusters,
        recommendations: vvs.recommendations,
      });
      
      console.log(`✓ ${page.url}: VVS ${vvs.score}`);
    } catch (error) {
      console.error(`✗ ${page.url}: ${error.message}`);
    }
  }
  
  // Export to JSON for analysis
  await fs.writeFile(
    './vvs-audit-results.json',
    JSON.stringify(results, null, 2)
  );
  
  // Generate summary
  const avgVVS = results.reduce((sum, r) => sum + r.vvs, 0) / results.length;
  const belowTarget = results.filter(r => r.vvs < 70).length;
  
  console.log(`\n=== VVS Audit Summary ===`);
  console.log(`Total pages: ${results.length}`);
  console.log(`Average VVS: ${avgVVS.toFixed(1)}`);
  console.log(`Pages below target (<70): ${belowTarget}`);
}

auditSite();
```

#### **Week 2-3: Component Library Creation**

**SEO-Optimized React Components**

```typescript
// components/seo/FAQSection.tsx
// ASO-generated component for VVS optimization

import React from 'react';
import { FAQPageJsonLd } from 'next-seo';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
  title?: string;
}

export function FAQSection({ faqs, title = "Frequently Asked Questions" }: FAQSectionProps) {
  return (
    <>
      {/* Schema markup for Google */}
      <FAQPageJsonLd
        mainEntity={faqs.map(faq => ({
          questionName: faq.question,
          acceptedAnswerText: faq.answer,
        }))}
      />
      
      {/* Visual FAQ section */}
      <section className="faq-section py-16">
        <h2 className="text-3xl font-bold mb-8">{title}</h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <details key={index} className="border rounded-lg p-6">
              <summary className="font-semibold cursor-pointer">
                {faq.question}
              </summary>
              <p className="mt-4 text-gray-600">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}

// Usage in page component:
// import { FAQSection } from '@/components/seo/FAQSection';
// 
// <FAQSection faqs={[
//   { question: "What's included?", answer: "..." },
//   { question: "How long does it take?", answer: "..." }
// ]} />
```

```typescript
// components/seo/ProductSchema.tsx
// Product page schema component

import { ProductJsonLd } from 'next-seo';

interface ProductSchemaProps {
  name: string;
  description: string;
  price: number;
  priceCurrency?: string;
  image?: string;
  rating?: {
    value: number;
    count: number;
  };
}

export function ProductSchema({
  name,
  description,
  price,
  priceCurrency = 'USD',
  image,
  rating,
}: ProductSchemaProps) {
  return (
    <ProductJsonLd
      productName={name}
      description={description}
      images={image ? [image] : []}
      offers={[
        {
          price,
          priceCurrency,
          availability: 'https://schema.org/InStock',
        },
      ]}
      aggregateRating={
        rating
          ? {
              ratingValue: rating.value.toString(),
              reviewCount: rating.count.toString(),
            }
          : undefined
      }
    />
  );
}
```

**VVS-Driven Content Component**

```typescript
// components/seo/VVSOptimizedContent.tsx
// Dynamically fetches VVS recommendations and renders them

import { useEffect, useState } from 'react';
import { getVVSRecommendations } from '@/lib/aso-client';

interface VVSOptimizedContentProps {
  pageUrl: string;
  keyword: string;
}

export function VVSOptimizedContent({ pageUrl, keyword }: VVSOptimizedContentProps) {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchRecommendations() {
      try {
        const recs = await getVVSRecommendations(pageUrl);
        setContent(recs.contentBlocks);
      } catch (error) {
        console.error('Failed to fetch VVS recommendations:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchRecommendations();
  }, [pageUrl]);
  
  if (loading || !content) {
    return null; // Or skeleton loader
  }
  
  return (
    <div className="vvs-optimized-content">
      {content.map((block: any, index: number) => (
        <div key={index} className="content-block">
          <h2>{block.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: block.html }} />
        </div>
      ))}
    </div>
  );
}
```

#### **Week 3-4: Pull Request Workflow**

**Example: VVS Optimization PR**

```markdown
## PR Title: [ASO] Improve VVS for /pricing page

### Summary
Optimizes `/pricing` page VVS score from 62 to 78 by adding missing semantic clusters identified by ASO Platform analysis.

### Changes Made
- Added FAQ section (5 questions addressing common pricing concerns)
- Added "Implementation Timeline" section
- Added Product schema markup
- Enhanced internal linking to related pages

### VVS Impact
| Metric | Before | After | Delta |
|--------|--------|-------|-------|
| VVS Score | 62 | 78 | +16 |
| Predicted Rank | #12 | #6-8 | +4-6 |
| Missing Clusters | 5 | 0 | -5 |

### Files Changed
- `app/pricing/page.tsx` - Added new sections
- `components/FAQ/PricingFAQ.tsx` - New component
- `lib/schema/pricing.ts` - Added product schema

### Testing
- [x] VVS score validated (78/100)
- [x] Schema markup validated (no errors)
- [x] Lighthouse score >90
- [x] Mobile responsive
- [x] No console errors

### Deployment Notes
- No breaking changes
- No database migrations needed
- Safe to merge to main

### ASO Platform Reference
- Task ID: ASO-1234
- Generated via: Agent Supervisor Weekly Report
- VVS Report: [Link to ASO dashboard]

### Reviewer Checklist
- [ ] Code quality acceptable
- [ ] No performance regressions
- [ ] Content quality reviewed
- [ ] Schema markup valid
```

**Automated VVS Checks in CI/CD**

```yaml
# .github/workflows/vvs-check.yml
name: VVS Quality Check

on:
  pull_request:
    paths:
      - 'app/**/*.tsx'
      - 'pages/**/*.tsx'

jobs:
  vvs-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Build site
        run: |
          npm install
          npm run build
      
      - name: Start preview server
        run: |
          npm run start &
          sleep 10
      
      - name: Check VVS scores
        run: |
          node scripts/vvs-ci-check.js
        env:
          ASO_API_KEY: ${{ secrets.ASO_API_KEY }}
          ASO_TENANT_ID: ${{ secrets.ASO_TENANT_ID }}
      
      - name: Comment on PR
        uses: actions/github-script@v6
        with:
          script: |
            const fs = require('fs');
            const results = JSON.parse(fs.readFileSync('vvs-results.json'));
            
            let comment = '## VVS Check Results\n\n';
            comment += '| Page | VVS | Status |\n';
            comment += '|------|-----|--------|\n';
            
            results.forEach(page => {
              const status = page.vvs >= 70 ? '✅' : '⚠️';
              comment += `| ${page.url} | ${page.vvs} | ${status} |\n`;
            });
            
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: comment
            });
```

#### **Week 5-8: Continuous Optimization**

**Slack Integration for Real-Time Alerts**

```javascript
// lib/slack-notifier.ts
import { WebClient } from '@slack/web-api';

const slack = new WebClient(process.env.SLACK_BOT_TOKEN);

export async function notifyVVSDrop(page: string, oldVVS: number, newVVS: number) {
  const delta = newVVS - oldVVS;
  
  await slack.chat.postMessage({
    channel: '#seo-alerts',
    text: `🚨 VVS Drop Alert: ${page}`,
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: '🚨 VVS Score Dropped',
        },
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Page:*\n${page}`,
          },
          {
            type: 'mrkdwn',
            text: `*Change:*\n${oldVVS} → ${newVVS} (${delta})`,
          },
        ],
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: 'Investigate this drop immediately. Check recent deployments.',
        },
      },
      {
        type: 'actions',
        elements: [
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'View in ASO Dashboard',
            },
            url: `https://aso.clearforge.tech/dashboard/page/${encodeURIComponent(page)}`,
          },
        ],
      },
    ],
  });
}

export async function notifyWeeklyReport(summary: any) {
  await slack.chat.postMessage({
    channel: '#seo-reports',
    text: 'Weekly ASO Report',
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: '📊 Weekly ASO Performance Report',
        },
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Average VVS:*\n${summary.avgVVS} (${summary.vvsDelta > 0 ? '+' : ''}${summary.vvsDelta})`,
          },
          {
            type: 'mrkdwn',
            text: `*Pages Optimized:*\n${summary.pagesOptimized}`,
          },
          {
            type: 'mrkdwn',
            text: `*Rank Improvements:*\n${summary.rankImprovements} pages`,
          },
          {
            type: 'mrkdwn',
            text: `*Top Mover:*\n${summary.topMover.page} (+${summary.topMover.positions})`,
          },
        ],
      },
    ],
  });
}
```

**Dashboard Integration**

```typescript
// app/dashboard/seo/page.tsx
// Internal SEO dashboard for engineering team

import { ASOPlatformAPI } from '@aso-platform/sdk';
import { VVSChart } from '@/components/analytics/VVSChart';
import { RankTracker } from '@/components/analytics/RankTracker';

export default async function SEODashboard() {
  const aso = new ASOPlatformAPI({
    apiKey: process.env.ASO_API_KEY,
    tenantId: process.env.ASO_TENANT_ID,
  });
  
  // Fetch latest VVS scores
  const vvsData = await aso.vvs.getHistory({
    days: 30,
  });
  
  // Fetch rank data
  const rankData = await aso.rankings.getCurrent();
  
  // Get agent recommendations
  const recommendations = await aso.agent.getLatestReport();
  
  return (
    <div className="dashboard">
      <h1>SEO Performance Dashboard</h1>
      
      <div className="grid grid-cols-2 gap-8">
        <VVSChart data={vvsData} />
        <RankTracker data={rankData} />
      </div>
      
      <div className="mt-8">
        <h2>AI Agent Recommendations</h2>
        <ul>
          {recommendations.actions.map((action, i) => (
            <li key={i}>
              <strong>{action.title}</strong>
              <p>{action.description}</p>
              <span>Predicted VVS gain: +{action.predictedVVSGain}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
```

### Deliverables Summary

**Client Receives:**
1. API integration code (SDK setup)
2. SEO-optimized React component library
3. CI/CD VVS validation pipeline
4. Slack integration for alerts
5. Internal SEO dashboard
6. Weekly PR-based optimizations
7. Documentation for team

**ASO Platform Data:**
1. Programmatic VVS tracking
2. API usage analytics
3. PR impact analysis
4. Team collaboration metrics

### Pricing Recommendation

**One-Time Setup:** $10,000-$20,000
- Technical architecture review
- API integration & SDK setup
- Component library creation
- CI/CD pipeline integration
- Team training & documentation

**Ongoing:** ASO Platform Tier 3 ($1,500-3,000/mo)
- API access (unlimited)
- Weekly PR generation
- Priority support
- Custom agent configuration
- Dedicated success engineer

---

## Scenario 5: E-commerce Platforms

### Overview

**Scale Challenge** - 1,000-100,000 products, template-based optimization, programmatic approach required.

### Pre-Implementation Checklist

```
□ Client has e-commerce platform (Shopify, WooCommerce, BigCommerce, etc.)
□ Product catalog >100 items
□ Platform admin access available
□ Product data export capability
□ Budget for automation tools/plugins
```

### Platform-Specific Considerations

**Shopify:**
- ✓ Clean platform, good performance
- ✓ App ecosystem (Metafields, schema)
- ✗ Limited server-side customization
- ✗ Liquid template learning curve

**WooCommerce:**
- ✓ Full WordPress control
- ✓ Plugin ecosystem
- ✗ Performance challenges at scale
- ✗ Requires more maintenance

**BigCommerce:**
- ✓ Built-in features
- ✓ Good performance
- ✗ Smaller app ecosystem
- ✗ Template restrictions

### Week-by-Week Implementation

#### **Week 1-2: Template Optimization**

**Product Template VVS Analysis**

```
Instead of optimizing 10,000 products individually,
optimize the TEMPLATE once, improve all products.

STEP 1: Identify representative products
- Sample 20-50 products across categories
- Include: best sellers, new arrivals, low performers

STEP 2: Calculate template VVS
- Average VVS across all sampled products
- Identify consistent missing clusters
- Document template-level gaps

Example Results:
Average Template VVS: 58/100
Missing Clusters (90%+ of products):
- "Shipping & returns information"
- "Product compatibility/requirements"
- "Customer reviews summary"
- "Size/fit guidance"
- "Care instructions"
```

**Template Enhancement Plan**

```
For Shopify (Liquid template):

{%- comment -%}
ASO-Enhanced Product Template
Adds VVS-optimized sections to all product pages
{%- endcomment -%}

<!-- Original product content -->
<div class="product-main">
  {{ product.title }}
  {{ product.price }}
  {{ product.description }}
  {{ product.images }}
</div>

<!-- ASO ENHANCEMENT: FAQ Section -->
{% if product.metafields.aso.faq %}
  <div class="product-faq" itemscope itemtype="https://schema.org/FAQPage">
    <h2>Frequently Asked Questions</h2>
    {% for faq in product.metafields.aso.faq.value %}
      <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
        <h3 itemprop="name">{{ faq.question }}</h3>
        <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
          <p itemprop="text">{{ faq.answer }}</p>
        </div>
      </div>
    {% endfor %}
  </div>
{% endif %}

<!-- ASO ENHANCEMENT: Shipping & Returns -->
<div class="product-shipping">
  <h2>Shipping & Returns</h2>
  <ul>
    <li>Free shipping on orders over $50</li>
    <li>30-day return policy</li>
    <li>Ships within 2-3 business days</li>
  </ul>
</div>

<!-- ASO ENHANCEMENT: Product Schema -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "{{ product.title }}",
  "description": "{{ product.description | strip_html | truncate: 200 }}",
  "image": "{{ product.featured_image | img_url: 'grande' }}",
  "brand": {
    "@type": "Brand",
    "name": "{{ shop.name }}"
  },
  "offers": {
    "@type": "Offer",
    "url": "{{ shop.url }}{{ product.url }}",
    "priceCurrency": "{{ shop.currency }}",
    "price": "{{ product.price | divided_by: 100.0 }}",
    "availability": "{% if product.available %}https://schema.org/InStock{% else %}https://schema.org/OutOfStock{% endif %}"
  }
}
</script>
```

**Expected Impact:**

```
Template optimization (one-time):
- All products get +10-15 VVS points
- Consistent schema markup across catalog
- Improved internal linking structure

Result:
Before: Average VVS 58
After: Average VVS 71
Total products improved: 10,000+
Development time: 2 weeks
Cost per product: $0.50 (vs $10-50 for individual optimization)
```

#### **Week 3-4: Predictive VVS & Prioritization**

**Long-Tail Prediction Model**

```python
# Predictive VVS script
# Reduces scraping costs by 70%

import pandas as pd
from sklearn.ensemble import RandomForestRegressor

def predict_product_vvs(catalog_file='products.csv'):
    """
    Predict VVS scores for entire catalog
    based on sample of real VVS calculations
    """
    
    # STEP 1: Load product catalog
    catalog = pd.read_csv(catalog_file)
    print(f"Total products: {len(catalog)}")
    
    # STEP 2: Sample products for real VVS calculation
    sample_size = min(50, len(catalog) * 0.05)  # 5% or 50 max
    sample_products = catalog.sample(n=int(sample_size))
    
    # STEP 3: Calculate real VVS for sample
    vvs_scores = []
    for _, product in sample_products.iterrows():
        real_vvs = calculate_vvs(  # This is expensive!
            url=product['url'],
            keyword=product['title']  # Use product title as keyword
        )
        vvs_scores.append(real_vvs)
    
    sample_products['vvs'] = vvs_scores
    
    # STEP 4: Train prediction model
    features = [
        'title_length',           # Length of product title
        'description_length',     # Length of description
        'has_images',             # Has product images?
        'num_reviews',            # Number of reviews
        'price',                  # Product price
        'category_depth',         # How many categories?
        'has_size_chart',         # Has size/fit info?
        'has_shipping_info',      # Has shipping details?
    ]
    
    X_train = sample_products[features]
    y_train = sample_products['vvs']
    
    model = RandomForestRegressor(n_estimators=100)
    model.fit(X_train, y_train)
    
    # STEP 5: Predict VVS for remaining products
    X_predict = catalog[features]
    catalog['predicted_vvs'] = model.predict(X_predict)
    
    # STEP 6: Prioritize by opportunity
    catalog['opportunity_score'] = (
        (70 - catalog['predicted_vvs']) *  # Gap to target VVS
        catalog['monthly_page_views']       # Traffic potential
    )
    
    # STEP 7: Export prioritized list
    catalog_sorted = catalog.sort_values('opportunity_score', ascending=False)
    catalog_sorted.to_csv('products_prioritized.csv', index=False)
    
    print("\n=== Prediction Results ===")
    print(f"Sample VVS calculated: {len(sample_products)}")
    print(f"Products predicted: {len(catalog) - len(sample_products)}")
    print(f"Average predicted VVS: {catalog['predicted_vvs'].mean():.1f}")
    print(f"Products below target (<70): {len(catalog[catalog['predicted_vvs'] < 70])}")
    
    return catalog_sorted

# Usage:
prioritized_catalog = predict_product_vvs('shopify_products_export.csv')
```

**Prioritization Framework**

```
High Priority (Optimize first):
□ Predicted VVS <60 + Monthly views >100
□ Best sellers with VVS <70
□ New arrivals (no historical VVS data)

Medium Priority:
□ Predicted VVS 60-69 + Monthly views 50-100
□ Category pages (hub pages)
□ Collection pages

Low Priority:
□ Predicted VVS >70 (already good)
□ Low traffic products (<10 views/month)
□ Discontinued products
```

#### **Week 5-6: Programmatic Content Generation**

**Product-Specific FAQ Generation**

```python
# Automated FAQ generation for products

import anthropic

def generate_product_faq(product_data):
    """
    Generate SEO-optimized FAQ for a product
    using Claude API
    """
    
    client = anthropic.Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))
    
    prompt = f"""
    Generate 5 frequently asked questions and answers for this product:
    
    Product Name: {product_data['title']}
    Category: {product_data['category']}
    Price: ${product_data['price']}
    Description: {product_data['description']}
    
    The FAQs should address:
    1. Shipping and delivery
    2. Returns and exchanges
    3. Product fit/sizing (if apparel)
    4. Product compatibility (if tech)
    5. Care instructions or warranty
    
    Format as JSON array with 'question' and 'answer' fields.
    Keep answers concise (2-3 sentences).
    """
    
    message = client.messages.create(
        model="claude-sonnet-4-5-20250929",
        max_tokens=1000,
        messages=[
            {"role": "user", "content": prompt}
        ]
    )
    
    faq_json = message.content[0].text
    return json.loads(faq_json)

# Process products in batches
for product in prioritized_products[:100]:  # Top 100 first
    faq = generate_product_faq(product)
    
    # Store in Shopify metafield
    update_shopify_metafield(
        product_id=product['id'],
        namespace='aso',
        key='faq',
        value=json.dumps(faq),
        type='json'
    )
    
    print(f"✓ Generated FAQ for: {product['title']}")
```

**Shopify Metafield Integration**

```javascript
// scripts/bulk-update-metafields.js
// Shopify Admin API integration

const Shopify = require('shopify-api-node');

const shopify = new Shopify({
  shopName: process.env.SHOPIFY_SHOP_NAME,
  apiKey: process.env.SHOPIFY_API_KEY,
  password: process.env.SHOPIFY_PASSWORD,
});

async function bulkUpdateProductMetafields(csvFile) {
  const products = await readCSV(csvFile);
  
  for (const product of products) {
    try {
      // Update FAQ metafield
      await shopify.metafield.create({
        key: 'faq',
        value: product.faq,
        type: 'json',
        namespace: 'aso',
        owner_id: product.id,
        owner_resource: 'product',
      });
      
      // Update shipping info metafield
      await shopify.metafield.create({
        key: 'shipping_info',
        value: product.shipping_info,
        type: 'single_line_text_field',
        namespace: 'aso',
        owner_id: product.id,
        owner_resource: 'product',
      });
      
      console.log(`✓ Updated metafields for: ${product.title}`);
    } catch (error) {
      console.error(`✗ Failed for ${product.title}:`, error.message);
    }
  }
}

bulkUpdateProductMetafields('./products_with_faqs.csv');
```

#### **Week 7-8: Category & Collection Optimization**

**Category Page VVS Optimization**

```
Category pages are hub pages - highest ROI.

Example: /collections/mens-running-shoes

Current VVS: 55 (weak)
Target VVS: 75

Missing Clusters:
- "Buying guide" (what to look for)
- "Size/fit guidance"
- "Popular brands comparison"
- "Customer favorites"

Enhancement Plan:
1. Add buying guide section (500 words)
2. Add size finder tool (interactive)
3. Add brand comparison table
4. Add "Top Rated" product carousel
5. Add FAQ schema

Expected VVS: 78
Expected Rank Improvement: +5-8 positions
Traffic Impact: +40% (category pages drive 30% of site traffic)
```

**Collection Page Template (Shopify)**

```liquid
{%- comment -%}
ASO-Enhanced Collection Template
{%- endcomment -%}

<div class="collection-page">
  <h1>{{ collection.title }}</h1>
  
  <!-- Original product grid -->
  <div class="product-grid">
    {% for product in collection.products %}
      {% render 'product-card', product: product %}
    {% endfor %}
  </div>
  
  <!-- ASO ENHANCEMENT: Buying Guide -->
  {% if collection.metafields.aso.buying_guide %}
    <div class="buying-guide">
      <h2>{{ collection.title }} Buying Guide</h2>
      {{ collection.metafields.aso.buying_guide }}
    </div>
  {% endif %}
  
  <!-- ASO ENHANCEMENT: Size Guide -->
  {% if collection.metafields.aso.size_guide %}
    <div class="size-guide">
      <h2>Find Your Perfect Fit</h2>
      {{ collection.metafields.aso.size_guide }}
    </div>
  {% endif %}
  
  <!-- ASO ENHANCEMENT: FAQ -->
  {% if collection.metafields.aso.faq %}
    <div class="collection-faq">
      <h2>Frequently Asked Questions</h2>
      {% for faq in collection.metafields.aso.faq.value %}
        <div>
          <h3>{{ faq.question }}</h3>
          <p>{{ faq.answer }}</p>
        </div>
      {% endfor %}
    </div>
  {% endif %}
  
  <!-- ASO ENHANCEMENT: Collection Schema -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "{{ collection.title }}",
    "description": "{{ collection.description | strip_html | truncate: 200 }}",
    "url": "{{ shop.url }}{{ collection.url }}"
  }
  </script>
</div>
```

#### **Week 9-10: Automation & Monitoring**

**Automated VVS Monitoring**

```python
# Daily VVS monitoring script
# Run via cron job or scheduled task

import schedule
import time

def daily_vvs_check():
    """
    Check VVS scores for top products daily
    Alert if drops detected
    """
    
    # Get top 100 products by traffic
    top_products = get_top_products_by_traffic(limit=100)
    
    alerts = []
    
    for product in top_products:
        # Get historical VVS
        historical_vvs = get_vvs_history(product['id'])
        last_vvs = historical_vvs[-1] if historical_vvs else None
        
        # Calculate current VVS
        current_vvs = calculate_vvs(product['url'], product['title'])
        
        # Store new VVS
        store_vvs_score(product['id'], current_vvs)
        
        # Check for drops
        if last_vvs and current_vvs < last_vvs - 5:
            alerts.append({
                'product': product['title'],
                'url': product['url'],
                'old_vvs': last_vvs,
                'new_vvs': current_vvs,
                'delta': current_vvs - last_vvs
            })
    
    # Send alerts if any
    if alerts:
        send_slack_alert(alerts)
        send_email_alert(alerts)
    
    print(f"✓ Daily check complete. {len(alerts)} alerts sent.")

# Schedule daily at 6 AM
schedule.every().day.at("06:00").do(daily_vvs_check)

while True:
    schedule.run_pending()
    time.sleep(3600)  # Check every hour
```

**Bulk Optimization Dashboard**

```python
# Simple CLI dashboard for tracking progress

def show_optimization_dashboard():
    """
    Display current optimization status
    """
    
    catalog = load_catalog()
    
    total_products = len(catalog)
    optimized = len(catalog[catalog['vvs'] >= 70])
    in_progress = len(catalog[(catalog['vvs'] >= 60) & (catalog['vvs'] < 70)])
    needs_work = len(catalog[catalog['vvs'] < 60])
    
    avg_vvs = catalog['vvs'].mean()
    
    print("\n" + "="*50)
    print("E-COMMERCE VVS OPTIMIZATION DASHBOARD")
    print("="*50)
    print(f"\nTotal Products: {total_products}")
    print(f"Average VVS: {avg_vvs:.1f}\n")
    
    print("Status Breakdown:")
    print(f"  ✓ Optimized (VVS ≥70):     {optimized:>5} ({optimized/total_products*100:.1f}%)")
    print(f"  ⚡ In Progress (VVS 60-69): {in_progress:>5} ({in_progress/total_products*100:.1f}%)")
    print(f"  ⚠  Needs Work (VVS <60):    {needs_work:>5} ({needs_work/total_products*100:.1f}%)")
    
    print("\nTop 5 Performers:")
    top_5 = catalog.nlargest(5, 'vvs')[['title', 'vvs', 'monthly_views']]
    print(top_5.to_string(index=False))
    
    print("\nTop 5 Opportunities (High traffic + Low VVS):")
    opportunities = catalog.nlargest(5, 'opportunity_score')[['title', 'vvs', 'monthly_views']]
    print(opportunities.to_string(index=False))
    
    print("\n" + "="*50 + "\n")

# Run weekly
show_optimization_dashboard()
```

### Deliverables Summary

**Client Receives:**
1. Optimized product template (all products improved)
2. Predictive VVS model (prioritization without full audit)
3. Automated FAQ generation (top 100-500 products)
4. Category/collection page optimization
5. Daily VVS monitoring script
6. Bulk optimization dashboard

**ASO Platform Data:**
1. Template-level VVS tracking
2. Product performance analytics
3. Category optimization insights
4. Automated alert system

### Pricing Recommendation

**One-Time Setup:** $8,000-$18,000
- Template optimization
- Predictive VVS model setup
- Bulk content generation (100-500 products)
- Category/collection optimization
- Monitoring automation

**Ongoing:** ASO Platform Tier 2-3 ($349-$1,500/mo)
- Scale-based pricing:
  - <500 products: Tier 2 ($349/mo)
  - 500-2,000 products: Tier 2+ ($499/mo)
  - 2,000+ products: Tier 3 ($1,500+/mo)
- Continuous monitoring
- Monthly optimization batches
- Priority support

---

## Universal Safety Protocols

### The "Revert Button" Requirement

**Every optimization must be reversible within 24 hours.**

```
Implementation:

WordPress:
□ Use built-in revision system
□ Before optimization: Create manual backup
□ After optimization: Test revert procedure

Custom Sites (Git):
□ Create feature branch for optimizations
□ Keep branch open for 30 days post-deploy
□ Tag releases: optimization-YYYY-MM-DD

CMS Platforms:
□ Export content before optimization
□ Document all changes in spreadsheet
□ Keep rollback instructions handy

E-commerce:
□ Export product data before bulk updates
□ Test revert on 5 products first
□ Stagger rollout (50 products/day)
```

### Monitoring Protocols

**Daily Monitoring (First 30 Days)**

```
MUST CHECK DAILY:
□ Top 10 ranking keywords (position changes)
□ VVS scores (all optimized pages)
□ Organic traffic (Google Analytics)
□ Crawl errors (Google Search Console)

IF ANY OF THESE OCCUR:
⚠ Ranking drop >5 positions → Investigate within 4 hours
⚠ VVS drop >10 points → Review content changes immediately
⚠ Traffic drop >20% → Emergency review
⚠ Crawl errors spike → Fix technical issues ASAP
```

**Weekly Monitoring (Days 31-90)**

```
WEEKLY REVIEW:
□ Rank progression (all tracked keywords)
□ VVS trends (look for patterns)
□ Traffic analysis (compare to baseline)
□ Conversion rate (did optimizations help?)

MONTHLY REPORTING:
□ VVS improvement summary
□ Ranking wins/losses
□ Traffic impact
□ ROI calculation
```

### The "Red Flag" System

```
🟢 GREEN: All good
- VVS improving or stable
- Rankings improving or stable (±2 positions)
- Traffic increasing
→ Action: Continue optimization plan

🟡 YELLOW: Monitor closely
- VVS flat for 14+ days
- Rankings fluctuating ±3-5 positions
- Traffic flat
→ Action: Increase optimization frequency, test new approaches

🔴 RED: Immediate action required
- VVS dropping >10 points
- Rankings dropping >5 positions
- Traffic dropping >20%
→ Action: Pause optimizations, investigate root cause, consider revert

⚫ BLACK: Emergency
- Multiple pages ranking drops
- Sitewide traffic drop >40%
- Google penalty suspected
→ Action: Full stop, emergency review, potential full revert
```

---

## Troubleshooting Guide

### Common Issues & Solutions

#### Issue: VVS Improved But Rank Dropped

**Diagnosis:**
```
Possible causes:
1. Google needs time to re-crawl (most common)
2. Algorithm update coincidence
3. Competitor improvement
4. Technical issue (page speed, mobile, etc.)
```

**Solution:**
```
STEP 1: Check Google Search Console
- Request reindexing
- Check for crawl errors
- Verify mobile usability

STEP 2: Wait 30 days
- VVS improvements take time to reflect in rankings
- Monitor weekly, don't panic

STEP 3: If still down after 30 days
- Analyze what changed on competitor sites
- Consider additional on-page optimizations
- Check for technical SEO issues
```

#### Issue: VVS Dropped After Optimization

**Diagnosis:**
```
This should NEVER happen if following protocol.
Likely causes:
1. VVS calculation error (re-run to verify)
2. Content accidentally removed
3. Technical issue (broken schema, etc.)
```

**Solution:**
```
IMMEDIATE ACTION:
1. Recalculate VVS to confirm drop
2. Compare old vs new content (side-by-side)
3. If confirmed drop → REVERT immediately
4. Investigate what went wrong
5. Fix and re-optimize
```

#### Issue: Bulk Optimization Caused Traffic Drop

**Diagnosis:**
```
Causes:
1. Too many pages changed at once (Google confused)
2. Content quality issues
3. Technical problems at scale
```

**Solution:**
```
STEP 1: Identify affected pages
- Which pages lost traffic?
- What was changed on those pages?

STEP 2: Selective revert
- Revert top 10 traffic drivers immediately
- Keep optimizations on low-traffic pages (test)

STEP 3: Stagger future rollouts
- Never optimize >50 pages in one day
- Allow 7-day monitoring between batches
```

---

## Success Metrics

### Scenario-Specific KPIs

**Greenfield (Scenario 1):**
```
Week 4:  80%+ pages indexed
Week 8:  3+ keywords in top 100
Week 12: 1+ keyword in top 50
         100+ organic sessions/month
         Average VVS >70
```

**Legacy Rebuild (Scenario 2):**
```
Week 8:  95%+ preservation targets maintain rank
Week 12: Average VVS improved 10+ points
         Traffic within 90-110% of baseline
         Zero 404 errors
```

**Modern CMS (Scenario 3):**
```
Week 4:  10 pages optimized, VVS +10 avg
Week 8:  25 pages optimized, 5+ rank improvements
Week 12: Traffic increase 15-25%
         Average VVS >70 on optimized pages
```

**Custom/Enterprise (Scenario 4):**
```
Week 4:  API integrated, baseline established
Week 8:  5+ PRs merged, VVS dashboard live
Week 12: CI/CD VVS checks running
         Team trained and autonomous
```

**E-commerce (Scenario 5):**
```
Week 6:  Template optimized, all products +10 VVS
Week 10: Top 100 products individually optimized
Week 12: Category pages VVS >75
         Traffic increase 20-30%
```

### Universal Success Criteria

**ALL scenarios must achieve:**

```
✓ No ranking drops >5 positions (top 20 keywords)
✓ VVS improvement on 80%+ of optimized pages
✓ Zero technical SEO errors
✓ Client satisfaction score >4/5
✓ Traffic impact positive or neutral (never negative)
```

---

## Appendix: Tools & Resources

### Required Tools by Scenario

**All Scenarios:**
- ASO Platform (Tier 1-3)
- Google Search Console
- Google Analytics 4

**Scenario 1 (Greenfield):**
- Website builder (Webflow, Next.js, or WordPress)
- Schema markup validator
- PageSpeed Insights

**Scenario 2 (Legacy Rebuild):**
- Screaming Frog (crawling)
- Redirect management tool
- Backup/version control

**Scenario 3 (Modern CMS):**
- CMS-specific plugins (Yoast, RankMath, etc.)
- Schema plugins
- Image optimization tools

**Scenario 4 (Custom/Enterprise):**
- ASO Platform SDK
- Git/GitHub
- CI/CD platform (GitHub Actions, Jenkins, etc.)

**Scenario 5 (E-commerce):**
- Platform admin access (Shopify, WooCommerce)
- Metafield management tools
- Bulk editing tools

---

## Conclusion

This playbook provides complete implementation guidance for all five ASO Platform client scenarios. Key takeaways:

1. **Measure twice, optimize once** - Always calculate VVS before and after
2. **Safety first** - Protect existing rankings, gradual rollout
3. **Scale appropriately** - Greenfield gets full rebuild, CMS gets overlay
4. **Developer partnership** - Custom sites need API-first approach
5. **Template thinking** - E-commerce optimizes at scale via templates

**Next Steps:**
1. Classify your client using the decision tree
2. Follow the week-by-week implementation plan
3. Monitor using the safety protocols
4. Report success using scenario-specific KPIs

For questions or edge cases not covered here, escalate to ASO Platform team.

---

**Document End**

*Last Updated: December 31, 2025*  
*Version: 1.0*  
*Owner: ClearForge Technologies*
