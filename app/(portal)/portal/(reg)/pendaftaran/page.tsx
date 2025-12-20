"use client";

import {
  CancelCircleHalfDotIcon,
  CheckmarkBadge02Icon,
  FilterIcon,
  UserGroupIcon,
  UserSearch01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useQueryState } from "nuqs";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Input, InputWrapper } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MOCK_PARTICIPANTS,
  MOCK_SUBMISSION_CATEGORIES,
  MOCK_SUBMISSIONS,
} from "@/mock-data";
import { columns } from "./columns";

function PendaftaranPage() {
  const [tab, setTab] = useQueryState("tabs");
  const [search, setSearch] = useQueryState("search");

  const handleTabChange = (value: string) => {
    setTab(value);
    setSearch("");
  };

  // Calculate Stats
  const totalSubmissions = MOCK_SUBMISSIONS.length;
  const openSubmissions = MOCK_SUBMISSIONS.filter(
    (s) => s.status === "OPEN"
  ).length;
  const closedSubmissions = MOCK_SUBMISSIONS.filter(
    (s) => s.status === "CLOSED"
  ).length;
  const totalParticipants = MOCK_PARTICIPANTS.length; // From mock-data as requested

  // Filter Logic
  // Tab values: "all", "tk", "sd", "smp", "sma" (slugs)
  const getFilteredData = (currentTab: string) => {
    if (!currentTab || currentTab === "all") return MOCK_SUBMISSIONS;

    // Find category ID by mock category slug/name matching the tab
    // In mock data: slugs are "tk", "sd", "smp", "sma"
    const category = MOCK_SUBMISSION_CATEGORIES.find(
      (c) => c.slug === currentTab
    );
    if (!category) return MOCK_SUBMISSIONS;

    return MOCK_SUBMISSIONS.filter((s) => s.categoryId === category._id);
  };

  const currentData = getFilteredData(tab || "all");

  return (
    <div className="flex w-full flex-col">
      <div className="border-b grid grid-cols-4">
        <div className="flex flex-col gap-4 p-4 border-r">
          <p className="text-sm font-semibold">Total Pendaftaran</p>
          <p className="text-2xl font-bold">{totalSubmissions}</p>
        </div>
        <div className="flex flex-col gap-4 p-4 border-r">
          <p className="text-sm font-semibold">Dibuka</p>
          <p className="text-2xl font-bold">{openSubmissions}</p>
        </div>
        <div className="flex flex-col gap-4 p-4 border-r">
          <p className="text-sm font-semibold">Ditutup</p>
          <p className="text-2xl font-bold">{closedSubmissions}</p>
        </div>
        <div className="flex flex-col gap-4 p-4">
          <p className="text-sm font-semibold">Total Peserta (All)</p>
          <p className="text-2xl font-bold">{totalParticipants}</p>
        </div>
      </div>
      <Tabs onValueChange={handleTabChange} value={tab || "all"}>
        <TabsList variant="line" className="px-4">
          <TabsTrigger value="all" className="border-b">
            <HugeiconsIcon icon={UserGroupIcon} size={24} strokeWidth={2} />
            Semua
          </TabsTrigger>
          <TabsTrigger value="tk" className="border-b">
            TK
          </TabsTrigger>
          <TabsTrigger value="sd" className="border-b">
            SD
          </TabsTrigger>
          <TabsTrigger value="smp" className="border-b">
            SMP
          </TabsTrigger>
          <TabsTrigger value="sma" className="border-b">
            SMA
          </TabsTrigger>
        </TabsList>

        <div className="flex items-center gap-4 px-4 my-4">
          <InputWrapper className="w-fit" variant="sm">
            <HugeiconsIcon icon={UserSearch01Icon} strokeWidth={2} />
            <Input
              value={search || ""}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              variant="sm"
              placeholder="Cari pendaftaran..."
            />
          </InputWrapper>
        </div>

        <TabsContent value="all">
          <DataTable
            columns={columns}
            data={currentData}
            globalFilter={search || ""}
          />
        </TabsContent>
        <TabsContent value="tk">
          <DataTable
            columns={columns}
            data={currentData}
            globalFilter={search || ""}
          />
        </TabsContent>
        <TabsContent value="sd">
          <DataTable
            columns={columns}
            data={currentData}
            globalFilter={search || ""}
          />
        </TabsContent>
        <TabsContent value="smp">
          <DataTable
            columns={columns}
            data={currentData}
            globalFilter={search || ""}
          />
        </TabsContent>
        <TabsContent value="sma">
          <DataTable
            columns={columns}
            data={currentData}
            globalFilter={search || ""}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="w-full flex flex-1 items-center justify-center">
          Loading...
        </div>
      }
    >
      <PendaftaranPage />
    </Suspense>
  );
}
