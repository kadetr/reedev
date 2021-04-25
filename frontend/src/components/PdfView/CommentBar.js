// @flow

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { showCommentsByHighlight } from "../../actions/commentActions";

import type { T_Highlight } from "react-pdf-highlighter/src/types";
type T_ManuscriptHighlight = T_Highlight;

type Props = {
   // highlights: Array<T_ManuscriptHighlight>,
   // toggleDocument: () => void,
   chooseArea: () => void,
   chooseText: () => void,
   highlight: T_ManuscriptHighlight,
   submitCommentHandler: (parentId: string, comment: string) => void,
};

const updateHash = (highlight) => {
   document.location.hash = `highlight-${highlight._id}`;
};

function CommentBar({
   chooseArea,
   chooseText,
   highlight,
   submitCommentHandler,
}: Props) {
   const [commentInput, setCommentInput] = useState("");

   const dispatch = useDispatch();
   const commentsViewByHighlight = useSelector(
      (state) => state.commentsViewByHighlight
   );
   const { loadingH, errorH, comments } = commentsViewByHighlight;
   const commentAdd = useSelector((state) => state.commentAdd);

   useEffect(() => {
      //WHY DOUBLE???
      dispatch(showCommentsByHighlight(highlight?._id));
   }, [highlight]);

   useEffect(() => {
      //WHY DOUBLE???
      dispatch(showCommentsByHighlight(highlight?._id));
   }, [commentAdd]);

   return (
      <div className="sidebar" style={{ width: "25vw" }}>
         <div className="description" style={{ padding: "1rem" }}>
            <div onClick={chooseText} style={{ cursor: "pointer" }}>
               select text
            </div>

            <div onClick={chooseArea} style={{ cursor: "pointer" }}>
               select area
            </div>
         </div>
         <div className="sidebar__highlights__list">
            <ul className="sidebar__highlights">
               {!highlight ? null : (
                  <li
                     key="a"
                     className="sidebar__highlight"
                     onClick={() => {
                        updateHash(highlight);
                     }}
                  >
                     <div>
                        <p>{highlight.name}</p>
                        <strong>{highlight.comment.text}</strong>
                        {highlight.content.text ? (
                           <blockquote style={{ marginTop: "0.5rem" }}>
                              {`${highlight.content.text.slice(0, 90).trim()}…`}
                           </blockquote>
                        ) : null}
                        {highlight.content.image ? (
                           <div
                              className="highlight__image"
                              style={{ marginTop: "0.5rem" }}
                           >
                              <img
                                 src={highlight.content.image}
                                 alt={"Screenshot"}
                              />
                           </div>
                        ) : null}
                     </div>
                     <div className="highlight__location">
                        Page {highlight.position.pageNumber}
                     </div>
                  </li>
               )}
               {comments
                  ? comments.map((comment, index) => (
                       <li key={index} className="sidebar__highlight">
                          <p>{comment.name}</p>
                          {comment.comment}
                       </li>
                    ))
                  : null}
            </ul>
         </div>
         <div
            className="sidebar__addcomment"
            // style={{
            //    display: "block",
            //    height: "120px",
            //    position: "fixed",
            //    bottom: "8px",
            //    right: "0px",
            //    width: "24vw",
            // }}
         >
            <textarea
               rows="4"
               placeholder="add comment..."
               value={commentInput}
               onChange={(e) => {
                  setCommentInput(e.target.value);
               }}
               style={{
                  width: "100%",
                  padding: "4px",
                  border: "1px dashed",
                  outline: "none",
               }}
            />
            <button
               type="submit"
               onClick={() => {
                  submitCommentHandler(commentInput, highlight._id);
                  setCommentInput("");
                  dispatch(showCommentsByHighlight(highlight._id));
               }}
               style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  marginTop: "4px",
                  padding: "4px 0 4px 0",
               }}
            >
               add comment
            </button>
         </div>
      </div>
   );
}

export default CommentBar;
