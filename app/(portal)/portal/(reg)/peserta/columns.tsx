"use client";

import {
  Doc02Icon,
  DocumentAttachmentIcon,
  Location04Icon,
  Mortarboard02Icon,
  SortingAZ01Icon,
  SortingAZ02Icon,
  SortingZA01Icon,
  UserAccountIcon,
  UserMultipleIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { ColumnDef } from "@tanstack/react-table";
import { Check, ChevronsUpDown, MoreHorizontal, X } from "lucide-react";
import moment from "moment-timezone";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Checkbox } from "@/components/ui/checkbox";
import DialogContent, {
  Dialog,
  DialogBody,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu as Menu,
  DropdownMenuContent as MenuContent,
  DropdownMenuGroup as MenuGroup,
  DropdownMenuLabel as MenuGroupLabel,
  DropdownMenuItem as MenuItem,
  DropdownMenuSeparator as MenuSeparator,
  DropdownMenuTrigger as MenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MOCK_ADDRESSES, MOCK_EDUCATIONS, MOCK_PARENTS } from "@/mock-data";
import { ScrollArea } from "@/components/ui/scroll-area";

// Use mocked data type for now, or define a proper interface if shared
export type Participant = {
  _id: string;
  submissionId: string;
  submissionStatus: string; // "Lulus", "Tidak Lulus", dll.
  isVerified: boolean;
  name: string;
  nickname: string;
  nik: string;
  nisn: string;
  gender: string;
  dateOfBirth: string;
  placeOfBirth: string;
  religion: string;
  nationality: string;
  hobby: string;
  aspiration: string;
  birthOrder: number;
  totalSiblings: number;
  birthStatus: string;
  bloodType: string;
};

type ParticipantAddress = {
  participantId: Participant["_id"];
  address: string;
  district: string;
  subDistrict: string;
  city: string;
  province: string;
  postalCode: string;
};

type ParticipantEducation = {
  participantId: Participant["_id"];
  schoolName: string;
  schoolAddress: string;
  schoolCity: string;
  schoolDistrict: string;
  schoolSubDistrict: string;
  schoolProvince: string;
  schoolPostalCode: string;
  schoolPhone: string;
  schoolEmail: string;
};

type ParticipantParent = {
  participantId: Participant["_id"];
  parentPhone: string;
  parentEmail: string;
  fatherName: string;
  fatherNationalId: string;
  fatherBirthPlace: string;
  fatherBirthDate: string;
  fatherReligion: string;
  fatherOccupation: string;
  fatherEducation: string;
  fatherIncome: string;
  fatherCitizenship: string;
  motherName: string;
  motherNationalId: string;
  motherBirthPlace: string;
  motherBirthDate: string;
  motherReligion: string;
  motherOccupation: string;
  motherEducation: string;
  motherIncome: string;
  motherCitizenship: string;
};

const participantAddressMap = new Map<string, ParticipantAddress>(
  (MOCK_ADDRESSES as ParticipantAddress[]).map((address) => [
    address.participantId,
    address,
  ])
);

const participantEducationMap = new Map<string, ParticipantEducation>(
  (MOCK_EDUCATIONS as ParticipantEducation[]).map((education) => [
    education.participantId,
    education,
  ])
);

const participantParentMap = new Map<string, ParticipantParent>(
  (MOCK_PARENTS as ParticipantParent[]).map((parent) => [
    parent.participantId,
    parent,
  ])
);

const formatParticipantValue = (
  value: string | number | boolean | null | undefined
) => {
  if (value === null || value === undefined || value === "") {
    return "-";
  }
  if (typeof value === "boolean") {
    return value ? "Ya" : "Tidak";
  }
  return value.toString();
};

const formatDateValue = (date?: string) => {
  if (!date) return "-";
  const dateMoment = moment(date);
  return dateMoment.isValid()
    ? dateMoment.tz("Asia/Jakarta").format("DD MMMM YYYY")
    : "-";
};

const buildProfileItems = (participant: Participant) => {
  const formattedBirthDate = formatDateValue(participant.dateOfBirth);

  return [
    { label: "Nama Lengkap", value: participant.name },
    { label: "Nama Panggilan", value: participant.nickname },
    { label: "NIK", value: participant.nik },
    { label: "NISN", value: participant.nisn },
    { label: "Tempat Lahir", value: participant.placeOfBirth },
    { label: "Tanggal Lahir", value: formattedBirthDate },
    { label: "Jenis Kelamin", value: participant.gender },
    { label: "Agama", value: participant.religion },
    { label: "Kewarganegaraan", value: participant.nationality },
    { label: "Hobi", value: participant.hobby },
    { label: "Cita-cita", value: participant.aspiration },
    { label: "Anak Ke-", value: participant.birthOrder },
    { label: "Jumlah Saudara", value: participant.totalSiblings },
    { label: "Status Kelahiran", value: participant.birthStatus },
    { label: "Golongan Darah", value: participant.bloodType },
  ].map((item) => ({
    ...item,
    value: formatParticipantValue(item.value),
  }));
};

