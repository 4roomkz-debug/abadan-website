#!/bin/bash
# Generate unique images for each training landing page via Replicate API (flux-2-flex)

API_TOKEN="r8_6Fc9FaTtcGNRKAfRODXFuCoApVLShFX2PxcPX"
MODEL_VERSION="4139a7655e86b5d2f51450b52491369ec5b1250ff9af033f5de28cd121c24906"
BASE_DIR="/Users/macbookpro/Проекты/Сайт Abadan/public/images"

generate_image() {
  local prompt="$1"
  local output_path="$2"
  local aspect="$3"

  echo "  Generating: $(basename "$output_path")..."

  local response=$(curl -s -X POST "https://api.replicate.com/v1/predictions" \
    -H "Authorization: Bearer $API_TOKEN" \
    -H "Content-Type: application/json" \
    -d "{
      \"version\": \"$MODEL_VERSION\",
      \"input\": {
        \"prompt\": \"$prompt\",
        \"aspect_ratio\": \"$aspect\",
        \"output_format\": \"webp\",
        \"output_quality\": 85,
        \"steps\": 25,
        \"guidance\": 4.5
      }
    }")

  local pred_id=$(echo "$response" | python3 -c "import sys,json; print(json.load(sys.stdin).get('id',''))" 2>/dev/null)

  if [ -z "$pred_id" ] || [ "$pred_id" = "" ]; then
    echo "  ERROR creating prediction: $(echo "$response" | python3 -c "import sys,json; print(json.load(sys.stdin).get('detail','unknown'))" 2>/dev/null)"
    return 1
  fi

  # Poll for completion
  local status="starting"
  local poll=""
  while [ "$status" = "starting" ] || [ "$status" = "processing" ]; do
    sleep 3
    poll=$(curl -s "https://api.replicate.com/v1/predictions/$pred_id" \
      -H "Authorization: Bearer $API_TOKEN")
    status=$(echo "$poll" | python3 -c "import sys,json; print(json.load(sys.stdin).get('status',''))" 2>/dev/null)
  done

  if [ "$status" = "succeeded" ]; then
    local url=$(echo "$poll" | python3 -c "
import sys, json
d = json.load(sys.stdin)
o = d.get('output')
if isinstance(o, list) and o:
    print(o[0])
elif isinstance(o, str):
    print(o)
else:
    print('')
" 2>/dev/null)
    if [ -n "$url" ] && [ "$url" != "" ]; then
      curl -s -o "$output_path" "$url"
      echo "  OK: $(basename "$output_path") ($(du -h "$output_path" | cut -f1))"
      return 0
    fi
  fi

  echo "  FAILED: $(basename "$output_path") status=$status"
  echo "  Error: $(echo "$poll" | python3 -c "import sys,json; print(json.load(sys.stdin).get('error',''))" 2>/dev/null)"
  return 1
}

# ============================================================
echo "=== HR ==="
# ============================================================

generate_image \
  "Professional modern office meeting room, HR team discussion around table, diverse Central Asian professionals in business attire reviewing documents, warm lighting, corporate setting, photorealistic, high quality" \
  "$BASE_DIR/hr/hero-poster.webp" "16:9"

generate_image \
  "Corporate training seminar, HR professionals attending lecture in modern classroom, presenter at whiteboard with HR metrics charts, Central Asian business people, professional photography" \
  "$BASE_DIR/hr/training-1.webp" "4:3"

generate_image \
  "Job interview practice session, two professionals at desk with laptop and resume, modern office with glass walls, Central Asian woman interviewing candidate, recruitment training" \
  "$BASE_DIR/hr/training-2.webp" "4:3"

generate_image \
  "Team building workshop, group of professionals doing collaborative exercise, modern conference room, sticky notes on board, Central Asian corporate team, engaged and smiling" \
  "$BASE_DIR/hr/training-3.webp" "4:3"

generate_image \
  "Certificate ceremony in corporate setting, professional receiving diploma from trainer, handshake, modern office background, Central Asian professionals, business attire, warm lighting" \
  "$BASE_DIR/hr/training-4.webp" "4:3"

generate_image \
  "Professional headshot, Central Asian woman in her 40s, confident smile, dark blazer, modern office background blurred, corporate portrait, warm lighting, photorealistic" \
  "$BASE_DIR/hr/person-1.webp" "1:1"

generate_image \
  "Professional headshot, Central Asian woman in her 30s, friendly expression, teal blouse, modern corporate background, business portrait, natural lighting, photorealistic" \
  "$BASE_DIR/hr/person-2.webp" "1:1"

generate_image \
  "Professional headshot, Central Asian man in his 30s, confident look, white shirt and dark jacket, office background blurred, corporate portrait, warm studio lighting, photorealistic" \
  "$BASE_DIR/hr/person-3.webp" "1:1"

# ============================================================
echo "=== PRAVO ==="
# ============================================================

generate_image \
  "Modern law office with bookshelves of legal volumes, scales of justice on desk, gavel, professional legal environment, warm dramatic lighting, dark wood and leather, cinematic, photorealistic" \
  "$BASE_DIR/pravo/hero-poster.webp" "16:9"

generate_image \
  "Legal seminar in modern conference room, lawyers studying documents, legal code books on table, presenter explaining law charts on screen, Central Asian professionals, formal attire" \
  "$BASE_DIR/pravo/training-1.webp" "4:3"

generate_image \
  "Court case study workshop, professionals analyzing legal documents around large table, law books stacked, laptops open, Central Asian lawyers in discussion, professional setting" \
  "$BASE_DIR/pravo/training-2.webp" "4:3"

