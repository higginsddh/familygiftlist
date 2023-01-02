import { Select } from "@mantine/core";

export function GiftList() {
  return (
    <>
      {" "}
      <Select
        data={["React", "Angular", "Svelte", "Vue"]}
        placeholder="Choose family member"
        radius="md"
        size="xl"
        withAsterisk
      />
    </>
  );
}
