import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { password, newContent } = await req.json();

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!newContent) {
      return NextResponse.json({ error: "No content provided" }, { status: 400 });
    }

    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      return NextResponse.json({ error: "Server missing GitHub token" }, { status: 500 });
    }

    const owner = "himeshh704";
    const repo = "madsphere_web";
    const path = "src/data/content.json";
    
    // 1. Get the current file's SHA (required by GitHub API to update a file)
    const getUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
    const getRes = await fetch(getUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    if (!getRes.ok) {
      const errText = await getRes.text();
      return NextResponse.json({ error: "Failed to fetch file from GitHub", details: errText }, { status: 500 });
    }

    const getJson = await getRes.json();
    const sha = getJson.sha;

    // 2. Commit the new file
    const contentEncoded = Buffer.from(JSON.stringify(newContent, null, 2)).toString("base64");

    const putRes = await fetch(getUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "X-GitHub-Api-Version": "2022-11-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "Admin Portal: Update content.json",
        content: contentEncoded,
        sha,
      }),
    });

    if (!putRes.ok) {
      const errText = await putRes.text();
      return NextResponse.json({ error: "Failed to save file to GitHub", details: errText }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Changes saved and deploying!" });
  } catch (error: any) {
    console.error("[/api/admin/save]", error);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}
