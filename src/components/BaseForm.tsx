import {
  Button,
  FileInput,
  Group,
  LoadingOverlay,
  Modal,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";

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
  const [file, setFile] = useState<File | null>(null);
  const [fileUploading, setFileUploading] = useState(false);

  return (
    <>
      <Modal opened={true} onClose={() => onClose()} title="Add Item">
        {saving || fileUploading ? (
          <LoadingOverlay visible overlayBlur={2} />
        ) : null}

        <form
          onSubmit={form.onSubmit((values) => {
            if (file) {
              const fileData = new FormData();
              fileData.append("file", file);
              fileData.append("upload_preset", "dwi7jlm4");
              fileData.append("cloud_name", "dutizqtbe");
              fetch("https://api.cloudinary.com/v1_1/dutizqtbe/image/upload", {
                method: "post",
                body: fileData,
              })
                .then((resp) => resp.json())
                .then((data) => console.log(data))
                .catch((err) => console.error(err));
            } else {
              onSave(values);
            }
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

          <FileInput
            placeholder="Pick photo"
            label="Image of item"
            accept="image/*"
            onChange={(f) => setFile(f)}
          />

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
