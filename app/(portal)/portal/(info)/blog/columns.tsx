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

export type Post = {
    _id: string;
    title: string;
    slug: string;
    type: string;
    content: string;
    tags: string[];
    category: string;
    isPublished: boolean;
    createdAt: string;
    updatedAt: string;
};

export const columns: ColumnDef<Post>[] = [
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
        accessorKey: "title",
        header: ({ column }) => (
            <Menu>
                <MenuTrigger asChild>
                    <Button size="sm" variant="ghost">
                        Judul
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
        cell: ({ row }) => (
            <span className="font-medium">{row.getValue("title")}</span>
        ),
    },
    {
        accessorKey: "category",
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
    },
    {
        accessorKey: "isPublished",
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
            const isPublished = row.getValue("isPublished") as boolean;
            return (
                <div className="px-2">
                    <Badge
                        size="sm"
                        appearance="outline"
                        variant={isPublished ? "success" : "warning"}
                    >
                        {isPublished ? "Published" : "Draft"}
                    </Badge>
                </div>
            );
        },
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => (
            <Menu>
                <MenuTrigger asChild>
                    <Button size="sm" variant="ghost">
                        Dibuat Pada
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
            const date = row.getValue("createdAt") as string;
            return (
                <p className="text-sm px-2">
                    {moment(date).format("DD MMM YYYY, HH:mm")}
                </p>
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
                            <MenuItem>Edit</MenuItem>
                            <MenuItem className="text-destructive">Hapus</MenuItem>
                        </MenuGroup>
                    </MenuContent>
                </Menu>
            );
        },
    },
];
