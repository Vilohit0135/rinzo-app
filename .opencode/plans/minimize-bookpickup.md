# Minimize BookPickupScreen Components

## Changes to apply (bottom tab bar excluded)

| Component | Current | New |
|-----------|---------|-----|
| **scrollContent** pb | 120 | 100 |
| **Header** pt | 24 | 16 |
| **Back button** w/h/br | 44×44/22 | 40×40/20 |
| **Header title** fs | 20 | 18 |
| **Section title** fs/mt/mb | 18/24/16 | 16/18/12 |
| **SectionTitleInstructions** fs/mt/mb | 16/18/10 | 14/14/8 |
| **Services list** gap | 14 | 10 |
| **Service card** h/br/ph/pv | 105/20/18/14 | 88/16/14/10 |
| **Service title** fs | 16 | 14 |
| **Service price** fs | 15 | 14 |
| **Service price unit** fs | 14 | 12 |
| **Service subtitle** fs/mt | 13/4 | 12/2 |
| **Counter pill** w/h/br | 110/36/18 | 96/30/15 |
| **Counter btn** w/h/br | 28×28/14 | 24×24/12 |
| **Counter value** fs | 16 | 14 |
| **Instructions input** h/br/p/fs | 100/16/14/14 | 80/14/12/13 |
| **Continue button** mt/mb/h | 16/100/54 | 14/80/46 |
| **Continue gradient** br | 27 | 23 |
| **Continue text** fs | 18 | 16 |

## Edit strategy
Apply 5 edits to `src/screens/BookPickup/BookPickupScreen.tsx`:
1. Header + section title block (scrollContent, header, backButton, headerTitle, sectionTitle, sectionTitleInstructions, servicesList, serviceCard)
2. Service item text block (serviceTitle, servicePrice, servicePriceUnit, serviceSubtitle)
3. Counter block (counterPill, counterBtn, counterBtnDisabled, counterValue)
4. Instructions input block
5. Continue button block

Then run `npx tsc --noEmit`.
