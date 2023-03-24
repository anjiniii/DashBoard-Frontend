import { useEffect, useState } from "react";
import { MdOutlineModeComment } from "react-icons/md";
import { AiOutlineSend } from "react-icons/ai";
import { HiPlusCircle, HiMinusCircle } from "react-icons/hi";
import MemoItem from "./MemoItem";
import axios from "axios";
import "./Memo.css";

const Memo = ({ accessToken }) => {
  const [isOpenMemo, setIsOpenMemo] = useState(false);
  const [isOpenNewMemo, setIsOpenNewMemo] = useState(false);
  const [newMemoText, setNewMemoText] = useState("");

  const [memoDataList, setMemoDataList] = useState([]);
  const [, setIsLoading] = useState(true);

  useEffect(() => {
    getData();
  }, [memoDataList]);

  const memoData = memoDataList.map(function (el) {
    let obj = {};
    obj["memoId"] = el.memoId;
    obj["content"] = el.content;
    obj["createdAt"] = el.createdAt;
    obj["updatedAt"] = el.updatedAt;
    obj["adminName"] = el.adminName;
    obj["imageUrl"] = el.imageUrl;
    obj["adminEmail"] = el.adminEmail;
    obj["comments"] = el.comments;
    return obj;
  });

  const getData = async () => {
    const response = await axios
      .get("http://43.201.80.154/memo/?page=0&size=50")
      .then((res) => res.data);

    setIsLoading(false);
    setMemoDataList(response.data.data);
  };

  const postNewMemo = () => {
    const postMemo = async () => {
      await axios
        .post(
          `http://43.201.80.154:80/memo?content=${newMemoText}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {});
    };
    postMemo();
    setIsOpenNewMemo(false);
    setNewMemoText("");
    getData();
  };

  return (
    <>
      <div className="memo">
        <button
          onClick={() => {
            setIsOpenMemo(!isOpenMemo);
          }}
          className={
            isOpenMemo
              ? "memo-button memo-button-opened"
              : "memo-button memo-button-closed"
          }
        >
          <MdOutlineModeComment size={20} />
        </button>
        {/* <div id="circle"></div> */}
        {isOpenMemo && (
          <div className="memo-container">
            <div className={"memo-item-header"}>
              <div className="memo-item-button">
                <button
                  onClick={() => {
                    setIsOpenNewMemo(!isOpenNewMemo);
                  }}
                >
                  {isOpenNewMemo ? (
                    <>
                      <HiMinusCircle
                        size={28}
                        style={{
                          color: "black",
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <HiPlusCircle
                        size={28}
                        style={{
                          color: "rgba(134, 142, 150, 1)",
                        }}
                      />
                    </>
                  )}
                </button>
              </div>
              {isOpenNewMemo && (
                <div className="new-memo">
                  {/* <span className="new-memo-name">관리자1</span> */}
                  <div className="new-memo-text-container">
                    <textarea
                      type="text"
                      placeholder="새 메모를 작성하세요."
                      className="new-memo-text"
                      onChange={(event) => setNewMemoText(event.target.value)}
                    />
                    <button className="new-memo-send" onClick={postNewMemo}>
                      <AiOutlineSend size={20} />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="memo-items">
              {memoData.map((memo) => (
                <>
                  <MemoItem
                    memo={memo}
                    accessToken={accessToken}
                    memoId={memo.memoId}
                    imageUrl={memo.imageUrl}
                    name={memo.adminName}
                    createdAt={memo.createdAt}
                    content={memo.content}
                    comments={memo.comments}
                    getData={getData}
                  />
                </>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Memo;
