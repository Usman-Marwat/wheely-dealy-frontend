import React from "react";
import { StyleSheet, View } from "react-native";
import {
  AttachButton,
  useMessageInputContext,
  ImageUploadPreview,
  FileUploadPreview,
  AutoCompleteInput,
} from "stream-chat-expo";

import { CustomSendButton } from "./CustomSendButton";

export const InputBox = ({ sender, targetIds }) => {
  const { toggleAttachmentPicker } = useMessageInputContext();

  return (
    <View style={styles.fullWidth}>
      <ImageUploadPreview />
      <FileUploadPreview />
      <View style={[styles.fullWidth, styles.row, styles.inputContainer]}>
        <View style={[styles.flex, styles.row]}>
          <AttachButton handleOnPress={toggleAttachmentPicker} />
          <View style={styles.autoCompleteInputContainer}>
            <AutoCompleteInput />
          </View>
        </View>

        <CustomSendButton targetIds={targetIds} sender={sender} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  fullWidth: {
    width: "100%",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputContainer: {
    height: 40,
  },
  autoCompleteInputContainer: {
    marginHorizontal: 10,
    paddingVertical: 10,
    justifyContent: "center",
  },
});
