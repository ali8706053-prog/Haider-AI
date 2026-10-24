import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    if (!id) {
      return NextResponse.json({ error: "Missing inquiry ID" }, { status: 400 });
    }

    const body = await request.json();
    const { status, notes } = body;

    const updates: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };

    if (status !== undefined) updates.status = status;
    if (notes !== undefined) updates.notes = notes;

    if (status !== undefined) {
      const { data: rpcData, error: rpcError } = await (supabase.rpc as any)(
        "update_inquiry_status",
        {
          p_id: id,
          p_status: status,
        }
      );

      if (!rpcError && rpcData) {
        return NextResponse.json({ success: true, inquiry: rpcData }, { status: 200 });
      }
    }

    const { data, error } = await supabase
      .from("inquiries")
      .update(updates)
      .eq("id", id);

    if (error) {
      console.error("[Update Inquiry Error]:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, inquiry: { id, ...updates } }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to update inquiry" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    if (!id) {
      return NextResponse.json({ error: "Missing inquiry ID" }, { status: 400 });
    }

    // 1. Try secure RPC function
    const { data: rpcData, error: rpcError } = await (supabase.rpc as any)(
      "delete_inquiry",
      { p_id: id }
    );

    if (!rpcError) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // 2. Fallback to direct delete
    const { error } = await supabase
      .from("inquiries")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("[Delete Inquiry Error]:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to delete inquiry" },
      { status: 500 }
    );
  }
}
