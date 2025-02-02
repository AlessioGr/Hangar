import { helpers } from "@vuelidate/validators";
import { useInternalApi } from "~/composables/useApi";
import { ValidationRule } from "@vuelidate/core";
import { withOverrideMessage } from "~/lib/composables/useValidationHelpers";

export const validProjectName = withOverrideMessage(
  (ownerId: () => string) =>
    helpers.withParams(
      { ownerId, type: "validProjectName" },
      helpers.withAsync(async (value: string) => {
        if (!helpers.req(value)) {
          return { $valid: true };
        }
        try {
          await useInternalApi("projects/validateName", false, "get", {
            userId: ownerId(),
            value: value,
          });
          return { $valid: true };
        } catch (e: any) {
          return !e.response?.data.isHangarApiException ? { $valid: false } : { $valid: false, $message: e.response?.data.message };
        }
      })
    ) as ValidationRule<{ ownerId: string }>
);

export const validOrgName = withOverrideMessage(
  helpers.withAsync(async (value: string) => {
    if (!helpers.req(value)) {
      return { $valid: true };
    }

    if (value.includes(" ")) {
      return { $valid: false, $message: "organization.new.error.noSpaces" };
    }

    try {
      await useInternalApi("organizations/validate", false, "get", {
        name: value,
      });
      return { $valid: true };
    } catch (e: any) {
      return { $valid: false, $message: "organization.new.error.duplicateName" };
    }
  })
);

export const validApiKeyName = withOverrideMessage(
  (username: string) =>
    helpers.withParams(
      { username, type: "validApiKeyName" },
      helpers.withAsync(async (value: string) => {
        if (!helpers.req(value)) {
          return { $valid: true };
        }
        try {
          await useInternalApi(`api-keys/check-key/${username}`, true, "get", {
            name: value,
          });
          return { $valid: true };
        } catch (e: any) {
          return !e.response?.data.isHangarApiException ? { $valid: false } : { $valid: false, $message: e.response?.data.message };
        }
      })
    ) as ValidationRule<{ ownerId: string }>
);

export const validChannelName = withOverrideMessage((projectId: string, existingName: string) =>
  helpers.withParams(
    { projectId, type: "validChannelName" },
    helpers.withAsync(async (value: string) => {
      if (!helpers.req(value)) {
        return { $valid: true };
      }
      try {
        await useInternalApi("channels/checkName", true, "get", {
          projectId: projectId,
          name: value,
          existingName: existingName,
        });
        return { $valid: true };
      } catch (e: any) {
        return !e.response?.data.isHangarApiException ? { $valid: false } : { $valid: false, $message: e.response?.data.message };
      }
    })
  )
);

export const validChannelColor = withOverrideMessage((projectId: string, existingColor: string) =>
  helpers.withParams(
    { projectId, type: "validChannelColor" },
    helpers.withAsync(async (value: string) => {
      if (!helpers.req(value)) {
        return { $valid: true };
      }
      try {
        await useInternalApi("channels/checkColor", true, "get", {
          projectId: projectId,
          color: value,
          existingColor: existingColor,
        });
        return { $valid: true };
      } catch (e: any) {
        return !e.response?.data.isHangarApiException ? { $valid: false } : { $valid: false, $message: e.response?.data.message };
      }
    })
  )
);