const buildParentItems = (parent?: ParticipantParent) => ({
  father: [
    { label: "Nama Ayah", value: parent?.fatherName },
    { label: "NIK Ayah", value: parent?.fatherNationalId },
    { label: "Tempat Lahir", value: parent?.fatherBirthPlace },
    { label: "Tanggal Lahir", value: formatDateValue(parent?.fatherBirthDate) },
    { label: "Agama", value: parent?.fatherReligion },
    { label: "Pendidikan Terakhir", value: parent?.fatherEducation },
    { label: "Pekerjaan", value: parent?.fatherOccupation },
    { label: "Penghasilan", value: parent?.fatherIncome },
    { label: "Kewarganegaraan", value: parent?.fatherCitizenship },
    { label: "Kontak", value: parent?.parentPhone },
    { label: "Email", value: parent?.parentEmail },
  ].map((item) => ({
    ...item,
    value: formatParticipantValue(item.value),
  })),
  mother: [
    { label: "Nama Ibu", value: parent?.motherName },
    { label: "NIK Ibu", value: parent?.motherNationalId },
    { label: "Tempat Lahir", value: parent?.motherBirthPlace },
    { label: "Tanggal Lahir", value: formatDateValue(parent?.motherBirthDate) },
    { label: "Agama", value: parent?.motherReligion },
    { label: "Pendidikan Terakhir", value: parent?.motherEducation },
    { label: "Pekerjaan", value: parent?.motherOccupation },
    { label: "Penghasilan", value: parent?.motherIncome },
    { label: "Kewarganegaraan", value: parent?.motherCitizenship },
    { label: "Kontak", value: parent?.parentPhone },
    { label: "Email", value: parent?.parentEmail },
  ].map((item) => ({
    ...item,
    value: formatParticipantValue(item.value),
  })),
});

const buildAddressItems = (address?: ParticipantAddress) =>
  [
    { label: "Alamat", value: address?.address },
    { label: "Kecamatan", value: address?.district },
    { label: "Kelurahan", value: address?.subDistrict },
    { label: "Kota/Kabupaten", value: address?.city },
    { label: "Provinsi", value: address?.province },
    { label: "Kode Pos", value: address?.postalCode },
  ].map((item) => ({
    ...item,
    value: formatParticipantValue(item.value),
  }));

const buildEducationItems = (education?: ParticipantEducation) =>
  [
    { label: "Nama Sekolah", value: education?.schoolName },
    { label: "Alamat Sekolah", value: education?.schoolAddress },
    { label: "Kota/Kabupaten", value: education?.schoolCity },
    { label: "Kecamatan", value: education?.schoolDistrict },
    { label: "Kelurahan", value: education?.schoolSubDistrict },
    { label: "Provinsi", value: education?.schoolProvince },
    { label: "Kode Pos", value: education?.schoolPostalCode },
    { label: "Telepon Sekolah", value: education?.schoolPhone },
    { label: "Email Sekolah", value: education?.schoolEmail },
  ].map((item) => ({
    ...item,
    value: formatParticipantValue(item.value),
  }));

