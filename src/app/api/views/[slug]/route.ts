// app/api/views/[slug]/route.ts
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;

  const { data, error } = await supabase
    .from("views")
    .select("count")
    .eq("slug", slug)
    .single();

  if (error && error.code !== "PGRST116") {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ views: data?.count ?? 0 });
}

export async function POST(req: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;

  // cek apakah sudah ada row
  const { data: existing } = await supabase
    .from("views")
    .select("count")
    .eq("slug", slug)
    .single();

  if (existing) {
    // kalau sudah ada → increment
    const { data, error } = await supabase
      .from("views")
      .update({ count: existing.count + 1 })
      .eq("slug", slug)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ views: data?.count ?? 0 });
  } else {
    // kalau belum ada → insert baru
    const { data, error } = await supabase
      .from("views")
      .insert({ slug, count: 1 })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ views: data?.count ?? 0 });
  }
}
