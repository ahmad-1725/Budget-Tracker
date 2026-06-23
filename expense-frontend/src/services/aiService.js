import API from "./api";

export const sendMessage = async (message) => {
  try {
    const response = await API.post("/ai/chat", { message });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