generate_image \
  "Contract review training, close-up of professionals examining contract documents with highlighters, modern office, legal papers spread on table, professional corporate photography" \
  "$BASE_DIR/pravo/training-3.webp" "4:3"

generate_image \
  "Professional certificate ceremony, lawyer receiving qualification certificate, formal setting, Central Asian man in suit accepting diploma, handshake, law firm office background" \
  "$BASE_DIR/pravo/training-4.webp" "4:3"

generate_image \
  "Professional headshot, Central Asian woman in her 40s, authoritative yet approachable, dark blazer with pearl earrings, law office background blurred, corporate portrait, photorealistic" \
  "$BASE_DIR/pravo/person-1.webp" "1:1"

generate_image \
  "Professional headshot, Central Asian man in his 40s, serious confident expression, dark suit and tie, office bookshelf background blurred, corporate legal portrait, photorealistic" \
  "$BASE_DIR/pravo/person-2.webp" "1:1"

generate_image \
  "Professional headshot, Central Asian woman in her 30s, smart and confident look, grey blazer, modern office background, corporate portrait, natural lighting, photorealistic" \
  "$BASE_DIR/pravo/person-3.webp" "1:1"

# ============================================================
echo "=== FINANSY ==="
# ============================================================

generate_image \
  "Modern finance department office, large screens showing financial charts and dashboards, stock market data, Central Asian professional at workstation, blue ambient lighting, corporate trading floor aesthetic, cinematic, photorealistic" \
  "$BASE_DIR/finansy/hero-poster.webp" "16:9"

generate_image \
  "Financial training seminar, accountants studying IFRS standards, spreadsheets on projector, modern classroom, Central Asian professionals with calculators and laptops, business attire" \
  "$BASE_DIR/finansy/training-1.webp" "4:3"

generate_image \
  "Budget planning workshop, team analyzing financial reports around conference table, charts and graphs on screen, Central Asian finance professionals, modern office, collaborative atmosphere" \
  "$BASE_DIR/finansy/training-2.webp" "4:3"

generate_image \
  "Tax planning seminar, presenter explaining tax code on whiteboard with calculations, Central Asian professionals taking notes, modern training room, formal attire, focused atmosphere" \
  "$BASE_DIR/finansy/training-3.webp" "4:3"

generate_image \
  "Finance certification ceremony, professional receiving IFRS certificate, modern corporate setting, Central Asian woman accepting diploma, handshake with trainer, warm lighting" \
  "$BASE_DIR/finansy/training-4.webp" "4:3"

generate_image \
  "Professional headshot, Central Asian woman in her 40s, intelligent and warm expression, dark blazer, finance office background with subtle screen glow, corporate portrait, photorealistic" \
  "$BASE_DIR/finansy/person-1.webp" "1:1"

generate_image \
  "Professional headshot, Central Asian man in his 30s, sharp and focused look, white shirt dark vest, modern office background, corporate finance portrait, studio lighting, photorealistic" \
  "$BASE_DIR/finansy/person-2.webp" "1:1"

generate_image \
  "Professional headshot, Central Asian woman in her 30s, confident smile, elegant blouse, modern office background blurred, corporate portrait, natural lighting, photorealistic" \
  "$BASE_DIR/finansy/person-3.webp" "1:1"

# ============================================================
echo "=== LIDERSTVO ==="
# ============================================================

generate_image \
  "Inspiring corporate leadership scene, executive speaking to team in modern glass office, panoramic city view background, golden hour lighting through windows, Central Asian leader addressing group, cinematic wide shot, photorealistic" \
  "$BASE_DIR/liderstvo/hero-poster.webp" "16:9"

generate_image \
  "Leadership training workshop, dynamic presenter engaging audience, flipchart with strategy diagrams, modern training room, Central Asian professionals actively participating, energetic atmosphere" \
  "$BASE_DIR/liderstvo/training-1.webp" "4:3"

generate_image \
  "Negotiation skills training, two teams at conference table practicing negotiation, modern office with glass walls, Central Asian business professionals, focused and intense discussion" \
  "$BASE_DIR/liderstvo/training-2.webp" "4:3"

generate_image \
  "Team coaching session, small group in creative workspace, whiteboard with goals and mindmaps, informal seating arrangement, Central Asian professionals in smart casual, collaborative energy" \
  "$BASE_DIR/liderstvo/training-3.webp" "4:3"

generate_image \
  "Leadership program graduation, executive receiving certificate, standing ovation from colleagues, elegant corporate event setting, Central Asian professionals, celebratory moment, warm lighting" \
  "$BASE_DIR/liderstvo/training-4.webp" "4:3"

generate_image \
  "Professional headshot, Central Asian man in his 40s, charismatic leader expression, dark suit no tie, modern office panoramic window background blurred, executive portrait, photorealistic" \
  "$BASE_DIR/liderstvo/person-1.webp" "1:1"

generate_image \
  "Professional headshot, Central Asian woman in her 30s, energetic and confident, teal blazer, modern bright office background, corporate portrait, warm studio lighting, photorealistic" \
  "$BASE_DIR/liderstvo/person-2.webp" "1:1"

generate_image \
  "Professional headshot, Central Asian man in his 30s, thoughtful intelligent look, navy blazer white shirt, corporate background, executive portrait, natural lighting, photorealistic" \
  "$BASE_DIR/liderstvo/person-3.webp" "1:1"

echo ""
echo "=== DONE ==="
echo "Generated images:"
find "$BASE_DIR/hr" "$BASE_DIR/pravo" "$BASE_DIR/finansy" "$BASE_DIR/liderstvo" -name "*.webp" -size +1k 2>/dev/null | wc -l
echo "out of 32 expected"
