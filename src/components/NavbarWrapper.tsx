"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import BookDemoModal from "@/components/BookDemoModal";

/**
 * NavbarWrapper — Client component that owns the demo-modal state.
 * Import this in Server Components (layout, not-found, thank-you, etc.)
 * instead of importing Navbar directly with a function prop.
 */
export default function NavbarWrapper() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  return (
    <>
      <Navbar onOpenDemo={() => setIsDemoModalOpen(true)} />
      <BookDemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />
    </>
  );
}
