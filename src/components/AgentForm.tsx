"use client";

import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ReactMarkdown from "react-markdown";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

type Field = {
  key: string;
  label: string;
  placeholder?: string;
  type: "text" | "textarea" | "checkbox";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default?: any;
};

export default function AgentForm({
  name,
  endpoint,
  fields,
}: {
  name: string;
  endpoint: string;
  fields: Field[];
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const initialState: Record<string, any> = {};
  fields.forEach((f) => (initialState[f.key] = f.default ?? (f.type === "checkbox" ? false : "")));

  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [response, setResponse] = useState<any>(null);
  const [responseTime, setResponseTime] = useState<Date | null>(null);
  const [progress, setProgress] = useState(0);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (key: string, value: any) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async () => {
    setLoading(true);
    setResponse(null);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((p) => Math.min(p + Math.random() * 10, 95));
    }, 300);

    try {
      const agentSlug = endpoint.replace("/agents/", "");

      const res = await fetch(`/api/proxy/${agentSlug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      clearInterval(interval);

      if (!res.ok) {
        const text = await res.text();
        setResponse({
          error: `Request failed: ${res.status}`,
          raw: text,
          status: "error",
        });
        setProgress(100);
      } else {
        const data = await res.json();
        setResponse({
          ...data,
          response: data.text_response ?? data.response ?? "",
        });
        setResponseTime(new Date());
        setProgress(100);
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      clearInterval(interval);
      setResponse({ error: "Request failed", status: "error" });
      setProgress(100);
    } finally {
      setLoading(false);
    }
  };

  const prettyKey = (k: string) =>
    k.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const getShortSummary = (md: string | undefined) => {
    if (!md) return null;
    const text = md.replace(/\n+/g, " ").trim();
    const sentences = text.split(/(?<=[.?!])\s+/);
    return sentences.slice(0, 2).join(" ");
  };

  function extractSourcesFromMarkdown(markdown: string): string[] {
    if (!markdown) return [];
    const urlRegex = /(https?:\/\/[^\s)]+)/g;
    const matches = markdown.match(urlRegex);
    return matches ? Array.from(new Set(matches)) : [];
  }

  const sources = extractSourcesFromMarkdown(response?.text_response || "");

  return (
    <div className="mx-auto p-6 max-h-[80vh] overflow-auto">
      <div className="flex gap-6 ">
        {/* Левая — форма */}
        <Card className="flex-[2] ring-2 shadow-xl bg-card text-card-foreground">
          <CardHeader>
            <CardTitle className="text-4xl text-center">{name}</CardTitle>
            <p className="text-muted-foreground text-center">
              Configure and run this agent by filling the fields below.
            </p>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="space-y-6"
            >
              {fields.map((field) => {
                if (field.type === "textarea") {
                  return (
                    <div key={field.key} className="space-y-2">
                      <label className="text-sm font-medium">{field.label}</label>
                      <Textarea
                        rows={4}
                        className="rounded-2xl"
                        placeholder={field.placeholder ?? ""}
                        value={form[field.key]}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                      />
                    </div>
                  );
                }
                if (field.type === "checkbox") {
                  return (
                    <div key={field.key} className="flex items-center gap-3 rounded-md border p-3">
                      <input
                        aria-label={field.label}
                        type="checkbox"
                        checked={form[field.key]}
                        onChange={(e) => handleChange(field.key, e.target.checked)}
                        className="h-4 w-4"
                      />
                      <label className="text-sm font-medium">{field.label}</label>
                    </div>
                  );
                }
                return (
                  <div key={field.key} className="space-y-2">
                    <label className="text-sm font-medium">{field.label}</label>
                    <Input
                      className="rounded-2xl"
                      placeholder={field.placeholder ?? ""}
                      value={form[field.key]}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                    />
                  </div>
                );
              })}
              <div className="flex gap-4 mt-2">
                <Button
                  type="submit"
                  className="rounded-full cursor-pointer hover:opacity-90 flex-1"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    "Run Agent"
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-full"
                  onClick={() => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const reset: Record<string, any> = {};
                    fields.forEach((f) => (reset[f.key] = f.default ?? (f.type === "checkbox" ? false : "")));
                    setForm(reset);
                    setResponse(null);
                    setResponseTime(null);
                    setProgress(0);
                  }}
                >
                  Reset
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Правая — ответ */}
        <Card className="overflow-auto flex-[2] ring-2 shadow-xl bg-card text-card-foreground agent-response-scroll">
          <CardHeader>
            <CardTitle className="text-4xl text-center">Agent Response</CardTitle>
            <div className="text-sm text-muted-foreground text-center">
              {responseTime ? (
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">
                    {responseTime.toLocaleString()}
                  </span>
                  <span
                    className={`text-sm font-bold ${
                      response?.status === "success"
                        ? "text-green-600"
                        : response?.status === "error"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {response?.status ?? "idle"}
                  </span>
                </div>
              ) : (
                <span className="text-center text-muted-foreground">Awaiting run</span>
              )}
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {loading && (
              <div className="flex flex-col items-center justify-center h-48">
                <Progress className="w-1/2" value={progress} />
                <span className="mt-2 text-sm text-muted-foreground">{Math.floor(progress)}%</span>
              </div>
            )}

            {response?.error && (
              <div className="p-3 rounded-md bg-red-50 border border-red-200 text-red-700 text-sm">
                Error: {String(response.error)}
                {response.raw ? (
                  <div className="mt-2 text-xs text-muted-foreground">{String(response.raw)}</div>
                ) : null}
              </div>
            )}

            {response?.response && !loading && (
              <div>
                <div className="mb-3">
                  <h4 className="text-sm font-semibold mb-1 text-center text-primary">Highlights</h4>
                  <p className="text-sm text-muted-foreground text-center">
                    {getShortSummary(response.response) ?? "—"}
                  </p>
                </div>
                <div className="prose prose-sm max-w-none mb-2 space-y-4">
                  <ReactMarkdown>{response.response}</ReactMarkdown>
                </div>
                {sources.length > 0 && (
                  <div className="mt-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          Sources & References
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-64 max-h-60 overflow-y-auto">
                        <DropdownMenuLabel>Sources</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {sources.map((s, i) => (
                          <DropdownMenuItem key={i} className="whitespace-normal break-words">
                            <a className="underline" href={s} target="_blank" rel="noreferrer">
                              {s}
                            </a>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}

                {response.context_used && Object.keys(response.context_used).length > 0 && (
                  <div className="mt-3">
                    <h4 className="text-sm font-semibold mb-2 text-center text-primary">Context Used</h4>
                    <div className="bg-muted/40 p-3 rounded-md border">
                      <ul className="text-sm space-y-1">
                        {Object.entries(response.context_used).map(([k, v]) => (
                          <li key={k}>
                            <span className="font-bold">{prettyKey(k)}:</span>{" "}
                            <span className="text-muted-foreground">{String(v)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}

            {!response && !loading && (
              <div className="flex flex-col items-center justify-center h-48 text-center text-sm text-muted-foreground">
                <svg className="w-10 h-10 mb-3 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 2v6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M4 12h16" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M6 20h12" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                <div className="mb-2">Response panel</div>
                <div className="text-xs">Fill the form and click <span className="font-medium">Run Agent</span></div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
