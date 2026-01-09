// src/config/agentsConfig.ts
export interface AgentConfig {
  id: string;
  name: string;
  description: string;
  endpoint: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultPayload?: Record<string, any>;
}

export const marketingAgents: AgentConfig[] = [
  {
    id: "market-trend-research",
    name: "Market Trend Research",
    description:
      "Research current marketing trends and market conditions (merged trend + market research).",
    endpoint: "market-trend-research",
    defaultPayload: {
      query: "",
      product_name: "",
      industry: "",
      target_audience: "",
      campaign_goal: "",
      competitor: "",
      platform: "",
    },
  },
  {
    id: "creative-ideas",
    name: "Creative Ideas",
    description: "Generate creative marketing ideas with optional image generation.",
    endpoint: "creative-ideas",
    defaultPayload: {
      query: "",
      product_name: "",
      industry: "",
      target_audience: "",
      campaign_goal: "",
      competitor: "",
      platform: "",
    },
  },
  {
    id: "company-profile",
    name: "Company Profile",
    description: "Generate a detailed profile of a company based on inputs.",
    endpoint: "company-profile",
    defaultPayload: {
      query: "",
      product_name: "",
      industry: "",
      target_audience: "",
      campaign_goal: "",
      competitor: "",
      platform: "",
    },
  },
  {
    id: "content-planner",
    name: "Content Planner",
    description: "Generate a detailed content strategy for a product or brand based on inputs.",
    endpoint: "content-planner",
    defaultPayload: {
      query: "",
      product_name: "",
      industry: "",
      target_audience: "",
      campaign_goal: "",
      platform: "",
      tone: "",
      duration: "",
    },
  },
  {
    id: "image-generation",
    name: "Image Generation",
    description: "Generate marketing or product images based on your inputs and campaign context.",
    endpoint: "image-generation",
    defaultPayload: {
      query: "",
      product_name: "",
      industry: "",
      target_audience: "",
      campaign_goal: "",
      competitor: "",
      platform: "",
      audience: "",
      tone: "",
      recipient: "",
      to: "",
      from_email: "",
      password: "",
      subject: "",
      send_email: false,
      channels: [],
      duration: ""
    }
  },
];
