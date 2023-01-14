import {
  Anchor,
  Button,
  Center,
  FileInput,
  Group,
  LoadingOverlay,
  Modal,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { env } from "../env/client.mjs";
import { FamilyMemberItemImage } from "./FamilyMemberItemImage";

type FormData = {
  name: string;
  url: string;
  notes: string;
  imagePath: string | null;
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
  const form = useForm<Omit<FormData, "imagePath">>({
    initialValues: defaultFormData,
  });
  const [file, setFile] = useState<File | null>(null);

  const [imagePath, setImagePath] = useState<string | null>(
    defaultFormData.imagePath
  );
  const [selectedImagePreview, setSelectedImagePreview] = useState<
    string | null
  >(null);

  const [fileUploading, setFileUploading] = useState(false);

  const width = 150;
  return (
    <>
      <Modal opened={true} onClose={() => onClose()} title="Add Item">
        {saving || fileUploading ? (
          <LoadingOverlay visible overlayBlur={2} />
        ) : null}

        <form
          onSubmit={form.onSubmit((values) => {
            const formValues = {
              ...values,
              imagePath,
            };

            if (file) {
              setFileUploading(true);
              const fileData = new FormData();
              fileData.append("file", file);
              fileData.append(
                "upload_preset",
                env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
              );
              fileData.append(
                "cloud_name",
                env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
              );
              fetch(
                `https://api.cloudinary.com/v1_1/${env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                {
                  method: "post",
                  body: fileData,
                }
              )
                .then((resp) => resp.json())
                .then((data) => {
                  setFileUploading(false);
                  const publicId = data.public_id as string;
                  onSave({
                    ...values,
                    imagePath: publicId,
                  });
                })
                .catch((err) => {
                  setFileUploading(true);

                  // TODO:
                  console.log(err);
                });
            } else {
              onSave(formValues);
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

          {imagePath || selectedImagePreview ? (
            <>
              <Group>
                {selectedImagePreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={selectedImagePreview}
                    width={width}
                    alt="Image Preview"
                  />
                ) : imagePath ? (
                  <FamilyMemberItemImage imagePath={imagePath} width={width} />
                ) : null}
              </Group>
              <Center style={{ width }}>
                <Anchor
                  component="button"
                  type="button"
                  color={"red"}
                  size="sm"
                  onClick={() => {
                    setSelectedImagePreview(null);
                    setImagePath(null);
                  }}
                >
                  Remove
                </Anchor>
              </Center>
            </>
          ) : null}

          <FileInput
            placeholder="Pick photo"
            label="Image of item"
            accept="image/*"
            onChange={(f) => {
              setFile(f);

              if (f) {
                setSelectedImagePreview(URL.createObjectURL(f));
              } else {
                setSelectedImagePreview(null);
              }
            }}
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
