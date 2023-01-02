import { Button, Group, Modal, TextInput } from "@mantine/core";
import { useState } from "react";
import { trpc } from "../utils/trpc";

export function AddItem({ familyMemberId }: { familyMemberId: string }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState("");

  const utils = trpc.useContext();

  const { mutate: addItem } = trpc.familyMember.createFamilyMember.useMutation({
    onSettled: () => {
      utils.giftItem.getGiftItems.invalidate({
        familyMemberId,
      });
    },
  });

  return (
    <>
      <Group position="right">
        <Button mt="md" onClick={() => setShowAddForm(true)}>
          Add Item
        </Button>
      </Group>

      <Modal
        opened={showAddForm}
        onClose={() => setShowAddForm(false)}
        title="Add Item"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();

            addItem({
              name,
            });
          }}
        >
          <TextInput
            label="Item"
            withAsterisk
            value={name}
            onChange={(e) => setName(e.currentTarget.validationMessage)}
          />

          <Group mt="md" position="right">
            <Button type="submit">Save</Button>

            <Button
              type="button"
              color="gray"
              onClick={() => setShowAddForm(false)}
            >
              Close
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  );
}
