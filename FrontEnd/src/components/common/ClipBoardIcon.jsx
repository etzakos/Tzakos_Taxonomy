import { useState } from "react";
import { BsClipboardCheck } from "react-icons/bs";
import { FaClipboardCheck } from "react-icons/fa";

import { message } from "antd";

const ClipBoardIcon = (props) => {
  const [isClicked, setIsClicked] = useState(props.clicked);

  return isClicked ? (
    <FaClipboardCheck className="ml-3 bg-success" />
  ) : (
    <BsClipboardCheck
      onClick={() => {
        setIsClicked(true);
        message.success("Copied Successfully");
        navigator.clipboard.writeText(props.text);

        setTimeout(() => {
          setIsClicked(false);
        }, 3000);
      }}
      className="ml-3"
    />
  );
};

export default ClipBoardIcon;
