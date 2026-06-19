import { neon } from "@neondatabase/serverless";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env.local") });

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL not set in .env.local");
}

const sql = neon(process.env.DATABASE_URL);

const categories = [
  { name: "Serums & Treatments", slug: "serums-treatments" },
  { name: "Moisturizers", slug: "moisturizers" },
  { name: "Cleansers & Toners", slug: "cleansers-toners" },
  { name: "Masks & Exfoliants", slug: "masks-exfoliants" },
  { name: "Eye & Lip Care", slug: "eye-lip-care" },
  { name: "Body Care", slug: "body-care" },
];

const products = [
  // Serums & Treatments
  {
    name: "Éclat Vitamin C Brightening Serum",
    slug: "eclat-vitamin-c-brightening-serum",
    description:
      "A potent 15% L-ascorbic acid serum suspended in a featherweight fluid that visibly reduces dark spots and awakens a luminous, even complexion. Ferulic acid amplifies antioxidant protection while vitamin E locks in lasting moisture.",
    story:
      "Inspired by the golden light of the French Riviera, Éclat was formulated after years of research into vitamin C stability. Our proprietary encapsulation technology delivers active L-ascorbic acid deep into the dermis, where it works to neutralize free radicals and stimulate collagen synthesis. The result is the radiant, glass-skin finish that launched LUMIÈRE.",
    price: 88.0,
    category_slug: "serums-treatments",
    sku: "LUM-SER-001",
    image_path: "/images/svg/eclat-vitamin-c-serum.svg",
    seo_title: "Éclat Vitamin C Brightening Serum — LUMIÈRE",
    seo_description:
      "15% L-ascorbic acid serum with ferulic acid and vitamin E. Visibly reduces dark spots and delivers a luminous, even complexion.",
    featured: true,
  },
  {
    name: "Midnight Retinol Renewal Serum",
    slug: "midnight-retinol-renewal-serum",
    description:
      "A high-performance 0.3% retinol serum enriched with bakuchiol and peptides to smooth fine lines, refine pores, and accelerate cellular renewal — without the irritation of traditional retinol formulas.",
    story:
      "Night is when skin enters its deepest regenerative state. Midnight was created to work in harmony with your skin's natural clock — delivering encapsulated retinol that releases gradually, reducing the risk of sensitivity while maximizing renewal. Bakuchiol, a plant-derived retinol alternative, doubles the formula's efficacy.",
    price: 145.0,
    category_slug: "serums-treatments",
    sku: "LUM-SER-002",
    image_path: "/images/svg/midnight-retinol-serum.svg",
    seo_title: "Midnight Retinol Renewal Serum — LUMIÈRE",
    seo_description:
      "0.3% encapsulated retinol with bakuchiol and peptides. Smooth fine lines and refine pores overnight without irritation.",
    featured: true,
  },
  {
    name: "Aqua Plump Hyaluronic Serum",
    slug: "aqua-plump-hyaluronic-serum",
    description:
      "Triple-weight hyaluronic acid delivers hydration at every layer of the skin — from the surface to the deepest dermis — for an immediate plumping effect that persists through the day.",
    story:
      "Water is life. Aqua Plump was born from the belief that true hydration is multi-dimensional. By combining three molecular weights of hyaluronic acid — macro, standard, and micro — alongside marine-derived collagen boosters, this serum creates a cascading moisture system that visibly fills and firms within 28 days.",
    price: 72.0,
    category_slug: "serums-treatments",
    sku: "LUM-SER-003",
    image_path: "/images/svg/aqua-plump-serum.svg",
    seo_title: "Aqua Plump Hyaluronic Serum — LUMIÈRE",
    seo_description:
      "Triple-weight hyaluronic acid serum for deep, lasting hydration. Visibly plumps and firms skin from surface to dermis.",
    featured: false,
  },
  {
    name: "Pore Refine Niacinamide Serum",
    slug: "pore-refine-niacinamide-serum",
    description:
      "10% niacinamide and zinc PCA work synergistically to minimize the appearance of pores, control excess sebum, and fade post-blemish marks — revealing a smoother, more balanced complexion.",
    story:
      "Designed for those who want precision without compromise, Pore Refine targets the root causes of congested, uneven skin. Niacinamide strengthens the skin barrier while zinc regulates oil production. Together, they create the conditions for skin that looks refined, balanced, and clear.",
    price: 65.0,
    category_slug: "serums-treatments",
    sku: "LUM-SER-004",
    image_path: "/images/svg/pore-refine-serum.svg",
    seo_title: "Pore Refine Niacinamide Serum — LUMIÈRE",
    seo_description:
      "10% niacinamide + zinc PCA serum that minimizes pores, controls sebum, and fades marks for a balanced complexion.",
    featured: false,
  },
  {
    name: "Velvet Peptide Firming Serum",
    slug: "velvet-peptide-firming-serum",
    description:
      "Six clinically studied peptides combine to stimulate collagen and elastin production, visibly lifting and firming the skin over time. The velvet-finish formula absorbs instantly, leaving no residue.",
    story:
      "Aging gracefully starts with the right scaffolding. Velvet was formulated around a proprietary peptide complex — Hexapeptide-3, Matrixyl 3000, and Argireline — that signals the skin to rebuild lost structural proteins. After 12 weeks, clinical studies showed a 31% improvement in skin firmness and a 28% reduction in the appearance of deep wrinkles.",
    price: 125.0,
    category_slug: "serums-treatments",
    sku: "LUM-SER-005",
    image_path: "/images/svg/velvet-peptide-serum.svg",
    seo_title: "Velvet Peptide Firming Serum — LUMIÈRE",
    seo_description:
      "Six-peptide complex serum that stimulates collagen and elastin for visibly firmer, lifted skin. Clinically proven results.",
    featured: false,
  },
  {
    name: "Bakuchiol Gentle Youth Serum",
    slug: "bakuchiol-gentle-youth-serum",
    description:
      "A plant-powered retinol alternative derived from Psoralea corylifolia seeds, delivering cellular renewal and anti-aging benefits without sensitivity, redness, or irritation. Suitable for all skin types, including sensitive.",
    story:
      "Bakuchiol has been used in Ayurvedic medicine for centuries. We spent three years perfecting its extraction and concentration to match the efficacy of 0.5% retinol — with none of the drawbacks. Perfect for those new to active skincare or those whose skin cannot tolerate traditional retinoids.",
    price: 95.0,
    category_slug: "serums-treatments",
    sku: "LUM-SER-006",
    image_path: "/images/svg/bakuchiol-serum.svg",
    seo_title: "Bakuchiol Gentle Youth Serum — LUMIÈRE",
    seo_description:
      "Plant-powered retinol alternative with zero irritation. Gentle cellular renewal for all skin types, including sensitive.",
    featured: false,
  },
  {
    name: "Rosehip Radiance Facial Oil",
    slug: "rosehip-radiance-facial-oil",
    description:
      "Cold-pressed rosehip seed oil rich in trans-retinoic acid, omega-3, and omega-6 fatty acids that nourishes, brightens, and repairs the skin barrier. Non-comedogenic and absorbs quickly without greasiness.",
    story:
      "From the wild rose fields of Chile comes the world's most prized facial oil. LUMIÈRE sources only first-press rosehip seeds, preserving the highest concentration of retinoids and essential fatty acids. A single drop transforms the skin's texture and tone, working overnight to repair sun damage and restore a youthful glow.",
    price: 78.0,
    category_slug: "serums-treatments",
    sku: "LUM-SER-007",
    image_path: "/images/svg/rosehip-facial-oil.svg",
    seo_title: "Rosehip Radiance Facial Oil — LUMIÈRE",
    seo_description:
      "Cold-pressed Chilean rosehip oil rich in retinoids and fatty acids. Nourishes, brightens, and repairs the skin barrier.",
    featured: true,
  },
  // Moisturizers
  {
    name: "Rich Barrier Repair Cream",
    slug: "rich-barrier-repair-cream",
    description:
      "An intensely nourishing cream formulated with ceramides, cholesterol, and fatty acids in the precise ratio found in healthy skin to restore, reinforce, and protect the skin's natural barrier.",
    story:
      "The skin barrier is your body's first line of defence — and the foundation of all great skincare. Rich Barrier was designed for those whose barriers have been compromised by over-exfoliation, harsh climates, or medical treatments. Its ceramide-rich formula mimics the skin's own lipid matrix, restoring comfort, elasticity, and resilience in as little as three days.",
    price: 115.0,
    category_slug: "moisturizers",
    sku: "LUM-MOI-001",
    image_path: "/images/svg/rich-barrier-cream.svg",
    seo_title: "Rich Barrier Repair Cream — LUMIÈRE",
    seo_description:
      "Ceramide-rich barrier repair cream that restores and protects compromised skin. Intensely nourishing and soothing.",
    featured: false,
  },
  {
    name: "Weightless Daily Hydrator",
    slug: "weightless-daily-hydrator",
    description:
      "An oil-free, gel-cream moisturizer that delivers 72 hours of continuous hydration through a time-release moisture complex. Lightweight enough for oily skin, effective enough for all skin types.",
    story:
      "Hydration shouldn't come at the cost of comfort. Weightless was created for those who find traditional moisturizers too heavy — particularly those with combination or oily skin. Its non-comedogenic gel-cream texture delivers a burst of moisture on application, then quietly releases hydration throughout the day.",
    price: 68.0,
    category_slug: "moisturizers",
    sku: "LUM-MOI-002",
    image_path: "/images/svg/weightless-hydrator.svg",
    seo_title: "Weightless Daily Hydrator — LUMIÈRE",
    seo_description:
      "Oil-free gel-cream with 72-hour moisture release. Lightweight hydration for oily, combination, and all skin types.",
    featured: true,
  },
  {
    name: "Nocturne Night Recovery Cream",
    slug: "nocturne-night-recovery-cream",
    description:
      "A rich overnight treatment combining retinol, bakuchiol, and plant stem cells to accelerate cellular turnover, reduce wrinkles, and restore a plump, rested complexion while you sleep.",
    story:
      "Between 11pm and 4am, skin's regenerative processes peak. Nocturne was timed to this biological rhythm — a rich balm that works in concert with your body's own renewal mechanisms, delivering high-impact actives exactly when skin is most receptive. Wake to skin that looks genuinely rested, not just moisturized.",
    price: 128.0,
    category_slug: "moisturizers",
    sku: "LUM-MOI-003",
    image_path: "/images/svg/nocturne-night-cream.svg",
    seo_title: "Nocturne Night Recovery Cream — LUMIÈRE",
    seo_description:
      "Overnight retinol and plant stem cell cream that accelerates renewal. Wake to plump, rested skin with reduced wrinkles.",
    featured: false,
  },
  {
    name: "Soothe & Calm Oat Moisturizer",
    slug: "soothe-and-calm-oat-moisturizer",
    description:
      "A dermatologist-developed formula featuring colloidal oatmeal, centella asiatica, and allantoin to calm redness, relieve irritation, and fortify sensitive skin — without fragrance or common allergens.",
    story:
      "Reactive skin deserves luxury too. Soothe & Calm was developed in response to the thousands of LUMIÈRE customers who asked for a formula gentle enough for rosacea, eczema, and post-procedure skin — without sacrificing texture or efficacy. Free from 20 known sensitizers, this is skincare without compromise.",
    price: 62.0,
    category_slug: "moisturizers",
    sku: "LUM-MOI-004",
    image_path: "/images/svg/soothe-calm-moisturizer.svg",
    seo_title: "Soothe & Calm Oat Moisturizer — LUMIÈRE",
    seo_description:
      "Fragrance-free oat moisturizer for sensitive skin. Colloidal oatmeal and centella asiatica calm redness and irritation.",
    featured: false,
  },
  {
    name: "Lumière Shield SPF 50 Day Cream",
    slug: "lumiere-shield-spf-50-day-cream",
    description:
      "Broad-spectrum SPF 50 PA+++ protection fused with a lightweight, hydrating day cream that leaves no white cast. Antioxidant-rich and skin-identical — the last step your morning routine needs.",
    story:
      "Sun protection is the single most effective anti-aging intervention. Lumière Shield was created because we were frustrated with SPFs that felt heavy, left white casts, or needed to be layered over multiple products. This is your SPF, primer, and moisturizer in one — invisible, comfortable, and clinically proven to prevent UV damage.",
    price: 85.0,
    category_slug: "moisturizers",
    sku: "LUM-MOI-005",
    image_path: "/images/svg/shield-spf-day-cream.svg",
    seo_title: "Lumière Shield SPF 50 Day Cream — LUMIÈRE",
    seo_description:
      "SPF 50 PA+++ broad-spectrum day cream with no white cast. Antioxidant hydration and UV protection in one step.",
    featured: false,
  },
  // Cleansers & Toners
  {
    name: "Gentle Micellar Cleanser",
    slug: "gentle-micellar-cleanser",
    description:
      "Magnetic micelles capture and dissolve makeup, SPF, and impurities without stripping the skin's natural moisture. A no-rinse formula that leaves the skin perfectly clean and immediately comfortable.",
    story:
      "Cleansing should never come at the cost of comfort. Gentle Micellar was formulated for those who double-cleanse, wear heavy makeup, or simply want an effortless end to their day. Its cotton-blossom-infused formula removes even waterproof mascara with a gentle press of a cotton pad.",
    price: 45.0,
    category_slug: "cleansers-toners",
    sku: "LUM-CLN-001",
    image_path: "/images/svg/micellar-cleanser.svg",
    seo_title: "Gentle Micellar Cleanser — LUMIÈRE",
    seo_description:
      "No-rinse micellar water that removes makeup, SPF, and impurities. Gentle, comfortable, and non-stripping for all skin types.",
    featured: false,
  },
  {
    name: "Balancing Gel Foaming Cleanser",
    slug: "balancing-gel-foaming-cleanser",
    description:
      "A pH-balanced gel cleanser that transforms into a silky foam to thoroughly cleanse pores, control oil, and maintain the skin's natural moisture barrier — leaving it fresh but never tight.",
    story:
      "The first step of your ritual sets the tone for everything that follows. Balancing Gel was developed to cleanse without disruption — removing the day's pollution and buildup while actively supporting the skin's pH and microbiome. Its prebiotic complex leaves your barrier healthier after every wash.",
    price: 52.0,
    category_slug: "cleansers-toners",
    sku: "LUM-CLN-002",
    image_path: "/images/svg/gel-foaming-cleanser.svg",
    seo_title: "Balancing Gel Foaming Cleanser — LUMIÈRE",
    seo_description:
      "pH-balanced gel-to-foam cleanser with prebiotic complex. Thorough cleansing that preserves the skin's natural moisture barrier.",
    featured: false,
  },
  {
    name: "Rose Water Balancing Toner",
    slug: "rose-water-balancing-toner",
    description:
      "Pure Bulgarian rose water blended with niacinamide and hyaluronic acid to hydrate, tone, and prep skin for the rest of your ritual — in a single, aromatic step.",
    story:
      "Rose has been used in skincare since ancient Rome. LUMIÈRE sources its rose water directly from the Valley of Roses in Bulgaria, where the Damascena rose blooms for just six weeks a year and is harvested by hand at dawn. This is skincare as sensory ritual — and it happens to be highly effective.",
    price: 48.0,
    category_slug: "cleansers-toners",
    sku: "LUM-TON-001",
    image_path: "/images/svg/rose-water-toner.svg",
    seo_title: "Rose Water Balancing Toner — LUMIÈRE",
    seo_description:
      "Bulgarian rose water toner with niacinamide and hyaluronic acid. Hydrates, tones, and prepares skin for serums.",
    featured: false,
  },
  {
    name: "Glow Reveal AHA Toner",
    slug: "glow-reveal-aha-toner",
    description:
      "A gentle 7% glycolic acid toner with lactic acid and PHAs that resurfaces dull skin, improves texture, and brightens tone without over-stripping. Use nightly for a continuous glow.",
    story:
      "Chemical exfoliation is the fastest route to luminous skin — but only when done right. Glow Reveal was formulated to maximize results while protecting the skin barrier. Its multi-acid blend dissolves dead skin cells at different depths, revealing fresh, radiant skin underneath. The addition of PHA creates a gentle humectant effect that counterbalances the exfoliation.",
    price: 65.0,
    category_slug: "cleansers-toners",
    sku: "LUM-TON-002",
    image_path: "/images/svg/aha-glow-toner.svg",
    seo_title: "Glow Reveal AHA Toner — LUMIÈRE",
    seo_description:
      "7% glycolic acid toner with lactic acid and PHAs for gentle resurfacing. Reveals brighter, smoother skin overnight.",
    featured: false,
  },
  {
    name: "Chamomile Comfort Cleansing Balm",
    slug: "chamomile-comfort-cleansing-balm",
    description:
      "A rich, aromatic cleansing balm that melts on contact with skin, dissolving even long-wear makeup and SPF, then emulsifies with water for a rinse that leaves the skin nourished and soothed.",
    story:
      "The cleansing balm is one of the great luxuries of skincare. Chamomile Comfort was designed to make the daily act of removing makeup feel ceremonial. Infused with chamomile extract, sweet almond oil, and vitamin E, it cleanses deeply while delivering active nourishment — leaving skin smoother after every use.",
    price: 58.0,
    category_slug: "cleansers-toners",
    sku: "LUM-CLN-003",
    image_path: "/images/svg/chamomile-cleansing-balm.svg",
    seo_title: "Chamomile Comfort Cleansing Balm — LUMIÈRE",
    seo_description:
      "Chamomile and sweet almond oil cleansing balm that dissolves makeup. Emulsifies with water for a nourishing, soothing cleanse.",
    featured: false,
  },
  // Masks & Exfoliants
  {
    name: "White Kaolin Purifying Mask",
    slug: "white-kaolin-purifying-mask",
    description:
      "A refined clay mask combining white kaolin, French green clay, and activated charcoal to deeply purify pores, absorb excess oil, and refine skin texture — without over-drying.",
    story:
      "Clay masking is an ancient ritual elevated by modern science. White Kaolin combines two rare, mineral-rich clays at precise ratios to deliver a controlled cleanse — drawing out impurities without disrupting the skin's moisture balance. Added aloe vera and glycerin ensure even oily skin is left hydrated, not stripped.",
    price: 72.0,
    category_slug: "masks-exfoliants",
    sku: "LUM-MSK-001",
    image_path: "/images/svg/kaolin-purifying-mask.svg",
    seo_title: "White Kaolin Purifying Mask — LUMIÈRE",
    seo_description:
      "White kaolin and green clay mask with activated charcoal. Deep pore purification without over-drying.",
    featured: false,
  },
  {
    name: "Luminous Overnight Sleep Mask",
    slug: "luminous-overnight-sleep-mask",
    description:
      "A luxurious leave-on night mask featuring snow mushroom extract, sea buckthorn, and peptides to intensively hydrate, plump, and renew skin while you sleep. Wake to your most radiant skin.",
    story:
      "Beauty sleep is real — and Luminous is the amplifier. This sleep mask was designed to be the final step in your evening ritual: a cocoon of actives that seals in all your serums, delivers its own powerful dose of hydration, and works in concert with skin's nighttime regeneration. Snow mushroom holds 500x its weight in water. Sea buckthorn is nature's most potent beta-carotene source.",
    price: 88.0,
    category_slug: "masks-exfoliants",
    sku: "LUM-MSK-002",
    image_path: "/images/svg/luminous-sleep-mask.svg",
    seo_title: "Luminous Overnight Sleep Mask — LUMIÈRE",
    seo_description:
      "Leave-on sleep mask with snow mushroom, sea buckthorn, and peptides. Intensively hydrates and renews skin overnight.",
    featured: false,
  },
  {
    name: "C-Bright Glow Vitamin Mask",
    slug: "c-bright-glow-vitamin-mask",
    description:
      "A vitamin C-packed brightening treatment mask featuring 20% vitamin C complex, turmeric, and kojic acid that visibly reduces hyperpigmentation, evens tone, and delivers an instant lit-from-within glow.",
    story:
      "For those who want visible results fast, C-Bright delivers. This treatment mask works in just 15 minutes, using a tri-vitamin C complex that penetrates at multiple skin depths. Turmeric provides additional anti-inflammatory benefits, while kojic acid targets melanin production at its source. Part of your weekly brightening ritual.",
    price: 75.0,
    category_slug: "masks-exfoliants",
    sku: "LUM-MSK-003",
    image_path: "/images/svg/c-bright-mask.svg",
    seo_title: "C-Bright Glow Vitamin Mask — LUMIÈRE",
    seo_description:
      "20% vitamin C complex brightening mask with turmeric and kojic acid. Visible glow in 15 minutes, fade hyperpigmentation over time.",
    featured: false,
  },
  {
    name: "Cryogenic Hydrogel Eye Patches",
    slug: "cryogenic-hydrogel-eye-patches",
    description:
      "Cooling hydrogel eye patches infused with caffeine, peptides, and retinol that visibly reduce puffiness, dark circles, and fine lines in just 20 minutes. Sold in sets of 5 pairs.",
    story:
      "The eyes tell the truth about your sleep and your years. Cryogenic patches were developed for those who need a visible, fast fix — before an event, after a long flight, or simply as a weekly indulgence. The cryo-effect reduces inflammation on contact while actives penetrate the thin eye-area skin to deliver meaningful, lasting results.",
    price: 42.0,
    category_slug: "masks-exfoliants",
    sku: "LUM-MSK-004",
    image_path: "/images/svg/hydrogel-eye-patches.svg",
    seo_title: "Cryogenic Hydrogel Eye Patches — LUMIÈRE",
    seo_description:
      "Cooling hydrogel eye patches with caffeine, peptides, and retinol. Reduce puffiness and dark circles in 20 minutes.",
    featured: false,
  },
  {
    name: "Enzyme Brightening Powder",
    slug: "enzyme-brightening-powder",
    description:
      "A waterless enzyme exfoliant featuring papaya, bromelain, and rice bran powder that activates with water to create a gentle resurfacing treatment, revealing brighter, smoother, more refined skin.",
    story:
      "Physical scrubs tear. Chemical acids can over-sensitize. Enzyme exfoliants do neither — they dissolve dead skin cells with biological precision. Our Brightening Powder activates on contact with water, creating a luxurious paste that unclogs pores, brightens tone, and improves product absorption without any abrasion or irritation.",
    price: 68.0,
    category_slug: "masks-exfoliants",
    sku: "LUM-MSK-005",
    image_path: "/images/svg/enzyme-brightening-powder.svg",
    seo_title: "Enzyme Brightening Powder — LUMIÈRE",
    seo_description:
      "Waterless papaya and bromelain enzyme exfoliant. Activates with water to gently resurface and brighten skin.",
    featured: false,
  },
  // Eye & Lip
  {
    name: "Retinol Revive Eye Cream",
    slug: "retinol-revive-eye-cream",
    description:
      "A precisely dosed 0.1% retinol eye cream designed specifically for the delicate periorbital skin, minimizing crow's feet, dark circles, and puffiness while strengthening the skin's support structure.",
    story:
      "The eye area ages first and ages fastest — the skin here is five times thinner than the face and has fewer oil glands. Retinol Revive was calibrated to deliver the anti-aging power of retinol exactly where it's needed most, at a concentration specifically designed for eye skin. Clinical studies show a 24% reduction in crow's feet after 8 weeks.",
    price: 98.0,
    category_slug: "eye-lip-care",
    sku: "LUM-EYE-001",
    image_path: "/images/svg/retinol-eye-cream.svg",
    seo_title: "Retinol Revive Eye Cream — LUMIÈRE",
    seo_description:
      "0.1% retinol eye cream designed for delicate periorbital skin. Reduces crow's feet and dark circles with clinical precision.",
    featured: false,
  },
  {
    name: "Lift & Firm Peptide Eye Serum",
    slug: "lift-and-firm-peptide-eye-serum",
    description:
      "A concentrated peptide eye serum with a cooling stainless-steel applicator that visibly lifts the upper lid, firms the under-eye, and reduces the appearance of hooded eyes and sagging.",
    story:
      "Gravity and time work together on the eye area. Lift & Firm counteracts both. Its unique peptide matrix stimulates GABA pathways to relax expression lines, while collagen-boosting actives rebuild the structural support that keeps eyes looking bright and open. The cooling metal applicator provides lymphatic drainage on application.",
    price: 118.0,
    category_slug: "eye-lip-care",
    sku: "LUM-EYE-002",
    image_path: "/images/svg/peptide-eye-serum.svg",
    seo_title: "Lift & Firm Peptide Eye Serum — LUMIÈRE",
    seo_description:
      "Peptide eye serum with cooling metal applicator. Visibly lifts upper lids and firms under-eye for brighter, open eyes.",
    featured: false,
  },
  {
    name: "Velvet Petal Lip Treatment",
    slug: "velvet-petal-lip-treatment",
    description:
      "A nourishing lip balm-serum hybrid infused with hyaluronic acid, squalane, and rosehip that plumps, smooths, and deeply conditions lips — available in sheer rose, nude, and clear.",
    story:
      "Lips deserve the same science as the rest of your skin. Velvet Petal was designed to work on the specific anatomy of the lip — thin skin with no melanin and no oil glands, prone to dehydration and lines. Its glossy formula creates an occlusive barrier while hyaluronic acid plumps from within. A daily essential.",
    price: 38.0,
    category_slug: "eye-lip-care",
    sku: "LUM-LIP-001",
    image_path: "/images/svg/velvet-petal-lip.svg",
    seo_title: "Velvet Petal Lip Treatment — LUMIÈRE",
    seo_description:
      "Hyaluronic acid and squalane lip treatment that plumps, smooths, and deeply conditions. A daily luxury for beautiful lips.",
    featured: false,
  },
  {
    name: "Brightening Eye Contour Balm",
    slug: "brightening-eye-contour-balm",
    description:
      "A multi-tasking eye contour balm that addresses dark circles with vitamin C and niacinamide, reduces puffiness with caffeine, and deeply nourishes with shea and argan oil.",
    story:
      "Dark circles are one of the most requested skincare concerns — and one of the most complex. They're caused by melanin, visible blood vessels, and structural hollows, often in combination. Brightening Contour Balm addresses all three: vitamin C and niacinamide target pigmentation, caffeine constricts blood vessels, and rich emollients optically fill structural hollows.",
    price: 82.0,
    category_slug: "eye-lip-care",
    sku: "LUM-EYE-003",
    image_path: "/images/svg/brightening-eye-balm.svg",
    seo_title: "Brightening Eye Contour Balm — LUMIÈRE",
    seo_description:
      "Multi-action eye balm with vitamin C, niacinamide, and caffeine. Addresses dark circles, puffiness, and structural shadows.",
    featured: false,
  },
  // Body Care
  {
    name: "Shea Velour Body Cream",
    slug: "shea-velour-body-cream",
    description:
      "An indulgent full-body moisturizer combining unrefined shea butter, mango butter, and ceramides to deliver 48-hour hydration and visibly improve skin texture, softness, and elasticity.",
    story:
      "The body deserves as much attention as the face. Shea Velour was formulated with the same scientific rigor as our facial range — using only unrefined, single-origin shea butter from Ghana, combined with skin-strengthening ceramides and luxurious mango butter. Its velvet-finish formula absorbs quickly and never feels greasy.",
    price: 65.0,
    category_slug: "body-care",
    sku: "LUM-BOD-001",
    image_path: "/images/svg/shea-velour-body-cream.svg",
    seo_title: "Shea Velour Body Cream — LUMIÈRE",
    seo_description:
      "Unrefined shea butter and ceramide body cream with 48-hour hydration. Velvety, non-greasy finish for softer, smoother skin.",
    featured: false,
  },
  {
    name: "Golden Firming Body Oil",
    slug: "golden-firming-body-oil",
    description:
      "A dry body oil blended with firming actives — caffeine, retinol, and peptides — in a luxurious base of argan, marula, and sea buckthorn. Absorbs in seconds, leaving a luminous golden finish.",
    story:
      "Body oils have been used since antiquity, but Golden Firming is something new: an active treatment in a dry-oil format. Caffeine stimulates circulation and tightens the appearance of skin. Retinol improves texture and firmness over time. Argan and marula deliver antioxidant nourishment. Worn alone or under moisturizer, it transforms the daily act of body care into a ritual.",
    price: 88.0,
    category_slug: "body-care",
    sku: "LUM-BOD-002",
    image_path: "/images/svg/golden-firming-body-oil.svg",
    seo_title: "Golden Firming Body Oil — LUMIÈRE",
    seo_description:
      "Active dry body oil with caffeine, retinol, and peptides in argan and marula. Absorbs fast with a luminous golden finish.",
    featured: false,
  },
  {
    name: "Sugar Rose Exfoliating Scrub",
    slug: "sugar-rose-exfoliating-scrub",
    description:
      "A sugar-based body scrub with rose extract, jojoba beads, and vitamin E that gently buffs away dead skin cells to reveal smoother, brighter skin — and smells extraordinary.",
    story:
      "Exfoliation is the fastest way to transform the texture of your body skin. Sugar Rose uses fine cane sugar crystals and round jojoba beads that dissolve during use, ensuring a gentle but effective treatment that never scratches. Bulgarian rose extract provides anti-inflammatory benefits while vitamin E nourishes. Use twice weekly for transformative results.",
    price: 52.0,
    category_slug: "body-care",
    sku: "LUM-BOD-003",
    image_path: "/images/svg/sugar-rose-scrub.svg",
    seo_title: "Sugar Rose Exfoliating Scrub — LUMIÈRE",
    seo_description:
      "Cane sugar and jojoba bead body scrub with Bulgarian rose extract. Gently buffs to reveal smoother, brighter skin.",
    featured: false,
  },
  {
    name: "Mineral Soak Bath Salts",
    slug: "mineral-soak-bath-salts",
    description:
      "A therapeutic blend of Dead Sea minerals, Himalayan pink salt, magnesium flakes, and botanical extracts that draws out toxins, relieves muscle tension, and leaves skin deeply nourished.",
    story:
      "The bath is the original luxury ritual. Mineral Soak elevates it to a genuine treatment — one that benefits your skin, your muscles, and your nervous system simultaneously. Dead Sea minerals are clinically proven to improve skin hydration and reduce inflammation. Magnesium flakes are absorbed transdermally to relieve tension. Lavender and eucalyptus complete the sensory experience.",
    price: 42.0,
    category_slug: "body-care",
    sku: "LUM-BOD-004",
    image_path: "/images/svg/mineral-bath-salts.svg",
    seo_title: "Mineral Soak Bath Salts — LUMIÈRE",
    seo_description:
      "Dead Sea minerals, Himalayan salt, and magnesium bath salts. Therapeutic soak that nourishes skin and relieves muscle tension.",
    featured: false,
  },
];

