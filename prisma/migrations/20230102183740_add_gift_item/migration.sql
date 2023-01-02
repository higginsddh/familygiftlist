-- CreateTable
CREATE TABLE "GiftItem" (
    "id" STRING NOT NULL,
    "familyMemberId" STRING NOT NULL,

    CONSTRAINT "GiftItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GiftItem" ADD CONSTRAINT "GiftItem_familyMemberId_fkey" FOREIGN KEY ("familyMemberId") REFERENCES "FamilyMember"("id") ON DELETE CASCADE ON UPDATE CASCADE;
