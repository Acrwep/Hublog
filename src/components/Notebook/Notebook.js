import React, { useState, useEffect } from "react";
import { Row, Col, Input, Modal, Button } from "antd";
import "quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { CgNotes } from "react-icons/cg";
import { MdEdit, MdDelete } from "react-icons/md";
import "./styles.css";
import { CommonToaster } from "../Common/CommonToaster";
import {
  createNotebook,
  deleteNotebook,
  getNotebook,
  updateNotebook,
} from "../APIservice.js/action";

const Notebook = () => {
  const [text, setText] = useState("");
  const [notes, setNotes] = useState([]);
  const [edit, setEdit] = useState(false);
  const [notesTitle, setNotesTitle] = useState("");
  const [userId, setUserId] = useState(null);
  const [noteId, setNoteId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  var modules = {
    toolbar: [
      [{ header: [1, 2, 4, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
        { align: [] },
      ],
      [
        {
          color: [
            "#000000",
            "#e60000",
            "#ff9900",
            "#ffff00",
            "#008a00",
            "#0066cc",
            "#9933ff",
            "#ffffff",
            "#facccc",
            "#ffebcc",
            "#ffffcc",
            "#cce8cc",
            "#cce0f5",
            "#ebd6ff",
            "#bbbbbb",
            "#f06666",
            "#ffc266",
            "#ffff66",
            "#66b966",
            "#66a3e0",
            "#c285ff",
            "#888888",
            "#a10000",
            "#b26b00",
            "#b2b200",
            "#006100",
            "#0047b2",
            "#6b24b2",
            "#444444",
            "#5c0000",
            "#663d00",
            "#666600",
            "#003700",
            "#002966",
            "#3d1466",
            "custom-color",
          ],
        },
      ],
    ],
  };
  var formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "color",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
    "size",
  ];

  useEffect(() => {
    getNotebookData();
  }, []);

  const getNotebookData = async () => {
    setLoading(true);
    const loginUserDetails = localStorage.getItem("LoginUserInfo");
    const convertLoginUserDetailsAsJson = JSON.parse(loginUserDetails);
    setUserId(convertLoginUserDetailsAsJson.id);
    const orgId = localStorage.getItem("organizationId");

    const payload = {
      organizationId: orgId,
      userId: convertLoginUserDetailsAsJson.id,
    };
    try {
      const response = await getNotebook(payload);
      console.log("notebook response", response);
      setNotes(response?.data);
    } catch (error) {
      CommonToaster(error?.response?.data, "error");
      setNotes([]);
    } finally {
      setTimeout(() => {
        setLoading(false);
        handleDiscard();
      }, 300);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleProcedureContentChange = (content) => {
    setText(content);
  };

  const handleEdit = (note) => {
    const container = document.getElementById("header_collapesbuttonContainer");
    container.scrollIntoView({ behavior: "smooth" });

    setText(note.notes);
    setNotesTitle(note.noteTitle);
    setNoteId(note.noteId);
    setEdit(true);
  };

  const handleDeleteNote = async () => {
    setLoading(true);
    setIsModalOpen(false);
    try {
      const response = await deleteNotebook(noteId);
      CommonToaster("Note deleted", "success");
    } catch (error) {
      CommonToaster(error?.response?.data, "error");
    } finally {
      setTimeout(() => {
        getNotebookData();
      }, 1000);
    }
  };

  const handleDiscard = () => {
    setEdit(false);
    setNotesTitle("");
    setText("");
  };
  const handleSave = async (event) => {
    event.preventDefault();
    if (notesTitle === "") {
      CommonToaster("Please add title for the note", "error");
      return;
    }

    const payload = {
      noteTitle: notesTitle,
      notes: text,
      userId: userId,
    };
    console.log("payload", payload);

    if (edit === true) {
      try {
        const response = await updateNotebook(noteId, payload);
        CommonToaster("Note updated", "success");
      } catch (error) {
        CommonToaster(error?.response?.data, "error");
      } finally {
        getNotebookData();
      }
    } else {
      try {
        const response = await createNotebook(payload);
        CommonToaster("Note created", "success");
      } catch (error) {
        CommonToaster(error?.response?.data, "error");
      } finally {
        getNotebookData();
      }
    }
  };
  return (
    <div
      className="settings_mainContainer"
      style={{ opacity: loading ? "0.5" : "1" }}
    >
      <div className="settings_headingContainer">
        <div className="settings_iconContainer">
          <CgNotes size={20} />
        </div>
        <h2 className="allpage_mainheadings">Notebook</h2>
      </div>

      <div>
        <p className="notebook_heading">Take your notes</p>
        <Input
          className="notes_titleinput"
          placeholder="Title"
          value={notesTitle}
          onChange={(e) => setNotesTitle(e.target.value)}
        />
        <div>
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            value={text}
            placeholder="write your content ...."
            onChange={handleProcedureContentChange}
            className="reactquillnotebook"
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {edit === true && (
            <Button className="notebook_discardbutton" onClick={handleDiscard}>
              Discard
            </Button>
          )}
          <Button
            type="primary"
            className="notebook_savebutton"
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </div>

      {notes.length >= 1 && (
        <p style={{ fontWeight: "600", fontSize: "16px", marginTop: "20px" }}>
          Your notes
        </p>
      )}
      <Row gutter={16}>
        {notes.map((note, index) => {
          const colors = [
            "#fec871",
            "#fd9a71",
            "#e3ed8e",
            "#b491fb",
            "#b491fb",
            "#b491fb",
          ];
          const color = colors[index % colors.length]; // Ensure we cycle through the colors
          return (
            <React.Fragment key={index}>
              <Col
                xs={24}
                sm={24}
                md={12}
                lg={6}
                style={{ marginBottom: "12px" }}
              >
                <p className="youtnotes_heading">{note.noteTitle}</p>
                <div
                  className="yournotes_Container"
                  style={{
                    backgroundColor: color,
                    border: `0.5px solid ${color}`,
                  }}
                >
                  <div className="yournotes_ContentContainer">
                    <div dangerouslySetInnerHTML={{ __html: note.notes }} />

                    <div
                      className="notes_deleteContainer"
                      onClick={() => {
                        setIsModalOpen(true);
                        setNoteId(note.noteId);
                      }}
                    >
                      <MdDelete size={15} color="white" />
                    </div>

                    <div
                      className="notes_editContainer"
                      onClick={() => handleEdit(note, index)}
                    >
                      <MdEdit size={15} color="white" />
                    </div>
                  </div>
                </div>
              </Col>
            </React.Fragment>
          );
        })}
      </Row>

      <Modal
        title="Delete Note"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button className="notebook_cancelbutton" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="primary" onClick={handleDeleteNote}>
              Yes
            </Button>
          </div>,
        ]}
      >
        <p>Are you sure want to delete this note</p>
      </Modal>
    </div>
  );
};
export default Notebook;
