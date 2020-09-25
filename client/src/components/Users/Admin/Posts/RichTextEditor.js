import React, { Component } from "react";

import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  ContentState,
} from "draft-js";
import htmlToDraft from "html-to-draftjs";

import "./RichTextEditor.css";
import "../../../../../node_modules/draft-js/dist/Draft.css";

import { stateToHTML } from "draft-js-export-html";

class RichTextEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      editorContentHtml: "",
    };

    this.focus = () => this.refs.editor.focus();

    this.onChange = (editorState) => {
      const editorContentHtml = stateToHTML(editorState.getCurrentContent());
      props.onEditorStateChange(editorContentHtml);
      this.setState({ editorState, editorContentHtml });
    };

    this.handleKeyCommand = this._handleKeyCommand.bind(this);
    this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
    this.toggleBlockType = this._toggleBlockType.bind(this);
    this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
  }

  onChangeEditor() {
    const editorContentHtml = stateToHTML(
      this.state.editorState.getCurrentContent()
    );
    this.setState({ editorContentHtml });
    this.props.onEditorStateChange(editorContentHtml);
  }

  componentDidMount() {
    /// IN EDIT ROUTE LOAD BOOKID CONTENT IN TEXTEDITOR
    if (this.props.singleContent) {

      const singleContent = this.props.singleContent.content;
      const blockFromHtml = htmlToDraft(singleContent);
      const { contentBlocks, entityMap } = blockFromHtml;
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap
      );

      this.setState({
        editorState: EditorState.createWithContent(contentState),
      });
    } else {
      this.setState({
        editorState: EditorState.createEmpty(),
      });
    }
  }

  componentDidUpdate(prevProps) {

    if (this.props.singleContent !== prevProps.singleContent) {

      const editorContentHtml = stateToHTML(
        this.state.editorState.getCurrentContent()
      );

      this.props.onEditorStateChange(editorContentHtml);

      this.setState({
        editorState: this.props.singleContent,
        editorContentHtml,
      });
    }
    if (!this.props.singleContent) {
      if (this.props.reset !== prevProps.reset) {
        this.setState({
          editorState: EditorState.createEmpty(),
          editorContentHtml: "",
        });
      }
    }
  }

  _handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _mapKeyToEditorCommand(e) {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(
        e,
        this.state.editorState,
        4 /* maxDepth */
      );
      if (newEditorState !== this.state.editorState) {
        this.onChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  }

  _toggleBlockType(blockType) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  }

  render() {
    const { editorState } = this.state;
    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = "RichEditor-editor";
    var contentState = editorState.getCurrentContent();
    this.onChangeEditor.bind(this);
    
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== "unstyled") {
        className += " RichEditor-hidePlaceholder";
      }
    }

    return (
      <div className='RichEditor-root'>
        <BlockStyleControls
          editorState={editorState}
          onToggle={this.toggleBlockType}
        />
        <InlineStyleControls
          editorState={editorState}
          onToggle={this.toggleInlineStyle}
        />
        <div className={className} onClick={this.focus}>
          <Editor
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            keyBindingFn={this.mapKeyToEditorCommand}
            onChange={this.onChange}
            placeholder='Write your review...'
            ref='editor'
            spellCheck={true}
          />
        </div>
      </div>
    );
  }
}

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    default:
      return null;
  }
}

class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = "RichEditor-styleButton";
    if (this.props.active) {
      className += " RichEditor-activeButton";
    }

    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}

const BLOCK_TYPES = [
  { label: "H1", style: "header-one" },
  { label: "H2", style: "header-two" },
  { label: "H3", style: "header-three" },
  { label: "H4", style: "header-four" },
  { label: "H5", style: "header-five" },
  { label: "H6", style: "header-six" },
  { label: "Blockquote", style: "blockquote" },
  { label: "UL", style: "unordered-list-item" },
  { label: "OL", style: "ordered-list-item" },
  { label: "Code Block", style: "code-block" },
];

const BlockStyleControls = (props) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className='RichEditor-controls'>
      {BLOCK_TYPES.map((type) => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

var INLINE_STYLES = [
  { label: "Bold", style: "BOLD" },
  { label: "Italic", style: "ITALIC" },
  { label: "Underline", style: "UNDERLINE" },
  { label: "Monospace", style: "CODE" },
];

const InlineStyleControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();

  return (
    <div className='RichEditor-controls'>
      {INLINE_STYLES.map((type) => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

export default RichTextEditor;
