import { useQuery } from "@apollo/client/react";
import React from "react";
import { GET_ALL_TWEETS } from "./gql/crud";
import { useCreate } from "./hook/useCreate";
import { useUpdate } from "./hook/useUpdate";
import { useDelete } from "./hook/useDelete";

interface DATA {
  __typename: string;
  id: string;
  content: string;
}
interface ARRAY_DATA {
  tweets: Array<DATA>;
}

function App() {
  const { loading, error, data, refetch } =
      useQuery<ARRAY_DATA>(GET_ALL_TWEETS);
    const { createTweet } = useCreate();
  const { updateTweet } = useUpdate();
  const { deleteTweet } = useDelete();

  if (loading) return <>Tweet取得中です...</>;
  if (error) return <>Tweet取得に失敗しました...</>;

  //Create
  const clickCreateButton = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const tweet = document.querySelector("#tweet") as HTMLInputElement;
    if (tweet.value.trim() === "") return; // 空の入力を防ぐ
    try {
      createTweet({ variables: { input: tweet.value } });
      refetch(); // データを再取得
      tweet.value = ""; // 入力欄をクリア
    } catch (error) {
      console.error("Tweetの作成に失敗しました:", error);
    }
    // // createTweet({ variables: { input: tweet.value } });
    // refetch();
    // tweet.value = "";
  };

  //Update
  const clickUpdateButton = (id: string) => {
    const tweet = document.querySelector(`#tweet${id}`) as HTMLInputElement;
    // updateTweet({ variables: { id, content: tweet.value } });

    if (tweet.value.trim() === "") return; // 空の入力を防ぐ
    try {
      updateTweet({ variables: { id, content: tweet.value } });
      refetch(); // データを再取得
    } catch (error) {
      console.error("Tweetの更新に失敗しました:", error);
    }

  };

  //Delete
  const clickDeleteButton = (id: string) => {
    // deleteTweet({ variables: { id } });
    // refetch();npm dedupe
    try {
      deleteTweet({ variables: { id } });
      refetch(); // データを再取得
    } catch (error) {
      console.error("Tweetの削除に失敗しました:", error);
    }
  };


  return (
      <div className="App">
        <form name="submitTweetForm" onSubmit={(e) => clickCreateButton(e)}>
          <input type="text" id="tweet" />
          <button>Tweet!</button>
        </form>
        {data?.tweets.map((tweet) => (
            <div key={tweet.id}>
              <p>{tweet.id}</p>
              <textarea id={`tweet${tweet.id}`}>{tweet.content}</textarea>
              <br />
              <button onClick={() => clickUpdateButton(tweet.id)}>update!!!</button>
              <button onClick={() => clickDeleteButton(tweet.id)}>delete!!!</button>
            </div>
        ))}
      </div>
  );
}

export default App;