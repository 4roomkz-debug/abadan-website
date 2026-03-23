import { ImageResponse } from "next/og";
import { ARTICLES } from "@/data/blog";

export const runtime = "edge";
export const alt = "Abadan & Co. Blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#1a2e30",
            color: "#fff",
            fontSize: 48,
            fontFamily: "sans-serif",
          }}
        >
          Abadan & Co.
        </div>
      ),
      { ...size }
    );
  }

  const categoryColors: Record<string, string> = {
    HR: "#0369a1",
    "ИИ": "#7c3aed",
    "Нефтегаз": "#b45309",
    "Право": "#be123c",
    "Финансы": "#047857",
    "Лидерство": "#6d28d9",
    "ibirAi": "#00767D",
    "Стартап": "#d97706",
  };

  const catColor = categoryColors[article.category] ?? "#00767D";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 70px",
          background: "linear-gradient(135deg, #1a2e30 0%, #0d2628 50%, #0a1f21 100%)",
          fontFamily: "sans-serif",
          color: "#ffffff",
        }}
      >
        {/* Top: category badge + date */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              backgroundColor: catColor,
              color: "#fff",
              padding: "8px 20px",
              borderRadius: "20px",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            {article.category}
          </div>
          <div style={{ color: "#9cb3b6", fontSize: 22 }}>{article.date}</div>
        </div>

        {/* Middle: title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: article.title.length > 60 ? 42 : 52,
              fontWeight: 800,
              lineHeight: 1.2,
              color: "#ffffff",
              maxWidth: "1060px",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {article.title}
          </div>
          <div
            style={{
              fontSize: 24,
              color: "#9cb3b6",
              lineHeight: 1.4,
              maxWidth: "900px",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {article.excerpt.length > 140
              ? article.excerpt.slice(0, 140) + "…"
              : article.excerpt}
          </div>
        </div>

        {/* Bottom: author + branding */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                backgroundColor: "#00767D",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                fontWeight: 700,
                color: "#fff",
              }}
            >
              {article.author.charAt(0)}
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 22, fontWeight: 600, color: "#fff" }}>
                {article.author}
              </div>
              <div style={{ fontSize: 16, color: "#7A8B8E" }}>
                {article.authorRole}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                fontSize: 28,
                fontWeight: 800,
                color: "#F0BB1E",
              }}
            >
              Abadan
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: "#fff" }}>
              & Co.
            </div>
          </div>
        </div>

        {/* Gold accent line at bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #F0BB1E 0%, #00767D 100%)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
