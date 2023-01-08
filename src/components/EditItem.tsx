import type { GiftItem } from "@prisma/client";
import { trpc } from "../utils/trpc";
import { BaseForm } from "./BaseForm";

export function EditItem({
  giftItem,
  onClose,
}: {
  giftItem: GiftItem;
  onClose: () => void;
}) {
  const utils = trpc.useContext();

  const { mutate: updateItem, isLoading: isUpdatingItem } =
    trpc.giftItem.updateGiftItem.useMutation({
      onSuccess: () => {
        onClose();
      },

      onSettled: () => {
        utils.giftItem.getGiftItems.invalidate({
          familyMemberId: giftItem.familyMemberId,
        });
      },
    });

  return (
    <BaseForm
      onClose={onClose}
      onSave={(values) =>
        updateItem({
          id: giftItem.id,
          ...values,
        })
      }
      defaultFormData={{
        name: giftItem.name,
        url: giftItem.url ?? "",
        notes: giftItem.notes,
      }}
      saving={isUpdatingItem}
    />
  );
}
