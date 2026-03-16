import { NextResponse } from "next/server";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO || "4roomkz-debug/abadan-website";
const PUBLISH_SECRET = process.env.PUBLISH_SECRET;

interface ArticlePayload {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readingTime: number;
  author: string;
  authorRole: string;
  featured?: boolean;
  image_base64?: string;
  image_filename?: string;
  content: string;
}

async function githubApi(
  path: string,
  method: string = "GET",
  body?: Record<string, unknown>
) {
  const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub API ${method} ${path}: ${res.status} — ${text.slice(0, 300)}`);
  }

  return res.json();
}

function buildArticleEntry(payload: ArticlePayload, nextId: number): string {
  const imagePath = payload.image_filename
    ? `/images/blog/${payload.image_filename}`
    : `/images/blog/${payload.slug}.webp`;

  const featured = payload.featured ? "\n    featured: true," : "";

  return `  {
    id: ${nextId},
    slug: "${payload.slug}",
    title: "${payload.title.replace(/"/g, '\\"')}",
    excerpt:
      "${payload.excerpt.replace(/"/g, '\\"')}",
    date: "${payload.date}",
    category: "${payload.category}",
    readingTime: ${payload.readingTime},
    author: "${payload.author.replace(/"/g, '\\"')}",
    authorRole: "${payload.authorRole.replace(/"/g, '\\"')}",${featured}
    image: "${imagePath}",
    content: \`
${payload.content}
\`,
  }`;
}

export async function POST(request: Request) {
  try {
    // Auth check
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!PUBLISH_SECRET || token !== PUBLISH_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!GITHUB_TOKEN) {
      return NextResponse.json(
        { error: "GitHub token not configured" },
        { status: 500 }
      );
    }

    const payload: ArticlePayload = await request.json();

    // Validate required fields
    if (!payload.slug || !payload.title || !payload.content || !payload.category) {
      return NextResponse.json(
        { error: "Missing required fields: slug, title, content, category" },
        { status: 400 }
      );
    }

    // Step 1: Upload image if provided
    const imageFilename = payload.image_filename || `${payload.slug}.webp`;
    if (payload.image_base64) {
      await githubApi(`contents/public/images/blog/${imageFilename}`, "PUT", {
        message: `blog: add image for "${payload.slug}"`,
        content: payload.image_base64,
        branch: "main",
      });
    }

    // Step 2: Read current blog.ts
    const blogFile = await githubApi("contents/src/data/blog.ts");
    const blogContent = Buffer.from(blogFile.content, "base64").toString("utf-8");

    // Step 3: Find next ID
    const idMatches = [...blogContent.matchAll(/id:\s*(\d+)/g)];
    const maxId = Math.max(...idMatches.map((m) => parseInt(m[1], 10)));
    const nextId = maxId + 1;

    // Step 4: Build new article entry
    const newEntry = buildArticleEntry(payload, nextId);

    // Step 5: Insert before closing bracket of ARTICLES array
    const closingBracket = blogContent.lastIndexOf("];");
    if (closingBracket === -1) {
      return NextResponse.json(
        { error: "Could not parse blog.ts — missing closing ];" },
        { status: 500 }
      );
    }

    const updatedContent =
      blogContent.slice(0, closingBracket) +
      newEntry +
      ",\n" +
      blogContent.slice(closingBracket);

    // Step 6: Commit updated blog.ts
    await githubApi("contents/src/data/blog.ts", "PUT", {
      message: `blog: add article "${payload.slug}"`,
      content: Buffer.from(updatedContent).toString("base64"),
      sha: blogFile.sha,
      branch: "main",
    });

    return NextResponse.json({
      success: true,
      id: nextId,
      slug: payload.slug,
      url: `https://abadan.kz/blog/${payload.slug}`,
    });
  } catch (error) {
    console.error("Error publishing article:", error);
    return NextResponse.json(
      {
        error: "Failed to publish article",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
