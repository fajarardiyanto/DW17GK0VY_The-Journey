import React from "react";

import HeaderPage from "../../Components/Headers/HeaderPage";
import BookmarkContent from "../../Components/Bookmark/Bookmark";

function Bookmark() {
  return (
    <div>
      <HeaderPage />
      <h1 style={{ marginLeft: "-63%" }}>Bookmark</h1>
      <BookmarkContent />
    </div>
  );
}

export default Bookmark;
