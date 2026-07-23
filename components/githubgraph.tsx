"use client"

import { useEffect, useState, cloneElement } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { useTheme } from "next-themes";
import { Tooltip } from "react-tooltip";

interface PR {
  id: number;
  title: string;
  url: string;
  repository: {
    nameWithOwner: string;
  };
  state: string;
  createdAt: string;
  mergedAt?: string;
  closedAt?: string;
}

interface GithubGraphProps {
  showPRs?: boolean;
}

const GithubGraph = ({ showPRs = true }: GithubGraphProps) => {
  const { theme } = useTheme();
  const [prs, setPrs] = useState<PR[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [filterType, setFilterType] = useState<"all" | "merged" | "open" | "closed">("all");
  const [closedPRIds] = useState<Set<number>>(new Set());
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const initialCount = 2;

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!showPRs) return;
    const fetchPRs = async () => {
      try {
        const searchQuery = filterType === "all"
          ? "author:Harsh16gupta type:pr"
          : filterType === "merged"
            ? "author:Harsh16gupta type:pr is:merged"
            : filterType === "open"
              ? "author:Harsh16gupta type:pr is:open"
              : "author:Harsh16gupta type:pr is:closed is:unmerged";

        const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN || "";
        let fetchedPRs: PR[] = [];

        // 1. Try REST Search API (works without token, but uses token if available for higher rate limits)
        try {
          const headers: HeadersInit = {
            "Accept": "application/vnd.github+json",
          };
          if (token) {
            headers["Authorization"] = `Bearer ${token}`;
          }

          const restUrl = `https://api.github.com/search/issues?q=${encodeURIComponent(searchQuery)}&sort=created&order=desc&per_page=100`;
          const response = await fetch(restUrl, { headers });

          if (response.ok) {
            const data = await response.json();
            if (data.items) {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              fetchedPRs = data.items.map((item: any) => {
                let prState = "OPEN";
                if (item.pull_request?.merged_at) {
                  prState = "MERGED";
                } else if (item.state === "closed") {
                  prState = "CLOSED";
                }

                return {
                  id: item.id,
                  title: item.title,
                  url: item.html_url,
                  repository: {
                    nameWithOwner: item.repository_url.replace("https://api.github.com/repos/", "")
                  },
                  state: prState,
                  createdAt: item.created_at,
                  mergedAt: item.pull_request?.merged_at || undefined,
                  closedAt: item.closed_at || undefined,
                };
              });
            }
          } else {
            console.warn(`REST API failed with status ${response.status}. Trying GraphQL fallback...`);
          }
        } catch (restError) {
          console.error("REST API fetch error:", restError);
        }

        // 2. Fallback to GraphQL if REST fails/returns empty, and a token is available
        if (fetchedPRs.length === 0 && token) {
          const query = `query {
            search(query: "${searchQuery} sort:created-desc", type: ISSUE, first: 100) {
              edges {
                node {
                  ... on PullRequest {
                    id
                    title
                    url
                    repository {
                      nameWithOwner
                    }
                    state
                    createdAt
                    mergedAt
                    closedAt
                  }
                }
              }
            }
          }`;

          const response = await fetch("https://api.github.com/graphql", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ query }),
          });

          if (response.ok) {
            const data = await response.json();
            if (data.data?.search?.edges) {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              fetchedPRs = data.data.search.edges.map((edge: any) => edge.node);
            }
          }
        }

        // Sort by date (newest first)
        fetchedPRs.sort((a: PR, b: PR) => {
          const dateA = new Date(b.mergedAt || b.closedAt || b.createdAt).getTime();
          const dateB = new Date(a.mergedAt || a.closedAt || a.createdAt).getTime();
          return dateA - dateB;
        });

        setPrs(fetchedPRs);
        setShowAll(false);
      } catch (error) {
        console.error("Failed to fetch PRs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPRs();
  }, [filterType, showPRs]);

  return (
    <div>
      <div className="w-auto border-t border-dashed border-neutral-300 dark:border-neutral-800 mb-2 -mx-4 sm:-mx-6 md:-mx-12 lg:-mx-20"></div>


      <h1 className="text-neutral-900 dark:text-neutral-50 font-custom font-bold text-2xl sm:text-3xl tracking-tight py-2"><span className="link--elara">Proof Of Work</span></h1>
      <div className="w-auto border-t border-dashed border-neutral-300 dark:border-neutral-800 mb-4 -mx-4 sm:-mx-6 md:-mx-12 lg:-mx-20"></div>
      <p className="hidden sm:inline-block font-custom2 text-neutral-700 dark:text-neutral-300 mt-3 px-2 py-[7px]
           text-sm
          bg-neutral-100 dark:bg-neutral-900 border-dashed border-neutral-300 dark:border-neutral-700 border mb-6"> I live spending time in open source,building real stuff and solving real problems</p>




      {/* Graph Component */}
      <div className="w-full flex justify-center overflow-x-auto">
        <div className="flex w-full justify-center min-w-0">
          {mounted && (
            <>
              <GitHubCalendar
                username="Harsh16gupta"
                colorScheme={theme === "dark" ? "dark" : "light"}
                blockSize={isMobile ? 6 : 10}
                blockMargin={isMobile ? 2 : 3}
                fontSize={isMobile ? 10 : 12}
                style={{
                  color: theme === "dark" ? "#e5e5e5" : "#171717",
                }}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                renderBlock={(block: any, activity: any) =>
                  cloneElement(block, {
                    "data-tooltip-id": "github-tooltip",
                    "data-tooltip-content": `${activity.count} contributions on ${activity.date}`,
                  })
                }
              />
              <Tooltip
                id="github-tooltip"
                style={{
                  backgroundColor: theme === "dark" ? "#171717" : "#ffffff",
                  color: theme === "dark" ? "#e5e5e5" : "#171717",
                  borderRadius: "8px",
                  padding: "8px 12px",
                  fontSize: "12px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                  border: theme === "dark" ? "1px solid #404040" : "1px solid #e5e5e5",
                  opacity: 1,
                }}
              />
            </>
          )}
        </div>
      </div>
      {showPRs && (
        <div className="mt-4">
          <div className="mb-1 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-neutral-900 dark:text-neutral-50 font-custom font-bold text-2xl tracking-tight">
              <span className="link--elara">Pull Requests</span>
            </h2>
            <div className="flex items-center gap-2">
              <div className="relative grid grid-cols-4 p-0.5 sm:p-1 bg-black/5 dark:bg-white/5 rounded-lg border border-neutral-300/30 dark:border-neutral-700/30 w-fit select-none">
                {/* Sliding Pill Background */}
                <div
                  className={`absolute top-0.5 sm:top-1 bottom-0.5 sm:bottom-1 left-0.5 sm:left-1 w-[calc((100%-4px)/4)] sm:w-[calc((100%-8px)/4)] rounded bg-white dark:bg-neutral-800 shadow-sm transition-transform duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] transform will-change-transform ${filterType === "all" ? "translate-x-0" : filterType === "merged" ? "translate-x-[100%]" : filterType === "open" ? "translate-x-[200%]" : "translate-x-[300%]"
                    }`}
                />

                {/* Buttons */}
                <button
                  onClick={() => setFilterType("all")}
                  className={`z-10 relative px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium text-center transition-colors duration-200 ${filterType === "all"
                    ? "text-neutral-900 dark:text-neutral-50"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
                    }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilterType("merged")}
                  className={`z-10 relative px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium text-center transition-colors duration-200 ${filterType === "merged"
                    ? "text-neutral-900 dark:text-neutral-50"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
                    }`}
                >
                  Merged
                </button>
                <button
                  onClick={() => setFilterType("open")}
                  className={`z-10 relative px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium text-center transition-colors duration-200 ${filterType === "open"
                    ? "text-neutral-900 dark:text-neutral-50"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
                    }`}
                >
                  Open
                </button>
                <button
                  onClick={() => setFilterType("closed")}
                  className={`z-10 relative px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium text-center transition-colors duration-200 ${filterType === "closed"
                    ? "text-neutral-900 dark:text-neutral-50"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
                    }`}
                >
                  Closed
                </button>
              </div>
            </div>
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 font-custom2 mb-4">
            {filterType === "all"
              ? "All pull requests"
              : filterType === "merged"
                ? "Merged contributions to open source"
                : filterType === "open"
                  ? "Active pull requests"
                  : "Closed pull requests"}
          </p>
          <div className="w-auto border-t border-dashed border-neutral-300 dark:border-neutral-800 mb-4 -mx-4 sm:-mx-6 md:-mx-12 lg:-mx-20 mt-6"></div>

          {loading ? (
            <div className="text-neutral-600 dark:text-neutral-400 font-custom2 text-sm mt-4">Loading pull requests...</div>
          ) : prs.length > 0 ? (
            <div>
              <div className="space-y-2 mt-5">
                {prs.slice(0, showAll ? prs.length : initialCount).filter(pr => !closedPRIds.has(pr.id)).map((pr) => (
                  <div key={pr.id} className="group flex items-start gap-3 p-3 rounded-md transition-all duration-200 hover:bg-neutral-100 dark:hover:bg-neutral-800/50 border border-transparent hover:border-neutral-300/50 dark:hover:border-neutral-700/50">
                    <div className="shrink-0 mt-0.5">
                      <div className={`w-1 h-1 rounded-full group-hover:scale-150 transition-transform duration-200 ${pr.state === "MERGED"
                        ? "bg-linear-to-r from-purple-400 to-pink-400"
                        : pr.state === "OPEN"
                          ? "bg-linear-to-r from-green-400 to-emerald-400"
                          : "bg-linear-to-r from-red-400 to-rose-400"
                        }`}></div>
                    </div>
                    <a
                      href={pr.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 min-w-0 hover:no-underline"
                    >
                      <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-50 group-hover:text-neutral-700 dark:group-hover:text-neutral-200 transition-colors truncate">
                        {pr.title}
                      </h3>
                      <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-0.5 font-custom2">
                        {pr.repository.nameWithOwner}
                      </p>
                    </a>
                  </div>
                ))}
              </div>
              {prs.length > initialCount && (
                <div className="flex justify-center mt-6">
                  <button
                    onClick={() => setShowAll(!showAll)}
                    className="group relative overflow-hidden rounded-lg w-full
                            bg-linear-to-b from-white to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 
                            border border-neutral-200 dark:border-neutral-800 
                            text-neutral-800 dark:text-neutral-200 text-xs sm:text-sm font-medium px-4 sm:px-6 py-2 sm:py-2.5 
                            transition-all duration-300 
                            hover:from-neutral-50 hover:to-neutral-100 dark:hover:from-neutral-800 dark:hover:to-neutral-800
                            shadow-[0_1px_2px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,1)] 
                            dark:shadow-[0_1px_2px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)]"
                  >
                    {showAll ? "↑ Collapse" : `↓ Expand • ${prs.length - closedPRIds.size - initialCount} more`}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-secondary font-custom2 text-sm mt-4">No pull requests found</div>
          )}
        </div>
      )}
    </div>

  );
};

export default GithubGraph;
