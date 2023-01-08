import {
  Button,
  Group,
  LoadingOverlay,
  Modal,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";

type FormData = {
  name: string;
  url: string;
  notes: string;
};

export function BaseForm({
  onClose,
  defaultFormData,
  onSave,
  saving,
}: {
  onClose: () => void;
  defaultFormData: FormData;
  onSave: (formData: FormData) => void;
  saving: boolean;
}) {
  const form = useForm<FormData>({
    initialValues: defaultFormData,
  });

  return (
    <>
      <Modal opened={true} onClose={() => onClose()} title="Add Item">
        {saving ? <LoadingOverlay visible overlayBlur={2} /> : null}

        <form
          onSubmit={form.onSubmit((values) => {
            onSave(values);
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
