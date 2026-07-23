export interface DashboardStat {
  title: string;
  value: string | number;
  icon: string;
  color: string;
  change?: string;
  description?: string;
}

export interface ActivityItem {
  id: string;
  documentName: string;
  category: string;
  status: "Completed" | "Processing" | "Uploaded" | "Flagged";
  date: string;
  matchScore: number;
}

export interface RequirementItem {
  id: string;
  clause: string;
  title: string;
  category: "Technical" | "Financial" | "Legal" | "Compliance";
  description: string;
  complianceStatus: "Compliant" | "Non-Compliant" | "Needs Review";
  riskLevel: "High" | "Medium" | "Low";
  pageNumber: number;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  isStreaming?: boolean;
}

export interface SampleDocument {
  id: string;
  name: string;
  size: string;
  uploadDate: string;
  status: "Ready" | "Analyzing";
  requirementsCount: number;
}

export const dashboardStats: DashboardStat[] = [
  {
    title: "Total Tender Bids",
    value: "24",
    icon: "📄",
    color: "bg-blue-600",
    change: "+15% this month",
    description: "Active and archived bids"
  },
  {
    title: "Average Compliance",
    value: "94.2%",
    icon: "✅",
    color: "bg-emerald-600",
    change: "+3.4% overall",
    description: "Automated clause matching"
  },
  {
    title: "Pending Reviews",
    value: "5",
    icon: "⏳",
    color: "bg-amber-500",
    change: "2 high priority",
    description: "Requires manual check"
  },
  {
    title: "Risk Flags",
    value: "3",
    icon: "🚨",
    color: "bg-rose-600",
    change: "-2 from last week",
    description: "Legal or financial risks"
  }
];

export const recentActivity: ActivityItem[] = [
  {
    id: "act-1",
    documentName: "Smart_City_Infrastructure_RFP.pdf",
    category: "Infrastructure",
    status: "Completed",
    date: "24 Jul 2026",
    matchScore: 96
  },
  {
    id: "act-2",
    documentName: "Cloud_Migration_Tender_2026.docx",
    category: "IT & Software",
    status: "Processing",
    date: "23 Jul 2026",
    matchScore: 88
  },
  {
    id: "act-3",
    documentName: "Hospital_Equipment_Supply.pdf",
    category: "Healthcare",
    status: "Uploaded",
    date: "22 Jul 2026",
    matchScore: 79
  },
  {
    id: "act-4",
    documentName: "Metro_Signal_System_Procurement.pdf",
    category: "Transport",
    status: "Flagged",
    date: "20 Jul 2026",
    matchScore: 65
  }
];

export const requirementsData: RequirementItem[] = [
  {
    id: "REQ-001",
    clause: "Section 3.1.2",
    title: "ISO 27001 Certification",
    category: "Compliance",
    description: "Vendor must hold an active ISO 27001 Information Security Management certification at time of bid submission.",
    complianceStatus: "Compliant",
    riskLevel: "Low",
    pageNumber: 14
  },
  {
    id: "REQ-002",
    clause: "Section 4.5.1",
    title: "Annual Turnover Threshold",
    category: "Financial",
    description: "Minimum annual audited financial turnover of $10M for the past 3 consecutive fiscal years.",
    complianceStatus: "Compliant",
    riskLevel: "Low",
    pageNumber: 22
  },
  {
    id: "REQ-003",
    clause: "Section 6.2.0",
    title: "24/7 On-Site SLA Response",
    category: "Technical",
    description: "Guaranteed 1-hour physical on-site response time for critical hardware incidents across all specified locations.",
    complianceStatus: "Needs Review",
    riskLevel: "Medium",
    pageNumber: 38
  },
  {
    id: "REQ-004",
    clause: "Section 8.1.3",
    title: "Unlimited Indemnification Clause",
    category: "Legal",
    description: "Bidding entity must agree to uncapped liability for third-party intellectual property claims.",
    complianceStatus: "Non-Compliant",
    riskLevel: "High",
    pageNumber: 52
  },
  {
    id: "REQ-005",
    clause: "Section 9.4.0",
    title: "Data Sovereignty & Localization",
    category: "Compliance",
    description: "All customer data must reside strictly within local datacenter regions with zero external replication.",
    complianceStatus: "Compliant",
    riskLevel: "Low",
    pageNumber: 61
  }
];

export const initialChatMessages: ChatMessage[] = [
  {
    id: "msg-1",
    sender: "ai",
    text: "Hello! I am your BidReady AI assistant. I have processed **Smart_City_Infrastructure_RFP.pdf**. How can I assist you with requirements, risk analysis, or proposal generation?",
    timestamp: "10:30 AM"
  },
  {
    id: "msg-2",
    sender: "user",
    text: "What are the high-risk legal clauses in this tender?",
    timestamp: "10:31 AM"
  },
  {
    id: "msg-3",
    sender: "ai",
    text: "Based on our AI risk scan, Section 8.1.3 contains an **Unlimited Indemnification Clause** requiring uncapped liability for IP claims. We recommend negotiating a liability cap before submitting your bid proposal.",
    timestamp: "10:31 AM"
  }
];

export const sampleDocuments: SampleDocument[] = [
  {
    id: "doc-1",
    name: "Smart_City_Infrastructure_RFP.pdf",
    size: "4.2 MB",
    uploadDate: "24 Jul 2026",
    status: "Ready",
    requirementsCount: 42
  },
  {
    id: "doc-2",
    name: "Cloud_Migration_Tender_2026.docx",
    size: "2.8 MB",
    uploadDate: "23 Jul 2026",
    status: "Ready",
    requirementsCount: 28
  },
  {
    id: "doc-3",
    name: "Hospital_Equipment_Supply.pdf",
    size: "8.5 MB",
    uploadDate: "22 Jul 2026",
    status: "Analyzing",
    requirementsCount: 15
  }
];
