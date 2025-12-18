import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    email: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    role: v.string(),
    createdAt: v.string(),
    updatedAt: v.string(),
  }).index("by_clerk_id", ["clerkId"]),

  posts: defineTable({
    title: v.string(),
    slug: v.string(),
    type: v.string(),
    content: v.string(),
    startDate: v.optional(v.string()),
    endDate: v.optional(v.string()),
    tags: v.array(v.string()),
    metadata: v.optional(v.string()),
    category: v.optional(v.string()),
    featuredImage: v.optional(v.string()),
    authorId: v.id("users"), // Changed to internal ID
    isPublished: v.boolean(),
    createdAt: v.string(),
    updatedAt: v.string(),
  })
    .index("by_slug", ["slug"])
    .index("by_author_id", ["authorId"]),

  comments: defineTable({
    content: v.string(),
    postId: v.id("posts"),
    author: v.string(),
    authorEmail: v.string(),
    parentId: v.optional(v.id("comments")),
    createdAt: v.string(),
    updatedAt: v.string(),
  }).index("by_post_id", ["postId"]),

  submissions: defineTable({
    name: v.string(),
    slug: v.string(),
    categoryId: v.id("submissionCategories"),
    status: v.string(),
    openDate: v.optional(v.string()),
    closeDate: v.optional(v.string()),
    quota: v.number(),
    academicYear: v.string(),
    authorId: v.id("users"), // Changed to internal ID
    description: v.optional(v.string()),
    createdAt: v.string(),
    updatedAt: v.string(),
  })
    .index("by_slug", ["slug"])
    .index("by_category_id", ["categoryId"]),

  submissionCategories: defineTable({
    name: v.string(), // TK, SD, SMP, SMA
    slug: v.string(),
    authorId: v.id("users"), // Changed to internal ID
    description: v.optional(v.string()),
    createdAt: v.string(),
    updatedAt: v.string(),
  }).index("by_slug", ["slug"]),

  participants: defineTable({
    submissionId: v.id("submissions"),
    name: v.string(),
    nickname: v.string(),
    nik: v.string(),
    nisn: v.string(),
    dateOfBirth: v.string(),
    placeOfBirth: v.string(),
    gender: v.string(),
    religion: v.string(),
    hobby: v.string(),
    aspiration: v.string(),
    nationality: v.string(),
    birthOrder: v.number(),
    totalSiblings: v.number(),
    birthStatus: v.string(),
    bloodType: v.string(),
    userId: v.id("users"), // Changed to internal ID
    siblings: v.optional(v.boolean()),
    siblingsName: v.optional(v.string()),
    siblingsGrade: v.optional(v.string()),
    medicalHistory: v.optional(v.string()),
    majorIllness: v.optional(v.string()),
    minorIllness: v.optional(v.string()),
    submissionStatus: v.string(), // Lulus/Tidak Lulus
    isVerified: v.boolean(), // Diverifikasi/Ditolak
    isCompleted: v.boolean(), // Lengkap/Tidak Lengkap
    isSubmitted: v.boolean(),
    createdAt: v.string(),
    updatedAt: v.string(),
  })
    .index("by_nik", ["nik"])
    .index("by_user_id", ["userId"])
    .index("by_submission_id", ["submissionId"]),

  participantAddresses: defineTable({
    participantId: v.id("participants"),
    address: v.string(),
    district: v.string(),
    subDistrict: v.string(),
    city: v.string(),
    province: v.string(),
    postalCode: v.string(),
  }).index("by_participant_id", ["participantId"]),

  participantParents: defineTable({
    participantId: v.id("participants"),
    parentPhone: v.string(),
    parentEmail: v.string(),
    fatherName: v.string(),
    fatherNationalId: v.string(),
    fatherBirthPlace: v.string(),
    fatherBirthDate: v.string(),
    fatherReligion: v.string(),
    fatherOccupation: v.string(),
    fatherEducation: v.string(),
    fatherIncome: v.string(),
    fatherCitizenship: v.string(),
    motherName: v.string(),
    motherNationalId: v.string(),
    motherBirthPlace: v.string(),
    motherBirthDate: v.string(),
    motherReligion: v.string(),
    motherOccupation: v.string(),
    motherEducation: v.string(),
    motherIncome: v.string(),
    motherCitizenship: v.string(),
  }).index("by_participant_id", ["participantId"]),

  participantEducations: defineTable({
    participantId: v.id("participants"),
    schoolName: v.optional(v.string()),
    schoolAddress: v.optional(v.string()),
    schoolCity: v.optional(v.string()),
    schoolDistrict: v.optional(v.string()),
    schoolSubDistrict: v.optional(v.string()),
    schoolProvince: v.optional(v.string()),
    schoolPostalCode: v.optional(v.string()),
    schoolPhone: v.optional(v.string()),
    schoolEmail: v.optional(v.string()),
  }).index("by_participant_id", ["participantId"]),

  participantDocuments: defineTable({
    participantId: v.id("participants"),
    photo: v.optional(v.string()),
    familyCard: v.optional(v.string()),
    birthCertificate: v.optional(v.string()),
    skhus: v.optional(v.string()),
    graduationCertificate: v.optional(v.string()),
  }).index("by_participant_id", ["participantId"]),
});
