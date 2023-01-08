import {
  Text,
  Button,
  Card,
  LoadingOverlay,
  Modal,
  Group,
} from "@mantine/core";
import type { GiftItem } from "@prisma/client";
import { useState } from "react";
import { trpc } from "../utils/trpc";
import { EditItem } from "./EditItem";

export function FamilyMemberItem({ giftItem }: { giftItem: GiftItem }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const utils = trpc.useContext();

  const { mutate: deleteItem, isLoading: isDeletingItem } =
    trpc.giftItem.deleteGiftItem.useMutation({
      onSettled: () => {
        utils.giftItem.getGiftItems.invalidate({
          familyMemberId: giftItem.familyMemberId,
        });
      },
    });

  return (
    <>
      <Card p="lg" radius="md" mb="md" withBorder key={giftItem.id}>
        <Text weight={500}>{giftItem.name}</Text>

        <Text size="sm" color="dimmed">
          {giftItem.notes}
        </Text>

        <div>
          <Button
            variant="light"
            color="blue"
            mt="md"
            radius="md"
            mr="sm"
            onClick={() => setShowEdit(true)}
          >
            Edit
          </Button>
          <Button
            variant="light"
            color="red"
            mt="md"
            radius="md"
            onClick={() => setShowDeleteConfirm(true)}
          >
            Delete
          </Button>
        </div>
      </Card>

      {showEdit ? (
        <EditItem onClose={() => setShowEdit(false)} giftItem={giftItem} />
      ) : null}

      <Modal
        opened={showDeleteConfirm}
        title={`Delete ${giftItem.name}?`}
        onClose={() => setShowDeleteConfirm(false)}
      >
        {isDeletingItem ? <LoadingOverlay visible overlayBlur={2} /> : null}
        <Group>
          <Button onClick={() => deleteItem({ id: giftItem.id })}>Yes</Button>

          <Button
            type="button"
            color="gray"
            onClick={() => setShowDeleteConfirm(false)}
          >
            No
          </Button>
        </Group>
      </Modal>
    </>
  );
}
