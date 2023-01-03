import {
  Button,
  Group,
  LoadingOverlay,
  Modal,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
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

  const form = useForm({
    initialValues: {
      name: "",
      url: "",
      notes: "",
    },
  });

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
          onSubmit={form.onSubmit((values) => {
            addItem({
              familyMemberId,
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
