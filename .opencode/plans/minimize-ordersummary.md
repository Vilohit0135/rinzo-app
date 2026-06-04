# Minimize OrderSummaryScreen

## 3 edits to `src/screens/OrderSummary/OrderSummaryScreen.tsx`

### Edit 1 — Header + Summary card block (lines 128-195)
Replace from `scrollContent` through `addressCard`:

| Change | Old | New |
|--------|-----|-----|
| scrollContent pb | 120 | 100 |
| header pt | 24 | 16 |
| backButton w/h/br | 44×44/22 | 40×40/20 |
| headerTitle fs | 22 | 18 |
| sectionTitle fs/mt/mb | 18/24/16 | 16/18/12 |
| summaryCard br/pv/ph | 24/20/24 | 20/16/20 |
| summaryRow h | 48 | 40 |
| summaryLabel fs | 18 | 15 |
| summaryPrice fs | 16 | 14 |
| summaryDivider mv | 4 | 3 |
| addressCard mt/br/pd | 18/20/18 | 14/16/14 |

### Edit 2 — Address + Pricing block (lines 211-280)
Replace from `addressTitle` through `pricingDiscount`:

| Change | Old | New |
|--------|-----|-----|
| addressTitle fs | 18 | 15 |
| changeText fs | 16 | 14 |
| addressText fs/mt/lineH | 14/6/20 | 13/4/18 |
| addressDivider mv | 14 | 10 |
| timeLabel fs | 18 | 15 |
| timeText fs/mt | 14/4 | 13/3 |
| pricingCard mt/br/pv/ph | 18/20/6/16 | 14/16/4/14 |
| pricingRow h | 42 | 36 |
| pricingLabel/value fs | 16 | 14 |
| pricingDiscount fs | 16 | 14 |

### Edit 3 — Total + Proceed block (lines 285-311)
Replace from `pricingTotalLabel` through `proceedText`:

| Change | Old | New |
|--------|-----|-----|
| pricingTotalLabel fs | 18 | 16 |
| pricingTotalValue fs | 18 | 16 |
| proceedButton mt/h | 20/58 | 16/48 |
| proceedGradient br | 29 | 24 |
| proceedText fs | 18 | 16 |
