#!/bin/bash
# Generate images for AI training landing page

API_TOKEN="r8_6Fc9FaTtcGNRKAfRODXFuCoApVLShFX2PxcPX"
MODEL_VERSION="4139a7655e86b5d2f51450b52491369ec5b1250ff9af033f5de28cd121c24906"
BASE_DIR="/Users/macbookpro/Проекты/Сайт Abadan/public/images/ai"

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
    echo "  ERROR: $(echo "$response" | python3 -c "import sys,json; print(json.load(sys.stdin).get('detail','unknown'))" 2>/dev/null)"
    return 1
  fi

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

  echo "  FAILED: status=$status"
  return 1
}

echo "=== AI Training Images ==="

generate_image \
  "Modern tech workspace with multiple large screens showing AI neural network visualizations, futuristic blue and teal ambient lighting, Central Asian professional working with holographic data displays, dark modern office, cinematic, photorealistic" \
  "$BASE_DIR/hero-poster.webp" "16:9"

generate_image \
  "AI prompt engineering workshop, professionals typing on laptops with ChatGPT interface visible on projector screen, modern training room, Central Asian tech professionals, focused atmosphere, blue accent lighting" \
  "$BASE_DIR/training-1.webp" "4:3"

generate_image \
  "Business process automation seminar, team analyzing workflow diagrams on large screen, digital transformation workshop, Central Asian professionals with tablets, modern office, collaborative energy" \
  "$BASE_DIR/training-2.webp" "4:3"

generate_image \
  "AI agents development workshop, developers and business analysts working together, code on screens, robot assistant icon on whiteboard, Central Asian tech team, modern co-working space, creative atmosphere" \
  "$BASE_DIR/training-3.webp" "4:3"

generate_image \
  "AI certification ceremony, professional receiving digital transformation certificate, futuristic corporate setting, Central Asian business person, handshake, modern tech office background, warm lighting" \
  "$BASE_DIR/training-4.webp" "4:3"

generate_image \
  "Professional headshot, Central Asian woman in her 30s, smart tech-savvy look, modern blazer, subtle tech office background with screens, corporate portrait, photorealistic" \
  "$BASE_DIR/person-1.webp" "1:1"

generate_image \
  "Professional headshot, Central Asian man in his 40s, confident executive look, dark suit, modern office with ambient tech lighting background blurred, corporate portrait, photorealistic" \
  "$BASE_DIR/person-2.webp" "1:1"

generate_image \
  "Professional headshot, Central Asian man in his 30s, innovative and energetic expression, smart casual with blazer, modern co-working background, corporate portrait, natural lighting, photorealistic" \
  "$BASE_DIR/person-3.webp" "1:1"

echo ""
echo "=== DONE ==="
ls -la "$BASE_DIR/"
