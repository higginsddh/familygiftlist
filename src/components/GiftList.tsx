import { useState } from "react";
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
    </>
  );
}
