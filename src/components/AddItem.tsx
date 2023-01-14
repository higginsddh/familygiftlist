import { Button, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { trpc } from "../utils/trpc";
import { BaseForm } from "./BaseForm";

export function AddItem({ familyMemberId }: { familyMemberId: string }) {
  const [showAddForm, setShowAddForm] = useState(false);

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
        form.reset();
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
        <Button mt="md" mb="md" onClick={() => setShowAddForm(true)}>
          Add Item
        </Button>
      </Group>

      {showAddForm ? (
        <BaseForm
          onClose={() => setShowAddForm(false)}
          onSave={(values) =>
            addItem({
              familyMemberId,
              ...values,
            })
          }
          defaultFormData={{
            name: "",
            url: "",
            notes: "",
            imagePath: null,
          }}
          saving={isAddingItem}
        />
      ) : null}
    </>
  );
}
