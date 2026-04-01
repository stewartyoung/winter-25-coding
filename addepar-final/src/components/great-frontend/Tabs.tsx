import {useState} from 'react';

const tabsEnum = {
  HTML: "HTML",
  CSS: "CSS",
  JS: "JAVASCRIPT"
} 

export default function Tabs() {
  const [selectedTab, setSelectedTab] = useState(tabsEnum.HTML);
  return (
    <div>
      <div>
        <button onClick={() => setSelectedTab(tabsEnum.HTML)}>HTML</button>
        <button onClick={() => setSelectedTab(tabsEnum.CSS)}>CSS</button>
        <button onClick={() => setSelectedTab(tabsEnum.JS)}>JavaScript</button>
      </div>
      <div>
        {selectedTab === tabsEnum.HTML && (
          <p>
          The HyperText Markup Language or HTML is the
          standard markup language for documents designed to
          be displayed in a web browser.
        </p>
        )}
        {selectedTab === tabsEnum.CSS && (<p>
          Cascading Style Sheets is a style sheet language
          used for describing the presentation of a document
          written in a markup language such as HTML or XML.
        </p>)}
        {selectedTab === tabsEnum.JS && (
          <p>
          JavaScript, often abbreviated as JS, is a
          programming language that is one of the core
          technologies of the World Wide Web, alongside HTML
          and CSS.
        </p>
        )}
      </div>
    </div>
  );
}
