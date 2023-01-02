import {
  Button,
  Group,
  LoadingOverlay,
  Modal,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useState } from "react";
import { trpc } from "../utils/trpc";

interface FormData {
  name: string;
  url: string;
  notes: string;
}

const defaultFormData: FormData = {
  name: "",
  url: "",
  notes: "",
};

export function AddItem({ familyMemberId }: { familyMemberId: string }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<FormData>(defaultFormData);

  const utils = trpc.useContext();

  const { mutate: addItem, isLoading: isAddingItem } =
    trpc.giftItem.addGiftItem.useMutation({
      onSuccess: () => {
        setShowAddForm(false);
        setFormData(defaultFormData);
      },

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
        {isAddingItem ? <LoadingOverlay visible overlayBlur={2} /> : null}

        <form
          onSubmit={(e) => {
            e.preventDefault();

            addItem({
              familyMemberId,
              ...formData,
            });
          }}
        >
          <TextInput
            label="Item"
            withAsterisk
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.currentTarget.value,
              })
            }
            mb="md"
            required
          />

          <TextInput
            label="Website"
            value={formData.url}
            type="url"
            onChange={(e) =>
              setFormData({
                ...formData,
                url: e.currentTarget.value,
              })
            }
            mb="md"
          />

          <Textarea
            label="Notes"
            value={formData.notes}
            onChange={(e) =>
              setFormData({
                ...formData,
                notes: e.currentTarget.value,
              })
            }
            mb="md"
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
