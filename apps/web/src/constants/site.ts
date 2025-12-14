export const SITE_URL = "https://opencut.app";

export const SITE_INFO = {
  title: "OpenCut",
  description:
    "一个简单而强大的视频编辑器，完成任务。在浏览器中运行。",
  url: SITE_URL,
  openGraphImage: "/open-graph/default.jpg",
  twitterImage: "/open-graph/default.jpg",
  favicon: "/favicon.ico",
};

export const EXTERNAL_TOOLS = [
  {
    name: "Marble",
    description:
      "用于内容管理和 OpenCut 博客的现代无头 CMS",
    url: "https://marblecms.com?utm_source=opencut",
    icon: "MarbleIcon" as const,
  },
  {
    name: "Vercel",
    description: "我们部署和托管 OpenCut 的平台",
    url: "https://vercel.com?utm_source=opencut",
    icon: "VercelIcon" as const,
  },
  {
    name: "Databuddy",
    description: "符合 GDPR 的分析和用户洞察服务，用于 OpenCut",
    url: "https://databuddy.cc?utm_source=opencut",
    icon: "DataBuddyIcon" as const,
  },
];
