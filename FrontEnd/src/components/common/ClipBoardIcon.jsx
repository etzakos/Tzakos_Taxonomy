import { useState } from "react";
import { BsClipboardCheck } from "react-icons/bs";
import { FaClipboardCheck } from "react-icons/fa";

import { message } from "antd";

const ClipBoardIcon = (props) => {
  const [isClicked, setIsClicked] = useState(false);

  return isClicked ? (
    <FaClipboardCheck style={{ marginLeft: "20px" }} />
  ) : (
    <BsClipboardCheck
      onClick={() => {
        setIsClicked(true);
        message.success("Copied Successfully");
        navigator.clipboard.writeText(props.text);
      }}
      style={{ marginLeft: "20px" }}
    />
  );
};

export default ClipBoardIcon;
