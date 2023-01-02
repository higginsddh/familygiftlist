import { LoadingOverlay } from "@mantine/core";
import { trpc } from "../utils/trpc";

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
            <div key={i.id}>
              {i.name}, {i.url}, {i.notes}
            </div>
          ))
        : null}
    </>
  );
}
