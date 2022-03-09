// @flow
/* eslint import/no-webpack-loader-syntax: 0 */

import React, { Component } from "react";
import PDFWorker from "worker-loader!pdfjs-dist/lib/pdf.worker.js";
// import { useDispatch, useSelector } from "react-redux";

//added PdfId,need to call
//gethighlightbypdfid, need to create getPdfbyid

import {
   PdfLoader,
   PdfHighlighter,
   Tip,
   Highlight,
   Popup,
   AreaHighlight,
   setPdfWorker,
} from "react-pdf-highlighter";

import Spinner from "./Spinner";
// import Sidebar from "./CommentBar";

import type {
   T_Highlight,
   T_NewHighlight,
} from "react-pdf-highlighter/src/types";

import "./style/App.css";
// import { addHighlight } from "../../actions/highlightActions";

setPdfWorker(PDFWorker);

type Props = {
   highlights: Array<T_Highlight>,
   url: string,
   area: boolean,
   pdfId: string,
   submitHighlightHandler: (
      pdfId: string,
      position: T_Position,
      content: T_Content,
      comment: T_Comment
   ) => void,
   selectHighlight: (T_Highlight) => void,
   openDraw: (content: T_Content, position: T_Position, pdfId: string)=> void,
};

type State = {
   // url: string,
   // highlights: Array<T_Highlight>,
   // area: boolean,
};

const getNextId = () => String(Math.random()).slice(2);

const parseIdFromHash = () =>
   document.location.hash.slice("#highlight-".length);

const resetHash = () => {
   document.location.hash = "";
};

const HighlightPopup = ({ comment }) =>
   comment.text ? (
      <div className="Highlight__popup">
         {comment.emoji} {comment.text}
      </div>
   ) : null;

// const PRIMARY_PDF_URL = "https://arxiv.org/pdf/1708.08021.pdf";
// const SECONDARY_PDF_URL = "https://arxiv.org/pdf/1604.02480.pdf";

// const searchParams = new URLSearchParams(document.location.search);

class PdfView extends Component<Props, State> {
   state = {
      // url: this.props.url,
      // highlights: this.props.url ? this.props.highlights : [],
      // area: false,
   };

   state: State;

   // const dispatch = useDispatch()

   // const highlightAdd = useSelector((state) =>state.highlightAdd)
   // const {loading, error, highlight} = highlightAdd

   scrollViewerTo = (highlight: any) => {};

   scrollToHighlightFromHash = () => {
      const highlight = this.getHighlightById(parseIdFromHash());

      if (highlight) {
         this.scrollViewerTo(highlight);
      }
   };

   componentDidMount() {
      window.addEventListener(
         "hashchange",
         this.scrollToHighlightFromHash,
         false
      );
   }

   getHighlightById(id: string) {
      const { highlights } = this.props;

      return highlights.find((highlight) => highlight.id === id);
   }

   addNewHighlight(highlight: T_NewHighlight) {
      const { highlights } = this.props;

      console.log("Saving highlight", highlight);

      // this.setState({
      //    highlights: [{ ...highlight, id: getNextId() }, ...highlights],
      // });
   }

   // updateHighlight(highlightId: string, position: Object, content: Object) {
   //    console.log("Updating highlight", highlightId, position, content);

   //    this.setState({
   //       highlights: this.state.highlights.map((h) => {
   //          const {
   //             id,
   //             position: originalPosition,
   //             content: originalContent,
   //             ...rest
   //          } = h;
   //          return id === highlightId
   //             ? {
   //                  id,
   //                  position: { ...originalPosition, ...position },
   //                  content: { ...originalContent, ...content },
   //                  ...rest,
   //               }
   //             : h;
   //       }),
   //    });
   // }

   render() {
      const {
         area,
         url,
         highlights,
         pdfId,
         openDraw,
         submitHighlightHandler,
         selectHighlight,
      } = this.props;
  

      return (
         <div
            className="PdfView"
            style={{
               display: "flex",
               height: "100vh",
               width: "75vw",
               position: "relative",
            }}
         >
            <div
               style={{
                  height: "100vh",
               }}
            >
               <PdfLoader url={url} beforeLoad={<Spinner />}>
                  {(pdfDocument) => (
                     <PdfHighlighter
                        pdfDocument={pdfDocument}
                        enableAreaSelection={area}
                        onScrollChange={resetHash}
                        // pdfScaleValue="page-width"
                        scrollRef={(scrollTo) => {
                           this.scrollViewerTo = scrollTo;

                           this.scrollToHighlightFromHash();
                        }}
                        onSelectionFinished={(
                           position,
                           content,
                           hideTipAndSelection,
                           transformSelection
                        ) => (
                           <Tip
                              onOpen={transformSelection}
                              onDraw ={() =>{openDraw(content, position, pdfId)}}
                              onConfirm={(comment) => {
                                 this.addNewHighlight({
                                    content,
                                    position,
                                    comment,
                                 });
                                 submitHighlightHandler(
                                    content,
                                    position,
                                    comment,
                                    pdfId
                                 );
                                 hideTipAndSelection();
                              }}
                           />
                        )}
                        highlightTransform={(
                           highlight,
                           index,
                           setTip,
                           hideTip,
                           viewportToScaled,
                           screenshot,
                           isScrolledTo
                        ) => {
                           const isTextHighlight = !Boolean(
                              highlight.content && highlight.content.image
                           );

                           const component = isTextHighlight ? (
                              <Highlight
                                 isScrolledTo={isScrolledTo}
                                 position={highlight.position}
                                 comment={highlight.comment}
                                 onClick={() => selectHighlight(highlight)}
                              />
                           ) : (
                              <AreaHighlight
                                 highlight={highlight}
                                 onClick={() => selectHighlight(highlight)}
                                 // onChange={(boundingRect) => {
                                 //    this.updateHighlight(
                                 //       highlight.id,
                                 //       {
                                 //          boundingRect: viewportToScaled(
                                 //             boundingRect
                                 //          ),
                                 //       },
                                 //       { image: screenshot(boundingRect) }
                                 //    );
                                 // }}
                              />
                           );

                           return (
                              <Popup
                                 // popupContent={highlight.comment ?
                                 //    <HighlightPopup {...highlight} /> : null
                                 // }
                                 // onClick={(popupContent) =>
                                 //    setTip(
                                 //       highlight,
                                 //       (highlight) => popupContent
                                 //    )
                                 // }
                                 // onMouseOut={hideTip}
                                 key={index}
                                 children={component}
                              />
                           );
                        }}
                        highlights={highlights}
                     />
                  )}
               </PdfLoader>
            </div>
            {/* <Sidebar
               highlights={highlights}
               chooseArea={this.chooseArea}
               chooseText={this.chooseText}
            /> */}
         </div>
      );
   }
}

export default PdfView;
