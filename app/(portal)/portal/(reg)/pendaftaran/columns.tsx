"use client";

import {
    SortingAZ01Icon,
    SortingAZ02Icon,
    SortingZA01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { ColumnDef } from "@tanstack/react-table";
import { ChevronsUpDown, MoreHorizontal } from "lucide-react";
import moment from "moment-timezone";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu as Menu,
    DropdownMenuContent as MenuContent,
    DropdownMenuGroup as MenuGroup,
    DropdownMenuLabel as MenuGroupLabel,
    DropdownMenuItem as MenuItem,
    DropdownMenuSeparator as MenuSeparator,
    DropdownMenuTrigger as MenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { MOCK_SUBMISSION_CATEGORIES } from "@/mock-data";

// Type definition based on mock data
export type Submission = {
    _id: string;
    name: string;
    slug: string;
    categoryId: string;
    status: string; // OPEN, CLOSED, SCHEDULED
    openDate: string;
    closeDate: string;
    quota: number;
    academicYear: string;
    description: string;
    createdAt: string;
    updatedAt: string;
};

// Helper to get category name
const getCategoryName = (categoryId: string) => {
    const category = MOCK_SUBMISSION_CATEGORIES.find((c) => c._id === categoryId);
    return category ? category.name : categoryId;
};

export const columns: ColumnDef<Submission>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                size="sm"
                className="rounded-sm"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                size="sm"
                className="rounded-sm"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "_id",
        header: ({ column }) => (
            <Menu>
                <MenuTrigger asChild>
                    <Button size="sm" variant="ghost">
                        ID
                        {column.getIsSorted() ? (
                            column.getIsSorted() === "asc" ? (
                                <HugeiconsIcon icon={SortingAZ02Icon} />
                            ) : (
                                <HugeiconsIcon icon={SortingZA01Icon} />
                            )
                        ) : (
                            <ChevronsUpDown />
                        )}
                    </Button>
                </MenuTrigger>
                <MenuContent align="start">
                    <MenuGroup>
                        <MenuItem onClick={() => column.toggleSorting(false)}>
                            <HugeiconsIcon icon={SortingAZ02Icon} /> Asc
                        </MenuItem>
                        <MenuItem onClick={() => column.toggleSorting(true)}>
                            <HugeiconsIcon icon={SortingZA01Icon} /> Desc
                        </MenuItem>
                        <MenuItem onClick={() => column.clearSorting()}>
                            <HugeiconsIcon icon={SortingAZ01Icon} /> Default
                        </MenuItem>
                    </MenuGroup>
                </MenuContent>
            </Menu>
        ),
    },
    {
        accessorKey: "name",
        header: ({ column }) => (
            <Menu>
                <MenuTrigger asChild>
                    <Button size="sm" variant="ghost">
                        Nama
                        {column.getIsSorted() ? (
                            column.getIsSorted() === "asc" ? (
                                <HugeiconsIcon icon={SortingAZ02Icon} />
                            ) : (
                                <HugeiconsIcon icon={SortingZA01Icon} />
                            )
                        ) : (
                            <ChevronsUpDown />
                        )}
                    </Button>
                </MenuTrigger>
                <MenuContent align="start">
                    <MenuGroup>
                        <MenuItem onClick={() => column.toggleSorting(false)}>
                            <HugeiconsIcon icon={SortingAZ02Icon} /> Asc
                        </MenuItem>
                        <MenuItem onClick={() => column.toggleSorting(true)}>
                            <HugeiconsIcon icon={SortingZA01Icon} /> Desc
                        </MenuItem>
                        <MenuItem onClick={() => column.clearSorting()}>
                            <HugeiconsIcon icon={SortingAZ01Icon} /> Default
                        </MenuItem>
                    </MenuGroup>
                </MenuContent>
            </Menu>
        ),
    },
    {
        accessorKey: "categoryId",
        header: ({ column }) => (
            <Menu>
                <MenuTrigger asChild>
                    <Button size="sm" variant="ghost">
                        Kategori
                        {column.getIsSorted() ? (
                            column.getIsSorted() === "asc" ? (
                                <HugeiconsIcon icon={SortingAZ02Icon} />
                            ) : (
                                <HugeiconsIcon icon={SortingZA01Icon} />
                            )
                        ) : (
                            <ChevronsUpDown />
                        )}
                    </Button>
                </MenuTrigger>
                <MenuContent align="start">
                    <MenuGroup>
                        <MenuItem onClick={() => column.toggleSorting(false)}>
                            <HugeiconsIcon icon={SortingAZ02Icon} /> Asc
                        </MenuItem>
                        <MenuItem onClick={() => column.toggleSorting(true)}>
                            <HugeiconsIcon icon={SortingZA01Icon} /> Desc
                        </MenuItem>
                        <MenuItem onClick={() => column.clearSorting()}>
                            <HugeiconsIcon icon={SortingAZ01Icon} /> Default
                        </MenuItem>
                    </MenuGroup>
                </MenuContent>
            </Menu>
        ),
        cell: ({ row }) => {
            return getCategoryName(row.getValue("categoryId"));
        },
    },
    {
        accessorKey: "academicYear",
        header: ({ column }) => (
            <Menu>
                <MenuTrigger asChild>
                    <Button size="sm" variant="ghost">
                        Tahun Ajaran
                        {column.getIsSorted() ? (
                            column.getIsSorted() === "asc" ? (
                                <HugeiconsIcon icon={SortingAZ02Icon} />
                            ) : (
                                <HugeiconsIcon icon={SortingZA01Icon} />
                            )
                        ) : (
                            <ChevronsUpDown />
                        )}
                    </Button>
                </MenuTrigger>
                <MenuContent align="start">
                    <MenuGroup>
                        <MenuItem onClick={() => column.toggleSorting(false)}>
                            <HugeiconsIcon icon={SortingAZ02Icon} /> Asc
                        </MenuItem>
                        <MenuItem onClick={() => column.toggleSorting(true)}>
                            <HugeiconsIcon icon={SortingZA01Icon} /> Desc
                        </MenuItem>
                        <MenuItem onClick={() => column.clearSorting()}>
                            <HugeiconsIcon icon={SortingAZ01Icon} /> Default
                        </MenuItem>
                    </MenuGroup>
                </MenuContent>
            </Menu>
        ),
    },
    {
        accessorKey: "quota",
        header: ({ column }) => (
            <Menu>
                <MenuTrigger asChild>
                    <Button size="sm" variant="ghost">
                        Kuota
                        {column.getIsSorted() ? (
                            column.getIsSorted() === "asc" ? (
                                <HugeiconsIcon icon={SortingAZ02Icon} />
                            ) : (
                                <HugeiconsIcon icon={SortingZA01Icon} />
                            )
                        ) : (
                            <ChevronsUpDown />
                        )}
                    </Button>
                </MenuTrigger>
                <MenuContent align="start">
                    <MenuGroup>
                        <MenuItem onClick={() => column.toggleSorting(false)}>
                            <HugeiconsIcon icon={SortingAZ02Icon} /> Asc
                        </MenuItem>
                        <MenuItem onClick={() => column.toggleSorting(true)}>
                            <HugeiconsIcon icon={SortingZA01Icon} /> Desc
                        </MenuItem>
                        <MenuItem onClick={() => column.clearSorting()}>
                            <HugeiconsIcon icon={SortingAZ01Icon} /> Default
                        </MenuItem>
                    </MenuGroup>
                </MenuContent>
            </Menu>
        ),
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <Menu>
                <MenuTrigger asChild>
                    <Button size="sm" variant="ghost">
                        Status
                        {column.getIsSorted() ? (
                            column.getIsSorted() === "asc" ? (
                                <HugeiconsIcon icon={SortingAZ02Icon} />
                            ) : (
                                <HugeiconsIcon icon={SortingZA01Icon} />
                            )
                        ) : (
                            <ChevronsUpDown />
                        )}
                    </Button>
                </MenuTrigger>
                <MenuContent align="start">
                    <MenuGroup>
                        <MenuItem onClick={() => column.toggleSorting(false)}>
                            <HugeiconsIcon icon={SortingAZ02Icon} /> Asc
                        </MenuItem>
                        <MenuItem onClick={() => column.toggleSorting(true)}>
                            <HugeiconsIcon icon={SortingZA01Icon} /> Desc
                        </MenuItem>
                        <MenuItem onClick={() => column.clearSorting()}>
                            <HugeiconsIcon icon={SortingAZ01Icon} /> Default
                        </MenuItem>
                    </MenuGroup>
                </MenuContent>
            </Menu>
        ),
        cell: ({ row }) => {
            const status = row.getValue("status") as string;
            return (
                <div className="px-2">
                    <Badge
                        size="sm"
                        appearance="outline"
                        variant={
                            status === "OPEN"
                                ? "success"
                                : status === "CLOSED"
                                    ? "destructive"
                                    : "warning"
                        }
                    >
                        {status.toLowerCase().charAt(0).toUpperCase() +
                            status.toLowerCase().slice(1)}
                    </Badge>
                </div>
            );
        },
    },
    {
        accessorKey: "openDate",
        header: ({ column }) => (
            <Menu>
                <MenuTrigger asChild>
                    <Button size="sm" variant="ghost">
                        Tanggal Buka
                        {column.getIsSorted() ? (
                            column.getIsSorted() === "asc" ? (
                                <HugeiconsIcon icon={SortingAZ02Icon} />
                            ) : (
                                <HugeiconsIcon icon={SortingZA01Icon} />
                            )
                        ) : (
                            <ChevronsUpDown />
                        )}
                    </Button>
                </MenuTrigger>
                <MenuContent align="start">
                    <MenuGroup>
                        <MenuItem onClick={() => column.toggleSorting(false)}>
                            <HugeiconsIcon icon={SortingAZ02Icon} /> Asc
                        </MenuItem>
                        <MenuItem onClick={() => column.toggleSorting(true)}>
                            <HugeiconsIcon icon={SortingZA01Icon} /> Desc
                        </MenuItem>
                        <MenuItem onClick={() => column.clearSorting()}>
                            <HugeiconsIcon icon={SortingAZ01Icon} /> Default
                        </MenuItem>
                    </MenuGroup>
                </MenuContent>
            </Menu>
        ),
        cell: ({ row }) => {
            const date = row.getValue("openDate") as string;
            return (
                <p className="text-sm px-2">{moment(date).format("DD MMM YYYY")}</p>
            );
        },
    },
    {
        accessorKey: "closeDate",
        header: ({ column }) => (
            <Menu>
                <MenuTrigger asChild>
                    <Button size="sm" variant="ghost">
                        Tanggal Tutup
                        {column.getIsSorted() ? (
                            column.getIsSorted() === "asc" ? (
                                <HugeiconsIcon icon={SortingAZ02Icon} />
                            ) : (
                                <HugeiconsIcon icon={SortingZA01Icon} />
                            )
                        ) : (
                            <ChevronsUpDown />
                        )}
                    </Button>
                </MenuTrigger>
                <MenuContent align="start">
                    <MenuGroup>
                        <MenuItem onClick={() => column.toggleSorting(false)}>
                            <HugeiconsIcon icon={SortingAZ02Icon} /> Asc
                        </MenuItem>
                        <MenuItem onClick={() => column.toggleSorting(true)}>
                            <HugeiconsIcon icon={SortingZA01Icon} /> Desc
                        </MenuItem>
                        <MenuItem onClick={() => column.clearSorting()}>
                            <HugeiconsIcon icon={SortingAZ01Icon} /> Default
                        </MenuItem>
                    </MenuGroup>
                </MenuContent>
            </Menu>
        ),
        cell: ({ row }) => {
            const date = row.getValue("closeDate") as string;
            return (
                <p className="text-sm px-2">{moment(date).format("DD MMM YYYY")}</p>
            );
        },
    },
    {
        accessorKey: "progress",
        header: () => (
            <p className="text-xs font-medium text-accent-foreground">Progress</p>
        ),
        cell: ({ row }) => {
            return (
                <div className="w-full mt-1 flex gap-0.5">
                    {Array.from({ length: 30 }).map((_, i) => (
                        <div
                            key={i}
                            className={cn(
                                "h-2.5 w-0.5 rounded-full flex-1",
                                i < Math.round((70 / 100) * 30) ? "bg-green-500" : "bg-muted",
                            )}
                        />
                    ))}
                </div>
            );
        },
    },
    {
        id: "actions",
        header: "",
        cell: ({ row }) => {
            return (
                <Menu>
                    <MenuTrigger asChild>
                        <Button size="sm" mode="icon" variant="ghost">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </MenuTrigger>
                    <MenuContent>
                        <MenuGroup>
                            <MenuGroupLabel>Aksi</MenuGroupLabel>
                            <MenuItem
                                onClick={() => navigator.clipboard.writeText(row.original._id)}
                            >
                                Salin ID
                            </MenuItem>
                            <MenuSeparator />
                            <MenuItem>Lihat Detail</MenuItem>
                            <MenuItem>Edit</MenuItem>
                        </MenuGroup>
                    </MenuContent>
                </Menu>
            );
        },
    },
];
