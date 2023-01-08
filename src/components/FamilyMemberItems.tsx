import { LoadingOverlay } from "@mantine/core";
import { trpc } from "../utils/trpc";
import { FamilyMemberItem } from "./FamilyMemberItem";

export function FamilyMemberItems({
  familyMemberId,
}: {
  familyMemberId: string;
}) {
  const { data: items, isInitialLoading: isLoadingItems } =
    trpc.giftItem.getGiftItems.useQuery({
      familyMemberId,
    });

  return (
    <>
      {isLoadingItems ? <LoadingOverlay visible overlayBlur={2} /> : null}

      {items
        ? items.map((i) => (
            <FamilyMemberItem
              familyMemberId={familyMemberId}
              giftItem={i}
              key={i.id}
            />
          ))
        : null}
    </>
  );
}
