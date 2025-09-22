import { useMutation } from "@apollo/client/react";
import { DELETE_TWEET } from "../gql/crud";

export const useDelete = () => {
    const [deleteTweet, {}] = useMutation(DELETE_TWEET, {
        onCompleted(completed) {
            console.log("成功しました");
        },
        onError(error) {
            console.log(error.message);
        },
    });
    return { deleteTweet };
};