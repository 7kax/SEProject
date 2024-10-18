import { ElMessage } from "element-plus";

export const errorAlert = (message: string): void => {
    ElMessage.error(message);
}

export const successAlert = (message: string): void => {
    ElMessage.success(message);
}

export const infoAlert = (message: string): void => {
    ElMessage.info(message);
}