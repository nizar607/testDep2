import "./Players.css";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Col } from 'react-bootstrap';
import PLayerCard from "./PlayerCard";
import { useState } from "react";
import DeletePlayerModal from "./DeletePlayerModal";

const SortableUser = ({ user, type }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: user?._id, name: "ddd" });

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const [showDeletePlayer, setShowDeletePlayer] = useState(false);

  const handleShowModal = () => {
    console.log("handleShowModal");
    setShowDeletePlayer(true)
  };
  const handleCloseModal = () => setShowDeletePlayer(false);



  //   const style = {
  //     transition,
  //     transform: CSS.Transform.toString(transform),
  //     width: "20%",
  //     display: "flex",
  //     // "rgba(112, 112, 112, 0.163)"
  //     justifyContent: "center",
  //     backgroundImage: user.name !="" ? "url('images/halland.png')" :"",
  //     backgroundColor: "rgba(112, 112, 112, 0.163)" ,
  //     backgroundSize: "cover",

  //     postion:"relative",


  //     opacity: isDragging ? 0.0 : 1.0, // Make the item transparent when dragging
  //   };

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    backgroundColor: user?.avatar ? "rgba(63, 63, 63, 0.695)" : "",
    backgroundSize: "cover",
    height: "fit-content",
    opacity: isDragging ? 0 : 1.0, // Make the item transparent when dragging
    position: "relative",
  };




  return (
    <>
      <Col xs={type == "subtitute" ? 12 : 2}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="mx-1 py-3 my-2 user"
      >


        {
          user?.avatar ? (
            <>
              <PLayerCard player={user} />
            </>
          ) : <div style={{
            width: "100%",
            minHeight: "150px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "1.5rem",
            color: "white",
            fontWeight: "bold",
          }}>
          </div>
        }
      </Col>

      <DeletePlayerModal showDeletePlayer={showDeletePlayer} handleCloseModal={handleCloseModal} />
    </>
  );
};

export default SortableUser;