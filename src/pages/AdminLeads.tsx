import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { Download, LogOut, Search, Trash2 } from "lucide-react";
import logo from "@/assets/logo.png";

type Lead = Tables<"quote_requests">;
const STATUSES = ["new", "contacted", "quoted", "won", "lost"] as const;
const STATUS_STYLE: Record<string, string> = {
  new: "bg-primary/20 text-primary border-primary/40",
  contacted: "bg-secondary/20 text-secondary border-secondary/40",
  quoted: "bg-accent/30 text-foreground border-accent/50",
  won: "bg-[hsl(var(--success))]/20 text-[hsl(var(--success))] border-[hsl(var(--success))]/40",
  lost: "bg-muted text-muted-foreground border-border",
};
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const fmtReceived = (iso: string) =>
  new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(iso));

const fmtPhone = (p?: string | null) => {
  if (!p) return "";
  const d = p.replace(/\D/g, "").replace(/^1(?=\d{10}$)/, "");
  return d.length === 10 ? `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}` : p;
};
const fmtDate = (d?: string | null) => {
  if (!d) return "";
  const [y, m, day] = d.split("-").map(Number);
  return new Date(y, m - 1, day).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

const csvCell = (v: unknown) => {
  const s = v === null || v === undefined ? "" : String(v);
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

const AdminLeads = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<"loading" | "denied" | "ok">("loading");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [q, setQ] = useState("");
  const [typeF, setTypeF] = useState("all");
  const [statusF, setStatusF] = useState("all");
  const [selected, setSelected] = useState<Lead | null>(null);
  const [draft, setDraft] = useState({ quoted_rate: "", contract_end_date: "", internal_notes: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const check = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) return navigate("/admin/login", { replace: true });
      const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", data.user.id).eq("role", "admin");
      if (!roles?.length) return setState("denied");
      setState("ok");
      const { data: rows, error } = await supabase.from("quote_requests").select("*").order("created_at", { ascending: false });
      if (error) toast.error(error.message);
      setLeads(rows ?? []);
    };
    check();
    const { data: sub } = supabase.auth.onAuthStateChange((e) => {
      if (e === "SIGNED_OUT") navigate("/admin/login", { replace: true });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return leads.filter((l) => {
      if (typeF !== "all" && l.type !== typeF) return false;
      if (statusF !== "all" && l.status !== statusF) return false;
      if (!s) return true;
      return [l.name, l.email, l.phone, l.business, l.address, l.notes, l.usage, l.internal_notes]
        .some((v) => v?.toLowerCase().includes(s)) || (l.phone ?? "").replace(/\D/g, "").includes(s.replace(/\D/g, "") || "~");
    });
  }, [leads, q, typeF, statusF]);

  const newCount = leads.filter((l) => l.status === "new").length;

  const update = async (id: string, patch: Partial<Lead>) => {
    const { data, error } = await supabase.from("quote_requests").update(patch).eq("id", id).select().single();
    if (error) {
      toast.error(error.message);
      return false;
    }
    setLeads((ls) => ls.map((l) => (l.id === id ? data : l)));
    setSelected((s) => (s?.id === id ? data : s));
    return true;
  };

  const openLead = (l: Lead) => {
    setSelected(l);
    setDraft({
      quoted_rate: l.quoted_rate?.toString() ?? "",
      contract_end_date: l.contract_end_date ?? "",
      internal_notes: l.internal_notes ?? "",
    });
  };

  const saveDetails = async () => {
    if (!selected) return;
    setSaving(true);
    const ok = await update(selected.id, {
      quoted_rate: draft.quoted_rate === "" ? null : Number(draft.quoted_rate),
      contract_end_date: draft.contract_end_date || null,
      internal_notes: draft.internal_notes || null,
    });
    setSaving(false);
    if (ok) toast.success("Saved");
  };

  const deleteLead = async (target?: Lead) => {
    const lead = target ?? selected;
    if (!lead) return;
    if (!window.confirm(`Delete the lead from ${lead.name}? This can't be undone.`)) return;
    const id = lead.id;
    const { error } = await supabase.from("quote_requests").delete().eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    setLeads((ls) => ls.filter((l) => l.id !== id));
    setSelected(null);
    toast.success("Lead deleted");
  };

  const exportCsv = () => {
    const headers = ["Received (Central)", "Type", "Status", "Name", "Business", "Phone", "Email", "Address", "Usage", "Notes", "Quoted Rate (¢/kWh)", "Contract End", "Internal Notes"];
    const rows = filtered.map((l) => [
      fmtReceived(l.created_at), cap(l.type), cap(l.status), l.name, l.business, fmtPhone(l.phone), l.email, l.address,
      l.usage, l.notes, l.quoted_rate, l.contract_end_date, l.internal_notes,
    ]);
    const csv = "\uFEFF" + [headers, ...rows].map((r) => r.map(csvCell).join(",")).join("\r\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `nova-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const StatusSelect = ({ lead }: { lead: Lead }) => (
    <Select value={lead.status} onValueChange={(v) => update(lead.id, { status: v })}>
      <SelectTrigger
        onClick={(e) => e.stopPropagation()}
        className={`h-8 w-[120px] rounded-full border text-xs font-medium ${STATUS_STYLE[lead.status]}`}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent onClick={(e) => e.stopPropagation()}>
        {STATUSES.map((s) => (
          <SelectItem key={s} value={s}>{cap(s)}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );

  if (state === "loading") return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading…</div>;
  if (state === "denied")
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
        <h1 className="text-2xl font-semibold" style={{ fontFamily: "var(--font-heading)" }}>Access denied</h1>
        <p className="text-muted-foreground">This account doesn't have admin access.</p>
        <Button variant="outline" onClick={() => supabase.auth.signOut()}>Sign out</Button>
      </div>
    );

  const heading = { fontFamily: "var(--font-heading)" };

  return (
    <div className="min-h-screen" style={{ background: "var(--gradient-hero)" }}>
      <header className="border-b border-border bg-card/60 backdrop-blur">
        <div className="max-w-[1500px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Nova Energy" className="h-8" />
            <span className="text-sm text-muted-foreground">Admin · Leads</span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => supabase.auth.signOut()}>
            <LogOut className="h-4 w-4 mr-2" /> Sign out
          </Button>
        </div>
      </header>

      <main className="max-w-[1500px] mx-auto px-6 py-8 space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold" style={heading}>Quote Requests</h1>
            <p className="text-muted-foreground text-sm">{leads.length} total</p>
          </div>
          <div className="rounded-2xl border border-primary/40 bg-primary/10 px-5 py-3">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">New leads</div>
            <div className="text-3xl font-semibold text-primary" style={heading}>{newCount}</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search name, email, phone, business…" value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" />
          </div>
          <Select value={typeF} onValueChange={setTypeF}>
            <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              <SelectItem value="residential">Residential</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusF} onValueChange={setStatusF}>
            <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              {STATUSES.map((s) => <SelectItem key={s} value={s}>{cap(s)}</SelectItem>)}
            </SelectContent>
          </Select>
          <Button onClick={exportCsv} variant="secondary">
            <Download className="h-4 w-4 mr-2" /> Export to Excel
          </Button>
        </div>

        <div className="rounded-2xl border border-border bg-card/70 backdrop-blur overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Received</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Business</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Contract End</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 && (
                <TableRow><TableCell colSpan={9} className="text-center text-muted-foreground py-10">No leads found.</TableCell></TableRow>
              )}
              {filtered.map((l) => (
                <TableRow key={l.id} onClick={() => openLead(l)} className="cursor-pointer">
                  <TableCell className="whitespace-nowrap">{fmtReceived(l.created_at)}</TableCell>
                  <TableCell>
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium border ${l.type === "commercial" ? "bg-primary/15 text-primary border-primary/40" : "bg-secondary/15 text-secondary border-secondary/40"}`}>
                      {cap(l.type)}
                    </span>
                  </TableCell>
                  <TableCell className="font-medium">{l.name}</TableCell>
                  <TableCell>{l.business}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    {l.phone && <a href={`tel:${l.phone.replace(/[^\d+]/g, "")}`} onClick={(e) => e.stopPropagation()} className="text-primary hover:underline">{fmtPhone(l.phone)}</a>}
                  </TableCell>
                  <TableCell>
                    <a href={`mailto:${l.email}`} onClick={(e) => e.stopPropagation()} className="text-primary hover:underline">{l.email}</a>
                  </TableCell>
                  <TableCell className="max-w-[220px] truncate">{l.address}</TableCell>
                  <TableCell><StatusSelect lead={l} /></TableCell>
                  <TableCell className="whitespace-nowrap">{fmtDate(l.contract_end_date)}</TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Button variant="ghost" size="icon" aria-label="Delete lead" onClick={() => deleteLead(l)} className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>

      <Sheet open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          {selected && (
            <>
              <SheetHeader>
                <SheetTitle style={heading}>{selected.name}</SheetTitle>
                <p className="text-sm text-muted-foreground">{cap(selected.type)} · received {fmtReceived(selected.created_at)}</p>
              </SheetHeader>
              <div className="mt-6 space-y-5">
                <div className="flex items-center gap-3"><Label className="w-28">Status</Label><StatusSelect lead={selected} /></div>
                <dl className="grid grid-cols-[7rem_1fr] gap-y-3 text-sm">
                  {[
                    ["Business", selected.business],
                    ["Phone", selected.phone && <a className="text-primary hover:underline" href={`tel:${selected.phone.replace(/[^\d+]/g, "")}`}>{fmtPhone(selected.phone)}</a>],
                    ["Email", <a className="text-primary hover:underline break-all" href={`mailto:${selected.email}`}>{selected.email}</a>],
                    ["Address", selected.address],
                    ["Usage", selected.usage],
                    ["Notes", selected.notes],
                  ].map(([k, v]) => (
                    <div key={k as string} className="contents">
                      <dt className="text-muted-foreground">{k}</dt>
                      <dd className="whitespace-pre-wrap">{v || <span className="text-muted-foreground">—</span>}</dd>
                    </div>
                  ))}
                </dl>
                <div className="border-t border-border pt-5 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="rate">Quoted rate (¢/kWh)</Label>
                    <Input id="rate" type="number" step="0.001" min="0" value={draft.quoted_rate} onChange={(e) => setDraft({ ...draft, quoted_rate: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end">Contract end date</Label>
                    <Input id="end" type="date" value={draft.contract_end_date} onChange={(e) => setDraft({ ...draft, contract_end_date: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="inotes">Internal notes</Label>
                    <Textarea id="inotes" rows={5} value={draft.internal_notes} onChange={(e) => setDraft({ ...draft, internal_notes: e.target.value })} />
                  </div>
                  <Button onClick={saveDetails} disabled={saving} className="w-full">{saving ? "Saving…" : "Save changes"}</Button>
                  <Button variant="destructive" onClick={deleteLead} className="w-full">
                    <Trash2 className="h-4 w-4 mr-2" /> Delete lead
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AdminLeads;