async function seed() {
  console.log("Running schema migrations...");
  await sql`
    CREATE TABLE IF NOT EXISTS categories (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      slug VARCHAR(100) UNIQUE NOT NULL
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(200) NOT NULL,
      slug VARCHAR(200) UNIQUE NOT NULL,
      description TEXT NOT NULL,
      story TEXT NOT NULL,
      price DECIMAL(10,2) NOT NULL,
      category_id INTEGER REFERENCES categories(id),
      sku VARCHAR(50) UNIQUE NOT NULL,
      image_path VARCHAR(500),
      seo_title VARCHAR(200),
      seo_description TEXT,
      in_stock BOOLEAN DEFAULT true,
      featured BOOLEAN DEFAULT false,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      stripe_session_id VARCHAR(300) UNIQUE,
      status VARCHAR(50) DEFAULT 'pending',
      customer_email VARCHAR(200),
      total DECIMAL(10,2),
      items JSONB,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug)`;

  console.log("Seeding categories...");
  const catRows: Record<string, number> = {};
  for (const cat of categories) {
    const [row] = await sql`
      INSERT INTO categories (name, slug)
      VALUES (${cat.name}, ${cat.slug})
      ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name
      RETURNING id
    `;
    catRows[cat.slug] = row.id;
    console.log(`  - ${cat.name} (id=${row.id})`);
  }

  console.log("Seeding products...");
  for (const p of products) {
    const catId = catRows[p.category_slug];
    if (!catId) {
      console.error(`  Unknown category slug: ${p.category_slug}`);
      continue;
    }
    await sql`
      INSERT INTO products (name, slug, description, story, price, category_id, sku, image_path, seo_title, seo_description, in_stock, featured)
      VALUES (
        ${p.name}, ${p.slug}, ${p.description}, ${p.story},
        ${p.price}, ${catId}, ${p.sku}, ${p.image_path},
        ${p.seo_title}, ${p.seo_description}, true, ${p.featured}
      )
      ON CONFLICT (slug) DO UPDATE SET
        name = EXCLUDED.name,
        description = EXCLUDED.description,
        story = EXCLUDED.story,
        price = EXCLUDED.price,
        image_path = EXCLUDED.image_path,
        seo_title = EXCLUDED.seo_title,
        seo_description = EXCLUDED.seo_description,
        featured = EXCLUDED.featured
    `;
    console.log(`  - ${p.name}`);
  }

  console.log("\nSeed complete!");
  console.log(`  ${categories.length} categories`);
  console.log(`  ${products.length} products`);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
