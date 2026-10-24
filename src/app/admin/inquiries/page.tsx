"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import {
  Users,
  Search,
  Filter,
  RefreshCw,
  Phone,
  Mail,
  Building,
  Calendar,
  CheckCircle,
  Clock,
  ExternalLink,
  ChevronRight,
  Database,
  ArrowLeft,
  Sparkles,
  PhoneCall,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";

interface Inquiry {
  id: string;
  name: string;
  business_name: string;
  email: string;
  phone: string;
  monthly_call_volume?: string | null;
  primary_service_interest?: string | null;
  notes?: string | null;
  source?: string | null;
  status: "new" | "contacted" | "demo_scheduled" | "closed" | string;
  metadata?: Record<string, any> | null;
  created_at: string;
  updated_at: string;
}

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState("");

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/inquiries?limit=100");
      const data = await res.json();
      if (res.ok && data.inquiries) {
        setInquiries(data.inquiries);
      }
    } catch (err) {
      console.error("Failed to load inquiries:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setIsUpdating(true);
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (res.ok && data.inquiry) {
        setInquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
        if (selectedInquiry?.id === id) {
          setSelectedInquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
        setFeedbackMsg(`Status updated to "${newStatus}"`);
        setTimeout(() => setFeedbackMsg(""), 3000);
      }
    } catch (err) {
      console.error("Error updating status:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  const filteredInquiries = useMemo(() => {
    return inquiries.filter((inquiry) => {
      const matchesStatus =
        selectedStatus === "all" ? true : inquiry.status === selectedStatus;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        inquiry.name?.toLowerCase().includes(q) ||
        inquiry.business_name?.toLowerCase().includes(q) ||
        inquiry.email?.toLowerCase().includes(q) ||
        inquiry.phone?.toLowerCase().includes(q) ||
        inquiry.notes?.toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [inquiries, selectedStatus, searchQuery]);

  const stats = useMemo(() => {
    return {
      total: inquiries.length,
      new: inquiries.filter((i) => i.status === "new" || !i.status).length,
      contacted: inquiries.filter((i) => i.status === "contacted").length,
      scheduled: inquiries.filter((i) => i.status === "demo_scheduled").length,
    };
  }, [inquiries]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Header */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 transition-colors py-1 px-2.5 rounded-lg bg-slate-800/50 hover:bg-slate-800"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Site
            </Link>
            <div className="h-4 w-px bg-slate-800" />
            <div className="flex items-center gap-2">
              <span className="font-bold text-base tracking-tight bg-gradient-to-r from-white via-slate-100 to-cyan-300 bg-clip-text text-transparent">
                Ringwell AI
              </span>
              <span className="text-[11px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                Inquiry Hub
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
              <Database className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>Supabase Connected</span>
            </div>
            <button
              onClick={fetchInquiries}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors border border-slate-700/60 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-cyan-400" : ""}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        {feedbackMsg && (
          <div className="mb-6 px-4 py-2.5 rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-200 text-sm flex items-center justify-between animate-in fade-in slide-in-from-top-2">
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              {feedbackMsg}
            </span>
          </div>
        )}

        {/* Dashboard Title & Quick Stats */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
            Inquiries & Captured Leads
          </h1>
          <p className="text-sm text-slate-400">
            Real-time inquiries automatically recorded by your Supabase backend from all website forms and modal bookings.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-sm">
            <div className="text-xs font-medium text-slate-400 mb-1 flex items-center justify-between">
              <span>Total Inquiries</span>
              <Users className="w-4 h-4 text-slate-500" />
            </div>
            <div className="text-2xl font-bold text-white">{stats.total}</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/50 border border-amber-500/20 backdrop-blur-sm">
            <div className="text-xs font-medium text-amber-400 mb-1 flex items-center justify-between">
              <span>New Leads</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-bold text-amber-300">{stats.new}</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/50 border border-blue-500/20 backdrop-blur-sm">
            <div className="text-xs font-medium text-blue-400 mb-1 flex items-center justify-between">
              <span>Contacted</span>
              <PhoneCall className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-blue-300">{stats.contacted}</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/50 border border-emerald-500/20 backdrop-blur-sm">
            <div className="text-xs font-medium text-emerald-400 mb-1 flex items-center justify-between">
              <span>Demo Scheduled</span>
              <CheckCircle className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold text-emerald-300">{stats.scheduled}</div>
          </div>
        </div>

        {/* Controls: Search & Filter Tabs */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, company, email, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-900/80 border border-slate-800 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/60 transition-colors"
            />
          </div>

          <div className="flex items-center gap-1 p-1 bg-slate-900/80 border border-slate-800 rounded-lg overflow-x-auto text-xs">
            {[
              { id: "all", label: "All" },
              { id: "new", label: "New" },
              { id: "contacted", label: "Contacted" },
              { id: "demo_scheduled", label: "Scheduled" },
              { id: "closed", label: "Closed" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedStatus(tab.id)}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap ${
                  selectedStatus === tab.id
                    ? "bg-cyan-500 text-slate-950 font-semibold shadow-sm"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Inquiries Content Table & Detail View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* List Table */}
          <div className={`${selectedInquiry ? "lg:col-span-7" : "lg:col-span-12"} transition-all`}>
            <div className="bg-slate-900/50 border border-slate-800/80 rounded-xl overflow-hidden backdrop-blur-sm">
              {loading && inquiries.length === 0 ? (
                <div className="py-20 text-center text-slate-400 flex flex-col items-center justify-center gap-3">
                  <RefreshCw className="w-6 h-6 animate-spin text-cyan-400" />
                  <span className="text-sm">Fetching inquiries from Supabase...</span>
                </div>
              ) : filteredInquiries.length === 0 ? (
                <div className="py-16 text-center text-slate-400 flex flex-col items-center justify-center gap-2">
                  <MessageSquare className="w-8 h-8 text-slate-600" />
                  <p className="font-medium text-slate-300">No inquiries found</p>
                  <p className="text-xs text-slate-500">
                    {searchQuery ? "Try refining your search terms" : "New leads submitted on the website will appear here immediately."}
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 bg-slate-950/40 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                        <th className="py-3 px-4">Contact & Practice</th>
                        <th className="py-3 px-4">Interest & Volume</th>
                        <th className="py-3 px-4">Source</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Received</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {filteredInquiries.map((inquiry) => {
                        const isSelected = selectedInquiry?.id === inquiry.id;
                        return (
                          <tr
                            key={inquiry.id}
                            onClick={() => setSelectedInquiry(inquiry)}
                            className={`cursor-pointer transition-colors ${
                              isSelected
                                ? "bg-cyan-500/10 border-l-2 border-l-cyan-400"
                                : "hover:bg-slate-800/40"
                            }`}
                          >
                            <td className="py-3.5 px-4">
                              <div className="font-semibold text-slate-200 text-sm">
                                {inquiry.name}
                              </div>
                              <div className="text-slate-400 flex items-center gap-1.5 mt-0.5">
                                <Building className="w-3 h-3 text-slate-500" />
                                {inquiry.business_name}
                              </div>
                              <div className="text-slate-500 text-[11px] mt-0.5">
                                {inquiry.email} • {inquiry.phone}
                              </div>
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="text-slate-300 font-medium">
                                {inquiry.primary_service_interest || "AI Receptionist"}
                              </div>
                              <div className="text-slate-500 text-[11px] mt-0.5">
                                {inquiry.monthly_call_volume || "Not specified"}
                              </div>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-medium bg-slate-800 text-slate-300 border border-slate-700/60">
                                {inquiry.source?.replace("_", " ") || "website"}
                              </span>
                            </td>
                            <td className="py-3.5 px-4">
                              <span
                                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                                  inquiry.status === "new"
                                    ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                    : inquiry.status === "contacted"
                                    ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                    : inquiry.status === "demo_scheduled"
                                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                    : "bg-slate-800 text-slate-400 border border-slate-700"
                                }`}
                              >
                                {inquiry.status === "new" && <Clock className="w-3 h-3" />}
                                {inquiry.status === "contacted" && <PhoneCall className="w-3 h-3" />}
                                {inquiry.status === "demo_scheduled" && <CheckCircle className="w-3 h-3" />}
                                {inquiry.status || "new"}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-right text-slate-400 whitespace-nowrap">
                              <div>{new Date(inquiry.created_at).toLocaleDateString()}</div>
                              <div className="text-[10px] text-slate-500">
                                {new Date(inquiry.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Inquiry Detail Panel */}
          {selectedInquiry && (
            <div className="lg:col-span-5 animate-in fade-in slide-in-from-right-2">
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 sticky top-24 backdrop-blur-md shadow-xl">
                <div className="flex items-start justify-between pb-4 border-b border-slate-800 mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">{selectedInquiry.name}</h3>
                    <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                      <Building className="w-3.5 h-3.5 text-cyan-400" />
                      {selectedInquiry.business_name}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedInquiry(null)}
                    className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded bg-slate-800 hover:bg-slate-700"
                  >
                    Close
                  </button>
                </div>

                {/* Direct Action Buttons */}
                <div className="grid grid-cols-2 gap-2 mb-5">
                  <a
                    href={`tel:${selectedInquiry.phone}`}
                    className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Call Contact
                  </a>
                  <a
                    href={`mailto:${selectedInquiry.email}?subject=Ringwell%20AI%20Demo%20Inquiry`}
                    className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs border border-slate-700 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                    Email
                  </a>
                </div>

                {/* Status Updater */}
                <div className="mb-5 p-3 rounded-lg bg-slate-950/60 border border-slate-800/80">
                  <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Update Pipeline Status
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {["new", "contacted", "demo_scheduled", "closed"].map((st) => (
                      <button
                        key={st}
                        disabled={isUpdating}
                        onClick={() => handleStatusChange(selectedInquiry.id, st)}
                        className={`py-1.5 px-2.5 rounded text-xs font-medium capitalize text-left transition-colors border ${
                          selectedInquiry.status === st
                            ? "bg-cyan-500/15 border-cyan-500/40 text-cyan-300 font-semibold"
                            : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                        }`}
                      >
                        • {st.replace("_", " ")}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Lead Details */}
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-slate-500 uppercase tracking-wider text-[10px] block">
                      Email Address
                    </span>
                    <span className="text-slate-200 font-mono text-[11px]">
                      {selectedInquiry.email}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-500 uppercase tracking-wider text-[10px] block">
                      Phone Number
                    </span>
                    <span className="text-slate-200 font-mono text-[11px]">
                      {selectedInquiry.phone}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-500 uppercase tracking-wider text-[10px] block">
                      Service Interest
                    </span>
                    <span className="text-slate-200">
                      {selectedInquiry.primary_service_interest || "AI Receptionist Demo"}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-500 uppercase tracking-wider text-[10px] block">
                      Call Volume
                    </span>
                    <span className="text-slate-200">
                      {selectedInquiry.monthly_call_volume || "Not specified"}
                    </span>
                  </div>

                  {selectedInquiry.notes && (
                    <div>
                      <span className="text-slate-500 uppercase tracking-wider text-[10px] block">
                        Client Notes / Requested Time Slot
                      </span>
                      <p className="mt-1 p-2.5 rounded bg-slate-950/60 border border-slate-800 text-slate-300 leading-relaxed text-xs">
                        {selectedInquiry.notes}
                      </p>
                    </div>
                  )}

                  <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
                    <span>Lead ID:</span>
                    <span className="font-mono text-[10px]">{selectedInquiry.id}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-6 text-center text-xs text-slate-500">
        Ringwell AI Receptionist Backend • Backed by Supabase PostgreSQL Database (Project: Haider AI)
      </footer>
    </div>
  );
}
