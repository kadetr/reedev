// @flow
/* eslint import/no-webpack-loader-syntax: 0 */

import React, { Component } from "react";
import PDFWorker from "worker-loader!pdfjs-dist/lib/pdf.worker.js";

import {
   PdfLoader,
   PdfHighlighter,
   Tip,
   Highlight,
   Popup,
   AreaHighlight,
   setPdfWorker,
} from "react-pdf-highlighter";

import testHighlights from "./test-highlights";

import Spinner from "./Spinner";
import Sidebar from "./Sidebar";

import type {
   T_Highlight,
   T_NewHighlight,
} from "react-pdf-highlighter/src/types";

import "./style/App.css";

setPdfWorker(PDFWorker);

type Props = {
   highlights: Array<T_Highlight>,
};

type State = {
   url: string,
   highlights: Array<T_Highlight>,
   area: boolean,
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

const PRIMARY_PDF_URL = "https://arxiv.org/pdf/1708.08021.pdf";
const SECONDARY_PDF_URL = "https://arxiv.org/pdf/1604.02480.pdf";

const searchParams = new URLSearchParams(document.location.search);

const initialUrl = searchParams.get("url") || PRIMARY_PDF_URL;

class PDFComp extends Component<Props, State> {
   state = {
      url: initialUrl,
      highlights: PRIMARY_PDF_URL ? this.props.highlights : [],
      area: false,
   };

   state: State;

   chooseText = () => {
      this.setState({ area: false });
      console.log("text: " + this.state.area);
   };

   chooseArea = () => {
      this.setState({ area: true });
      console.log("area: " + this.state.area);
   };

   resetHighlights = () => {
      this.setState({
         highlights: [],
      });
   };

   toggleDocument = () => {
      const newUrl =
         this.state.url === PRIMARY_PDF_URL
            ? SECONDARY_PDF_URL
            : PRIMARY_PDF_URL;

      this.setState({
         url: newUrl,
         highlights: testHighlights[newUrl] ? [...testHighlights[newUrl]] : [],
      });
   };

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
      const { highlights } = this.state;

      return highlights.find((highlight) => highlight.id === id);
   }

   addHighlight(highlight: T_NewHighlight) {
      const { highlights } = this.state;

      console.log("Saving highlight", highlight);

      this.setState({
         highlights: [{ ...highlight, id: getNextId() }, ...highlights],
      });
   }

   updateHighlight(highlightId: string, position: Object, content: Object) {
      console.log("Updating highlight", highlightId, position, content);

      this.setState({
         highlights: this.state.highlights.map((h) => {
            const {
               id,
               position: originalPosition,
               content: originalContent,
               ...rest
            } = h;
            return id === highlightId
               ? {
                    id,
                    position: { ...originalPosition, ...position },
                    content: { ...originalContent, ...content },
                    ...rest,
                 }
               : h;
         }),
      });
   }

   render() {
      const { url, area } = this.state;
      const { highlights } = this.props;

      return (
         <div className="App" style={{ display: "flex", height: "100vh" }}>
            <div
               style={{
                  height: "100vh",
                  width: "75vw",
                  position: "relative",
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
                              onConfirm={(comment) => {
                                 this.addHighlight({
                                    content,
                                    position,
                                    comment,
                                 });

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
                              />
                           ) : (
                              <AreaHighlight
                                 highlight={highlight}
                                 onChange={(boundingRect) => {
                                    this.updateHighlight(
                                       highlight.id,
                                       {
                                          boundingRect: viewportToScaled(
                                             boundingRect
                                          ),
                                       },
                                       { image: screenshot(boundingRect) }
                                    );
                                 }}
                              />
                           );

                           return (
                              <Popup
                                 popupContent={
                                    <HighlightPopup {...highlight} />
                                 }
                                 onMouseOver={(popupContent) =>
                                    setTip(
                                       highlight,
                                       (highlight) => popupContent
                                    )
                                 }
                                 onMouseOut={hideTip}
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
            <Sidebar
               highlights={highlights}
               resetHighlights={this.resetHighlights}
               toggleDocument={this.toggleDocument}
               chooseArea={this.chooseArea}
               chooseText={this.chooseText}
            />
         </div>
      );
   }
}

export default PDFComp;
