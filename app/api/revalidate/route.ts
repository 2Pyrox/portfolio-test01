import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

const VALID_TAGS = ["projects", "profile", "settings"] as const;
type RevalidateTag = (typeof VALID_TAGS)[number];

const DOC_TYPE_TAG_MAP: Record<string, RevalidateTag> = {
  project: "projects",
  profile: "profile",
  siteSettings: "settings",
};

export async function POST(req: NextRequest): Promise<NextResponse> {
  const secret = req.headers.get("x-revalidation-secret");

  if (secret !== process.env.SANITY_REVALIDATION_SECRET) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let body: { _type?: string } = {};

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const docType = body._type;

  if (!docType) {
    return NextResponse.json({ error: "Missing _type in payload." }, { status: 422 });
  }

  const tag = DOC_TYPE_TAG_MAP[docType];

  if (!tag) {
    return NextResponse.json({ skipped: true, reason: `No tag mapped for type: ${docType}` });
  }

  revalidateTag(tag);

  return NextResponse.json({ revalidated: true, tag }, { status: 200 });
}
