"use client";

import {
    InboxIcon,
    Search01Icon,
    Sent02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useQueryState } from "nuqs";
import { DataTable } from "@/components/ui/data-table";
import { Input, InputWrapper } from "@/components/ui/input";
import { MOCK_POSTS } from "@/mock-data";
import { columns } from "./columns";

export default function Page() {
    const [search, setSearch] = useQueryState("search");

    // Filter for Blog posts only
    const blogPosts = MOCK_POSTS.filter((post) => post.type === "blog");

    // Calculate Stats
    const totalSemua = blogPosts.length;
    const totalPublished = blogPosts.filter((p) => p.isPublished).length;
    const totalDraft = blogPosts.filter((p) => !p.isPublished).length;

    return (
        <div className="flex flex-1 flex-col">
            <div className="border-b grid grid-cols-3">
                <div className="flex flex-col gap-4 p-4 border-r">
                    <div className="flex items-center gap-2">
                        <div className="bg-primary/10 p-2 rounded-full text-primary">
                            <HugeiconsIcon icon={InboxIcon} size={20} />
                        </div>
                        <p className="text-sm font-semibold">Total Artikel</p>
                    </div>
                    <p className="text-2xl font-bold">{totalSemua}</p>
                </div>
                <div className="flex flex-col gap-4 p-4 border-r">
                    <div className="flex items-center gap-2">
                        <div className="bg-success/10 p-2 rounded-full text-success">
                            <HugeiconsIcon icon={Sent02Icon} size={20} />
                        </div>
                        <p className="text-sm font-semibold">Published</p>
                    </div>
                    <p className="text-2xl font-bold">{totalPublished}</p>
                </div>
                <div className="flex flex-col gap-4 p-4">
                    <div className="flex items-center gap-2">
                        <div className="bg-warning/10 p-2 rounded-full text-warning">
                            <HugeiconsIcon icon={InboxIcon} size={20} />
                        </div>
                        <p className="text-sm font-semibold">Draft</p>
                    </div>
                    <p className="text-2xl font-bold">{totalDraft}</p>
                </div>
            </div>

            <div className="flex items-center justify-between px-4 py-4">
                <InputWrapper className="w-fit" variant="sm">
                    <HugeiconsIcon icon={Search01Icon} strokeWidth={2} />
                    <Input
                        value={search || ""}
                        onChange={(e) => setSearch(e.target.value)}
                        type="text"
                        variant="sm"
                        placeholder="Cari artikel..."
                    />
                </InputWrapper>
            </div>

            <div className="flex flex-1 flex-col">
                <DataTable
                    columns={columns}
                    data={blogPosts}
                    globalFilter={search || ""}
                />
            </div>
        </div>
    );
}