export const columns: ColumnDef<Participant>[] = [
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
    accessorKey: "submissionId",
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
    cell: ({ row }) => <p className="truncate">{row.original.submissionId}</p>,
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
    cell: ({ row }) => (
      <Sheet>
        {/* <SheetOverlay className="z-20" /> */}
        <SheetTrigger asChild>
          <Button mode="link" underline="dashed">
            {row.original.name}
          </Button>
        </SheetTrigger>
        <SheetContent className="min-w-1/2 p-5">
          <SheetHeader>
            <SheetTitle>Detail Peserta</SheetTitle>
            <SheetDescription>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis,
              expedita!
            </SheetDescription>
          </SheetHeader>

          <div className=" border-t py-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarFallback>AC</AvatarFallback>
                  <AvatarImage src="https://github.com/shadcn.png" />
                </Avatar>
                <p className="font-semibold text-xl">{row.original.name}</p>
              </div>
              <ButtonGroup>
                <Button size="sm" variant="outline">
                  <Check />
                  Verifikasi
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-destructive"
                    >
                      <X />
                      Tolak Verifikasi
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Tolak Verifikasi</DialogTitle>
                      <DialogDescription>
                        Apakah anda yakin ingin menolak verifikasi peserta ini?
                      </DialogDescription>
                    </DialogHeader>
                    <DialogBody>
                      <div className="flex flex-col gap-3">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">
                            Alasan Penolakan
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Pilih alasan kenapa verifikasi peserta perlu
                            ditolak.
                          </p>
                        </div>
                        <Select defaultValue="dokumen-tidak-sesuai">
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih alasan penolakan" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="dokumen-tidak-sesuai">
                              Dokumen tidak sesuai
                            </SelectItem>
                            <SelectItem value="data-tidak-lengkap">
                              Data belum lengkap
                            </SelectItem>
                            <SelectItem value="identitas-tidak-valid">
                              Identitas tidak valid
                            </SelectItem>
                            <SelectItem value="lainnya">
                              Alasan lainnya
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </DialogBody>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Batal</Button>
                      </DialogClose>
                      <Button variant="outline" className="text-destructive">
                        Tolak Verifikasi
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </ButtonGroup>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <p className="text-muted-foreground">
                ID:{" "}
                <span className="font-semibold text-accent-foreground">
                  {row.original.submissionId}
                </span>
              </p>
              <p className="text-muted-foreground">
                Status:{" "}
                <Badge variant="primary" appearance="outline">
                  {row.original.submissionStatus}
                </Badge>
              </p>
              <p className="text-muted-foreground">
                Terakhir Update:{" "}
                <span className="font-semibold text-accent-foreground">
                  1 Jam Lalu
                </span>
              </p>
            </div>
          </div>

          <Tabs defaultValue="profile">
            <TabsList variant="line">
              <TabsTrigger className="border-b" value="profile">
                <HugeiconsIcon icon={UserAccountIcon} />
                Profile
              </TabsTrigger>
              <TabsTrigger className="border-b" value="address">
                <HugeiconsIcon icon={Location04Icon} />
                Alamat
              </TabsTrigger>
              <TabsTrigger className="border-b" value="parent">
                <HugeiconsIcon icon={UserMultipleIcon} />
                Data Orang Tua
              </TabsTrigger>
              <TabsTrigger className="border-b" value="education">
                <HugeiconsIcon icon={Mortarboard02Icon} />
                Riwayat Pendidikan
              </TabsTrigger>
              <TabsTrigger className="border-b" value="document">
                <HugeiconsIcon icon={DocumentAttachmentIcon} />
                Dokumen
              </TabsTrigger>
            </TabsList>
            <TabsContent value="profile">
              <div className="flex flex-col gap-4">
                <p className="text-sm font-semibold">Data Diri</p>
                <div className="grid grid-cols-4 gap-8">
                  {buildProfileItems(row.original).map((item) => (
                    <div
                      key={item.label}
                      className="col-span-2 flex items-center justify-between border-b border-dashed pb-2"
                    >
                      <p className="text-sm text-muted-foreground">
                        {item.label}
                      </p>
                      <p className="text-sm font-semibold">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="address">
              <ScrollArea className="flex flex-col gap-4">
                {/* <div className="flex flex-col gap-4"> */}
                <p className="text-sm font-semibold">Alamat</p>
                <div className="grid grid-cols-4 gap-8">
                  {buildAddressItems(
                    participantAddressMap.get(row.original._id)
                  ).map((item) => (
                    <div
                      key={item.label}
                      className="col-span-2 flex items-center justify-between border-b border-dashed pb-2"
                    >
                      <p className="text-sm text-muted-foreground">
                        {item.label}
                      </p>
                      <p className="text-sm font-semibold">{item.value}</p>
                    </div>
                  ))}
                </div>
                {/* </div> */}
              </ScrollArea>
            </TabsContent>
            <TabsContent value="parent">
              <div className="flex flex-col gap-4">
                {/* <p className="text-sm font-semibold">Data Orang Tua</p> */}
                <div className="grid grid-cols-2 gap-8">
                  {Object.entries(
                    buildParentItems(participantParentMap.get(row.original._id))
                  ).map(([key, items]) => (
                    <div key={key} className="col-span-1 space-y-4">
                      <p className="text-sm font-semibold">
                        {key === "father" ? "Data Ayah" : "Data Ibu"}
                      </p>
                      <div className="space-y-2">
                        {items.map((item) => (
                          <div
                            key={item.label}
                            className="flex items-center justify-between border-b border-dashed pb-2"
                          >
                            <p className="text-sm text-muted-foreground">
                              {item.label}
                            </p>
                            <p className="text-sm font-semibold">
                              {item.value}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="education">
              <div className="flex flex-col gap-4">
                <p className="text-sm font-semibold">Riwayat Pendidikan</p>
                <div className="grid grid-cols-4 gap-8">
                  {buildEducationItems(
                    participantEducationMap.get(row.original._id)
                  ).map((item) => (
                    <div
                      key={item.label}
                      className="col-span-2 flex items-center justify-between border-b border-dashed pb-2"
                    >
                      <p className="text-sm text-muted-foreground">
                        {item.label}
                      </p>
                      <p className="text-sm font-semibold">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="document">
              <p className="text-sm font-semibold mb-4">Dokumen</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="border rounded-md p-2 flex items-center gap-2">
                  <div className="aspect-square w-10 rounded-md bg-gray-100 flex items-center justify-center">
                    <HugeiconsIcon icon={Doc02Icon} />
                  </div>
                  <div className="flex w-full items-center justify-between">
                    <div className="flex flex-col">
                      <p className="text-sm font-semibold">Surat Keterangan</p>
                      <p className="text-xs text-muted-foreground">1.4 MB</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Lihat
                    </Button>
                  </div>
                </div>
                <div className="border rounded-md p-2 flex items-center gap-2">
                  <div className="aspect-square w-10 rounded-md bg-gray-100 flex items-center justify-center">
                    <HugeiconsIcon icon={Doc02Icon} />
                  </div>
                  <div className="flex w-full items-center justify-between">
                    <div className="flex flex-col">
                      <p className="text-sm font-semibold">Surat Keterangan</p>
                      <p className="text-xs text-muted-foreground">1.4 MB</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Lihat
                    </Button>
                  </div>
                </div>
                <div className="border rounded-md p-2 flex items-center gap-2">
                  <div className="aspect-square w-10 rounded-md bg-gray-100 flex items-center justify-center">
                    <HugeiconsIcon icon={Doc02Icon} />
                  </div>
                  <div className="flex w-full items-center justify-between">
                    <div className="flex flex-col">
                      <p className="text-sm font-semibold">Surat Keterangan</p>
                      <p className="text-xs text-muted-foreground">1.4 MB</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Lihat
                    </Button>
                  </div>
                </div>
                <div className="border rounded-md p-2 flex items-center gap-2">
                  <div className="aspect-square w-10 rounded-md bg-gray-100 flex items-center justify-center">
                    <HugeiconsIcon icon={Doc02Icon} />
                  </div>
                  <div className="flex w-full items-center justify-between">
                    <div className="flex flex-col">
                      <p className="text-sm font-semibold">Surat Keterangan</p>
                      <p className="text-xs text-muted-foreground">1.4 MB</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Lihat
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </SheetContent>
      </Sheet>
    ),
  },
  {
    accessorKey: "nik",
    header: ({ column }) => (
      <Menu>
        <MenuTrigger asChild>
          <Button size="sm" variant="ghost">
            NIK
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
    accessorKey: "nisn",
    header: ({ column }) => (
      <Menu>
        <MenuTrigger asChild>
          <Button size="sm" variant="ghost">
            NISN
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
    accessorKey: "gender",
    header: ({ column }) => (
      <Menu>
        <MenuTrigger asChild>
          <Button size="sm" variant="ghost">
            Jenis Kelamin
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
    accessorKey: "submissionStatus",
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
      const status = row.getValue("submissionStatus") as string;
      // Variant mapping based on status string (example logic)
      return (
        <div className="px-2">
          <Badge
            size="sm"
            appearance="outline"
            variant={
              status.toLowerCase() === "lulus"
                ? "success"
                : status.toLowerCase() === "tidak lulus"
                  ? "destructive"
                  : "warning"
            }
          >
            {status}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "isVerified",
    header: ({ column }) => (
      <Menu>
        <MenuTrigger asChild>
          <Button size="sm" variant="ghost">
            Verifikasi
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
      const isVerified = row.getValue("isVerified") as boolean;
      return (
        <div className="px-2">
          <Badge
            size="sm"
            appearance="outline"
            variant={isVerified ? "primary" : "warning"}
          >
            {isVerified ? "Sudah Diverifikasi" : "Belum Diverifikasi"}
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
            Tanggal Pendaftaran
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
      const createdAt = row.getValue("createdAt") as string;
      return (
        <p className="text-sm px-2">
          {moment(createdAt).format("DD MMM YYYY, HH:mm")}
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
              <MenuItem>Lihat Detail</MenuItem>
              <MenuItem>Edit</MenuItem>
            </MenuGroup>
          </MenuContent>
        </Menu>
      );
    },
  },
];
