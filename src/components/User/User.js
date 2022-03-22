import React from "react";
import "./User.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Button, Collapse, Card } from "react-bootstrap";
import UserPost from "./UserPost/UserPost";
import UserAlbum from "./UserAlbum/UserAlbum";
import { FaUser } from "react-icons/fa";
import { GoMail } from "react-icons/go";
import { BsTelephoneFill, BsGlobe } from "react-icons/bs";

function User() {
  let { username } = useParams();

  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);
  const [openPosts, setOpenPosts] = useState(false);
  const [inputTextPosts, setInputTextPosts] = useState("");
  const [albums, setAlbums] = useState([]);
  const [openAlbums, setOpenAlbums] = useState(false);
  const [inputTextAlbums, setInputTextAlbums] = useState("");

  useEffect(() => {
    // simulate getting user's information from database given the user's username
    const getUser = async () => {
      await fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((json) => {
          for (let i = 0; i < json.length; i++) {
            let user = json[i];
            if (user.username === username) {
              setUser(user);
              break;
            }
          }
        });
    };
    getUser();
  }, []);

  useEffect(() => {
    const getUserPosts = async () => {
      await fetch(
        `https://jsonplaceholder.typicode.com/posts?userId=${user.id}`
      )
        .then((response) => response.json())
        .then((json) => setPosts(json));
    };
    getUserPosts();
  }, [user]);

  useEffect(() => {
    const getUserAlbums = async () => {
      await fetch(
        `https://jsonplaceholder.typicode.com/albums?userId=${user.id}`
      )
        .then((response) => response.json())
        .then((json) => setAlbums(json));
    };
    getUserAlbums();
  }, [user]);

  let searchHandlerPosts = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputTextPosts(lowerCase);
  };

  const filteredDataPosts = posts.filter((el) => {
    if (inputTextPosts === "") {
      return el;
    } else {
      return (
        el.title.toLowerCase().includes(inputTextPosts) ||
        el.body.toLowerCase().includes(inputTextPosts)
      );
    }
  });

  let searchHandlerAlbums = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputTextAlbums(lowerCase);
  };

  const filteredDataAlbums = albums.filter((el) => {
    if (inputTextAlbums === "") {
      return el;
    } else {
      return el.title.toLowerCase().includes(inputTextAlbums);
    }
  });

  return (
    <div>
      <Card className="user-card" style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>{user.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            <FaUser className="user-icon" />
            {user.username}
          </Card.Subtitle>
          <Card.Text>
            <div className="user-email">
              <GoMail />
              <a href={`mailto:${user.email}`}>{user.email}</a>
            </div>
            <div className="user-phone">
              <BsTelephoneFill />
              {user.phone}
            </div>
            <div className="user-website">
              <BsGlobe />
              <a href={user.website} rel="noreferrer" target="_blank">
                {user.website}
              </a>
            </div>
          </Card.Text>
          <div className="User-buttons">
            <Button
              className="button-posts"
              onClick={() => setOpenPosts(!openPosts)}
              aria-controls="example-collapse-text"
              aria-expanded={openPosts}
            >
              View user's posts
            </Button>
            <Button
              className="button-albums"
              onClick={() => setOpenAlbums(!openAlbums)}
              aria-controls="example-collapse-text"
              aria-expanded={openAlbums}
            >
              View user's albums
            </Button>
            <Card.Link className="button-home" href="/">
              home
            </Card.Link>
          </div>
        </Card.Body>
      </Card>

      {openPosts ? (
        <div className="search">
          <TextField
            id="outlined-basic"
            onChange={searchHandlerPosts}
            variant="outlined"
            fullWidth
            label="Search"
          />
        </div>
      ) : null}
      <Collapse in={openPosts}>
        <div id="example-collapse-text" className="posts-container">
          {filteredDataPosts.map((post) => (
            <div key={post.id}>
              <UserPost post={post} />
            </div>
          ))}
        </div>
      </Collapse>

      {openAlbums ? (
        <div className="search">
          <TextField
            id="outlined-basic"
            onChange={searchHandlerAlbums}
            variant="outlined"
            fullWidth
            label="Search"
          />
        </div>
      ) : null}
      <Collapse in={openAlbums}>
        <div id="example-collapse-text" className="albums-container">
          {filteredDataAlbums.map((album) => (
            <div key={album.id}>
              <UserAlbum album={album} />
            </div>
          ))}
        </div>
      </Collapse>
    </div>
  );
}

export default User;
