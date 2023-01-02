import { useState } from "react";
import { AddItem } from "./AddItem";
import { FamilyMemberItems } from "./FamilyMemberItems";
import { FamilyMemberSelection } from "./FamilyMemberSelection";

export function GiftList() {
  const [currentFamilyMember, setCurrentFamilyMember] = useState<string | null>(
    null
  );

  return (
    <>
      <FamilyMemberSelection
        value={currentFamilyMember}
        onChange={(v) => setCurrentFamilyMember(v)}
      />

      {currentFamilyMember !== null ? (
        <>
          <AddItem familyMemberId={currentFamilyMember} />

          <FamilyMemberItems familyMemberId={currentFamilyMember} />
        </>
      ) : null}
    </>
  );
}
