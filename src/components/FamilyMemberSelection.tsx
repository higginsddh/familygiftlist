import { Alert, LoadingOverlay, Select, Notification } from "@mantine/core";
import { IconAlertCircle, IconX } from "@tabler/icons";
import { useState } from "react";
import { trpc } from "../utils/trpc";

export function FamilyMemberSelection({
  value,
  onChange,
}: {
  value: string | null;
  onChange(newValue: string | null): void;
}) {
  const {
    data: familyMembers,
    isInitialLoading: isLoadingItems,
    isError: isErrorFetchingItems,
  } = trpc.familyMember.getFamilyMembers.useQuery();
  const utils = trpc.useContext();

  const [showAddErrorNotification, setShowAddErrorNotification] =
    useState(false);

  const { mutate: addFamilyMember } =
    trpc.familyMember.createFamilyMember.useMutation({
      onSettled: () => {
        utils.familyMember.getFamilyMembers.invalidate();
      },

      onError: () => {
        setShowAddErrorNotification(true);
      },
    });

  return (
    <>
      {isLoadingItems ? <LoadingOverlay visible overlayBlur={2} /> : null}

      {showAddErrorNotification ? (
        <Notification
          icon={<IconX size={18} />}
          color="red"
          onClose={() => setShowAddErrorNotification(false)}
          mb="md"
        >
          Could not add family member. Try again!
        </Notification>
      ) : null}

      {isErrorFetchingItems ? (
        <Alert
          icon={<IconAlertCircle size={16} />}
          title="Error!"
          color="red"
          radius="md"
        >
          Unable to load family members. Please try again!
        </Alert>
      ) : null}

      {!isErrorFetchingItems ? (
        <Select
          onChange={(e) => onChange(e)}
          value={value}
          data={
            familyMembers?.map((f) => ({
              value: f.id,
              label: f.name,
            })) ?? []
          }
          label=""
          placeholder="Choose family member"
          radius="md"
          size="xl"
          searchable
          clearable
          getCreateLabel={(query) => `+ Add ${query}`}
          onCreate={(name) => {
            addFamilyMember({
              name: name,
            });

            return name;
          }}
        />
      ) : null}
    </>
  );
}
