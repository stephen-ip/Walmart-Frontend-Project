import { React, useState } from "react";
import "./UserName.css";
import { OverlayTrigger, Popover } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import { GoMail } from "react-icons/go";
import { FaUser } from "react-icons/fa";

function UserName(props) {
  const [show, setShow] = useState(false);
  const handleOnMouseEnter = () => {
    setShow(true);
  };
  const handleOnMouseLeave = () => {
    setShow(false);
  };

  return (
    <div>
      <OverlayTrigger
        show={show} // Control trigger behavior with show instead of trigger.
        placement="right"
        overlay={
          <Popover
            id={`popover-positioned-right`}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          >
            <Popover.Header as="h3">
              <FaUser className="iconUser" />
              {props.username}
            </Popover.Header>
            <Popover.Body>
              <GoMail className="iconMail" />
              <a href={`mailto:${props.email}`}>{props.email}</a>
            </Popover.Body>
          </Popover>
        }
      >
        <div
          className="name"
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
        >
          <Nav.Link href={`/${props.username}`}>{props.name}</Nav.Link>
        </div>
      </OverlayTrigger>
    </div>
  );
}

export default UserName;
