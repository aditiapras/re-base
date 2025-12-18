"use client";

import { usePathname } from "next/navigation";

export function Breadcrumbs() {
    const pathname = usePathname();
    const segments = pathname.split("/").filter((segment) => segment !== "");

    // Jika di root portal atau tidak ada segment, tampilkan Portal
    if (segments.length === 0 || (segments[0] === "portal" && segments.length === 1)) {
        return <h1 className="text-sm font-semibold">Portal</h1>;
    }

    // Ambil judul path awal setelah root (misal: /portal/peserta -> Peserta)
    // Jika path-nya bukan portal, ambil segment pertama
    const segmentToShow = segments[0] === "portal" ? segments[1] : segments[0];

    if (!segmentToShow) return <h1 className="text-sm font-semibold">Portal</h1>;

    const title = segmentToShow.charAt(0).toUpperCase() + segmentToShow.slice(1);

    return (
        <h1 className="text-sm font-semibold">{title}</h1>
    );
}
