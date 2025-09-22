import { UPDATE_TWEET } from "../gql/crud";
import {useMutation} from "@apollo/client/react";

export const useUpdate = () => {
    const [updateTweet, { data, loading, error }] = useMutation(UPDATE_TWEET, {
        onCompleted(completed) {
            console.log("成功しました");
        },
        onError(error) {
            console.log(error.message);
        },
    });
    return { updateTweet };
};