import {
  Button,
  Group,
  LoadingOverlay,
  Modal,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import type { GiftItem } from "@prisma/client";
import { trpc } from "../utils/trpc";

export function EditItem({
  giftItem,
  onClose,
}: {
  giftItem: GiftItem;
  onClose: () => void;
}) {
  const form = useForm({
    initialValues: {
      name: giftItem.name,
      url: giftItem.url,
      notes: giftItem.notes,
    },
  });

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
    <>
      <Modal opened={true} onClose={() => onClose()} title="Add Item">
        {isUpdatingItem ? <LoadingOverlay visible overlayBlur={2} /> : null}

        <form
          onSubmit={form.onSubmit((values) => {
            updateItem({
              id: giftItem.id,
              ...values,
            });
          })}
        >
          <TextInput
            label="Item"
            withAsterisk
            mb="md"
            required
            {...form.getInputProps("name")}
          />

          <TextInput
            label="Website"
            type="url"
            mb="md"
            {...form.getInputProps("url")}
          />

          <Textarea label="Notes" mb="md" {...form.getInputProps("notes")} />

          <Group mt="md" position="right">
            <Button type="submit">Save</Button>

            <Button type="button" color="gray" onClick={onClose}>
              Close
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  );
}
