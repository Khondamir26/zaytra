"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";


interface Agent {
  id: string;
  name: string;
  description: string;
}

const agents: Agent[] = [
  {
    id: "content-planner",
    name: "Content Planner",
    description: "Plan and structure content for your campaigns.",
  },
  {
    id: "trend-research",
    name: "Trend Research",
    description: "Research latest market and industry trends.",
  },
  {
    id: "email-writer",
    name: "Email Writer",
    description: "Generate professional email drafts instantly.",
  },
];

export default function AgentsGrid({
  onSelect,
}: {
  onSelect: (agent: Agent) => void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {agents.map((agent) => (
        <Card
          key={agent.id}
          className="cursor-pointer hover:shadow-xl transition"
          onClick={() => onSelect(agent)}
        >
          <CardHeader>
            <CardTitle>{agent.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{agent.description}</p>
            <Button className="mt-4 w-full">Open</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
